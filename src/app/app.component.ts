import { HttpClientModule } from '@angular/common/http';
import { Component, inject  } from '@angular/core';
import { RouterModule } from '@angular/router';
import { RewardComponent } from './pages/components/reward/reward.component';
import { CandiesService } from './services/candies.service';
import { ActivitiesService } from './services/activities.service';


@Component({
  standalone: true,
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css','../styles.css'],
  imports: [
    HttpClientModule,
    RouterModule,
    RewardComponent
  ]
})
export class AppComponent {
  title = 'red-star';
  public candiesService: CandiesService = inject(CandiesService)
  public activitiesService: ActivitiesService = inject(ActivitiesService)
  public showReward: boolean = false
  
  ngOnInit() {
    this.candiesService.getCandies()
    this.activitiesService.getActivities()
  }

  public setShowReward(value: boolean): void {
    this.showReward = value
  }
}
