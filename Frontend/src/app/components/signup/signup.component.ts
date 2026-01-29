import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {

  // Form fields
  name = '';
  email = '';
  password = '';
  confirmPassword = '';

  // Loading state
  isLoading = false;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  // Signup function
  signup() {
    // Validate inputs
    if (!this.name || !this.email || !this.password || !this.confirmPassword) {
      alert('Please fill all fields');
      return;
    }

    // Check if passwords match
    if (this.password !== this.confirmPassword) {
      alert('Passwords do not match!');
      return;
    }

    // Check password length
    if (this.password.length < 4) {
      alert('Password must be at least 4 characters');
      return;
    }

    // Show loading
    this.isLoading = true;

    // Simulate loading delay
    setTimeout(() => {
      // Create account
      this.authService.signup({
        name: this.name,
        email: this.email,
        password: this.password
      });

      // Show success message
      alert('✅ Account created successfully! Please login.');

      // Redirect to login
      this.router.navigate(['/login']);

      this.isLoading = false;
    }, 500);
  }

  // Go to login page
  goToLogin() {
    this.router.navigate(['/login']);
  }
}