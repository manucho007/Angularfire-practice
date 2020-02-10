import { PastLaunchesListGQL } from './../services/spacexGraphql.service';
import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { map } from 'rxjs/operators';
@Component({
  selector: 'app-launch-list',
  templateUrl: './launch-list.component.html',
  styleUrls: ['./launch-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LaunchListComponent implements OnInit {
  constructor(private pastLaunchesService: PastLaunchesListGQL) {}

  pastLaunches$ = this.pastLaunchesService
    // Please be care to not fetch too much, but this amount lets us see the img lazy loading in action
    .fetch({ limit: 30 })
    // Here we extract our query data
    // We can also get errors or loading state from res
    .pipe(map(res => res.data.launchesPast));

  ngOnInit() {}
}
