import { BehaviorSubject } from 'rxjs';
import { SwalService } from './swal.service';
import { AngularFireDatabase } from '@angular/fire/database';
import { Injectable, OnDestroy } from '@angular/core';
import { DosenModel } from '../model/dosen-model';

@Injectable({
  providedIn: 'root',
})
export class DosenService implements OnDestroy {
  /// var's
  private currentPath: string = 'dosen/';
  public $listData: BehaviorSubject<DosenModel[] | undefined> =
    new BehaviorSubject<DosenModel[] | undefined>(undefined);

  /**
   * lepaskan memory dan hentikan listen data
   */
  ngOnDestroy(): void {
    this.fireDatabase.database.ref(this.currentPath).off('value');
  }

  /**
   * konstructor
   * @param fireDatabase
   * @param dialog
   */
  constructor(
    private fireDatabase: AngularFireDatabase,
    private dialog: SwalService
  ) {
    // listen data changes
    this.fireDatabase.database
      .ref(this.currentPath)
      .on('value', (dataSnapshot) => {
        // log data
        const jsonData: Object | null = dataSnapshot.toJSON();
        const listData: DosenModel[] = [];
        if (jsonData != null) {
          const keys = Object.keys(jsonData as Object);

          keys.forEach((key) => {
            const item = (jsonData as any)[key] as DosenModel;
            item.id = key;
            console.log(item);
            listData.push(item);
          });

          this.$listData.next(listData);
        } else {
          this.$listData.next([]);
        }
      });
  }

  /**
   * tambahkan data dosen baru
   * @param model
   */
  async add(model: DosenModel): Promise<void> {
    // progress
    this.dialog.loading('Mengentri data baru ...');
    // handle proses
    try {
      // tambah model baru
      const databaseRef = this.fireDatabase.database
        .ref(this.currentPath)
        .push();
      await databaseRef.set(model);
      // success
      this.dialog.toastsuccess('Penambahan data berhasil');
    } catch (error) {
      console.log(error);
      await this.dialog.error(
        'Terjadi kesalahan saat entri data dosen : ' + error
      );
    }
  }

  /**
   * edit data dosen
   * @param model
   */
  async update(model: DosenModel): Promise<void> {
    // progress
    this.dialog.loading('Mengentri data baru ...');
    // handle proses
    try {
      // tambah model baru
      const id = model.id;
      delete model.id;
      const databaseRef = this.fireDatabase.database.ref(
        this.currentPath + '/' + id
      );
      await databaseRef.update(model);
      // success
      this.dialog.toastsuccess('Pembaruan data berhasil');
    } catch (error) {
      console.log(error);
      await this.dialog.error(
        'Terjadi kesalahan saat entri data dosen : ' + error
      );
    }
  }

  /**
   * hapus data dosen
   * @param model
   */
  async delete(model: DosenModel): Promise<void> {
    const y = await this.dialog.question(
      'Delete',
      'Anda yakin ingin menghapus data ini ?'
    );
    if (y.isConfirmed) {
      // progress
      this.dialog.loading('Menghapus data ...');
      // handle proses
      try {
        // tambah model baru
        const id = model.id;
        delete model.id;
        const databaseRef = this.fireDatabase.database.ref(
          this.currentPath + '/' + id
        );
        await databaseRef.remove();
        // success
        this.dialog.toastsuccess('Penghapusan data berhasil');
      } catch (error) {
        console.log(error);
        await this.dialog.error(
          'Terjadi kesalahan saat menghapus data dosen : ' + error
        );
      }
    }
  }
}
