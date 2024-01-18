# React Django Cookie Authentication Project

This project demonstrates a simple implementation of user authentication using React as the frontend framework and Django as the backend. Authentication is handled through cookie-based sessions.

## Features

- User registration
- User login
- User logout
- Protected routes (authenticated users only)
- Django backend with cookie-based authentication
- React frontend using functional components and hooks

## Getting Started

### Prerequisites

- Node.js and npm (for React)
- Python and pipenv (for Django)

### Installation

1. Clone the repository:

   ```
   git clone https://github.com/yourusername/react-django-cookie-auth.git
   cd react-django-cookie-auth
   ```
  1.Set up the Django backend:
  
    cd backend
    pipenv install
    pipenv shell
    python manage.py migrate
    python manage.py createsuperuser  # Create an admin user
    python manage.py runserver

  The Django backend should be running at http://localhost:8000/.

  2.Set up the React frontend:

    cd user_frontend
    npm install
    npm start

  The React frontend should be running at http://localhost:3000/.

### Usage
- Open your browser and navigate to http://localhost:3000/ to access the React app.
- Register a new user, log in, and explore the authenticated features.
  
