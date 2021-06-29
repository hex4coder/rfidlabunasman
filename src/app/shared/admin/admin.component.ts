import { UserModel } from './../../model/user-model';
import { AuthService } from './../../service/auth.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

// interface for menu
interface IMenu {
  text: string;
  icon: string;
  link: string;
  description: string;
}

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
})
export class AdminComponent implements OnInit, OnDestroy {
  // menu links
  links: IMenu[];
  currentLink: IMenu;

  // auth
  sub: Subscription;
  currentUser: UserModel = new UserModel();

  constructor(public authService: AuthService) {
    // listen current user
    this.sub = this.authService.currentUser.subscribe((user) => {
      if (user) this.currentUser = user;
    });

    // buat menu
    this.links = [
      {
        icon: 'dashboard_rounded',
        link: 'dashboard/',
        text: 'Dashboard',
        description: 'Selamat datang di Dashboard RFID Lab Unasman',
      },
      {
        icon: 'groups_rounded',
        link: 'dosen/',
        text: 'Data Dosen',
        description:
          'Silahkan melakukan manajemen data dosen yang menggunakan LAB',
      },
      {
        icon: 'bar_chart_rounded',
        link: 'history/',
        text: 'History',
        description: 'Berisi riwayat histori penggunaan LAB Unasman',
      },
    ];

    this.currentLink = this.links[0];
  }

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }

  /**
   * set current menu
   * @param link
   */
  updateCurrentLink(link: IMenu): void {
    this.currentLink = link;
  }
}
