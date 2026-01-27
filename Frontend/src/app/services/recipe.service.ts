import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Recipe {
  _id?: string;
  title: string;
  ingredients: string;
  instructions: string;
  category?: string;
  prepTime?: number;
  servings?: number;
  image?: string;
  createdAt?: Date;
}

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  private apiUrl =
    'https://turbo-space-telegram-x5qwpj59wrpqhpj4p-5000.app.github.dev/api/recipes';
  private mealDbUrl =
    'https://www.themealdb.com/api/json/v1/1/filter.php?i=';

  constructor(private http: HttpClient) {}

  getRecipes(): Observable<Recipe[]> {
    return this.http.get<Recipe[]>(this.apiUrl);
  }

  getRecipeById(id: string): Observable<Recipe> {
    return this.http.get<Recipe>(`${this.apiUrl}/${id}`);
  }

  addRecipe(data: Recipe): Observable<Recipe> {
    return this.http.post<Recipe>(this.apiUrl, data);
  }

  updateRecipe(id: string, data: Recipe): Observable<Recipe> {
    return this.http.put<Recipe>(`${this.apiUrl}/${id}`, data);
  }

  deleteRecipe(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  
getRecipesByIngredient(ingredient: string): Observable<any> {
  return this.http.get(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`);
}

getMealById(id: string): Observable<any> {
  return this.http.get(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
}

}