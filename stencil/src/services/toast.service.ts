class ToastServiceInstance {
    success(message) {
      this.createToast(message, { color: 'success' });
    }
  
    error(message, options?) {
      let defaultOpts = { color: 'danger' };
      if (options) {
        defaultOpts = {...defaultOpts, ...options};
      }
  
      this.createToast(message, defaultOpts);
    }

    createToast(message, options: any = {}) {
      let defaultOpts = {
        duration: 5000
      }

      if (Object.keys(options).length) {
        defaultOpts = {...defaultOpts, ...options};
      }

      const toast = Object.assign(document.createElement('ion-toast'), defaultOpts);
      toast.message = message;

      document.body.appendChild(toast);
      return toast.present();
    }
}
  
export const ToastService = new ToastServiceInstance();