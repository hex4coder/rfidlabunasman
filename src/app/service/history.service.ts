import { HistoryModel } from './../model/history-model';
import { Injectable, OnDestroy } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HistoryService implements OnDestroy {
  /// var's
  private currentPath: string = 'history/';
  public $listData: BehaviorSubject<HistoryModel[] | undefined> =
    new BehaviorSubject<HistoryModel[] | undefined>(undefined);

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
  constructor(private fireDatabase: AngularFireDatabase) {
    // listen data changes
    this.fireDatabase.database
      .ref(this.currentPath)
      .on('value', (dataSnapshot) => {
        // log data
        const jsonData: Object | null = dataSnapshot.toJSON();
        const listData: HistoryModel[] = [];
        if (jsonData != null) {
          const keys = Object.keys(jsonData as Object);

          keys.forEach((key) => {
            const item = (jsonData as any)[key] as HistoryModel;
            item.id = key;
            listData.push(item);
          });

          this.$listData.next(listData);
        } else {
          this.$listData.next([]);
        }
      });
  }
}
