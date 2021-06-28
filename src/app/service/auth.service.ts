import { UserModel } from './../model/user-model';
import { distinctUntilChanged } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';
import { SwalService } from './swal.service';
import { Inject, Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { LOCAL_STORAGE, StorageService } from 'ngx-webstorage-service';
import { Router } from '@angular/router';
import { AngularFireDatabase } from '@angular/fire/database';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  // variabels
  private collection: string = 'users';
  // key that is used to access the data in local storage
  private STORAGE_KEY = 'rfid-lab-unasman';

  public currentUser: BehaviorSubject<UserModel | null> =
    new BehaviorSubject<UserModel | null>(null);

  // constructor service
  constructor(
    @Inject(LOCAL_STORAGE) private storage: StorageService,
    private dialog: SwalService,
    private auth: AngularFireAuth, // angular fire auth
    private fireDatabase: AngularFireDatabase, // firestore
    private router: Router // untuk redirect halaman
  ) {
    // subscribe router
    this.router.events.pipe(distinctUntilChanged()).subscribe((event: any) => {
      if (event['id'] == 1) {
        this.checkUser();
      }
    });
  }

  /**
   * mengecek dan redirect user jika sudah login
   * @returns void
   */
  async checkUser(): Promise<void> {
    if (this.isLoggedIn()) {
      // user sudah login, redirect user ke halaman dashboard
      this.currentUser.next(this.getUserModel());
      this.router.navigate(['admin/']);
    } else {
      // user belum login, redirect ke halaman login
      this.currentUser.next(null);
      await this.router.navigate(['login/']);
    }
  }

  /**
   * keluar dari sistem
   * @returns void
   */
  async logout(): Promise<void> {
    const prompt = await this.dialog.question(
      'LogOut',
      'Anda yakin ingin keluar dari sistem ?'
    );
    if (prompt.isConfirmed) {
      this.auth.signOut();
      this.clearStorage();
      this.checkUser();

      // pastikan tidak ada user
      this.currentUser.next(null);

      setTimeout(() => {
        this.router.navigate(['login/']);
        window.location.reload();
      }, 10);
    }
  }

  /**
   * fungsi untuk login / masuk kedalam sistem
   * @param username
   * @param password
   * @returns UserModel | undefined
   */
  async login(
    username: string,
    password: string
  ): Promise<UserModel | undefined> {
    // authentikasi data baru
    // loading progress
    this.dialog.loading('Autentikasi pengguna ...');
    // error handling
    try {
      // masuk ke sistem
      const id = await this.auth.signInWithEmailAndPassword(username, password);

      // cek user
      if (id.user) {
        // autentikasi berhasil
        const uID = id.user.uid;
        // ambil data pengguna
        const docSnapshot = await this.fireDatabase.database
          .ref('users/' + uID)
          .get();
        // parsing data
        if (docSnapshot.exists()) {
          // ambil model data
          const data = docSnapshot.toJSON();
          const model = { ...(data as UserModel), id: uID } as UserModel;
          // simpan data baru
          this.saveUserModel(model);
          // success
          await this.dialog.success('Autentikasi berhasil.');
          this.checkUser();
        }
      } else {
        // autentikasi gagal
        this.dialog.error(
          'Autentikasi gagal. Periksa email dan password anda !'
        );
      }
    } catch (error) {
      if (error.code == 'auth/user-not-found') {
        this.dialog.error(
          'Autentikasi gagal. Periksa email dan password anda !',
          'Access Denied'
        );
      } else {
        console.log('Terjadi kesalahan saat login : ' + error);
        this.dialog.error('Terjadi kesalahan saat login : ' + error);
      }
    }
    return;
  }

  // ----------------------------------- LOCAL STORAGE -----------------------------
  /**
   * simpan model baru ke localstorage
   * @param model
   */
  saveUserModel(model: UserModel): void {
    // hapus storage lama
    this.clearStorage();

    // simpan yang baru
    this.storage.set(this.STORAGE_KEY, model);
  }

  /**
   * bersihkan storage
   */
  clearStorage(): void {
    this.storage.remove(this.STORAGE_KEY);
    this.storage.clear();
  }

  /**
   * cek apakah user ada atau ndak ada
   * @returns boolean
   */
  isLoggedIn(): boolean {
    return this.storage.has(this.STORAGE_KEY);
  }

  /**
   * mengambil model yang tersimpan di-localstorage
   * @returns UserModel
   */
  getUserModel(): UserModel {
    const model = this.storage.get(this.STORAGE_KEY) as UserModel;
    return model;
  }

  /**
   * dapatkan data user berdasarkan id
   * @param id
   */
  async getUserByID(id: string): Promise<UserModel | null> {
    let user: UserModel | null = null;

    try {
      // ambil data pengguna
      const docSnapshot = await this.fireDatabase.database
        .ref('users/' + id)
        .get();
      // parsing data
      if (docSnapshot.exists()) {
        // ambil model data
        const data = docSnapshot.toJSON();
        const model = { ...(data as UserModel), id: id } as UserModel;
        user = model;
      }
    } catch (error) {
      console.log(error);
      this.dialog.error(
        'Terjadi kesalahan saat mengambil user berdasarkan id ' + error
      );
    }
    return user;
  }
}
