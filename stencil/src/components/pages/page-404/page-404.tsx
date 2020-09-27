import { Component, h } from '@stencil/core';

@Component({
  tag: 'page-404',
  styleUrl: 'page-404.scss'
})
export class Page404 {

  render() {
    return [
      <app-header />,
      <ion-content class="page-404">
        <section class="section">
          
          <h1>That's a 404</h1>

          <p>Couldn't find the route you're looking for...</p>

        </section>
      </ion-content>
    ]
  }
}