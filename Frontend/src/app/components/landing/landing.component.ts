import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent {

  
  features = [
    {
      icon: '📋',
      title: 'Manage Recipes',
      description: 'Store and organize all your favorite recipes'
    },
    {
      icon: '❤️',
      title: 'Save Favorites',
      description: 'Mark your most loved recipes for quick access'
    },
    {
      icon: '🔍',
      title: 'Search MealDB',
      description: 'Discover new recipes from thousands of options'
    }
  ];

  constructor(private router: Router) {}

 
  goToLogin() {
    this.router.navigate(['/login']);
  }

  
  goToSignup() {
    this.router.navigate(['/signup']);
   }
}