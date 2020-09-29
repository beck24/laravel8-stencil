import { Component, h } from '@stencil/core';
import { RouterService } from '../../services/router.service';
import state from '../../store/store';

@Component({
  tag: 'app-home',
  styleUrl: 'app-home.scss',
})
export class AppHome {

  logout() {
    console.log(state);

    state.auth = { user: null };

    console.log(state);
  }

  render() {
    return [
      <ion-header>
        <ion-toolbar color="primary">
          <ion-title>Home</ion-title>
        </ion-toolbar>
      </ion-header>,

      <ion-content class="ion-padding">
        <p>
          Welcome to the PWA Toolkit. You can use this starter to build entire apps with web components using Stencil and ionic/core! Check out the README for everything that comes
          in this starter out of the box and check out our docs on <a href="https://stenciljs.com">stenciljs.com</a> to get started.
        </p>

        <ion-button href="/profile/ionic" expand="block">
          Profile page
        </ion-button>

        {
          state.auth.user ?
            <ion-button onClick={ () => this.logout() } expand="block">Log Out</ion-button>
          :
            <ion-button href={ RouterService.getRoute('login') } expand="block">Log In</ion-button>
        }

<button class="pure-button pure-button-primary" onClick={() => state.test = state.test.foo ? { foo: null } : { foo: 'bar' } }>Count { state.test.foo ? state.test.foo : 'null' }</button>
        
      </ion-content>,
    ];
  }
}
