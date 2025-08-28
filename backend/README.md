# Antventure Backend API 🐜

Welcome to the backend for the Antventure project API (aka trackR-app/backend), a robust API designed to manage user, goal, session, and progress data. This project uses a modern JavaScript stack with **Express.js**, **Prisma ORM**, **PostgreSQL**, and **Supabase** for a scalable and reliable foundation.

This API was developed as a collaborative effort btwn Elijah Reed contributing to the models +  routes for Sessions and Achievements table and bugfixing, and Niko Lewis handling all other aspects of the the APIs planning and build--with a focus on clean code, proper API design, and team-based development practices using AI-assisted workflows. Also special thanks to Jose for coming up with the adorable "Antventure" pun nickname for the app/ mascot. And thanks to both Jose and Wren for all the mentorships and support. 

---

## 🚀 Technologies Used

-   **Node.js & Express.js**: The core runtime and web framework for building the RESTful API.
-   **Prisma ORM**: A next-generation ORM for Node.js and TypeScript, used to interact with the database in a type-safe and efficient manner.
-   **PostgreSQL**: A powerful, open-source relational database used for data storage.
-   **CORS**: A Node.js middleware for enabling Cross-Origin Resource Sharing.
-   **Dotenv**: A module to load environment variables from a `.env` file.
-   **Supabase**: Utilized for a managed PostgreSQL database and authentication services.

---

## 🗺️ API Endpoints

The API provides a set of RESTful endpoints to manage the application's data. All endpoints are prefixed with `/api`.

### Achievement and Progress Endpoints 🎯

-   `POST /api/progress`: Logs a new progress entry for a goal.
-   `GET /api/achievements/:userId`: Fetches all achievements for a specific user.

### Goal Endpoints 🎯

-   `GET /api/goals`: Retrieves all goals.
-   `GET /api/goals/:id`: Retrieves a single goal by its ID.
-   `POST /api/goals`: Creates a new goal.
-   `PUT /api/goals/:id`: Updates an existing goal by its ID.
-   `DELETE /api/goals/:id`: Deletes a goal by its ID.


### Session Endpoints ⏱️

-   `GET /api/sessions`: Retrieves all study sessions.
-   `GET /api/sessions/:id`: Retrieves a single session by its ID.
-   `POST /api/sessions`: Creates a new study session.
-   `PUT /api/sessions/:id`: Updates an existing session.
-   `DELETE /api/sessions/:id`: Deletes a session.

### User Endpoints 👤

-   `GET /api/users`: Retrieves all users.
-   `GET /api/users/:id`: Retrieves a single user by their ID.
-   `POST /api/users`: Creates a new user.
-   `PUT /api/users/:id`: Updates an existing user.
-   `DELETE /api/users/:id`: Deletes a user.

### Authentication Endpoints (Supabase) 🔑

-   `POST /auth/signup`: Registers a new user with Supabase Auth.
-   `POST /auth/login`: Authenticates a user and returns a session token.

---

## 🛠️ Getting Started

Follow these steps to set up and run the project locally.

### Prerequisites

-   **Node.js**: Make sure you have Node.js installed on your machine.
-   **PostgreSQL Database**: You need a PostgreSQL database to connect to. The current setup uses Supabase, so you'll need to create a free project there.
-   **Supabase Account**: Sign up for a free Supabase account to get your database and API keys.

### Setup Instructions

1.  **Clone the Repository:**
    ```bash
    git clone [repository-url]
    cd trackR-app/backend
    ```

2.  **Install Dependencies:**
    ```bash
    npm install
    ```

3.  **Configure Environment Variables:**
    Create a `.env` file in the root directory and add your Supabase connection strings and keys.
    ```ini
    DATABASE_URL="postgresql://[user]:[password]@[host]:[port]/[database]"
    DIRECT_URL="postgresql://[user]:[password]@[host]:[port]/[database]"
    SUPABASE_URL="https://[project-ref].supabase.co"
    SUPABASE_ANON_KEY="[your-anon-key]"
    SUPABASE_SERVICE_ROLE_KEY="[your-service-role-key]"
    ```
    You can find these values in your Supabase project settings under "Database" and "API".

4.  **Initialize Prisma:**
    Once your `.env` file is configured, generate the Prisma client to match your database schema.
    ```bash
    npx prisma generate
    npx prisma migrate dev --name init
    ```
    This will generate the `PrismaClient` and apply the migrations to your database.

5.  **Run the Server:**
    ```bash
    npm start
    ```
    The server will start on port `8080`. You should see `Server running on http://localhost:8080` in your console.

---

## 🛡️ Singleton Pattern & Cleanup Functions

To prevent common "prepared statement already exists" errors and connection pool issues in development environments, the project implements a **singleton pattern** for the Prisma client. This ensures that only one instance of the Prisma client is created and reused across the application.

The file `src/lib/prisma.js` contains this logic:

-   A global variable `globalForPrisma` is used to store the single Prisma client instance.
-   On subsequent imports, the existing instance is returned instead of creating a new one.

To handle graceful shutdowns and prevent lingering database connections, the code also includes cleanup functions:

-   `process.on('SIGINT', ...)`: This handles **abrupt terminations** (e.g., `Ctrl+C`). It disconnects the Prisma client before the process exits.
-   `process.on('beforeExit', ...)`: This serves as a safety net for **graceful exits**, ensuring the client disconnects when the Node.js event loop is empty.

These measures are crucial for maintaining a healthy connection to the database, especially during development when the server is frequently restarted.

---

## 💡 Lessons Learned & Takeaways

### The Power of Teamwork and AI

This project was a fantastic learning experience, showcasing the benefits of a collaborative, AI-assisted development workflow. Key takeaways include:

-   **AI-Powered Project Management**: We used AI to help create a project plan, branching strategies, and detailed GitHub issues formatted in raw markdown. This streamlined our workflow and kept the team aligned on tasks and priorities.
-   **GitHub Projects Board**: Monitoring team progress with a GitHub Projects board provided a clear, visual overview of what was in progress, completed, and pending.
-   **Effective Team Roles**: **Elijah's** work on the **Progress** and **Achievements** models and routes seamlessly integrated with the core API. **Niko's** contribution, including the initial ER graphs and the detailed explanation of table relationships, and building out the core of the API provided a solid foundation for the entire project. 

### Technical Challenges & Solutions

-   **Prisma Connection Errors**: We encountered numerous  "prepared statement already exists" errors during development. Implementing the **Prisma singleton pattern** with cleanup functions was the key to solving this recurring issue.
-   **Database Relationships**: Creating the ER diagram and meticulously defining the relationships in `schema.prisma` was essential for ensuring data integrity and a well-structured database.

---

## 👨‍💻 Team Members

-   **Niko**: Responsible for the majority of the backend, including the core Express server setup, user and session models, routes, controllers, ER graphs, and the implementation of the Prisma singleton pattern and cleanup functions.
-   **Elijah**: Developed the models and routes for the **Progress** and **Achievements** features, adding crucial functionality for tracking user performance and milestones.
