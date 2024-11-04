import { inject, Injectable } from '@angular/core';
import { Candy } from '../interfaces/candy';
import { HttpClient } from '@angular/common/http';
import { FormGroup } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';

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
  public getCandies(): Subscription {
    let req = this.http!.get<Candy[]>(`${this.apiUrl}`);
    return req.subscribe(
      (data: Candy[]) => {
        this.candies = data;
      },
      (error) => console.error(error)
    );
  }
  public getRandomCandy(): string | null {
    let candiesWithQuantity = this.candies.filter(
      (candy) => candy.quantity > 0
    );
    this.removeNoQuantityCandies();
    if (candiesWithQuantity.length > 0) {
      let randomIndex = Math.floor(Math.random() * candiesWithQuantity.length);
      const candyToReturn = candiesWithQuantity[randomIndex];
      this.minusQuantity(candyToReturn);
      return candyToReturn.name;
    } else {
      return null;
    }
  }
  private createQuery(name: string, quantity: number): Observable<any> {
    return this.http.post(this.apiUrl, {
      name: name,
      quantity: quantity,
    });
  }
  private minusQuantity(candy: Candy): void {
    candy.quantity = candy.quantity - 1;
    this.http.patch(`${this.apiUrl}/${candy.id}`, {
      quantity: candy.quantity,
    });
  }
  private removeNoQuantityCandies(): void {
    const candiesToRemove = this.candies.filter(
      (candy) => candy.quantity === 0
    );

    candiesToRemove.forEach((candy) => {
      this.http
        .delete(`${this.apiUrl}/${candy.id}`)
        .subscribe((error) => console.error(error));
    });
  }
}
