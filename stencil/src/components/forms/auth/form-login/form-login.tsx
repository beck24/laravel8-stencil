import { Component, h, State, Listen, Host, Element } from '@stencil/core';
import Isemail from 'isemail';
import serialize from 'form-serialize';
import { ToastService } from '../../../../services/toast.service';
import { LoadingService } from '../../../../services/loading.service'
import { RouterService } from '../../../../services/router.service';
import { i18nService } from '../../../../services/i18n.service';
import auth from '../../../../store/auth';

@Component({
    tag: 'form-login',
    styleUrl: 'form-login.scss',
    assetsDirs: ['lang']
})
export class FormLogin {
    @Element() el: HTMLElement;
    @State() errors: string[] = [];
    @State() errorMessages: string[] = [];
    @State() rerender: number = 0;

    form: HTMLFormElement;
    isDirty: boolean = false;

    @Listen('localeUpdate', { target: 'body' })
    localeUpdated() {
        this.rerender++;
    }

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
            errorMessages.push(i18nService.get('errors.noemail', this.el));
            errors.push('email');
        }
        else {
            if (!Isemail.validate(results.email)) {
                errorMessages.push(i18nService.get('errors.emailinvalid', this.el));
                errors.push('email');
            }
        }
    
        if (!results.password) {
            errorMessages.push(i18nService.get('errors.nopassword', this.el));
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
            <Host data-rerender={this.rerender}>
                <h1>{ i18nService.get('login', this.el) }</h1>

                <form
                    class="pure-form pure-form-aligned"
                    onSubmit={e => this.handleSubmit(e)}
                    ref={el => this.form = el as HTMLFormElement }
                >
                    <fieldset>
                        <div class="pure-control-group">
                            <label htmlFor="login-form-email">{ i18nService.get('email', this.el) }</label>
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
                            <label htmlFor="login-form-password">{ i18nService.get('password', this.el) }</label>
                            <input
                                id="login-form-password"
                                type="password"
                                name="password"
                                value=""
                                class={ this.errors.includes('password') ? 'block error' : 'block'}
                                placeholder={ i18nService.get('password', this.el) }
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
                                { i18nService.get('login', this.el) }
                            </button>
                        </div>

                        <div style={{'padding': '1em 0 0 11em'}}>
                            <ion-router-link href={ RouterService.getRoute('forgot-password') }>
                                { i18nService.get('forgot_password', this.el) }
                            </ion-router-link><br /><br />

                            { i18nService.get('no_account', this.el) }&nbsp;
                            
                            <ion-router-link href={ RouterService.getRoute('register') }>
                                { i18nService.get('signup', this.el) }
                            </ion-router-link>
                        </div>
                    </fieldset>
                </form>
            </Host>
        )
    }
}