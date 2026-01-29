import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';


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

  
  private recipes: Recipe[] = [];
  private nextId = 1;

  constructor() {
    
    this.loadFromStorage();
  }

 
  private loadFromStorage() {
    const saved = localStorage.getItem('recipes');
    if (saved) {
      this.recipes = JSON.parse(saved);
     
      if (this.recipes.length > 0) {
        const maxId = Math.max(...this.recipes.map(r => r.id));
        this.nextId = maxId + 1;
      }
    }
  }

  
  private saveToStorage() {
    localStorage.setItem('recipes', JSON.stringify(this.recipes));
  }

  
  getRecipes(): Observable<Recipe[]> {
    return of(this.recipes);
  }

  
  getRecipeById(id: number): Recipe | null {
    const recipe = this.recipes.find(r => r.id === id);
    return recipe || null;
  }

  
  addRecipe(recipe: Recipe): Observable<Recipe> {
    
    recipe.id = this.nextId++;
    recipe.createdAt = new Date();
    recipe.favorite = false;

   
    this.recipes.push(recipe);
    
   
    this.saveToStorage();
    
    return of(recipe);
  }

 
  updateRecipe(recipe: Recipe): Observable<Recipe> {
    const index = this.recipes.findIndex(r => r.id === recipe.id);
    
    if (index !== -1) {
      this.recipes[index] = recipe;
      this.saveToStorage();
    }
    
    return of(recipe);
  }

 
  deleteRecipe(id: number): Observable<boolean> {
    const index = this.recipes.findIndex(r => r.id === id);
    
    if (index !== -1) {
      this.recipes.splice(index, 1);
      this.saveToStorage();
      return of(true);
    }
    
    return of(false);
  }

  
  toggleFavorite(id: number): void {
    const recipe = this.recipes.find(r => r.id === id);
    if (recipe) {
      recipe.favorite = !recipe.favorite;
      this.saveToStorage();
    }
  }

  
  getFavoritesCount(): number {
    return this.recipes.filter(r => r.favorite).length;
  }

 
  getRecipesByIngredient(ingredient: string): Observable<any> {
   
    return of({ meals: [] });
  }

 
  getMealById(id: string): Observable<any> {
   
    return of({ meals: [] });
  }
}