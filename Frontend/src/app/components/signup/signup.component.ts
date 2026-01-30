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

  
  name = '';
  email = '';
  password = '';
  confirmPassword = '';

  
  isLoading = false;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  
  signup() {
   
    if (!this.name || !this.email || !this.password || !this.confirmPassword) {
      alert('Please fill all fields');
      return;
    }

   
    if (this.password !== this.confirmPassword) {
      alert('Passwords do not match!');
      return;
    }

    
    if (this.password.length < 4) {
      alert('Password must be at least 4 characters');
      return;
    }

  
    this.isLoading = true;

    
    setTimeout(() => {
      
      this.authService.signup({
        name: this.name,
        email: this.email,
        password: this.password
      });

     
      alert('✅ Account created successfully! Please login.');

     
      this.router.navigate(['/login']);

      this.isLoading = false;
    }, 500);
  }

  
  goToLogin() {
    this.router.navigate(['/login']);
  }
}