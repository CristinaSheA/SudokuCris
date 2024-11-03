import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, inject } from '@angular/core';
import { Day } from '../../interfaces/day';
import { DaysService } from '../../services/days.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'calendar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CalendarComponent {
  public year = new Date().getFullYear();
  public day = new Date().getDate();
  private http = inject(HttpClient);

  currentDay: any = null;
  src: string = '';
  today: number;

  constructor(private daysService: DaysService, private cdr: ChangeDetectorRef) {
    this.today = new Date().getDate();
  }

  ngOnInit() {
    this.fsaf();
  }

  fsaf() {
    this.daysService.getDays().subscribe((days: any[]) => {
      this.daysService.days = days;

      const d = days.find(day => day.dayNum === this.today);
      if (d) {
        this.currentDay = d;
        this.src = `http://localhost:3000/static/${d.image}`;
        console.log('Imagen:', this.src);
      } else {
        this.currentDay = null;
        this.src = '';
        console.log('No se encontró el día correspondiente.');
      }
      // Forzar la detección de cambios
      this.cdr.detectChanges();
    });
  }
  public month(language: string) {
    const d = new Date();
    let day;
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
        day = engMonth[d.getMonth()];
        return day;

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
        day = ruMonth[d.getMonth()];
        return day;
    }
    return day;
  }
  public weekDay(language: string) {
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
  public daysToNewYear() {
    const today = new Date();
    const currentYear = today.getFullYear();
    const nextYear = new Date(currentYear + 1, 0, 0);
    const timeDifference = nextYear.getTime() - today.getTime();
    const daysRemaining = Math.ceil(timeDifference / (1000 * 3600 * 24));
    return daysRemaining;
  }
}
