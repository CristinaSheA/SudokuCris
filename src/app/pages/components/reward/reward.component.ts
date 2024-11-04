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
    return this.candiesService.getRandomCandy();
  }
  public get getRandomActivity(): any {
    return this.activitiesService.getRandomActivity();
  }
}
