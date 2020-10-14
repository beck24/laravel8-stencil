import { Component, h } from '@stencil/core';
import { LoadingService } from '../../services/loading.service';
import { RouterService } from '../../services/router.service';
import { ToastService } from '../../services/toast.service';
import auth from '../../store/auth';

@Component({
  tag: 'app-home',
  styleUrl: 'app-home.scss',
})
export class AppHome {

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
      <ion-content class="ion-padding">
        <p>
          Welcome to the PWA Toolkit. You can use this starter to build entire apps with web components using Stencil and ionic/core! Check out the README for everything that comes
          in this starter out of the box and check out our docs on <a href="https://stenciljs.com">stenciljs.com</a> to get started.
        </p>

        <ion-button href="/profile/ionic" expand="block">
          Profile page
        </ion-button>

        { 
          auth.getters.isLoggedIn() ?
            <ion-button onClick={ () => this.logout() } expand="block">Log out</ion-button>
          :
            <ion-button href={ RouterService.getRoute('login') } expand="block">Log In</ion-button>
        }
        
        
      </ion-content>,
    ];
  }
}
