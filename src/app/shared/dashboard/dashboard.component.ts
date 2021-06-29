import { HistoryService } from './../../service/history.service';
import { DosenService } from './../../service/dosen.service';
import { Subscription } from 'rxjs';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit, OnDestroy {


  s1: Subscription;
  s2: Subscription;
  dosenCount: number = 0;
  historyCount: number= 0;


  constructor(private router: Router, private dosenService: DosenService, private historyService: HistoryService) {
    this.s1 = this.dosenService.$listData.subscribe(list => {
      if(list) {
        this.dosenCount = list.length
      } else {
        this.dosenCount = 0
      }
    })

    this.s2 = this.historyService.$listData.subscribe(list => {
      this.historyCount = list ? list.length : 0
    })
  }

  ngOnInit(): void {}

  ngOnDestroy() : void {
    this.s1?.unsubscribe()
    this.s2?.unsubscribe()
  }

  openLink(route: string): void {
    this.router.navigate(['admin/' + route]);
  }
}
