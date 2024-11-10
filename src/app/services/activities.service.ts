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
      },
      (error) => console.error(error)
    );
  }
  public getRandomActivity(): any {
    let randomIndex = Math.floor(Math.random() * this.activities.length);
    const activityToReturn = this.activities[randomIndex];
    // this.deleteActivity(activityToReturn);
    return activityToReturn.name;
  }
  private deleteActivity(activity: Activity): any {
    this.http
      .delete(`${this.apiUrl}/${activity.id}`)
      .subscribe((error) => console.error(error));
  }
}
