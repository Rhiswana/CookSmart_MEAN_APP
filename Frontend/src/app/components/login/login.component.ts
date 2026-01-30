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

  
  email = '';
  password = '';
  
  
  isLoading = false;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  
  login() {
   
    if (!this.email || !this.password) {
      alert('Please enter email and password');
      return;
    }

    
    this.isLoading = true;

    
    setTimeout(() => {
     
      if (this.authService.login(this.email, this.password)) {
        
        this.router.navigate(['/dashboard']);
      } else {
       
        alert('Invalid email or password!');
        this.isLoading = false;
      }
    }, 500);
  }

 
  goToSignup() {
    this.router.navigate(['/signup']);
  }
}