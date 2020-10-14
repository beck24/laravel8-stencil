import { Component, h, State, Listen, Host, Element } from '@stencil/core';
import Isemail from 'isemail';
import serialize from 'form-serialize';
import { ToastService } from '../../../../services/toast.service';
import { APIService } from '../../../../services/api.service';
import { RouterService } from '../../../../services/router.service';
import { LoadingService } from '../../../../services/loading.service';
import { i18nService } from '../../../../services/i18n.service';

@Component({
    tag: 'form-register',
    styleUrl: 'form-register.scss'
})
export class FormRegister {
    @Element() el: HTMLElement;
    @State() errors: string[] = [];
    @State() errorMessages: string[] = [];
    @State() rerender;

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

        if (!results.name) {
            errorMessages.push(i18nService.get('errors.name', this.el));
            errors.push('name');
        }
    
        if (!results.email) {
            errorMessages.push(i18nService.get('errors.emailinvalid', this.el));
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
        else {
            if (results.password !== results.password_confirmation) {
                errorMessages.push(i18nService.get('errors.passwordmatch', this.el));
                errors.push('password_confirmation');
            }
        }
    
        this.errors = errors;
        this.errorMessages = errorMessages;
    
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
            let response = await APIService.post({ endpoint: 'register', data: results });

            if (response.ok) {
                RouterService.forward(RouterService.getRoute('email-verification'));
            }
            else {
                const body = await response.json();

                if (body) {
                    ToastService.error(body.message);

                    const errorMessages = [];
                    const errors = [];

                    Object.keys(body.errors).forEach(err => {
                        errorMessages.push(body.errors[err]);
                        errors.push(err);
                    });

                    this.errors = errors;
                    this.errorMessages = errorMessages;
                } else {
                    ToastService.error(i18nService.get('errors.api', this.el));
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
                <form
                    class="pure-form pure-form-aligned"
                    onSubmit={e => this.handleSubmit(e)}
                    ref={el => this.form = el as HTMLFormElement }
                >
                    <fieldset>
                        <h1>{ i18nService.get('title', this.el) }</h1>

                        <div class="pure-control-group">
                            <label htmlFor="register-form-name">{ i18nService.get('name', this.el) }</label>
                            <input
                                id="register-form-name"
                                type="text"
                                name="name"
                                value=""
                                class={ this.errors.includes('name') ? 'block error' : 'block'}
                                onChange={() => this.validateDirtyInputs() }
                            />
                        </div>

                        <div class="pure-control-group">
                            <label htmlFor="register-form-email">{ i18nService.get('email', this.el) }</label>
                            <input
                                id="register-form-email"
                                type="email"
                                name="email"
                                value=""
                                class={ this.errors.includes('email') ? 'block error' : 'block'}
                                onChange={() => this.validateDirtyInputs() }
                            />
                        </div>

                        <div class="pure-control-group">
                            <label htmlFor="register-form-password">{ i18nService.get('password', this.el) }</label>
                            <input
                                id="register-form-password"
                                type="password"
                                name="password"
                                value=""
                                class={ this.errors.includes('password') ? 'block error' : 'block'}
                                onChange={() => this.validateDirtyInputs() }
                            />
                        </div>

                        <div class="pure-control-group">
                            <label htmlFor="register-form-password2">{ i18nService.get('passwordagain', this.el) }</label>
                            <input
                                id="register-form-password2"
                                type="password"
                                name="password_confirmation"
                                value=""
                                class={ this.errors.includes('password_confirmation') ? 'block error' : 'block'}
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
                                { i18nService.get('register', this.el) }
                            </button>
                        </div>

                        <div style={{ 'padding': '2em 0 0 11em' }}>
                            { i18nService.get('alreadymember', this.el) } <ion-router-link href={ RouterService.getRoute('login') }>{ i18nService.get('login', this.el) }</ion-router-link>
                        </div>
                    </fieldset>
                </form>
            </Host>
        )
    }
}