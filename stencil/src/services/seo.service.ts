import { ConfigService } from '../services/config.service';

class SEOServiceInstance {
    setTitle(title) {
      document.title = title;
      document.querySelector('meta[property="og:title"]').setAttribute("content", title);
    }

    setDescription(description) {
      document.querySelector('meta[name="description"]').setAttribute("content", description);
      document.querySelector('meta[property="og:description"]').setAttribute("content", description);
    }

    setOG (params) {
      if (params.hasOwnProperty('type')) {
        document.querySelector('meta[property="og:type"]').setAttribute("content", params.type);
      }

      if (params.hasOwnProperty('url')) {
        document.querySelector('meta[property="og:url"]').setAttribute("content", params.url);
      }

      if (params.hasOwnProperty('image')) {
        document.querySelector('meta[property="og:image"]').setAttribute("content", params.image);
      }

      if (params.hasOwnProperty('site_name')) {
        document.querySelector('meta[property="og:site_name"]').setAttribute("content", params.site_name);
      }
    }

    setCanonical(url) {
      document.querySelector('link[rel="canonical"]').setAttribute("href", url);
    }

    /**
     * Update the metatags based on the path
     *
     * Add new values to seoValues for new pages
     *
     * @param e
     */
    update(e) {
      const seoValues = {
        '/': {
          title: 'Home Page',
          description: "Home Page Description",
        },
        '/profile/ionic': {
            title: 'this is a custom title',
            description: 'for the ionic profile page'
        }
      };

      const defaultOG = {
        type: 'article',
        url: ConfigService.get('BASE_URL') + `/${e.detail.to}`,
        image: ConfigService.get('BASE_URL') + '/assets/images/og-social.jpg',
        site_name: ConfigService.get('SITE_NAME')
      };

      const key = seoValues.hasOwnProperty(e.detail.to) ? e.detail.to : false;

      if (key !== false) {
        this.setTitle(seoValues[key].title);
        this.setDescription(seoValues[key].description);

        const ogParams = seoValues[key].hasOwnProperty('og') ? {...defaultOG, ...seoValues[key].og} : defaultOG;

        this.setOG(ogParams);

        this.setCanonical(defaultOG.url);
      }
    }
}

  export const SEOService = new SEOServiceInstance();