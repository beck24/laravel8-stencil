import { Component, h } from '@stencil/core';

@Component({
  tag: 'page-forgot-password',
  styleUrl: 'page-forgot-password.scss'
})
export class PageForgotPassword {

  render() {
    return [
      <app-header />,
      <ion-content class="page-forgot-password">
        <section class="section">
          
          <form-forgot-password />

        </section>
      </ion-content>
    ]
  }
}