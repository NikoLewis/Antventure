# Academic Ascent

# About
For our project, we were tasked with using an AI to help us develop our goal tracking application. Through this, we decide to create a web application called Academic Ascent!

Academic Ascent is a gamified goal-tracking web application designed for students and life-long learners. It's built to motivate users to stay on track with their studies and personal development goals by rewarding them with a unique achievement system.

# Team & Roles
- [Niko](https://github.com/NikoLewis) - Team Lead and Backend(Data Engineer)
- [Elijah](https://github.com/InfamousEli02) - Backend(Progress & Achievements Schema), Frontend(Login & Registration)
- [P](https://github.com/pauriany) - Frontend Dashboard Developer
- [Yasy](https://github.com/Yasjen7) - Gamification & Progress Developer

# Application Setup
## Prerequisites
Before you begin, make sure you have installed:
- Git
- Node.js & npm

## Cloning Repo
- Open your terminal or command prompt.
- Navigate to the directory where you want to store the project using the cd command.
- Run the following command, replacing "<repository-url>" with the actual URL of the Git repository: `git clone <repository-url>`
- Change into your new directory: `cd <project-directory-name`

From here, you would want to either cd into your frontend or backend, and then set up those(You can check their respective READMEs in their folders for further instructions)


# Goal Tracker Backend
Our backend was built using a Node.js server with Express.js. It connects to Supabase using our Prisma schema, and allows us to use Supabase for user authentication as well as a database.

For more information, check the README.md in the backend folder
# Goal Tracker Frontend
## Gamification
*Our goal tracking application features a comprehensive achievement system designed to motivate and reward user progress. Users can earn various badges by completing specific milestones and maintaining consistent study habits.*

## Achievement Badge Types
1. 🍪 First Goal Complete Badge (first_goal_complete)

* Design: Red ant holding a cookie
* Earning Condition: Awarded when a user successfully completes their very first goal
* Purpose: Celebrates the important milestone of getting started and building momentum

2. 💎 Study Master Badge (study_five_hours)

* Design: Red ant with a gemstone
* Earning Condition: Earned when a user completes a single 5-hour study session using the built-in timer
* Purpose: Recognizes dedication to extended focused study periods

3. 🥧 Daily Dynamo Badge (daily_dynamo_3_day)

* Design: Red ant lifting a giant cherry pie
* Earning Condition: Unlocked when a user maintains a 3-day consecutive study streak
* Purpose: Encourages consistent daily engagement and habit formation

## Dashboard Features
### The main dashboard provides users with:

1. Goal Checklist: Interactive list of active goals with daily check-in functionality
2. Quick Action Buttons:

* Start 3 Day Streak Challenge
* Begin 5 Hour Study Session
* Standard Study Timer with animations


3. Progress Chart: Visual representation of study hours and goal completion over time
4. Recent Badges Display: Shows latest earned achievements

## Achievements Page
### A dedicated achievements page displays:

* Complete collection of earned badges with earning dates
* Progress indicators for badges currently being worked toward
* Motivational messages for unearned achievements

## Gamification Benefits
### This system encourages users to:

* Establish consistent study habits through streak challenges
* Push personal limits with extended study sessions
* Experience the satisfaction of completing meaningful goals
* Build momentum through visual progress tracking and recognition


https://github.com/user-attachments/assets/8e13745b-2e63-449e-a1d0-30b10f68be85


