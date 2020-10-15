class i18nServiceInstance {
    languagesLoaded: string[];

    strings: any = {};

    constructor() {
        this.languagesLoaded = [];
    }

    async loadLanguage(locale: string, refresh: boolean = false) {
        // only attempt to fetch the json file once
        if (this.languagesLoaded.includes(locale) && !refresh) {
            return;
        }

        this.languagesLoaded = [locale, ...this.languagesLoaded];

        // const existingTranslations = JSON.parse(sessionStorage.getItem(`i18n.${locale}`));
        // if (existingTranslations && Object.keys(existingTranslations).length > 0) {
        //     return existingTranslations;
        // } else {
            try {
                const result = await fetch(`assets/i18n/${locale}.json`);
                if (result.ok) {
                    const data = await result.json();
                    sessionStorage.setItem(`i18n.${locale}`, JSON.stringify(data));
                    
                    this.strings[locale] = data;

                    const event = new CustomEvent('localeUpdate', { detail: locale });
                    document.body.dispatchEvent(event);
                }
            } catch (exception) {
                console.error(`Error loading locale: ${locale}`, exception);
            }
        // }
    }

    getLanguage(el: HTMLElement = document.body) {
        let closestElement = el.closest('[lang]') as HTMLElement;
        return closestElement ? closestElement.lang : 'en';
    }

    async setLanguage(locale: string, el: HTMLElement = document.body) {
        el.setAttribute('lang', locale);

        await this.loadLanguage(locale);

        const event = new CustomEvent('localeUpdate', { detail: locale });
        document.body.dispatchEvent(event);
    }

    get(key: string, el: HTMLElement | null = null, params: object = {}) {
        const index = (obj,i) => {
            return obj && obj.hasOwnProperty(i) ? obj[i] : {};
        };

        const locale = el === null ? this.getLanguage() : this.getLanguage(el);

        if (!this.languagesLoaded.includes(locale)) {
            this.loadLanguage(locale);
        }

        const tagname = el === null ? 'app-root' : el.tagName.toLowerCase();

        let jsonResult = [tagname, ...key.split('.')].reduce(index, this.strings[locale]);

        if (Array.isArray(jsonResult)) {
            jsonResult = jsonResult.join('<br />');
        }

        let stringResult = Object.prototype.toString.call(jsonResult) === "[object String]" ? jsonResult : key;

        if (params && Object.keys(params).length) {
            Object.keys(params).forEach(key => {
                stringResult = stringResult.split(`{${key}}`).join(params[key]);
            });
        }

        return stringResult;
    }
}

export const i18nService = new i18nServiceInstance();