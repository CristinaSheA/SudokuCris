import { Routes } from '@angular/router';
import { CalendarComponent } from './pages/calendar/calendar.component';
import { RewardCreatorComponent } from './pages/reward-creator/reward-creator.component';
import { WishlistComponent } from './pages/wishlist/wishlist.component';


export const routes: Routes = [
  {
    path: 'calendar',
    component: CalendarComponent,
  },
  {
    path: 'reward-creator',
    component: RewardCreatorComponent,
  },
  {
    path: 'wishlist',
    component: WishlistComponent,
  },
  
  { path: '', redirectTo: '/calendar', pathMatch: 'full' },
  {
    path: '**',
    redirectTo: 'calendar',
  },
];
