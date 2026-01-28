import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { RecipeService } from '../../services/recipe.service';
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
        const diff = (today.getTime() - new Date(r.createdAt).getTime()) / (1000 * 3600 * 24);
        return diff <= 7;
      }).length;

      this.favoritesCount = this.recipeService.getFavoritesCount();
    });
  }

  login() {
    if (this.auth.login(this.email, this.password)) {
      this.showLogin = false;
      this.loadDashboardStats();
    } else {
      alert('Invalid credentials');
    }
  }

  signup() {
    this.auth.signup({ name: this.name, email: this.email, password: this.password });
    this.showSignup = false;
    this.loadDashboardStats();
  }

  logout() {
    this.auth.logout();
    this.loadDashboardStats();
  }
}
