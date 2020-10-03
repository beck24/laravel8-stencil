import { Component, h, State } from '@stencil/core';
import { SEOService } from "../../services/seo.service";
import { RouterService } from '../../services/router.service';
import auth from '../../store/auth';
// import { LoadingService } from '../../services/loading.service';

@Component({
  tag: 'app-root',
  styleUrl: 'app-root.scss',
})
export class AppRoot {
  @State() authStateSet: boolean = false;

  async componentDidLoad() {
    // await LoadingService.showLoading();

    // await auth.actions.init();

    // this.authStateSet = true;

    // await LoadingService.hideLoading();
  }

  render() {

    // routes to make available only for not-logged-in users
    const notLoggedInRoutes = [
      RouterService.getRoute('register'),
      RouterService.getRoute('login'),
      RouterService.getRoute('forgot-password'),
      "/reset-password/:token",
    ];

    // routes to make available to only logged in users
    const loggedInRoutes = [
      "/profile/*"
    ];

    return (
      <ion-app>

        {
          this.authStateSet ?
            <ion-router useHash={false} onIonRouteDidChange={e => { SEOService.update(e) }}>

            {
              // redirect login pages if logged in
              auth.getters.isLoggedIn() ?
                notLoggedInRoutes.map(r => <ion-route-redirect from={ r } to="/" /> )
              :
                loggedInRoutes.map(r => <ion-route-redirect from={ r } to="/login" /> )
            }

            <ion-route url={ RouterService.getRoute('home') } component="app-home" />
            <ion-route url="/profile/:name" component="app-profile" />

            {/* Auth routes */}
            <ion-route url={ RouterService.getRoute('register') } component="page-register" />
            <ion-route url={ RouterService.getRoute('login') } component="page-login" />
            <ion-route url={ RouterService.getRoute('forgot-password') } component="page-forgot-password" />
            <ion-route url="/reset-password/:token" component="page-reset-password" />
            <ion-route url="/email-verification" component="page-email-verification" />

            {/* Catch-all route */}
            <ion-route url=":any" component="page-404" />

            </ion-router>
          : null
        }

        <ion-nav />
      </ion-app>
    );
  }
}