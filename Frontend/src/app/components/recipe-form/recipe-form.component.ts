import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, RouterModule, Router } from '@angular/router';
import { RecipeService, Recipe } from '../../services/recipe.service';
import { HttpClient } from '@angular/common/http';

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
  ingredient: string = '';
  mealResults: any[] = [];
  isSearching = false;

  constructor(
    private recipeService: RecipeService,
    private route: ActivatedRoute,
    private router: Router,
    private http: HttpClient
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
  
    if (!this.recipe.title || !this.recipe.ingredients || !this.recipe.instructions) {
      alert('Please fill all fields!');
      return;
    }

    if (this.isEdit) {
     
      this.recipeService.updateRecipe(this.recipe).subscribe(() => {
        alert('Recipe updated successfully!');
        this.router.navigate(['/recipes']);
      });
    } else {
    
      this.recipeService.addRecipe(this.recipe).subscribe(() => {
        alert('Recipe added successfully!');
        this.router.navigate(['/recipes']);
      });
    }
  }

  searchMealDB() {
    // Validate input
    if (!this.ingredient.trim()) {
      alert('Please enter an ingredient');
      return;
    }

    this.isSearching = true;
    this.mealResults = [];

  
    const url = `https://www.themealdb.com/api/json/v1/1/filter.php?i=${this.ingredient.trim()}`;

    this.http.get(url).subscribe({
      next: (response: any) => {
        if (response.meals && response.meals.length > 0) {
          // Get full details for each meal
          this.loadMealDetails(response.meals);
        } else {
          alert('No recipes found for: ' + this.ingredient);
          this.isSearching = false;
        }
      },
      error: (error) => {
        console.error('Search error:', error);
        alert('Error searching recipes. Please try again.');
        this.isSearching = false;
      }
    });
  }


  loadMealDetails(meals: any[]) {
    const detailPromises = meals.slice(0, 5).map(meal => {
      const detailUrl = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${meal.idMeal}`;
      return this.http.get(detailUrl).toPromise();
    });

    Promise.all(detailPromises).then((results: any[]) => {
      this.mealResults = results.map(result => {
        const meal = result.meals[0];
        return {
          name: meal.strMeal,
          image: meal.strMealThumb,
          ingredients: this.extractIngredients(meal)
        };
      });
      this.isSearching = false;
    }).catch(error => {
      console.error('Error loading details:', error);
      this.isSearching = false;
    });
  }

 
  extractIngredients(meal: any): string[] {
    const ingredients = [];
    
    
    for (let i = 1; i <= 20; i++) {
      const ingredient = meal[`strIngredient${i}`];
      const measure = meal[`strMeasure${i}`];
      
      if (ingredient && ingredient.trim()) {
        ingredients.push(`${measure} ${ingredient}`.trim());
      }
    }
    
    return ingredients;
  }

  
  useMeal(meal: any) {
   
    this.recipe.title = meal.name;
    this.recipe.ingredients = meal.ingredients.join('\n');
    this.recipe.instructions = 'Add cooking instructions here';
    
    
    window.scrollTo({ top: 0, behavior: 'smooth' });
    
    alert('Recipe template added! Please add instructions.');
  }
}