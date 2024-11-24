import { HttpClientModule } from '@angular/common/http';
import { Component  } from '@angular/core';


@Component({
  standalone: true,
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css','../styles.css'],
  imports: [
    HttpClientModule,
  ]
})
export class AppComponent {
  title = 'sudoku';
}
