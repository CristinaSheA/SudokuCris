import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  inject,
} from '@angular/core';
import { DaysService } from '../../services/days.service';

@Component({
  selector: 'calendar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CalendarComponent {
  private readonly daysService: DaysService = inject(DaysService);
  private readonly cdr: ChangeDetectorRef = inject(ChangeDetectorRef);

  public year = new Date().getFullYear();
  public day = new Date().getDate();
  public todayInfo: any = null;
  public src: string = '';

  ngOnInit() {
    this.getDayImage();
  }
  public month(language: string): string | undefined {
    const d = new Date();
    let month;
    switch (language) {
      case 'eng':
        const engMonth = [
          'January',
          'February',
          'March',
          'April',
          'May',
          'June',
          'July',
          'August',
          'September',
          'October',
          'November',
          'December',
        ];
        month = engMonth[d.getMonth()];
        return month;

      case 'ru':
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
        month = ruMonth[d.getMonth()];
        return month;
    }
    return month;
  }
  public weekDay(language: string): string | undefined {
    const d = new Date();
    let day;
    switch (language) {
      case 'eng':
        const engWeekday = [
          'Sunday',
          'Monday',
          'Tuesday',
          'Wednesday',
          'Thursday',
          'Friday',
          'Saturday',
        ];
        day = engWeekday[d.getDay()];
        return day;

      case 'ru':
        const ruWeekday = [
          'Воскресенье',
          'Понедельник',
          'Вторник',
          'Среда',
          'Четверг',
          'Пятница',
          'Суббота',
        ];
        day = ruWeekday[d.getDay()];
        return day;
    }
    return day;
  }
  public daysToNewYear(): number {
    const today = new Date();
    const currentYear = today.getFullYear();
    const nextYear = new Date(currentYear + 1, 0, 0);
    const timeDifference = nextYear.getTime() - today.getTime();
    const daysRemaining = Math.ceil(timeDifference / (1000 * 3600 * 24));
    return daysRemaining;
  }
  private getDayImage(): void {
    this.daysService.getDays().subscribe((days: any[]) => {
      const today = days.find((day) => day.dayNum === this.day);
      this.daysService.days = days;
      if (today) {
        this.todayInfo = today;
        this.src = `http://localhost:3000/static/${today.image}`;
      } else {
        this.todayInfo = null;
        this.src = '';
        console.log('No se encontró el día correspondiente.');
      }
      this.cdr.detectChanges();
    });
  }
}
