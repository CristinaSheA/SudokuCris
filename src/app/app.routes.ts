import { Routes } from '@angular/router';
import { SudokuComponent } from './layout/pages/sudoku/sudoku.component';
import { InstructionsComponent } from './layout/pages/instructions/instructions.component';
import { AboutUsComponent } from './layout/pages/about-us/about-us.component';



export const routes: Routes = [
  {
    path: 'sudoku',
    component: SudokuComponent,
  },
  {
    path: 'instructions',
    component: InstructionsComponent,
  },
  {
    path: 'about-us',
    component: AboutUsComponent,
  },
  
  { path: '', redirectTo: '/sudoku/easy', pathMatch: 'full' },
  {
    path: '**',
    redirectTo: 'sudoku',
  },
];
