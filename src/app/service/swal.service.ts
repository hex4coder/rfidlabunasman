import { Injectable } from '@angular/core';

// sweetalert2
import Swal, {
  SweetAlertCustomClass,
  SweetAlertOptions,
  SweetAlertResult,
} from 'sweetalert2';

@Injectable({
  providedIn: 'root',
})
export class SwalService {
  // custom property
  private customStyle: SweetAlertCustomClass = {
    confirmButton: 'mat-raised-button mat-primary',
    cancelButton: 'mat-raised-button mat-accent',
  };
  private customConfig: SweetAlertOptions = {
    allowOutsideClick: false,
    showConfirmButton: true,
  };
  private toastConfig: SweetAlertOptions = {
    toast: true,
    position: 'top-right',
    timer: 1500,
    timerProgressBar: true,
    showConfirmButton: false,
  };
  private swalCustom = Swal.mixin({
    customClass: {
      confirmButton: 'mat-raised-button mat-primary',
      cancelButton: 'mat-raised-button mat-accent',
    },
    buttonsStyling: false,
  });

  // constructor service
  constructor() {}

  // untuk fungsi loading
  async loading(text: string): Promise<void> {
    // buat alert
    this.swalCustom.fire({
      ...this.customConfig,
      showConfirmButton: false,
      customClass: this.customStyle,
      icon: 'info',
      text: text,
      title: 'Loading',
    });
    // tampilkan alert
    this.swalCustom.showLoading();
  }

  // tutup dialog
  public close(): void {
    // close
    Swal.close();
  }

  // info
  async info(text: string, title?: string): Promise<void> {
    // buat alert
    await this.swalCustom.fire({
      ...this.customConfig,
      customClass: this.customStyle,
      icon: 'info',
      text: text,
      title: title ?? 'Info',
    });
  }

  // toast info
  async toastInfo(title: string, text: string): Promise<void> {
    // buat alert
    await this.swalCustom.fire({
      ...this.customConfig,
      customClass: this.customStyle,
      ...this.toastConfig,
      icon: 'info',
      text: text,
      title: title,
    });
  }

  // error
  async error(text: string, title?: string): Promise<void> {
    // buat alert
    await this.swalCustom.fire({
      ...this.customConfig,
      customClass: this.customStyle,
      icon: 'error',
      text: text,
      title: title ?? 'ERROR',
    });
  }

  // toast error
  async toasterror(title: string, text: string): Promise<void> {
    // buat alert
    await this.swalCustom.fire({
      ...this.customConfig,
      customClass: this.customStyle,
      ...this.toastConfig,
      icon: 'error',
      text: text,
      title: title,
    });
  }

  // success
  async success(text: string, title?: string): Promise<void> {
    // buat alert
    await this.swalCustom.fire({
      ...this.customConfig,
      customClass: this.customStyle,
      icon: 'success',
      text: text,
      title: title ?? 'Sukses',
    });
  }

  // toast success
  async toastsuccess(text: string, title?: string): Promise<void> {
    // buat alert
    await this.swalCustom.fire({
      ...this.customConfig,
      customClass: this.customStyle,
      ...this.toastConfig,
      icon: 'success',
      text: text,
      title: title ?? 'Sukses',
    });
  }

  // warning
  async warning(title: string, text: string): Promise<void> {
    // buat alert
    await this.swalCustom.fire({
      ...this.customConfig,
      customClass: this.customStyle,
      icon: 'warning',
      text: text,
      title: title,
    });
  }

  // toast warning
  async toastwarning(title: string, text: string): Promise<void> {
    // buat alert
    await this.swalCustom.fire({
      ...this.customConfig,
      customClass: this.customStyle,
      ...this.toastConfig,
      icon: 'warning',
      text: text,
      title: title,
    });
  }

  // question
  async question(title: string, text: string): Promise<SweetAlertResult> {
    // buat alert
    return await this.swalCustom.fire({
      ...this.customConfig,
      customClass: this.customStyle,
      icon: 'warning',
      text: text,
      title: title,
      showCancelButton: true,
      cancelButtonText: 'Tidak',
      cancelButtonColor: '$blue',
      confirmButtonText: 'Ya!',
      confirmButtonColor: '$yellow',
    });
  }

  // reject command
  async reject(title: string, text: string): Promise<SweetAlertResult> {
    return await this.swalCustom.fire({
      inputAttributes: {
        autocapitalize: 'off',
      },
      ...this.customConfig,
      customClass: this.customStyle,
      icon: 'warning',
      input: 'textarea',
      text: text,
      title: title,
      showCancelButton: true,
      cancelButtonText: 'Tidak',
      cancelButtonColor: '$blue',
      confirmButtonText: 'Tolak Permohonan Ini !',
      confirmButtonColor: '$yellow',
      showLoaderOnConfirm: true,
      preConfirm: (alasan) => {
        return alasan;
      },
      allowOutsideClick: () => !Swal.isLoading(),
    });
  }

  // inputText command
  async inputText(
    title: string,
    text: string,
    buttonText?: string
  ): Promise<SweetAlertResult> {
    return await this.swalCustom.fire({
      inputAttributes: {
        autocapitalize: 'off',
      },
      ...this.customConfig,
      customClass: this.customStyle,
      icon: 'warning',
      input: 'textarea',
      text: text,
      title: title,
      showCancelButton: true,
      cancelButtonText: 'Batal',
      cancelButtonColor: '$blue',
      confirmButtonText: buttonText ?? 'Ya',
      confirmButtonColor: '$yellow',
      showLoaderOnConfirm: true,
      preConfirm: (resultInput) => {
        return resultInput;
      },
      allowOutsideClick: () => !Swal.isLoading(),
    });
  }

  // success
  async showFoto(
    photoUrl: string,
    photoDescription: string,
    title?: string
  ): Promise<void> {
    // buat alert
    await this.swalCustom.fire({
      ...this.customConfig,
      customClass: this.customStyle,
      text: photoDescription,
      title: title ?? 'Foto',
      imageAlt: photoDescription,
      imageUrl: photoUrl,
      imageHeight: '90%',
    });
  }
}
