import { Component, h, Prop } from '@stencil/core';

@Component({
  tag: 'page-reset-password',
  styleUrl: 'page-reset-password.scss'
})
export class PageResetPassword {
    @Prop() token: string = '';

  render() {

    return [
      <app-header />,
      <ion-content class="page-reset-password">
        <section class="section">
          
          <form-reset-password token={this.token} />

        </section>
      </ion-content>
    ]
  }
}