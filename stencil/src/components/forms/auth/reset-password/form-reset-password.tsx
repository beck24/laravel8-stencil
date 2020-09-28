import { Component, h, Prop, State } from '@stencil/core';
import Isemail from 'isemail';
import serialize from 'form-serialize';
import { ToastService } from '../../../../services/toast.service';
import { APIService } from '../../../../services/api.service';
import { RouterService } from '../../../../services/router.service';

@Component({
    tag: 'form-reset-password',
    styleUrl: 'form-reset-password.scss'
})
export class FormResetPassword {
    @Prop() token!: string;
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
          errors.push('Invalid email address - the url should contain a valid email address');
        }
        else {
          if (!Isemail.validate(results.email)) {
            errors.push('Invalid email address - the url should contain a valid email address');
          }
        }

        if (!results.password) {
            errors.push('Please enter a new password');
        }
        else {
            if (results.password !== results.password_confirmation) {
                errors.push('Password and confirmation should match');
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

        let results = serialize(this.form, { hash: true, empty: true });

        try {
            let response = await APIService.post({ endpoint: 'reset-password', data: results });

            if (response.ok) {
                RouterService.forward(RouterService.getRoute('login'));
                ToastService.success('Password has been updated, please log in.');
            }
            else {
                ToastService.error('There was an issue contacting the server');
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
                            <label htmlFor="reset-password-form-password">Password</label>
                            <input
                                id="reset-password-form-password"
                                type="password"
                                name="password"
                                value=""
                                class="block"
                                onChange={() => this.validateDirtyInputs() }
                            />
                        </div>

                        <div class="pure-control-group">
                            <label htmlFor="reset-password-form-password2">Password Again</label>
                            <input
                                id="reset-password-form-password2"
                                type="password"
                                name="password_confirmation"
                                value=""
                                class="block"
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

                            <input type="hidden" name="token" value={this.token} />
                            <input type="hidden" name="email" value={ RouterService.getQueryParam('email') } />

                            <button type="submit" class="pure-button pure-button-primary">
                                Reset Password
                            </button>
                        </div>
                    </fieldset>
                </form>
            </div>
        )
    }
}