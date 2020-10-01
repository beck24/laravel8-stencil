import { APIService } from '../../services/api.service';

class AuthActions {
    state: any = {};

    constructor(state) {
        this.state = state;
    }

    /**
     * Called when the app first loads to determine if the user is already logged in
     */
    async init() {
        const response = await APIService.get({ endpoint: 'init' });

        if (response.ok) {
            const result = await response.json();

            if (result.user) {
                this.state.user = { ...result.user };
            }
        }
        else {
            // nothing we can really do here to be honest
        }
    }

    /**
     * Authenticate the user via supplied credentials
     * 
     * @param email 
     * @param password 
     */
    async login(email, password) {
        try {
            let loginResponse = await APIService.post({ endpoint: 'login', data: { email, password }});

            if (loginResponse.ok) {
                let userResponse = await APIService.get({ endpoint: 'user' });

                if (userResponse.ok) {
                    this.state.user = {...await userResponse.json()};

                    return {
                        success: true,
                        message: 'You have been logged in.'
                    };
                }
                else {
                    throw 'Could not load account info.';
                }
            }
            else {
                const body = await loginResponse.json();

                if (body) {
                    const errorMessages = [];
                    const errors = [];

                    Object.keys(body.errors).forEach(err => {
                        errorMessages.push(body.errors[err]);
                        errors.push(err);
                    });

                    return {
                        success: false,
                        errors,
                        errorMessages,
                        message: 'Could not log in, please try again'
                    };

                }
                else {
                    throw 'Could not log in, please try again';
                }
            }
        } catch (e) {
            throw e;
        }
    }

    /**
     * End the users session and drop the local state
     */
    async logout() {
        try {
            let response = await APIService.post({ endpoint: 'logout' });
    
            if (response.ok) {
                this.state.user = null;
                return 'You have been logged out';
            }
            else {
                throw 'There was an issue reaching the server, please try again';
            }
        } catch (e) {
            throw e;
        }
    }
}

export default AuthActions;