import { Component, h, Listen, State, Host } from '@stencil/core';
import { i18nService } from '../../services/i18n.service';

@Component({
    tag: 'language-test'
})
export class LanguageTest {
    @State() languageStrings = i18nService.strings;
    @State() locale: string = 'en';

    @Listen('localeUpdate', { target: 'body' })
    localeUpdated(e) {
        this.locale = e.detail;
    }

    render() {
        return (
            <Host data-lang={this.locale}>
                <div>
                    Language Test: { i18nService.get('language-test.hello', {noun: 'World'}) }<br /><br />

                    { i18nService.get('language-test.goodbye') }
                
                </div>
            </Host>
        )
    }
}