import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { RecipeService, Recipe } from '../../services/recipe.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  totalRecipes = 0;
  thisWeek = 0;
  favoritesCount = 0;
  recentRecipes: Recipe[] = [];

  constructor(
    private recipeService: RecipeService,
    public authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    this.loadDashboardStats();
  }

  loadDashboardStats() {
    this.recipeService.getRecipes().subscribe(recipes => {
      // Total recipes
      this.totalRecipes = recipes.length;

      // Calculate this week's recipes
      const today = new Date();
      this.thisWeek = recipes.filter(r => {
        if (!r.createdAt) return false;
        const recipeDate = new Date(r.createdAt);
        const diffTime = today.getTime() - recipeDate.getTime();
        const diffDays = diffTime / (1000 * 3600 * 24);
        return diffDays <= 7;
      }).length;

      // Get favorites count
      this.favoritesCount = this.recipeService.getFavoritesCount();

      // Get recent 3 recipes
      this.recentRecipes = recipes.slice(-3).reverse();
    });
  }

  logout() {
    const confirmed = confirm('Are you sure you want to logout?');
    if (confirmed) {
      this.authService.logout();
      this.router.navigate(['/login']);
    }
  }
}