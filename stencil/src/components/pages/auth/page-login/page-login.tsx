import { Component, h } from '@stencil/core';

@Component({
  tag: 'page-login',
  styleUrl: 'page-login.scss'
})
export class PageAdmin {

  render() {
    return [
      <app-header />,
      <ion-content class="page-login">
        <section class="section">
          
          <form-login />

        </section>
      </ion-content>
    ]
  }
}