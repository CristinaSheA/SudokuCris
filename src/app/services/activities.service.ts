import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Activity } from '../interfaces/activity';

@Injectable({
  providedIn: 'root',
})
export class ActivitiesService {
  public apiUrl = 'http://localhost:3000/activities';
  private http = inject(HttpClient);
  public activities: Activity[] = [];

  public getActivities(): any {
    this.http!.get<Activity[]>(`${this.apiUrl}`).subscribe(
      (data: Activity[]) => {
        this.activities = data;
        console.log(this.activities);
      },
      (error) => console.error(error)
    );
  }
  public getRandomActivity(): any {
    console.log(this.activities);
    let randomIndex = Math.floor(Math.random() * this.activities.length);
    const activityToReturn = this.activities[randomIndex];
    console.log(activityToReturn.name);
    this.deleteActivity(activityToReturn);
    return activityToReturn.name;
  }
  private deleteActivity(activity: Activity): any {
    this.http
      .delete(`${this.apiUrl}/${activity.id}`)
      .subscribe((error) => console.error(error));
  }
}
