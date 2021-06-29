import { DosenFormComponent } from './../dosen-form/dosen-form.component';
import { Subscription } from 'rxjs';
import { DosenModel } from './../../model/dosen-model';
import { DosenService } from './../../service/dosen.service';
import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-dosen',
  templateUrl: './dosen.component.html',
  styleUrls: ['./dosen.component.scss'],
})
export class DosenComponent implements OnInit, OnDestroy {
  // var's
  displayedColumns: string[] = [
    'position',
    'nama',
    'nidn',
    'alamat',
    'nomorhp',
    'kode',
    'aksi'
  ];
  dataSource!: MatTableDataSource<DosenModel>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  // subs
  sub: Subscription;

  constructor(
    public dialogRef: MatDialog,
    public service: DosenService // service for dosen
  ) {
    // listen data dosen
    this.sub = this.service.$listData.subscribe((list) => {
      if (list) {
        this.dataSource = new MatTableDataSource<DosenModel>(list);
      } else {
        this.dataSource = new MatTableDataSource<DosenModel>([]);
      }
      this.dataSource.paginator = this.paginator;
    });
  }

  openForAdd(): void {
    this.dialogRef.open(DosenFormComponent, {});
  }

  openForEdit(model: DosenModel) : void {
    this.dialogRef.open(DosenFormComponent, {
      data: model
    });
  }

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }
}
