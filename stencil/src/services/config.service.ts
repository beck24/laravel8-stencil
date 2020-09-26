class ConfigServiceInstance {
    private values: any;

    constructor() {
        this.values = {
            // @ts-ignore - ignore unknown var `process` - replaced in build process
            API_URL: process.env.API_URL,
            // @ts-ignore
            BASE_URL: process.env.BASE_URL,
            // @ts-ignore
            SITE_NAME: process.env.SITE_NAME
        };
    }

    get(key, defaultValue?) {
        if (this.values.hasOwnProperty(key)) {
            return this.values[key];
        }

        return defaultValue;
    }
}

export const ConfigService = new ConfigServiceInstance();