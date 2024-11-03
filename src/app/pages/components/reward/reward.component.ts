import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'reward',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './reward.component.html',
  styleUrls: ['./reward.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RewardComponent { }
