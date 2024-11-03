import { inject, Injectable } from '@angular/core';
import { Candy } from '../interfaces/candy';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CandiesService {
  public candies: Candy[] = [];
  private http = inject(HttpClient);
  public apiUrl = 'http://localhost:3000/candies';

  public createCandy(form: FormGroup): void {
    const name = form.get('name')!.value;
    const quantity = form.get('quantity')!.value;
    this.createQuery(name, quantity).subscribe(
      (response) => console.log(response),
      (error) => console.log(error)
    );
  }
  private createQuery(name: string, quantity: number): Observable<any> {
    return this.http.post(this.apiUrl, {
      name: name,
      quantity: quantity,
    });
  }

  public getCandies() {
    let req = this.http!.get<Candy[]>(`${this.apiUrl}`);
    return req.subscribe(
      (data: Candy[]) => {
        this.candies = data;
      },
      (error) => console.error(error)
    );
  }
}
