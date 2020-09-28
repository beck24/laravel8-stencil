/* eslint-disable */
/* tslint:disable */
/**
 * This is an autogenerated file created by the Stencil compiler.
 * It contains typing information for all components that exist in this project.
 */
import { HTMLStencilElement, JSXBase } from "@stencil/core/internal";
export namespace Components {
    interface AppHeader {
    }
    interface AppHome {
    }
    interface AppProfile {
        "name": string;
    }
    interface AppRoot {
    }
    interface FormForgotPassword {
    }
    interface FormLogin {
    }
    interface FormResetPassword {
        "token": string;
    }
    interface Page404 {
    }
    interface PageForgotPassword {
    }
    interface PageLogin {
    }
    interface PageResetPassword {
        "token": string;
    }
}
declare global {
    interface HTMLAppHeaderElement extends Components.AppHeader, HTMLStencilElement {
    }
    var HTMLAppHeaderElement: {
        prototype: HTMLAppHeaderElement;
        new (): HTMLAppHeaderElement;
    };
    interface HTMLAppHomeElement extends Components.AppHome, HTMLStencilElement {
    }
    var HTMLAppHomeElement: {
        prototype: HTMLAppHomeElement;
        new (): HTMLAppHomeElement;
    };
    interface HTMLAppProfileElement extends Components.AppProfile, HTMLStencilElement {
    }
    var HTMLAppProfileElement: {
        prototype: HTMLAppProfileElement;
        new (): HTMLAppProfileElement;
    };
    interface HTMLAppRootElement extends Components.AppRoot, HTMLStencilElement {
    }
    var HTMLAppRootElement: {
        prototype: HTMLAppRootElement;
        new (): HTMLAppRootElement;
    };
    interface HTMLFormForgotPasswordElement extends Components.FormForgotPassword, HTMLStencilElement {
    }
    var HTMLFormForgotPasswordElement: {
        prototype: HTMLFormForgotPasswordElement;
        new (): HTMLFormForgotPasswordElement;
    };
    interface HTMLFormLoginElement extends Components.FormLogin, HTMLStencilElement {
    }
    var HTMLFormLoginElement: {
        prototype: HTMLFormLoginElement;
        new (): HTMLFormLoginElement;
    };
    interface HTMLFormResetPasswordElement extends Components.FormResetPassword, HTMLStencilElement {
    }
    var HTMLFormResetPasswordElement: {
        prototype: HTMLFormResetPasswordElement;
        new (): HTMLFormResetPasswordElement;
    };
    interface HTMLPage404Element extends Components.Page404, HTMLStencilElement {
    }
    var HTMLPage404Element: {
        prototype: HTMLPage404Element;
        new (): HTMLPage404Element;
    };
    interface HTMLPageForgotPasswordElement extends Components.PageForgotPassword, HTMLStencilElement {
    }
    var HTMLPageForgotPasswordElement: {
        prototype: HTMLPageForgotPasswordElement;
        new (): HTMLPageForgotPasswordElement;
    };
    interface HTMLPageLoginElement extends Components.PageLogin, HTMLStencilElement {
    }
    var HTMLPageLoginElement: {
        prototype: HTMLPageLoginElement;
        new (): HTMLPageLoginElement;
    };
    interface HTMLPageResetPasswordElement extends Components.PageResetPassword, HTMLStencilElement {
    }
    var HTMLPageResetPasswordElement: {
        prototype: HTMLPageResetPasswordElement;
        new (): HTMLPageResetPasswordElement;
    };
    interface HTMLElementTagNameMap {
        "app-header": HTMLAppHeaderElement;
        "app-home": HTMLAppHomeElement;
        "app-profile": HTMLAppProfileElement;
        "app-root": HTMLAppRootElement;
        "form-forgot-password": HTMLFormForgotPasswordElement;
        "form-login": HTMLFormLoginElement;
        "form-reset-password": HTMLFormResetPasswordElement;
        "page-404": HTMLPage404Element;
        "page-forgot-password": HTMLPageForgotPasswordElement;
        "page-login": HTMLPageLoginElement;
        "page-reset-password": HTMLPageResetPasswordElement;
    }
}
declare namespace LocalJSX {
    interface AppHeader {
    }
    interface AppHome {
    }
    interface AppProfile {
        "name"?: string;
    }
    interface AppRoot {
    }
    interface FormForgotPassword {
    }
    interface FormLogin {
    }
    interface FormResetPassword {
        "token": string;
    }
    interface Page404 {
    }
    interface PageForgotPassword {
    }
    interface PageLogin {
    }
    interface PageResetPassword {
        "token"?: string;
    }
    interface IntrinsicElements {
        "app-header": AppHeader;
        "app-home": AppHome;
        "app-profile": AppProfile;
        "app-root": AppRoot;
        "form-forgot-password": FormForgotPassword;
        "form-login": FormLogin;
        "form-reset-password": FormResetPassword;
        "page-404": Page404;
        "page-forgot-password": PageForgotPassword;
        "page-login": PageLogin;
        "page-reset-password": PageResetPassword;
    }
}
export { LocalJSX as JSX };
declare module "@stencil/core" {
    export namespace JSX {
        interface IntrinsicElements {
            "app-header": LocalJSX.AppHeader & JSXBase.HTMLAttributes<HTMLAppHeaderElement>;
            "app-home": LocalJSX.AppHome & JSXBase.HTMLAttributes<HTMLAppHomeElement>;
            "app-profile": LocalJSX.AppProfile & JSXBase.HTMLAttributes<HTMLAppProfileElement>;
            "app-root": LocalJSX.AppRoot & JSXBase.HTMLAttributes<HTMLAppRootElement>;
            "form-forgot-password": LocalJSX.FormForgotPassword & JSXBase.HTMLAttributes<HTMLFormForgotPasswordElement>;
            "form-login": LocalJSX.FormLogin & JSXBase.HTMLAttributes<HTMLFormLoginElement>;
            "form-reset-password": LocalJSX.FormResetPassword & JSXBase.HTMLAttributes<HTMLFormResetPasswordElement>;
            "page-404": LocalJSX.Page404 & JSXBase.HTMLAttributes<HTMLPage404Element>;
            "page-forgot-password": LocalJSX.PageForgotPassword & JSXBase.HTMLAttributes<HTMLPageForgotPasswordElement>;
            "page-login": LocalJSX.PageLogin & JSXBase.HTMLAttributes<HTMLPageLoginElement>;
            "page-reset-password": LocalJSX.PageResetPassword & JSXBase.HTMLAttributes<HTMLPageResetPasswordElement>;
        }
    }
}
