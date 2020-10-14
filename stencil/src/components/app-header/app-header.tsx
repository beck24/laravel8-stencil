import { Component, h, Element, State, Host, Listen } from '@stencil/core';
import { i18nService } from '../../services/i18n.service';
import { RouterService } from '../../services/router.service';

@Component({
    tag: 'app-header',
    styleUrl: 'app-header.scss'
})
export class AppHeader {
    @Element() el: HTMLElement;
    @State() rerender: number = 0;

    @Listen('localeUpdate', { target: 'body' })
    localeUpdated() {
        this.rerender++;
    }

    render() {
        return(
            <Host data-rerender={this.rerender} >
                <ion-header>
                    <ion-toolbar color="primary">
                        <ion-buttons slot="end">
                            <ion-button onClick={() => i18nService.setLanguage('en')}>EN</ion-button>
                            <ion-button onClick={() => i18nService.setLanguage('fr')}>FR</ion-button>
                        </ion-buttons>

                        <ion-title onClick={() => RouterService.forward(RouterService.getRoute('home'))}>
                            { i18nService.get('title', this.el)}
                        </ion-title>
                    </ion-toolbar>
                </ion-header>
            </Host>
        );
    }
}