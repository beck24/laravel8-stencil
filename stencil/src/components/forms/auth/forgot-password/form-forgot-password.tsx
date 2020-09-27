import { Component, h, State } from '@stencil/core';
import Isemail from 'isemail';
import serialize from 'form-serialize';
import { ToastService } from '../../../../services/toast.service';
import { APIService } from '../../../../services/api.service';
import { RouterService } from '../../../../services/router.service';

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

        let results = serialize(this.form, { hash: true, empty: true });

        console.log(results);

        // try {
        //     let loginResponse = await APIService.post({ endpoint: 'login', data: results });

        //     if (loginResponse.ok) {
        //         let userResponse = await APIService.get({ endpoint: 'user' });

        //         if (userResponse.ok) {
        //             console.log(await userResponse.json());
        //             ToastService.success('You have been logged in.');
        //         }
        //         else {
        //             ToastService.error('Could not load account info.');
        //         }
        //     }
        //     else {
        //         ToastService.error('Could not log in, please try again');
        //     }
        // } catch (e) {
        //     ToastService.error(e.message);
        // }
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

                        <div style={{'padding-left': '11em'}}>
                            <ion-router-link href={ RouterService.getRoute('login') }>Login</ion-router-link>
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
                    </fieldset>
                </form>
            </div>
        )
    }
}