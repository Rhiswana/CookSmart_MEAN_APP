import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { RecipeService, Recipe } from '../../services/recipe.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  totalRecipes = 0;
  thisWeek = 0;
  favoritesCount = 0;
  recentRecipes: Recipe[] = [];

  name = '';
  email = '';
  password = '';

  showLogin = false;
  showSignup = false;

  constructor(
    private recipeService: RecipeService,
    public auth: AuthService
  ) {}

  ngOnInit() {
    this.loadDashboardStats();
  }

  loadDashboardStats() {
    this.recipeService.getRecipes().subscribe(recipes => {
     
      this.totalRecipes = recipes.length;

     
      const today = new Date();
      this.thisWeek = recipes.filter(r => {
        if (!r.createdAt) return false;
        const recipeDate = new Date(r.createdAt);
        const diffTime = today.getTime() - recipeDate.getTime();
        const diffDays = diffTime / (1000 * 3600 * 24);
        return diffDays <= 7;
      }).length;

     
      this.favoritesCount = this.recipeService.getFavoritesCount();

      
      this.recentRecipes = recipes.slice(-3).reverse();
    });
  }

  login() {
    if (!this.email || !this.password) {
      alert('Please enter email and password');
      return;
    } 

    if (this.auth.login(this.email, this.password)) {
      this.showLogin = false;
      this.email = '';
      this.password = '';
      this.loadDashboardStats();
    } else {
      alert('Invalid email or password!');
    }
  }

  signup() {
    if (!this.name || !this.email || !this.password) {
      alert('Please fill all fields');
      return;
    }

    this.auth.signup({ 
      name: this.name, 
      email: this.email, 
      password: this.password 
    });

    this.showSignup = false;
    this.name = '';
    this.email = '';
    this.password = '';
    this.loadDashboardStats();
  }

  logout() {
    const confirmed = confirm('Are you sure you want to logout?');
    if (confirmed) {
      this.auth.logout();
      this.loadDashboardStats();
    }
  }

  closeLogin() {
    this.showLogin = false;
    this.email = '';
    this.password = '';
  }

  closeSignup() {
    this.showSignup = false;
    this.name = '';
    this.email = '';
    this.password = '';
  }
}