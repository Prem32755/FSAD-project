# HomeValue+

HomeValue+ is a full-stack platform focused on improving the value of Indian middle-class residential properties.
It helps users explore listings, view curated home-improvement ideas, and get personalized recommendations.
Admins can manage listings and recommendations from the dashboard.

## Project Structure

- Frontend: `HomeValue-main`
- Backend: `homevalue-backend`

## Frontend Stack

- Vite
- React
- TypeScript
- Tailwind CSS
- shadcn-ui

## Backend Stack

- Spring Boot
- Spring Web
- Spring Data JPA
- H2 embedded database

## Run the Backend

Open a terminal in `homevalue-backend` and run:

`mvn spring-boot:run`

The backend starts on:

`http://localhost:8080`

Useful backend URLs:

- API base: `http://localhost:8080/api`
- H2 console: `http://localhost:8080/h2-console`

H2 connection details:

- JDBC URL: `jdbc:h2:file:./data/homevalue`
- Username: `sa`
- Password: leave blank

## Run the Frontend

Open a terminal in `HomeValue-main` and run:

`npm install`

`npm run dev`

The frontend starts on:

`http://localhost:5173`

## Demo Accounts

- Admin: `admin@homevalueplus.com` / `admin123`
- User: `user@homevalueplus.com` / `user123`

## Main Features

- Public home page for browsing listings and enhancement ideas
- Personalized property assessment flow
- Admin dashboard for adding property listings
- Admin dashboard for adding curated recommendations
- Fallback demo data when the API is temporarily unavailable
