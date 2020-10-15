import { Component, h, State, Listen, Element } from '@stencil/core';
import { i18nService } from '../../../services/i18n.service';
import { LoadingService } from '../../../services/loading.service';
import { RouterService } from '../../../services/router.service';
import { ToastService } from '../../../services/toast.service';
import auth from '../../../store/auth';

@Component({
  tag: 'page-home',
  styleUrl: 'page-home.scss',
})
export class PageHome {
    @Element() el: HTMLElement;
    @State() rerender: number = 0;

    @Listen('localeUpdate', { target: 'body' })
    localeUpdated() {
        this.rerender++;
    }

  async logout() {
    await LoadingService.showLoading();

    try {
      ToastService.success(await auth.actions.logout());
    } catch (e) {
      ToastService.error(e.message);
    }

    await LoadingService.hideLoading();
 }

  render() {
    return [
      <app-header />,
      <ion-content class="ion-padding" data-rerender={this.rerender}>
        <p innerHTML={ i18nService.get('content', this.el) }>
        </p>

        {
            auth.getters.isLoggedIn() ?
                <ion-button href="/profile/ionic" expand="block">
                    { i18nService.get('profile_page', this.el) }
                </ion-button>
            :

            null
        }

        { 
          auth.getters.isLoggedIn() ?
            <ion-button onClick={ () => this.logout() } expand="block">{ i18nService.get('logout') }</ion-button>
          :
            <ion-button href={ RouterService.getRoute('login') } expand="block">{ i18nService.get('login') }</ion-button>
        }
        
        
      </ion-content>,
    ];
  }
}
