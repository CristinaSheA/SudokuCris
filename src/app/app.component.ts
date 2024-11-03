import { HttpClientModule } from '@angular/common/http';
import { Component, inject  } from '@angular/core';
import { RouterModule } from '@angular/router';
import { routes } from './app.routes';
import { RewardComponent } from './pages/components/reward/reward.component';
import { CandiesService } from './services/candies.service';


@Component({
  standalone: true,
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css','../styles.css'],
  imports: [
    HttpClientModule,
    RouterModule,
    RewardComponent
  ]
})
export class AppComponent {
  title = 'red-star';
  public candiesService: CandiesService = inject(CandiesService)
  public showReward: boolean = false
  
  ngOnInit() {
    this.candiesService.getCandies()
  }
  public setShowReward(value: boolean) {
    this.showReward = value
  }
}
