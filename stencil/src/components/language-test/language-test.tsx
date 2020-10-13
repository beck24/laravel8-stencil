import { Component, h, Listen, State, Host, Element } from '@stencil/core';
import { i18nService } from '../../services/i18n.service';

@Component({
    tag: 'language-test'
})
export class LanguageTest {
    @Element() el: HTMLElement;
    @State() rerender: number = 0;

    @Listen('localeUpdate', { target: 'body' })
    localeUpdated() {
        this.rerender++;
    }

    render() {
        return (
            <Host data-rerender={this.rerender}>
                <div>
                    Language Test: { i18nService.get('hello', this.el, {noun: 'World'}) }                
                </div>
            </Host>
        )
    }
}