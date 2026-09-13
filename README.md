# Study Buddy AI

An adaptive AI-powered study planning web application. Students register,
add subjects and tasks with deadlines and effort estimates, and the app
generates a personalised study plan that adjusts as tasks are completed.

This fork (by Komal Singh, s226497726) adds Docker containerisation for
Task 8.2HD.

## Running with Docker (Task 8.2HD)

This section documents how to build and run the entire application
(server + database) end-to-end using Docker. A marker following these
steps needs nothing else installed except Docker Desktop.

### Prerequisites
- Docker Desktop installed and running.

### Build and start the application
From the root of this repository, run:

```
docker compose up --build
```

This builds the app image and starts two containers: the Node/Express
application and its own MongoDB instance. Data persists across restarts
in a Docker-managed volume (`mongo-data`).

### Access the application
Once both containers are running, open:

```
http://localhost:3000
```

You can register a new account and log in — this exercises the
database-backed functionality (user registration and authentication),
both of which are fully implemented and connected to MongoDB.

### The /api/student endpoint
To verify this submission's identity, visit:

```
http://localhost:3000/api/student
```

This returns:

```json
{
  "name": "Komal Singh",
  "studentId": "226497726"
}
```

### Configuration and secrets
This project's only runtime secret is `SESSION_SECRET`, used to sign the
Express session cookie. It is not a database password or third-party API
key. The MongoDB instance is self-contained within this Docker Compose
stack (not exposed publicly, no external credentials required), so there
is no sensitive database connection string to protect.

A default `SESSION_SECRET` value is provided directly in
`docker-compose.yml` so the application runs with zero setup for marking
purposes. In a real production deployment, this value would instead be
injected via a secrets manager or CI/CD environment variable rather than
committed to the repository.

### Stopping the application
```
docker compose down
```

To also remove the persisted database volume:
```
docker compose down -v
```