import { Component, h, State } from '@stencil/core';
import { APIService } from '../../../../services/api.service';
import { LoadingService } from '../../../../services/loading.service';
import { RouterService } from '../../../../services/router.service';
import { ToastService } from '../../../../services/toast.service';

@Component({
  tag: 'page-email-verification',
  styleUrl: 'page-email-verification.scss'
})
export class PageEmailVerification {
    @State() verified: string = RouterService.getQueryParam('verified');

    componentWillLoad() {
        console.log(this.verified);
    }

    async sendEmail() {
        await LoadingService.showLoading();

        try {
            let response = await APIService.post({ endpoint: 'email/verification-notification' });

            if (response.ok) {
                ToastService.success('The email has been sent');
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
    return [
      <app-header />,
      <ion-content class="page-email-verification">
        <section class="section">
          {
              this.verified ?
                <div>
                    <h1>Email Verified</h1>
            
                    <p>
                        Your email has been successfully verified, thank you.
                    </p>
                </div>
              :
                <div>
                    <h1>Please verify your email.</h1>
            
                    <p>
                        An email was sent to you that contained a link.  Please click that link to confirm your email.

                        Didn't get the email?  Click below to send another
                    </p>

                    <button class="pure-button pure-button-primary" onClick={ () => { this.sendEmail() }}>
                        Send Verification Email
                    </button>
                </div>
          }

        </section>
      </ion-content>
    ]
  }
}