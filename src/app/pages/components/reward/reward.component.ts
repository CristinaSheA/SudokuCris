import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CandiesService } from '../../../services/candies.service';
import { ActivitiesService } from '../../../services/activities.service';

@Component({
  selector: 'reward',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './reward.component.html',
  styleUrls: ['./reward.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RewardComponent {
  private readonly candiesService = inject(CandiesService);
  private readonly activitiesService = inject(ActivitiesService);

  public get getRandomCandy(): any {
    if (this.candiesService.getRandomCandy()) {
      return this.candiesService.getRandomCandy();
    } else {
      return 'no candies available';
    }
  }
  public get getRandomActivity(): any {
    if (this.weekDay() === 'Saturday') {
      return this.activitiesService.getRandomActivity();
    } else {
      return 'no activity today';
    }
  }
  public weekDay(): string | undefined {
    const d = new Date();
    let day;
    const weekday = [
      'Sunday',
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
    ];
    day = weekday[d.getDay()];
    return day;
  }
}
