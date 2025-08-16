````markdown
# Mini Seller Console (React + TypeScript + Vite + Tailwind CSS)

This project is a lightweight console application designed to help sales teams triage leads and convert them into opportunities. The application focuses on clear structure, quality code, and a smooth user experience, without relying on a real backend. It simulates data and latency using a local JSON file and `json-server`.

## Features (MVP)
1. **Leads List**
   - Loads leads from a local JSON file.
   - Fields: `id`, `name`, `company`, `email`, `source`, `score`, `status`.
   - Functionality: search by name or company, filter by status, sort by score (descending).

2. **Lead Detail Panel**
   - Click on a lead to open a slide-over panel.
   - Inline editing for `status` and `email` (with validation).
   - Save and cancel actions with basic error handling.

3. **Convert to Opportunity**
   - Button to convert a lead into an opportunity.
   - Opportunity includes: `id`, `name`, `stage`, `amount` (optional), `accountName`.
   - Opportunities displayed in a simple table.

4. **UX / States**
   - Loading, empty, and error states handled gracefully.
   - Smooth handling of approximately 100 leads.

### Optional Enhancements
- Persist filter and sort settings in `localStorage`.
- Optimistic UI updates with rollback on simulated failures.
- Responsive layout for desktop and mobile devices.

### Tech Stack
- React (Vite) + TypeScript
- Tailwind CSS for styling
- Local JSON file + `json-server` to simulate a backend
- No real backend required

## Getting Started

1. **Clone the repository**
```bash
git clone <repository-url>
````

2. **Install dependencies**

```bash
npm install
```

3. **Start the JSON server**

```bash
json-server --watch src/server/db.json --port 3001
```

4. **Run the development server**

```bash
npm run dev
```

After this, the app will be available at `http://localhost:5173`.
