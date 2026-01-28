import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';

// ✅ Recipe interface
export interface Recipe {
  id: number;
  title: string;
  ingredients: string;
  instructions: string;
  createdAt: Date;
  favorite?: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class RecipeService {

  private key = 'recipes'; // localStorage key

  constructor(private http: HttpClient) {} // ✅ HttpClient injected

  // ✅ Get all recipes from localStorage
  getRecipes(): Observable<Recipe[]> {
    const recipes: Recipe[] = JSON.parse(localStorage.getItem(this.key) || '[]');
    return of(recipes);
  }

  // ✅ Get a single recipe by ID
  getRecipeById(id: number): Recipe | undefined {
    const recipes: Recipe[] = JSON.parse(localStorage.getItem(this.key) || '[]');
    return recipes.find(r => r.id === id);
  }

  // ✅ Add a new recipe
  addRecipe(recipe: Recipe): Observable<void> {
    const recipes: Recipe[] = JSON.parse(localStorage.getItem(this.key) || '[]');
    recipe.id = Date.now();           // generate unique ID
    recipe.createdAt = new Date();    // timestamp
    recipe.favorite = recipe.favorite || false;
    recipes.push(recipe);
    localStorage.setItem(this.key, JSON.stringify(recipes));
    return of(); // return empty observable
  }

  // ✅ Update an existing recipe
  updateRecipe(updated: Recipe): Observable<void> {
    const recipes: Recipe[] = JSON.parse(localStorage.getItem(this.key) || '[]');
    const updatedRecipes = recipes.map(r => r.id === updated.id ? updated : r);
    localStorage.setItem(this.key, JSON.stringify(updatedRecipes));
    return of();
  }

  // ✅ Delete a recipe by ID
  deleteRecipe(id: number): Observable<void> {
    const recipes: Recipe[] = JSON.parse(localStorage.getItem(this.key) || '[]');
    const filtered = recipes.filter(r => r.id !== id);
    localStorage.setItem(this.key, JSON.stringify(filtered));
    return of();
  }

  // ✅ Count favorite recipes
  getFavoritesCount(): number {
    const recipes: Recipe[] = JSON.parse(localStorage.getItem(this.key) || '[]');
    return recipes.filter(r => r.favorite === true).length;
  }

  // ✅ Search meals from TheMealDB API
  getMealById(ingredient: string): Observable<any> {
    if (!ingredient) return of([]); // empty search fallback
    const url = `https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`;
    return this.http.get(url); // HttpClient handles GET
  }
}
