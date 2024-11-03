import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Candy } from '../../../interfaces/candy';
import { CandiesService } from '../../../services/candies.service';

@Component({
  selector: 'reward',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './reward.component.html',
  styleUrls: ['./reward.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RewardComponent {
  private readonly candiesService = inject(CandiesService);
  private http = inject(HttpClient);

  public getRandomCandy(): any {
    let candiesWithQuantity = this.candiesService.candies.filter(
      (candy) => candy.quantity > 0
    );
    this.removeNoQuantityCandies()
    if (candiesWithQuantity.length > 0) {
      let randomIndex = Math.floor(Math.random() * candiesWithQuantity.length);
      const candyToReturn = candiesWithQuantity[randomIndex]
      this.minusQuantity(candyToReturn)
      return candyToReturn.name;
    } else {
      return null;
    }
  }
  private minusQuantity(candy: Candy) {
    candy.quantity = candy.quantity - 1
    this.http.patch(`${this.candiesService.apiUrl}/${candy.id}`, {
      quantity: candy.quantity,
    })
  }
  private removeNoQuantityCandies() {
    const candiesToRemove = this.candiesService.candies.filter(
      (candy) => candy.quantity === 0
    );
  
    candiesToRemove.forEach(candy => {
      this.http.delete(`${this.candiesService.apiUrl}/${candy.id}`)
        .subscribe(
          (error) => console.error(error)
        );
    });
  }
}
