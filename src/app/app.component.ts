import { HttpClientModule } from '@angular/common/http';
import { Component  } from '@angular/core';
import { RouterModule } from '@angular/router';
import { routes } from './app.routes';
import { RewardComponent } from './pages/components/reward/reward.component';


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
  
  public showReward: boolean = false
  public setShowReward(value: boolean) {
    this.showReward = value
  }
}
