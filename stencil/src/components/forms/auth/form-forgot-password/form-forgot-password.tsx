import { Component, h, State, Element, Listen, Host } from '@stencil/core';
import Isemail from 'isemail';
import serialize from 'form-serialize';
import { ToastService } from '../../../../services/toast.service';
import { APIService } from '../../../../services/api.service';
import { RouterService } from '../../../../services/router.service';
import { LoadingService } from '../../../../services/loading.service';
import { i18nService } from '../../../../services/i18n.service';

@Component({
    tag: 'form-forgot-password',
    styleUrl: 'form-forgot-password.scss'
})
export class FormForgotPassword {
    @Element() el: HTMLElement;
    @State() errors: string[] = [];
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
        let results = serialize(this.form, { hash: true, empty: true });
    
        if (!results.email) {
            errors.push(i18nService.get('errors.noemail', this.el));
        }
        else {
            if (!Isemail.validate(results.email)) {
                errors.push(i18nService.get('errors.emailinvalid', this.el));
            }
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
            let response = await APIService.post({ endpoint: 'forgot-password', data: results });

            if (response.ok) {
                ToastService.success(i18nService.get('messages.api', this.el));
            }
            else {
                ToastService.error(i18nService.get('errors.api', this.el));
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
                            <label htmlFor="forgot-password-form-email">{ i18nService.get('email', this.el) }</label>
                            <input
                                id="forgot-password-form-email"
                                type="email"
                                name="email"
                                value=""
                                class="block"
                                placeholder={ i18nService.get('email', this.el) }
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

                            <button type="submit" class="pure-button pure-button-primary">
                                { i18nService.get('reset_password', this.el) }
                            </button>
                        </div>

                        <div style={{'padding': '1em 0 0 11em'}}>
                            <ion-router-link href={ RouterService.getRoute('login') }>{ i18nService.get('login', this.el) }</ion-router-link>
                        </div>
                    </fieldset>
                </form>
            </Host>
        )
    }
}