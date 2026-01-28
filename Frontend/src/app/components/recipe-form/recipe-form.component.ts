import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, RouterModule, Router } from '@angular/router';
import { RecipeService, Recipe } from '../../services/recipe.service';

@Component({
  selector: 'app-recipe-form',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './recipe-form.component.html',
  styleUrls: ['./recipe-form.component.css']
})
export class RecipeFormComponent implements OnInit {

  recipe: Recipe = {
    id: 0,
    title: '',
    ingredients: '',
    instructions: '',
    createdAt: new Date(),
    favorite: false
  };

  isEdit = false;
  ingredient: string = '';   // User input for MealDB
  mealResults: any[] = [];   // MealDB results

  constructor(
    private recipeService: RecipeService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    const id = Number(this.route.snapshot.params['id']);
    if (id) {
      const found = this.recipeService.getRecipeById(id);
      if (found) {
        this.recipe = { ...found };
        this.isEdit = true;
      }
    }
  }

  submit() {
    if (this.isEdit) {
      this.recipeService.updateRecipe(this.recipe).subscribe(() => this.router.navigate(['/recipes']));
    } else {
      this.recipeService.addRecipe(this.recipe).subscribe(() => this.router.navigate(['/recipes']));
    }
  }

  searchMealDB() {
    if (!this.ingredient.trim()) return;

    this.recipeService.getMealById(this.ingredient.trim()).subscribe({
      next: (res: any) => this.mealResults = res?.meals || [],
      error: () => this.mealResults = []
    });
  }
}
