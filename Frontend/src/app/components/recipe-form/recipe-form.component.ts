import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { RecipeService, Recipe } from '../../services/recipe.service';
import { forkJoin, Observable } from 'rxjs';

interface MealResult {
  id: string;
  name: string;
  image: string;
  ingredients: string[];
}

@Component({
  selector: 'app-recipe-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './recipe-form.component.html',
  styleUrls: ['./recipe-form.component.css']
})
export class RecipeFormComponent implements OnInit {

  recipe: Recipe = {
    title: '',
    ingredients: '',
    instructions: ''
  };

  isEdit = false;
  recipeId = '';

  ingredient = '';
  mealResults: MealResult[] = [];

  constructor(
    private recipeService: RecipeService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.recipeId = this.route.snapshot.params['id'];
    if (this.recipeId) {
      this.isEdit = true;
      this.recipeService.getRecipeById(this.recipeId).subscribe(data => {
        this.recipe = data;
      });
    }
  }

  submit() {
    if (this.isEdit) {
      this.recipeService.updateRecipe(this.recipeId, this.recipe)
        .subscribe(() => this.router.navigate(['/']));
    } else {
      this.recipeService.addRecipe(this.recipe)
        .subscribe(() => this.router.navigate(['/']));
    }
  }

  searchMealDB() {
    this.mealResults = [];
    if (!this.ingredient.trim()) return;

    this.recipeService.getRecipesByIngredient(this.ingredient)
      .subscribe((res: { meals: { idMeal: string; strMeal: string; strMealThumb: string; }[] }) => {
        const meals = res.meals || [];
        if (!meals.length) {
          this.mealResults = [];
          return;
        }

        const observables: Observable<any>[] = meals.map(meal =>
          this.recipeService.getMealById(meal.idMeal)
        );

        forkJoin(observables).subscribe(details => {
          this.mealResults = details.map(detail => {
            const fullMeal = detail.meals[0];
            return {
              id: fullMeal.idMeal,
              name: fullMeal.strMeal,
              image: fullMeal.strMealThumb,
              ingredients: this.getIngredients(fullMeal)
            };
          });
        });
      });
  }

  getIngredients(meal: any): string[] {
    const ingredients: string[] = [];
    for (let i = 1; i <= 20; i++) {
      const ingredient = meal[`strIngredient${i}`];
      const measure = meal[`strMeasure${i}`];
      if (ingredient && ingredient.trim()) {
        ingredients.push(`${ingredient} - ${measure}`);
      }
    }
    return ingredients;
  }

}
