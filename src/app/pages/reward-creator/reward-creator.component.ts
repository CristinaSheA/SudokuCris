import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CandiesService } from '../../services/candies.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Candy } from '../../interfaces/candy';

@Component({
  selector: 'reward-creator',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './reward-creator.component.html',
  styleUrls: ['./reward-creator.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RewardCreatorComponent {
  public year = new Date().getFullYear();
  public day = new Date().getDate();
  public showSignImg1: boolean = false;
  public showSignImg2: boolean = false;

  private readonly fb = inject(FormBuilder);
  private readonly candiesService = inject(CandiesService);
  private http = inject(HttpClient);

  public candyForm: FormGroup = this.fb!.group({
    name: ['', [Validators.required, Validators.minLength(1)]],
    quantity: [0, [Validators.required, Validators.min(1)]],
  });

  public createCandy() {
    if (this.candyForm.invalid) {
      this.candyForm.markAllAsTouched;
      return;
    }
    this.candiesService!.createCandy(this.candyForm);
    this.candyForm.reset();
  }
  public month() {
    const d = new Date();
    let day;
    const ruMonth = [
      'Январь',
      'Февраль',
      'Март',
      'Апрель',
      'Май',
      'Июнь',
      'Июль',
      'Август',
      'Сентябрь',
      'Октябрь',
      'Ноябрь',
      'Декабрь',
    ];
    day = ruMonth[d.getMonth()];
    return day;
  }
  public sign(value: boolean, img: number) {
    switch (img) {
      case 1:
        this.createCandy();
        this.showSignImg1 = value;
        break;
      case 2:
        this.showSignImg2 = value;
        break;
    }
  }
}
