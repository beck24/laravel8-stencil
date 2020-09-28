import { Component, h } from '@stencil/core';

@Component({
  tag: 'page-register',
  styleUrl: 'page-register.scss'
})
export class PageRegister {

  render() {
    return [
      <app-header />,
      <ion-content class="page-register">
        <section class="section">
          
          <form-register />

        </section>
      </ion-content>
    ]
  }
}