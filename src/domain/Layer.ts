export interface AlertParams {
  title?: string;
  text: string;
  btnMessage?: string;
  finallyCallback?: (num: number | string) => void;
  btnCallback?: () => void | any;
  closeCallback?: () => void;
}

export interface ConfirmParams {
  title?: string;
  text: string;
  enterBtnMessage?: string;
  cancelBtnMessage?: string;
  finallyCallback?: (num: number | string) => void;
  enterBtnCallback?: () => void | any;
  cancelBtnCallback?: () => void;
}

export interface LoadingParams {
    message?: string;
    // time?: number | undefined;
  }

  export interface ToastParams {
    message?: string;
    time?: number | undefined;
  }

  declare module 'vue/types/vue' {
    interface Vue {
      $layer : { 
        alert: Function; 
        loading: Function;
        toast: Function;
        hide: Function;
        confirm: Function;
      }
    }
  }
