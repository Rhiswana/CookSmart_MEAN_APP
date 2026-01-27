import { Routes } from '@angular/router';
import { RecipeListComponent } from './components/recipe-list/recipe-list.component';
import { RecipeFormComponent } from './components/recipe-form/recipe-form.component';

export const routes: Routes = [
  { path: '', component: RecipeListComponent },
  { path: 'add', component: RecipeFormComponent },
  { path: 'edit/:id', component: RecipeFormComponent }
];
