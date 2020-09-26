import { Component, h, State } from '@stencil/core';
import Isemail from 'isemail';
import serialize from 'form-serialize';
import { ToastService } from '../../../../services/toast.service';
import { APIService } from '../../../../services/api.service';

@Component({
    tag: 'form-login',
    styleUrl: 'form-login.scss'
})
export class FormLogin {
    @State() loading: boolean = false;
    @State() errors: string[] = [];

    form: HTMLFormElement;
    isDirty: boolean = false;

    validateDirtyInputs() {
        if (!this.isDirty) {
          return true;
        }
    
        return this.validate();
    }
    
    validate() {
        const errors = [];
        let results = serialize(this.form, { hash: true, empty: true });
    
        if (!results.email) {
          errors.push('Please enter an email address');
        }
        else {
          if (!Isemail.validate(results.email)) {
            errors.push('Please enter a valid email address');
          }
        }
    
        if (!results.password) {
          errors.push('Please enter your password');
        }
    
        this.errors = errors;
    
        return !errors.length;
    }

    async handleSubmit(e) {
        e.preventDefault();

        this.isDirty = true;

        if (!this.validate()) {
            return;
        }

        this.loading = true;

        let results = serialize(this.form, { hash: true, empty: true });

        try {
            let response = await APIService.get({endpoint: 'sanctum/csrf-cookie', headers: false}); //await fetch(ConfigService.get('API_URL') + '/api/sanctum/csrf-cookie', { credentials: 'include' });

            if (response.ok) {
                let loginResponse = await APIService.post({ endpoint: 'login', data: results });

                if (loginResponse.ok) {
                    let userResponse = await APIService.get({ endpoint: 'user' });

                    if (userResponse.ok) {
                        console.log(await userResponse.json());
                        ToastService.success('You have been logged in.');
                    }
                    else {
                        ToastService.error('Could not load account info.');
                    }
                }
                else {
                    ToastService.error('Could not log in, please try again');
                }
            }
            else {
                ToastService.error('There was an issue reaching the server, please try again');
            }
        } catch (e) {
            ToastService.error(e.message);
        }

        this.loading = false;
    }

    async logout() {
        try {
            let response = await APIService.post({ endpoint: 'logout' });

            if (response.ok) {
                ToastService.success('You have been logged out');
            }
            else {
                ToastService.error('There was an issue reaching the server, please try again');
            }
        } catch (e) {
            ToastService.error(e.message);
        }
    }

    render() {
        return (
            <div>
                <form
                    class="pure-form pure-form-aligned"
                    onSubmit={e => this.handleSubmit(e)}
                    ref={el => this.form = el as HTMLFormElement }
                >
                    <fieldset>
                        <div class="pure-control-group">
                            <label htmlFor="login-form-email">Email</label>
                            <input
                                id="login-form-email"
                                type="email"
                                name="email"
                                value=""
                                class="block"
                                placeholder="Email"
                                onChange={() => this.validateDirtyInputs() }
                            />
                        </div>

                        <div class="pure-control-group">
                            <label htmlFor="login-form-password">Password</label>
                            <input
                                id="login-form-password"
                                type="password"
                                name="password"
                                value=""
                                class="block"
                                placeholder="Password"
                                onChange={() => this.validateDirtyInputs() }
                            />
                        </div>

                        <div class="pure-controls">

                            {
                                this.errors.length ? <div class="errors">
                                {
                                    this.errors.map(e => <div>{e}</div>)
                                }
                                </div>
                                : null
                            }

                            <button type="submit" class="pure-button pure-button-primary" disabled={this.loading}>
                                Log In
                            </button>

                            {
                                this.loading ? <div><ion-spinner name="lines" /></div> : null
                            }
                        </div>
                    </fieldset>
                </form>

                <button type="button" class="pure-button pure-button-primary" onClick={() => this.logout() }>
                    Log Out
                </button>
            </div>
        )
    }
}