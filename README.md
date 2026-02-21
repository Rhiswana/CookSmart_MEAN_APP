# 🍳 CookSmart Recipe Manager

A modern, professional recipe management application built with Angular 19. Features a beautiful landing page, secure authentication, and full CRUD operations for managing your favorite recipes.

---

## ✨ Features

### 🏠 Landing Page
- Beautiful gradient hero section
- Feature cards showcasing app capabilities
- Professional welcome experience
- Responsive design

### 🔐 Authentication
- Separate login and signup pages
- Form validation
- Protected routes with auth guard
- Session management with localStorage

### 📊 Dashboard
- Statistics cards (Total recipes, This week, Favorites)
- Quick action buttons
- Recent recipes section
- Clean, professional UI

### 🍽️ Recipe Management
- Add new recipes
- Edit existing recipes
- Delete recipes
- Mark favorites with star icon
- View all recipes in grid layout

### 🔍 MealDB Integration
- Search recipes by ingredient
- View recipe details with images
- Auto-fill recipe form from MealDB

---

## 🚀 Quick Start

### Prerequisites
- Node.js (v18 or higher)
- Angular CLI (v19)

### Installation

1. **Clone or download the project**

2. **Install dependencies**
```bash
npm install
```

3. **Run the application**
```bash
ng serve
```

4. **Open your browser**
```
http://localhost:4200
```



## 🎯 User Flow

### First Time User
```
1. Open app → Landing Page
2. Click "Get Started" → Signup Page
3. Fill form → Create account
4. Redirect to Login
5. Login → Dashboard
6. Start adding recipes
```

### Returning User
```
1. Open app → Landing Page
2. Click "Login" → Login Page
3. Enter credentials
4. Dashboard → Manage recipes
```

---

## 🔑 Default Login Credentials

```
Email: admin@gmail.com
Password: 1234
```

---

## 🛠️ Setup Instructions

### Step 1: Create Folders

Create these new folders in your project:

```
src/app/components/landing/
src/app/components/login/
src/app/components/signup/
src/app/guards/
```

### Step 2: Copy Component Files

#### Landing Component
Copy these files to `src/app/components/landing/`:
- `landing.component.ts`
- `landing.component.html`
- `landing.component.css`

#### Login Component
Copy these files to `src/app/components/login/`:
- `login.component.ts`
- `login.component.html`
- `login.component.css`

#### Signup Component
Copy these files to `src/app/components/signup/`:
- `signup.component.ts`
- `signup.component.html`
- `signup.component.css`

#### Dashboard Component (Updated)
Replace these files in `src/app/components/dashboard/`:
- `dashboard.component.ts` (use dashboard-cleaned.component.ts)
- `dashboard.component.html` (use dashboard-cleaned.component.html)
- `dashboard.component.css` (use dashboard-cleaned.component.css)

### Step 3: Add Auth Guard

Copy this file to `src/app/guards/`:
- `auth.guard.ts`

### Step 4: Update Routes

Replace `src/app/app.routes.ts` with the new routes file

### Step 5: Run the App

```bash
ng serve
```

---

## 🎨 Color Scheme

```css
Primary: #667eea (Purple/Blue)
Success: #4CAF50 (Green)
Warning: #FF9800 (Orange)
Danger: #f44336 (Red)
Dark: #2c3e50 (Navy)
Background: #f5f5f5 (Light Gray)
```

---

## 📱 Routes

| Route | Component | Protected | Description |
|-------|-----------|-----------|-------------|
| `/` | Landing | ❌ No | Welcome page |
| `/login` | Login | ❌ No | User login |
| `/signup` | Signup | ❌ No | User registration |
| `/dashboard` | Dashboard | ✅ Yes | Main dashboard |
| `/recipes` | Recipe List | ✅ Yes | View all recipes |
| `/add` | Recipe Form | ✅ Yes | Add new recipe |
| `/edit/:id` | Recipe Form | ✅ Yes | Edit recipe |

---

## 🔒 Authentication

### How It Works

1. **Signup**: Creates new user in localStorage
2. **Login**: Validates credentials and stores current user
3. **Auth Guard**: Protects routes, redirects to login if not authenticated
4. **Logout**: Clears session and redirects to login

### Storage

All data is stored in browser's localStorage:
- `users` - Array of registered users
- `currentUser` - Currently logged in user
- `recipes` - Array of recipes

---

## 📊 Features Breakdown

### Landing Page
- Hero section with gradient background
- Feature cards with icons
- Call-to-action buttons
- Responsive layout

### Login/Signup
- Form validation
- Loading states
- Error messages
- Success feedback
- Back to home link

### Dashboard
- Statistics overview
- Quick action buttons
- Recent recipes display
- Welcome message for new users
- Logout functionality

### Recipe Management
- Create, Read, Update, Delete operations
- Favorite marking
- MealDB integration for recipe ideas
- Image support
- Ingredient and instruction fields

---

## 🧪 Testing

### Test Login Flow
1. Go to `/`
2. Click "Login"
3. Enter: `admin@gmail.com` / `1234`
4. Should redirect to `/dashboard`
5. Verify stats are displayed

### Test Signup Flow
1. Go to `/`
2. Click "Get Started"
3. Fill all fields
4. Click "Sign Up"
5. Should see success message
6. Should redirect to `/login`

### Test Protected Routes
1. Logout
2. Try to visit `/dashboard` directly
3. Should show alert
4. Should redirect to `/login`

### Test Recipe CRUD
1. Login first
2. Click "Add Recipe"
3. Fill form and save
4. Verify recipe appears in list
5. Edit and delete recipe

---

## 🐛 Troubleshooting

### Issue: "Cannot find module"
**Solution**: Make sure all folders are created and files are in correct locations

### Issue: Routes not working
**Solution**: Verify `app.routes.ts` is updated correctly

### Issue: Login not working
**Solution**: Check browser console for errors, verify `auth.service.ts` is presen

### Issue: Dashboard shows blank page
**Solution**: Make sure you replaced dashboard files with cleaned versions

### Issue: HttpClient error
**Solution**: Add `provideHttpClient()` in `app.config.ts`

---
