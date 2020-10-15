import { Component, h, State, Listen, Element } from '@stencil/core';
import { i18nService } from '../../../services/i18n.service';

@Component({
  tag: 'page-404',
  styleUrl: 'page-404.scss'
})
export class Page404 {
  @Element() el: HTMLElement;
  @State() rerender: number = 0;

  @Listen('localeUpdate', { target: 'body' })
  localeUpdated() {
      this.rerender++;
  }

  render() {
    return [
      <app-header />,
      <ion-content class="page-404" data-rerender={this.rerender}>
        <section class="section">

          <h1>{ i18nService.get('title', this.el) }</h1>

          <p>{ i18nService.get('description', this.el) }</p>

        </section>
      </ion-content>
    ]
  }
}