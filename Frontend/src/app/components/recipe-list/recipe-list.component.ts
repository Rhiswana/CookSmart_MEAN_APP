import { Component, OnInit } from '@angular/core';
import { RecipeService, Recipe } from '../../services/recipe.service';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-recipe-list',
   standalone: true,           
  imports: [RouterModule], 
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {

  recipes: Recipe[] = [];

  constructor(private recipeService: RecipeService, private router: Router) {}

  ngOnInit() {
    this.loadRecipes();
  }

  loadRecipes() {
    this.recipeService.getRecipes().subscribe(data => this.recipes = data);
  }

  deleteRecipe(id: number) {
    this.recipeService.deleteRecipe(id).subscribe(() => this.loadRecipes());
  }
}
