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
  public dayNum = new Date().getDate();
  public todayInfo: any = null;
  public src: string = '';
  public yesterdayInfo: any = null;
  public yesterdaySrc: string = '';
  public showYesterday: boolean = true;
  public ripped: boolean = false;

  ngOnInit() {
    this.getDayImage();
    this.getYesterdayImage();
    console.log('fsaf');

    let daysRippedOffString = localStorage.getItem('daysRippedOff');
    if (daysRippedOffString) {
      let daysRippedOff: number[] = JSON.parse(daysRippedOffString);
      this.daysService.daysRippedOff = daysRippedOff;
    } else return;

    if (this.daysService.daysRippedOff.includes(this.dayNum)) {
      this.showYesterday = false;
    }
  }
  public ripOff(): void {
    if (this.daysService.daysRippedOff.includes(this.dayNum)) {
      this.showYesterday = false;
      return;
    }
    this.ripped = true;
    this.daysService.daysRippedOff.push(this.dayNum);
    localStorage.setItem(
      'daysRippedOff',
      JSON.stringify(this.daysService.daysRippedOff)
    );
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
  public weekDay(language: string, time: string): string | undefined {
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
        if (time === 'today') {
          day = engWeekday[d.getDay()];
        } else {
          d.setDate(d.getDate() - 1);
          day = engWeekday[d.getDay()];
        }
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
        if (time === 'today') {
          day = ruWeekday[d.getDay()];
        } else {
          d.setDate(d.getDate() - 1);
          day = ruWeekday[d.getDay()];
        }
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
      const today = days.find((day) => day.dayNum === this.dayNum);
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
  private getYesterdayImage(): void {
    this.daysService.getDays().subscribe((days: any[]) => {
      const yesterday = days.find((day) => day.dayNum === this.dayNum - 1);
      if (yesterday) {
        this.yesterdayInfo = yesterday;
        this.yesterdaySrc = `http://localhost:3000/static/${yesterday.image}`;
      } else {
        this.yesterdayInfo = null;
        this.yesterdaySrc = '';
        console.log('No se encontró el día correspondiente.');
      }
      this.cdr.detectChanges();
    });
  }
}
