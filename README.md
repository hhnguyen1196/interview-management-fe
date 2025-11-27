# Interview Management – Frontend (Angular)

Frontend for the **Interview Management** system, built with **Angular** and styled with **Tailwind CSS**.  
This app consumes the Interview Management backend REST APIs and provides the UI for managing candidates, interviews, and related data.

---

## 1. Tech Stack

- **Runtime:** Node.js **20.12.x**
- **Framework:** Angular **18.2.21**
- **Package Manager:** npm (bundled with Node 20)
- **Styling:** Tailwind CSS
- **Build Tooling:** Angular CLI, TypeScript

---

## 2. Project Structure

```text
.
├── src
│   └── app
│       ├── core/          # Core module (layout, guards, interceptors, top-level services)
│       ├── environments/  # Environment configs (dev/prod base APIs, feature flags, etc.)
│       ├── features/      # Feature modules (interviews, candidates, auth, dashboards, ...)
│       ├── services/      # Reusable services (API clients, auth, notification, etc.)
│       ├── shared/        # Shared components, directives, pipes
│       ├── utils/         # Utility functions/helpers, models, constants
│       ├── app.component.*  # Root app component
│       ├── app.config.ts    # Standalone application configuration / providers
│       └── app.routes.ts    # Application routes
│
├── main.ts                 # Angular bootstrap file
├── styles.css              # Global styles (also hooks Tailwind)
├── angular.json            # Angular workspace configuration
├── tailwind.config.ts      # Tailwind configuration
```

--- 

## 3. Prerequisites

- Node.js 20.12.x
- npm 10+ (comes with Node 20)
- Angular CLI 18 (optional global install)

```bash
# Install Angular
npm install -g @angular/cli@18
```

### 4. Install dependencies & Run

From the project root:

```bash
#Install dependencies
npm install
```

```bash
#Run the Angular app
ng serve
```
---

> After the application run, open http://localhost:4200/ 
> 
> The application will automatically reload when you change any of the source files.

---
