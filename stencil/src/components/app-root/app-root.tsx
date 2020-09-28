import { Component, h } from '@stencil/core';
import { SEOService } from "../../services/seo.service";
import { RouterService } from '../../services/router.service';

@Component({
  tag: 'app-root',
  styleUrl: 'app-root.scss',
})
export class AppRoot {
  render() {
    return (
      <ion-app>
        <ion-router useHash={false} onIonRouteDidChange={e => { SEOService.update(e) }}>
          <ion-route url={ RouterService.getRoute('home') } component="app-home" />
          <ion-route url="/profile/:name" component="app-profile" />

          {/* Auth routes */}
          <ion-route url={ RouterService.getRoute('login') } component="page-login" />
          <ion-route url={ RouterService.getRoute('forgot-password') } component="page-forgot-password" />
          <ion-route url="/reset-password/:token" component="page-reset-password" />

          {/* Catch-all route */}
          <ion-route url=":any" component="page-404" />

        </ion-router>
        <ion-nav />
      </ion-app>
    );
  }
}
