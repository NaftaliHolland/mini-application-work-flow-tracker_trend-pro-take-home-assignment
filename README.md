# Mini Application Workflow Tracker

This is a small application workflow tracker built as a take home assignment for the Junior-Mid Django/React Full-Stack Developer role.
Built with Django (backend) and React (frontend)

The application supports the following work flow
Draft -> Submitted -> Under Review -> Need More Information / Approved / Rejected

## Features

### Backend
- REST API built with Django Ninja
- Application workflow state management
- Tracking number generation
- Tests

### Frontend
- Application listing page
- Application Details page
- Create new application form
- Application detail page
- Status-based action buttons

## Tech Stack

### Backend

- Django
- Django Ninja

### Frontend

- React with Vite
- React Router
- ShadcnUi
- Tailwind CSS

## Project Setup 
### Clone the repository

```bash
git clone https://github.com/NaftaliHolland/mini-application-work-flow-tracker_trend-pro-take-home-assignment.git application-tracker
cd application-tracker 
```

## Backend Setup 

### 1. Navigate to backend directory

```bash
cd backend 
```
### 3. Create virtual environment

```bash
python -m venv venv
```

### 4. Activate virtual environment

```bash
source venv/bin/activate
```
### 5. Install dependencies

```bash
pip install -r requirements.txt
```

### 6. Run migrations and seed intial data

```bash
python manage.py makemigrations
python manage.py migrate
python manage.py seed
```
### 7. Start backend server

```bash
python manage.py runserver
```
Backend runs on:

```text
http://127.0.0.1:8000
```

## Frontend Setup 

### 1. Navigate to frontend directory

```bash
cd frontend
```

### 2. Install dependencies

```bash
npm install
```

### 3. Start frontend server

```bash
npm run dev
```

Frontend runs on:

```text
http://localhost:5173
```

## Assumptions made
- The system does not require Authentication and Authorization 
- System does not require comprehnsive testing at its current state
- The system will be run on localhost
- Localhost

## Improvements with more time
- Add authentication
- Write more comprehensive unit tests
- Better UI
- Add search, filter, and pagination

## Walkthrough Video

## Contact
Name: Holland Naftali Nyadimo  
Email: naftaliholland01@gmail.com
