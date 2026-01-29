import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

// Simple guard function to protect routes
export const authGuard = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  // Check if user is logged in
  if (authService.isLoggedIn) {
    // User is logged in - allow access
    return true;
  } else {
    // User is NOT logged in - redirect to login
    alert('Please login first!');
    router.navigate(['/login']);
    return false;
  }
};