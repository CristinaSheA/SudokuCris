import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'wishlist',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WishlistComponent { 

}
