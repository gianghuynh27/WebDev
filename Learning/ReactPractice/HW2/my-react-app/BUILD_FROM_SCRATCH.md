# Build the Productivity Dashboard from Scratch

This repository now contains a complete skeleton app with components, hooks, pages, and type stubs.
Use this as your starting point to implement each feature step by step.

## Files purpose

- `src/App.tsx` — app shell and page navigation
- `src/main.tsx` — React entrypoint
- `src/index.css` — shared app styling
- `src/types/index.ts` — shared type definitions
- `src/hooks/` — reusable hook stubs
- `src/components/` — component stubs for each feature
- `src/pages/` — page shells for the four main sections

## Build plan

### 1. Start the project
- `npm run dev`
- Confirm the skeleton UI loads.

### 2. Implement hooks
- `src/hooks/useLocalStorage.ts`
- `src/hooks/useFetch.ts`
- `src/hooks/useDebounce.ts`
- `src/hooks/useToggle.ts`

### 3. Implement components
- `ThemeToggle.tsx`
- `LoadingError.tsx`
- `TodoList.tsx`
- `SearchWithDebounce.tsx`
- `UserProfileSearch.tsx`
- `Stopwatch.tsx`
- `CountdownTimer.tsx`
- `PomodoroTimer.tsx`
- `TaskTimerList.tsx`
- `StepInput.tsx`
- `FormReview.tsx`

### 4. Implement pages
- `Dashboard.tsx`
- `Timers.tsx`
- `Todos.tsx`
- `MultiStepForm.tsx`

### 5. Build incrementally
- Start with a small feature like `ThemeToggle`
- Then implement one timer component
- Then wire persistence in `TodoList`
- Finally complete the form

### 6. Use the app as the goal
The current skeleton shows the final app shape. Fill in each component and hook in the order above.
