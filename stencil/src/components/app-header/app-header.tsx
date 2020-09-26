import { Component, h } from '@stencil/core';

@Component({
    tag: 'app-header',
    styleUrl: 'app-header.scss'
})
export class AppHeader {
    render() {
        return(
            <ion-header>
                <ion-toolbar color="primary">
                    <ion-buttons slot="start">
                        <ion-back-button />
                    </ion-buttons>
                    
                    <ion-title>Home</ion-title>
                </ion-toolbar>
            </ion-header>
        );
    }
}