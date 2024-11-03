import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'reward-creator',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './reward-creator.component.html',
  styleUrls: ['./reward-creator.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RewardCreatorComponent {
  public year = new Date().getFullYear();
  public day = new Date().getDate();
  public showSignImg1: boolean = false;
  public showSignImg2: boolean = false;

  public month() {
    const d = new Date();
    let day;
    const ruMonth = [
      'Январь',
      'Февраль',
      'Март',
      'Апрель',
      'Май',
      'Июнь',
      'Июль',
      'Август',
      'Сентябрь',
      'Октябрь',
      'Ноябрь',
      'Декабрь',
    ];
    day = ruMonth[d.getMonth()];
    return day;
  }
  public sign(value: boolean, img: number) {
    switch (img) {
      case 1:
        this.showSignImg1 = value
        break;
      case 2:
        this.showSignImg2 = value
        break;
    }
  }
}
