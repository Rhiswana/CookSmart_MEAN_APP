import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  // Form fields
  email = '';
  password = '';
  
  // Loading state
  isLoading = false;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  // Login function
  login() {
    // Validate inputs
    if (!this.email || !this.password) {
      alert('Please enter email and password');
      return;
    }

    // Show loading
    this.isLoading = true;

    // Simulate loading delay (for better UX)
    setTimeout(() => {
      // Try to login
      if (this.authService.login(this.email, this.password)) {
        // Success - go to dashboard
        this.router.navigate(['/dashboard']);
      } else {
        // Failed - show error
        alert('Invalid email or password!');
        this.isLoading = false;
      }
    }, 500);
  }

  // Go to signup page
  goToSignup() {
    this.router.navigate(['/signup']);
  }
}