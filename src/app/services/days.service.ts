import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Day } from '../interfaces/day';

@Injectable({
  providedIn: 'root',
})
export class DaysService {
  public apiUrl = 'http://localhost:3000/days';
  private http = inject(HttpClient);
  public days: Day[] = [];
  public openedDays: any[] = [];


  public getDays(): Observable<Day[]> {
    return this.http.get<Day[]>(`${this.apiUrl}`);
  }
}
