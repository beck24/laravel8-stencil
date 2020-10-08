const { resolve } = require('path');
const { readdir, readFile, writeFile } = require('fs').promises;

async function* getFiles(dir) {
  const dirents = await readdir(dir, { withFileTypes: true });
  for (const dirent of dirents) {
    const res = resolve(dir, dirent.name);
    if (dirent.isDirectory()) {
      yield* getFiles(res);
    } else {
      yield res;
    }
  }
}

const buildLanguages = async () => {
    let languages = {};
    console.log('Scanning for language files...');

    for await (const f of getFiles('./src/components')) {
        if (f.includes('/i18n/') && f.endsWith('.json')) {

            let lang = f.split('/').pop().split('.json').shift();
            let component = f.split('/i18n/').shift().split('/').pop();
            
            if (!languages.hasOwnProperty(lang)) {
                languages[lang] = {};
            }

            try {
                const newContent = await readFile(f, {encoding: 'utf8'});
                const newStrings = JSON.parse(newContent);
    
                languages[lang][component] = newStrings;
            } catch (e) {
                console.log('Error: reading language file ' + f);
                console.log(e);
            }
        }
    }

    console.log('Writing new language strings to disk');

    Object.keys(languages).forEach(async lang => {

        const components = Object.keys(languages[lang]).sort();

        let sortedLang = {};
        components.forEach(c => {
            sortedLang[c] = languages[lang][c];
        });
        await writeFile('./src/assets/i18n/' + lang + '.json', JSON.stringify(sortedLang, null, 2));
    });

    console.log('*****************************');
    console.log(' ');
    console.log('Language compilation complete');
    console.log(' ');
    console.log('*****************************');
};

// wrapper ensures node doesn't exit before the async has resolved
function wrapPromiseMain(entryPoint) {
    const pollTime = 1000000;
    let interval = setInterval(() => {}, pollTime);
    
    return entryPoint().finally(() => {clearInterval(interval)});
}

wrapPromiseMain(buildLanguages);