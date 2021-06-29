import { HistoryService } from './../../service/history.service';
import { HistoryModel } from './../../model/history-model';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss'],
})
export class HistoryComponent implements OnDestroy {
  // var's
  displayedColumns: string[] = ['position', 'nama', 'waktu', 'tipe'];
  dataSource!: MatTableDataSource<HistoryModel>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  // subs
  sub: Subscription;

  constructor(
    public service: HistoryService // service for dosen
  ) {
    // listen data dosen
    this.sub = this.service.$listData.subscribe((list) => {
      if (list) {
        this.dataSource = new MatTableDataSource<HistoryModel>(list);
      } else {
        this.dataSource = new MatTableDataSource<HistoryModel>([]);
      }
      this.dataSource.paginator = this.paginator;
    });
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }
}
