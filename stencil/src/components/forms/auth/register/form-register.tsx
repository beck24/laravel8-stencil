import { Component, h, State } from '@stencil/core';
import Isemail from 'isemail';
import serialize from 'form-serialize';
import { ToastService } from '../../../../services/toast.service';
import { APIService } from '../../../../services/api.service';
import { RouterService } from '../../../../services/router.service';
import { LoadingService } from '../../../../services/loading.service';

@Component({
    tag: 'form-register',
    styleUrl: 'form-register.scss'
})
export class FormRegister {
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

        if (!results.name) {
            errors.push('Please enter your name');
        }
    
        if (!results.email) {
          errors.push('Invalid email address');
        }
        else {
          if (!Isemail.validate(results.email)) {
            errors.push('Invalid email address');
          }
        }

        if (!results.password) {
            errors.push('Please enter a password');
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

        await LoadingService.showLoading();

        let results = serialize(this.form, { hash: true, empty: true });

        try {
            let response = await APIService.post({ endpoint: 'register', data: results });

            if (response.ok) {
                RouterService.forward(RouterService.getRoute('email-verification'));
            }
            else {
                ToastService.error('There was an issue contacting the server');
            }
        } catch (e) {
            ToastService.error(e.message);
        }

        await LoadingService.hideLoading();
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
                        <h1>Register</h1>

                        <div class="pure-control-group">
                            <label htmlFor="register-form-name">Name</label>
                            <input
                                id="register-form-name"
                                type="text"
                                name="name"
                                value=""
                                class="block"
                                onChange={() => this.validateDirtyInputs() }
                            />
                        </div>

                        <div class="pure-control-group">
                            <label htmlFor="register-form-email">Email</label>
                            <input
                                id="register-form-email"
                                type="email"
                                name="email"
                                value=""
                                class="block"
                                onChange={() => this.validateDirtyInputs() }
                            />
                        </div>

                        <div class="pure-control-group">
                            <label htmlFor="register-form-password">Password</label>
                            <input
                                id="register-form-password"
                                type="password"
                                name="password"
                                value=""
                                class="block"
                                onChange={() => this.validateDirtyInputs() }
                            />
                        </div>

                        <div class="pure-control-group">
                            <label htmlFor="register-form-password2">Password Again</label>
                            <input
                                id="register-form-password2"
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

                            <button type="submit" class="pure-button pure-button-primary">
                                Register
                            </button>
                        </div>
                    </fieldset>
                </form>
            </div>
        )
    }
}