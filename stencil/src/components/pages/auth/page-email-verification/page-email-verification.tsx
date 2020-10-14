import { Component, h, State, Element, Listen } from '@stencil/core';
import { APIService } from '../../../../services/api.service';
import { i18nService } from '../../../../services/i18n.service';
import { LoadingService } from '../../../../services/loading.service';
import { RouterService } from '../../../../services/router.service';
import { ToastService } from '../../../../services/toast.service';

@Component({
  tag: 'page-email-verification',
  styleUrl: 'page-email-verification.scss'
})
export class PageEmailVerification {
    @Element() el: HTMLElement;
    @State() verified: string = RouterService.getQueryParam('verified');

    @State() rerender: number = 0;

    @Listen('localeUpdate', { target: 'body' })
    localeUpdated() {
        this.rerender++;
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
      <ion-content class="page-email-verification" data-rerender={this.rerender}>
        <section class="section">
          {
              this.verified ?
                <div>
                    <h1>{ i18nService.get('verified.title', this.el) }</h1>
            
                    <p>
                        { i18nService.get('verified.message', this.el) }
                    </p>
                </div>
              :
                <div>
                    <h1>{ i18nService.get('unverified.title', this.el) }</h1>
            
                    <p>
                      { i18nService.get('unverified.title', this.el) }
                    </p>

                    <button class="pure-button pure-button-primary" onClick={ () => { this.sendEmail() }}>
                      { i18nService.get('submit', this.el) }
                    </button>
                </div>
          }

        </section>
      </ion-content>
    ]
  }
}