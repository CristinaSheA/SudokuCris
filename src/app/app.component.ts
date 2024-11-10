import { HttpClientModule } from '@angular/common/http';
import { Component, inject  } from '@angular/core';
import { RouterModule } from '@angular/router';
import { RewardComponent } from './pages/components/reward/reward.component';
import { CandiesService } from './services/candies.service';
import { ActivitiesService } from './services/activities.service';
import { DaysService } from './services/days.service';


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
  public daysService: DaysService = inject(DaysService)
  public showReward: boolean = false
  
  ngOnInit() {
    this.candiesService.getCandies()
    this.activitiesService.getActivities()

    let openedDaysString = localStorage.getItem('openedDays');
    if (openedDaysString) {
      let openedDays: number[] = JSON.parse(openedDaysString);
      this.daysService.openedDays = openedDays
    } else return
    this.showCandyOption()
  }
  public setShowReward(value: boolean): void {
    this.showReward = value
    if (value === false) {
      const today = new Date().getDate()
      this.daysService.openedDays.push(today)
      localStorage.setItem('openedDays', JSON.stringify(this.daysService.openedDays));
    }
  }
  public showCandyOption() {
    const today = new Date().getDate()
    if (this.daysService.openedDays.includes(today)) return false
    return true
  }

}
