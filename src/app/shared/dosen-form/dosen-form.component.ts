import { DosenService } from './../../service/dosen.service';
import { DosenModel } from './../../model/dosen-model';
import { Component, Inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-dosen-form',
  templateUrl: './dosen-form.component.html',
  styleUrls: ['./dosen-form.component.scss'],
})
export class DosenFormComponent implements OnInit {
  form: FormGroup;

  /**
   * konstructor
   * @param fb
   * @param dialogRef
   * @param data
   */
  constructor(
    private fb: FormBuilder,
    private service: DosenService,
    public dialogRef: MatDialogRef<DosenFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.form = this.fb.group({
      kode: new FormControl('', [
        Validators.required,
        Validators.minLength(10),
        Validators.pattern('^[0-9]*$'),
        Validators.maxLength(10),
      ]),
      nama: new FormControl('', [Validators.required, Validators.minLength(3)]),
      nidn: new FormControl('', [Validators.required, Validators.minLength(8)]),
      alamat: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
      ]),
      nomorhp: new FormControl('', [
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(15),
        Validators.pattern('^[0-9]*$'),
      ]),
    });

    if (data) {
      this.form.patchValue(data);
    }
  }

  get kode(): FormControl {
    return this.form.get('kode') as FormControl;
  }
  get nama(): FormControl {
    return this.form.get('nama') as FormControl;
  }
  get nidn(): FormControl {
    return this.form.get('nidn') as FormControl;
  }
  get alamat(): FormControl {
    return this.form.get('alamat') as FormControl;
  }
  get nomorhp(): FormControl {
    return this.form.get('nomorhp') as FormControl;
  }

  ngOnInit(): void {}

  /**
   * submit form
   */
  async submitForm(): Promise<void> {
    this.form.markAllAsTouched();
    if (this.form.valid) {
      const model: DosenModel = this.form.value as DosenModel;
      try {
        if (this.data) {
          // edit
          model.id = this.data.id;
          await this.service.update(model);
        } else {
          // new
          await this.service.add(model);
        }
      } finally {
        this.dialogRef.close();
      }
    }
  }
}
