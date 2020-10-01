import { Config } from '@stencil/core';
import dotenv from 'dotenv';
import { sass } from '@stencil/sass';
import nodePolyfills from 'rollup-plugin-node-polyfills';

// https://stenciljs.com/docs/config

// dotEnvPlugin will replace instances of process.env.MY_VARIABLE
// with the string from the .env file
// this is limited to the config.service.ts file to ensure
// limited scope, and usage of the config service in the codebase
const envVars = dotenv.config();
const dotEnvPlugin = () => {
  return {
    name: 'env',
    transform: function (sourceText, id) {
        let code = sourceText;

        if (id.includes('config.service.ts')) {
          const replaceAll = (str, find, replace) => {
            // https://stackoverflow.com/a/1144788/9238321
            return str.replace(new RegExp(find.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, "\\$1"), 'g'), replace);
          };
  
          Object.keys(envVars.parsed).forEach(function (key) {
              code = replaceAll(code, "process.env." + key, "\"" + envVars.parsed[key] + "\"");
          });
        }

        return new Promise(function (resolve) {
            return resolve({
                id: id,
                code: code,
            });
        });
    },
  };
};

const outputTargets: any = [
  {
    type: 'www',
    dir: envVars.parsed.LARAVEL_DIR + '/public',
    empty: true,
    serviceWorker: null,
    baseUrl: envVars.parsed.BASE_URL,
    copy: [
      {
        src: envVars.parsed.LARAVEL_DIR + '/public-laravel',
        dest: './'
      }
    ]
  }
];

if (envVars.parsed.BUILD_DOCS) {
  outputTargets.push({
    type: 'docs-readme',
    footer: 'Built by Matt, using Stencil',
    dir: './docs',
    strict: true
  });
}


export const config: Config = {
  globalScript: 'src/global/app.ts',
  globalStyle: 'src/global/app.scss',
  taskQueue: 'async',
  devServer: {
    port: parseInt(envVars.parsed.STENCIL_DEV_SERVER_PORT)
  },
  outputTargets,
  plugins: [
    dotEnvPlugin(),
    sass()
  ],
  rollupPlugins: {
    after: [
      nodePolyfills(),
    ]
  }
};
