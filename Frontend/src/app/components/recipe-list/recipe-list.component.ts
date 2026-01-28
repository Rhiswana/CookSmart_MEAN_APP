import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecipeService, Recipe } from '../../services/recipe.service';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-recipe-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {

  recipes: Recipe[] = [];

  constructor(
    private recipeService: RecipeService,
    private router: Router
  ) {}

  ngOnInit() {
    this.loadRecipes();
  }

  loadRecipes() {
    this.recipeService.getRecipes().subscribe(data => {
      this.recipes = data;
    });
  }

  deleteRecipe(id: number) {
    // Ask for confirmation
    const confirmed = confirm('Are you sure you want to delete this recipe?');
    
    if (confirmed) {
      this.recipeService.deleteRecipe(id).subscribe(() => {
        this.loadRecipes(); // Reload the list
      });
    }
  }

  toggleFavorite(id: number) {
    this.recipeService.toggleFavorite(id);
    this.loadRecipes(); // Refresh to show star change
  }
}