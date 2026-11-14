# EduLift - Education Creates Opportunities

EduLift is a full-stack educational crowdfunding platform designed to bridge the funding gap for students who have completed Grade 12 and wish to pursue higher education.

## 🚀 Features & Architecture

### 1. Frontend (Client-side)
* **Home (`index.html`)**: Overview of EduLift, mission, and quick links.
* **Student Portal (`student.html`)**: Dedicated portal for students with program eligibility, benefits, and the student registration form.
* **Donor Hub (`donors.html`)**: Student profiles showcase and donor sponsorship form.
* **Interactive Scripts (`script.js`)**: Real-time form validation, asynchronous backend API submission (`fetch`), and user feedback.
* **Styles (`style.css`)**: Responsive layout and consistent design.

### 2. Backend (Serverless API)
The project includes a serverless Node.js backend configured for **Vercel** and local environments:
* **`POST /api/register`**: Receives student applications, validates inputs, generates unique application IDs (`STU-<timestamp>`), and returns JSON confirmation.
* **`POST /api/donate`**: Receives donor pledges, validates primary and backup student choices, and returns JSON confirmation.
* **`GET /api/students`**: Returns active student profiles in JSON format.

## 🛠️ Deployment (Vercel & GitHub)
1. Push all files to a GitHub repository.
2. Import the repository in [Vercel](https://vercel.com).
3. Vercel automatically detects the static frontend and the `/api` serverless backend routes.

