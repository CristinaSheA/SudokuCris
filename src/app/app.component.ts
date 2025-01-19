import { HttpClientModule } from '@angular/common/http';
import { Component  } from '@angular/core';
import { LayoutComponent } from './layout/layout.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';


@Component({
  standalone: true,
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css','../styles.css'],
  imports: [
    HttpClientModule,
    LayoutComponent,
    FormsModule,
    CommonModule
  ]
})
export class AppComponent {
  title = 'sudoku';
}
