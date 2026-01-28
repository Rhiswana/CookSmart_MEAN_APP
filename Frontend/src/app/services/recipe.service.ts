import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

// Recipe Interface
export interface Recipe {
  id: number;
  title: string;
  ingredients: string;
  instructions: string;
  createdAt: Date;
  favorite: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class RecipeService {

  // Store recipes in memory (simple array)
  private recipes: Recipe[] = [];
  private nextId = 1;

  constructor() {
    // Load recipes from localStorage when service starts
    this.loadFromStorage();
  }

  // Load recipes from localStorage
  private loadFromStorage() {
    const saved = localStorage.getItem('recipes');
    if (saved) {
      this.recipes = JSON.parse(saved);
      // Find the highest ID to set nextId
      if (this.recipes.length > 0) {
        const maxId = Math.max(...this.recipes.map(r => r.id));
        this.nextId = maxId + 1;
      }
    }
  }

  // Save recipes to localStorage
  private saveToStorage() {
    localStorage.setItem('recipes', JSON.stringify(this.recipes));
  }

  // Get all recipes
  getRecipes(): Observable<Recipe[]> {
    return of(this.recipes);
  }

  // Get one recipe by ID
  getRecipeById(id: number): Recipe | null {
    const recipe = this.recipes.find(r => r.id === id);
    return recipe || null;
  }

  // Add new recipe
  addRecipe(recipe: Recipe): Observable<Recipe> {
    // Set ID and date
    recipe.id = this.nextId++;
    recipe.createdAt = new Date();
    recipe.favorite = false;

    // Add to array
    this.recipes.push(recipe);
    
    // Save to localStorage
    this.saveToStorage();
    
    return of(recipe);
  }

  // Update existing recipe
  updateRecipe(recipe: Recipe): Observable<Recipe> {
    const index = this.recipes.findIndex(r => r.id === recipe.id);
    
    if (index !== -1) {
      this.recipes[index] = recipe;
      this.saveToStorage();
    }
    
    return of(recipe);
  }

  // Delete recipe
  deleteRecipe(id: number): Observable<boolean> {
    const index = this.recipes.findIndex(r => r.id === id);
    
    if (index !== -1) {
      this.recipes.splice(index, 1);
      this.saveToStorage();
      return of(true);
    }
    
    return of(false);
  }

  // Toggle favorite
  toggleFavorite(id: number): void {
    const recipe = this.recipes.find(r => r.id === id);
    if (recipe) {
      recipe.favorite = !recipe.favorite;
      this.saveToStorage();
    }
  }

  // Get favorites count
  getFavoritesCount(): number {
    return this.recipes.filter(r => r.favorite).length;
  }

  // Search MealDB by ingredient
  getRecipesByIngredient(ingredient: string): Observable<any> {
    // This would call real API - keeping it simple for now
    return of({ meals: [] });
  }

  // Get meal details by ID
  getMealById(id: string): Observable<any> {
    // This would call real API - keeping it simple for now
    return of({ meals: [] });
  }
}