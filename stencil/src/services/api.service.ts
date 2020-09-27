import { getCookie } from '../helpers/utils';
import { ConfigService } from '../services/config.service';

class APIServiceInstance {
    apiURL = ConfigService.get('API_URL');

    /**
     * 
     * @param params - object 
     *   endpoint: string - the endpoint to get
     *   headers?: headers to use instead of default, false for none
     *   data?: {} key/value object of query params to append to the endpoint
     *   credentials?: string | false - override credentials sending
     *   redirect?: string | false - override redirect handling
     * 
     */
    async get(params: any = {}) {
        let headers;

        if (params.hasOwnProperty('headers')) {
            headers = params.headers;
        } else {
            headers = await this.getheaders();
        }

        // handle just simple objects for now until something deeper is required
        let queryString = '';
        if (params.hasOwnProperty('data') && Object.keys(params.data).length) {
            queryString = params.endpoint.includes('?') ? '&' : '?';

            Object.keys(params.datadata).forEach(key => {
                queryString += `${key}=${encodeURIComponent(params.data[key])}`;
            });
        }

        let fetchParams: RequestInit = {
            credentials: 'include',
            redirect: 'manual',
            headers: headers
        };

        // remove if necessary
        fetchParams = Object.keys(fetchParams).reduce((object, key) => {
            if (params.hasOwnProperty(key) && params[key] === false) {
                // ignore it
            }
            else {
                object[key] = fetchParams[key];
            }

            return object
          }, {});

        return fetch(this.apiURL + params.endpoint + queryString, fetchParams);
    }

    /**
     * 
     * @param params - object 
     *   endpoint: string - the endpoint to get
     *   headers?: headers to use instead of default, false for none
     *   data?: {} key/value object of data to send in the body
     *   credentials?: string | false - override credentials sending
     *   redirect?: string | false - override redirect handling
     * 
     */
    async post(params: any = {}) {
        let headers;

        if (params.hasOwnProperty('headers')) {
            headers = params.headers;
        } else {
            headers = await this.getheaders();
        }

        let fetchParams: RequestInit = {
            credentials: 'include',
            redirect: 'manual',
            headers: headers
        };

        if (params.hasOwnProperty('data')) {
            fetchParams.body = JSON.stringify(params.data);
        }

        // remove if necessary
        fetchParams = Object.keys(fetchParams).reduce((object, key) => {
            if (params.hasOwnProperty(key) && params[key] === false) {
                // ignore it
            }
            else {
                object[key] = fetchParams[key];
            }

            return object
          }, {});

          fetchParams.method = 'POST'; // always for this post function

        return fetch(this.apiURL + params.endpoint, fetchParams);
    }

    async getheaders() {
        let headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        };

        let token = getCookie('XSRF-TOKEN');

        if (token) {
            headers['X-XSRF-TOKEN'] = decodeURIComponent(token);
        } else {
            // if we have no xsrf token we should get one
            // this should pretty much only happen on the first request of the session
            console.log('getting initial xsrf token');
            await this.get({endpoint: 'sanctum/csrf-cookie', headers: false});

            token = getCookie('XSRF-TOKEN');

            headers['X-XSRF-TOKEN'] = decodeURIComponent(token);
        }

        return headers;
    }
}
  
export const APIService = new APIServiceInstance();