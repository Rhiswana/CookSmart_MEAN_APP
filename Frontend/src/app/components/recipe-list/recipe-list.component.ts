import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { RecipeService } from '../../services/recipe.service';

@Component({
  selector: 'app-recipe-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './recipe-list.component.html',
  styleUrl: './recipe-list.component.css'
})
export class RecipeListComponent implements OnInit {

  recipes: any[] = [];

  constructor(private recipeService: RecipeService) {}

  ngOnInit() {
    this.loadRecipes();
  }

  loadRecipes() {
    this.recipeService.getRecipes().subscribe(data => {
      this.recipes = data;
    });
  }

  deleteRecipe(id: string) {
    if (confirm('Delete this recipe?')) {
      this.recipeService.deleteRecipe(id).subscribe(() => {
        this.loadRecipes();
      });
    }
  }
  
}
