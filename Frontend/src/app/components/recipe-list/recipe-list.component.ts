import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecipeService, Recipe } from '../../services/recipe.service';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-recipe-list',
  standalone: true,
  imports: [CommonModule, RouterModule,FormsModule],
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {

  recipes: Recipe[] = [];
 searchTerm: string = '';
allRecipes: Recipe[] = [];

  constructor(
    private recipeService: RecipeService,
    private router: Router
  ) {}

  ngOnInit() {
    this.loadRecipes();
  }

  loadRecipes() {
    this.recipeService.getRecipes().subscribe(data => {
      this.allRecipes = data;
      this.recipes = data;
    });
  }
  searchRecipes() {
  if (!this.searchTerm.trim()) {
    this.recipes = this.allRecipes;
    return;
  }

  const term = this.searchTerm.toLowerCase();

  this.recipes = this.allRecipes.filter(recipe =>
    recipe.ingredients.toLowerCase().includes(term)
  );
}


  deleteRecipe(id: number) {
   
    const confirmed = confirm('Are you sure you want to delete this recipe?');
    
    if (confirmed) {
      this.recipeService.deleteRecipe(id).subscribe(() => {
        this.loadRecipes(); 
      });
    }
  }

  toggleFavorite(id: number) {
    this.recipeService.toggleFavorite(id);
    this.loadRecipes(); 
  }
}