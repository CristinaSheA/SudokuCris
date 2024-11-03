import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'calendar',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CalendarComponent { 
  public year = new Date().getFullYear()
  public day = new Date().getDate()

  public month(language: string) {
    const d = new Date();
    let day;
    switch (language) {
      case 'eng':
        const engMonth = ["January","February","March","April","May","June","July","August","September","October","November","December"];
        day = engMonth[d.getMonth()];
        return day
    
      case 'ru':
        const ruMonth = ["Январь","Февраль","Март","Апрель","Май","Июнь","Июль","Август","Сентябрь","Октябрь","Ноябрь","Декабрь"];
        day = ruMonth[d.getMonth()];
        return day
    }
    return day
  }
  public weekDay(language: string) {
    const d = new Date();
    let day;
    switch (language) {
      case 'eng':
        const engWeekday = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
        day = engWeekday[d.getDay()];
        return day
    
      case 'ru':
        const ruWeekday = ["Воскресенье","Понедельник","Вторник","Среда","Четверг","Пятница","Суббота"];
        day = ruWeekday[d.getDay()];
        return day
    }
    return day
  }
  public daysToNewYear() {
    const today = new Date();
    const currentYear = today.getFullYear();
    const nextYear = new Date(currentYear + 1, 0, 0)
    const timeDifference = nextYear.getTime() - today.getTime();
    const daysRemaining = Math.ceil(timeDifference / (1000 * 3600 * 24));
    return daysRemaining
  }
}
