import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  HostListener,
  inject,
} from '@angular/core';
import { SudokuService } from '../../services/sudoku.service';
import { Difficulty } from '../enums/difficulty.enum';
import { Subscription } from 'rxjs';

@Component({
  selector: 'sudoku-table',
  standalone: true,
  imports: [],
  templateUrl: './table.component.html',
  styleUrl: './table.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TableComponent {
  private readonly sudokuService: SudokuService = inject(SudokuService);
  private readonly cdr: ChangeDetectorRef = inject(ChangeDetectorRef);
  public table: any = this.sudokuService.table;
  private tableUpdatedSubscription!: Subscription;

  ngOnInit() {
    this.tableUpdatedSubscription = this.sudokuService.tableUpdated.subscribe(
      () => {
        this.refreshTable();
      }
    );
    this.sudokuService.generateSudoku(Difficulty.Easy);
  }
  ngOnDestroy() {
    this.tableUpdatedSubscription.unsubscribe();
  }

  public selectCell(row: number, col: number): void {
    this.sudokuService.selectedCell = { row, col };
  }
  public saveNewNumber(row: number, col: number, event: any): void {

    if (this.selectCell === null) return;
    const inputValue = event.target.value;
    if (inputValue === '') return;

    const parsedValue = parseInt(inputValue, 10);
    if (!this.sudokuService.canPlaceNumber(row, col, parsedValue)) {
      console.log('Cannot place number');
      this.sudokuService.mistakes += 1;
      return;
    }

    this.table[row][col] = parsedValue;

    const isComplete = this.table.every((row: number[]) =>
      row.every((cell) => cell !== 0)
    );

    if (isComplete) {
      this.sudokuService.completeSudoku();
    }

    this.cdr.markForCheck();
    this.sudokuService.selectedCell = null;
  }
  @HostListener('document:click', ['$event'])
  private onClick(event: MouseEvent): void {
    const inputElement = document.querySelector('input');
    if (inputElement && !inputElement.contains(event.target as Node)) {
      this.sudokuService.selectedCell = null;
      console.log('dsds');
    }
  }
  private refreshTable() {
    this.table = this.sudokuService.table;
  }
}
