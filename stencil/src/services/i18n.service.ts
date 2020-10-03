class i18nServiceInstance {
    getLanguage(el: HTMLElement) {
        let closestElement = el.closest('[lang]') as HTMLElement;
        return closestElement ? closestElement.lang : 'en';
    }
}

export const i18nService = new i18nServiceInstance();