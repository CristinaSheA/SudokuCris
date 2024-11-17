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
import { ActivitiesService } from '../../services/activities.service';

@Component({
  selector: 'reward-creator',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './reward-creator.component.html',
  styleUrls: ['./reward-creator.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RewardCreatorComponent {
  private readonly candiesService: CandiesService = inject(CandiesService);
  private readonly activitiesService: ActivitiesService = inject(ActivitiesService);
  private readonly fb: FormBuilder = inject(FormBuilder);

  public year: number = new Date().getFullYear();
  public day: number = new Date().getDate();
  public showSignImg1: boolean = false;
  public showSignImg2: boolean = false;
  public candyForm: FormGroup = this.fb!.group({
    name: ['', [Validators.required, Validators.minLength(1)]],
    quantity: [0, [Validators.required, Validators.min(1)]],
  });

  public createCandy(): void {
    if (this.candyForm.invalid) {
      this.candyForm.markAllAsTouched;
      return;
    }
    this.candiesService!.createCandy(this.candyForm);
    this.candyForm.reset();
  }
  public month(): string {
    const d = new Date();
    let month;
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
    month = ruMonth[d.getMonth()];
    return month;
  }
  public sign(value: boolean, img: number): void {
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
