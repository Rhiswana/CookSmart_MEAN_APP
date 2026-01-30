import { Routes } from '@angular/router';
import { LandingComponent } from './components/landing/landing.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { RecipeListComponent } from './components/recipe-list/recipe-list.component';
import { RecipeFormComponent } from './components/recipe-form/recipe-form.component';
//import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
 
  { path: '', component: LandingComponent },
 // { path: 'login', component: LoginComponent },
  //{ path: 'signup', component: SignupComponent },
  

  
  { 
    path: 'dashboard', 
    component: DashboardComponent,
    //canActivate: [authGuard]  
  },
  { 
    path: 'recipes', 
    component: RecipeListComponent,
    //canActivate: [authGuard] 
  },
  { 
    path: 'add', 
    component: RecipeFormComponent,
   // canActivate: [authGuard]  
  },
  { 
    path: 'edit/:id', 
    component: RecipeFormComponent,
    //canActivate: [authGuard]  
  },

  
  { path: '**', redirectTo: '' }
];