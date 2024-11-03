import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'reward-creator',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './reward-creator.component.html',
  styleUrls: ['./reward-creator.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RewardCreatorComponent { }
