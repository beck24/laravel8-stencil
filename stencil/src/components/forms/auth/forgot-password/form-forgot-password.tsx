import { Component, h, State } from '@stencil/core';
import Isemail from 'isemail';
import serialize from 'form-serialize';
import { ToastService } from '../../../../services/toast.service';
import { APIService } from '../../../../services/api.service';
import { RouterService } from '../../../../services/router.service';
import { LoadingService } from '../../../../services/loading.service';

@Component({
    tag: 'form-forgot-password',
    styleUrl: 'form-forgot-password.scss'
})
export class FormForgotPassword {
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
                ToastService.success('Please check your email and follow the link that was sent to reset your password');
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
                        <h1>Forgot Password</h1>
                        <div class="pure-control-group">
                            <label htmlFor="forgot-password-form-email">Email</label>
                            <input
                                id="forgot-password-form-email"
                                type="email"
                                name="email"
                                value=""
                                class="block"
                                placeholder="Email"
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
                                Reset Password
                            </button>
                        </div>

                        <div style={{'padding': '1em 0 0 11em'}}>
                            <ion-router-link href={ RouterService.getRoute('login') }>Login</ion-router-link>
                        </div>
                    </fieldset>
                </form>
            </div>
        )
    }
}