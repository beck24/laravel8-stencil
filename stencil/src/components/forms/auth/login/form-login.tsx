import { Component, h, State } from '@stencil/core';
import Isemail from 'isemail';
import serialize from 'form-serialize';
import { ToastService } from '../../../../services/toast.service';
import { LoadingService } from '../../../../services/loading.service'
import { APIService } from '../../../../services/api.service';
import { RouterService } from '../../../../services/router.service';
import auth from '../../../../store/auth/auth';

@Component({
    tag: 'form-login',
    styleUrl: 'form-login.scss'
})
export class FormLogin {
    @State() errors: string[] = [];
    @State() errorMessages: string[] = [];
    @State() renderCount: number = 0;

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
        const errorMessages = [];

        let results = serialize(this.form, { hash: true, empty: true });
    
        if (!results.email) {
          errorMessages.push('Please enter an email address');
          errors.push('email');
        }
        else {
          if (!Isemail.validate(results.email)) {
            errorMessages.push('Please enter a valid email address');
            errors.push('email');
          }
        }
    
        if (!results.password) {
          errorMessages.push('Please enter your password');
          errors.push('password');
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

        await LoadingService.showLoading();

        let results = serialize(this.form, { hash: true, empty: true });

        try {
            let loginResponse = await APIService.post({ endpoint: 'login', data: results });

            if (loginResponse.ok) {
                let userResponse = await APIService.get({ endpoint: 'user' });

                if (userResponse.ok) {
                    // auth.user = await userResponse.json();

                    ToastService.success('You have been logged in.');
                }
                else {
                    ToastService.error('Could not load account info.');
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

                    this.errors = errors;
                    this.errorMessages = errorMessages;
                }
                else {
                    ToastService.error('Could not log in, please try again');
                }
            }
        } catch (e) {
            ToastService.error(e.message);
        }

        await LoadingService.hideLoading();
    }

    async logout() {
        await LoadingService.showLoading();

        try {
            let response = await APIService.post({ endpoint: 'logout' });

            if (response.ok) {
                // auth.user = null;
                ToastService.success('You have been logged out');
            }
            else {
                ToastService.error('There was an issue reaching the server, please try again');
            }
        } catch (e) {
            ToastService.error(e.message);
        }

        await LoadingService.hideLoading();
    }

    toggleState() {
        if (!auth.getters.isLoggedIn()) {
            auth.actions.login(true)
        }
        else {
            auth.actions.logout();
        }
    }

    render() {
        return (
            <div>
                <h1>Login</h1>
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
                                class={ this.errors.includes('email') ? 'block error' : 'block'}
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
                                class={ this.errors.includes('password') ? 'block error' : 'block'}
                                placeholder="Password"
                                onChange={() => this.validateDirtyInputs() }
                            />
                        </div>

                        <div class="pure-controls">

                            {
                                this.errorMessages.length ? <div class="errors">
                                {
                                    this.errorMessages.map(e => <div>{e}</div>)
                                }
                                </div>
                                : null
                            }

                            <button type="submit" class="pure-button pure-button-primary">
                                Log In
                            </button>
                        </div>

                        <div style={{'padding': '1em 0 0 11em'}}>
                            <ion-router-link href={ RouterService.getRoute('forgot-password') }>Forgot Password?</ion-router-link><br /><br />
                            Don't have an account? <ion-router-link href={ RouterService.getRoute('register') }>Sign up</ion-router-link>
                        </div>
                    </fieldset>
                </form>

                {
                    auth.getters.isLoggedIn() ?
                    <button type="button" class="pure-button pure-button-primary" onClick={() => this.logout() }>
                        Log Out
                    </button>

                    : null
                }

                <button type="button" class="pure-button pure-button-primary" onClick={ () =>  this.toggleState() }>Toggle User</button>
                
            </div>
        )
    }
}