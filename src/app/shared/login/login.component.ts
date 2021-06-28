import { AuthService } from './../../service/auth.service';
import { SwalService } from './../../service/swal.service';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  // var's
  form: FormGroup;
  isLoading: boolean = false;

  /**
   * constructor
   */
  constructor(
    private fb: FormBuilder, // builder form
    private dialog: SwalService, // service dialog
    private authService: AuthService // autentikasi service
  ) {
    // init form
    this.form = this.fb.group({
      email: new FormControl('', [
        Validators.email,
        Validators.required,
        Validators.minLength(10),
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
      ]),
    });
  }

  ngOnInit(): void {
    this.form.patchValue({
      email: 'admin@gmail.com',
      password: 'admin123',
    });
  }

  get email(): FormControl {
    return this.form.get('email') as FormControl;
  }
  get password(): FormControl {
    return this.form.get('password') as FormControl;
  }

  /**
   * submit form
   */
  async submitForm(): Promise<void> {
    this.form.markAllAsTouched();
    if (this.form.valid) {
      // loading
      this.isLoading = true;

      // do login
      const value = this.form.value;
      const email = value.email;
      const password = value.password;

      // authentikasi login
      await this.authService.login(email, password);

      // not loading
      this.isLoading = false;
    }
  }
}
