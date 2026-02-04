import { Injectable } from '@angular/core';

export interface User {
  name: string;
  email: string;
  password: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {

  users: User[] = JSON.parse(localStorage.getItem('users') || '[]');

  isLoggedIn: boolean = !!localStorage.getItem('currentUser');
  currentUser: User | null = JSON.parse(localStorage.getItem('currentUser') || 'null');

  constructor() {
    localStorage.setItem('users', JSON.stringify(this.users));
  }

  login(email: string, password: string): boolean {
    const user = this.users.find(u => u.email === email && u.password === password);
    if (user) {
      this.isLoggedIn = true;
      this.currentUser = user;
      localStorage.setItem('currentUser', JSON.stringify(user));
      return true;
    }
    return false;
  }

  signup(user: User) {
    if (!user.name || !user.email || !user.password) { alert('All fields required!'); return; }
    if (this.users.some(u => u.email === user.email)) { alert('Email exists!'); return; }
    this.users.push(user);
    localStorage.setItem('users', JSON.stringify(this.users));
    alert('Signup successful!');
  }

  logout() {
    this.isLoggedIn = false;
    this.currentUser = null;
    localStorage.removeItem('currentUser');
  }
}
