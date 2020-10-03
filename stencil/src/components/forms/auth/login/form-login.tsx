import { Component, h, State } from '@stencil/core';
import Isemail from 'isemail';
import serialize from 'form-serialize';
import { ToastService } from '../../../../services/toast.service';
import { LoadingService } from '../../../../services/loading.service'
import { RouterService } from '../../../../services/router.service';
import auth from '../../../../store/auth';

@Component({
    tag: 'form-login',
    styleUrl: 'form-login.scss',
    assetsDirs: ['lang']
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
            const result = await auth.actions.login(results.email, results.password);

            if (result.success) {
                ToastService.success(result.message);
            }
            else {
                ToastService.error(result.message);

                if (result.hasOwnProperty('errors')) {
                    this.errors = result.errors;
                }
    
                if (result.hasOwnProperty('errorMessages')) {
                    this.errorMessages = result.errorMessages;
                }
            }
        } catch (e) {
            ToastService.error(e.message);
        }

        await LoadingService.hideLoading();
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

                <language-test />
            </div>
        )
    }
}