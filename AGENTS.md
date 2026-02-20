# Agent Development Guide

This document provides guidelines for AI coding agents working in this repository.

## Project Overview

**Tech Stack:** React 18 + TypeScript + Vite + React Router v7 + Context API  
**Build Tool:** Vite 7.3.1  
**Package Manager:** npm  
**TypeScript:** Strict mode enabled  

---

## Commands

### Development
```bash
npm run dev          # Start dev server on http://localhost:3000
npm run build        # TypeScript compile + Vite production build
npm run preview      # Preview production build locally
```

### Code Quality
```bash
npm run lint         # Run ESLint on all TypeScript files
npm run lint:fix     # Auto-fix ESLint issues
npm run format       # Format code with Prettier
npm run format:check # Check formatting without modifying files
```

### Testing
```bash
npm run test         # Run all tests with Vitest (watch mode)
npm run test run     # Run tests once (CI mode)
# Note: Test infrastructure is set up but tests are not yet written
```

### Type Checking
```bash
npx tsc --noEmit     # Type check without emitting files
```

---

## Code Style Guidelines

### Import Order & Organization
```typescript
// 1. External dependencies (React, libraries)
import { useReducer, useCallback, ReactNode } from 'react';
import axios from 'axios';

// 2. Internal absolute imports using path aliases
import { GithubContextType } from '@types/github';
import { User } from '@types/user';

// 3. Relative imports (same feature/module)
import GithubContext from './githubContext';
import GithubReducer from './githubReducer';
```

### Path Aliases (Preferred over relative imports)
- `@/*` → `./src/*`
- `@components/*` → `./src/components/*`
- `@context/*` → `./src/context/*`
- `@types/*` → `./src/types/*`
- `@hooks/*` → `./src/hooks/*`
- `@utils/*` → `./src/utils/*`
- `@api/*` → `./src/api/*`

### TypeScript Guidelines

#### Type Definitions
- **Use `type` for object shapes, unions, and intersections**
- **Use `interface` for objects that might be extended**
- Export types from centralized `src/types/` directory
- Always use explicit types; avoid implicit `any`

```typescript
// Good - Explicit types
export type User = {
  login: string;
  avatar_url: string;
  id: number;
};

export type GithubContextType = {
  users: User[];
  loading: boolean;
  searchUsers: (text: string) => Promise<void>;
};

// Bad - Implicit any
const handleClick = (e) => { /* ... */ };
```

#### Null Handling
- Use `Type | null` for nullable values (not `Type | undefined`)
- Check for null/undefined before accessing properties
- Optional properties use `?:` syntax

```typescript
// Good
user: User | null;
name?: string | null;

// Usage
if (user) {
  console.log(user.name);
}
```

#### Function Types
- Async functions must return `Promise<void>` or `Promise<Type>`
- Event handlers should have explicit parameter types
- Use arrow functions with explicit return types for complex logic

```typescript
// Good
const getUser = useCallback(async (username: string): Promise<void> => {
  // Implementation
}, []);

const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
  e.preventDefault();
};
```

### React Patterns

#### Components
- **Use functional components only** (no class components)
- **Use `React.FC<PropsType>` for component typing**
- Use `<>` shorthand instead of `<Fragment>`
- Export component as default at end of file

```typescript
interface UserItemProps {
  user: User;
}

const UserItem: React.FC<UserItemProps> = ({ user }) => {
  return (
    <>
      <h3>{user.login}</h3>
    </>
  );
};

export default UserItem;
```

#### Hooks
- **Always memoize Context functions with `useCallback`** to prevent infinite loops
- Include all dependencies in `useCallback` dependency arrays
- Use custom hooks pattern for Context: `useGithubContext()`, `useAlertContext()`
- Custom hooks must throw error if used outside provider

```typescript
// Creating a Context with custom hook
export const useGithubContext = () => {
  const context = useContext(GithubContext);
  if (context === undefined) {
    throw new Error('useGithubContext must be used within a GithubState provider');
  }
  return context;
};

// Using memoized callbacks in providers
const searchUsers = useCallback(async (text: string): Promise<void> => {
  dispatch({ type: SEARCH_USERS, payload: data });
}, []);
```

### Naming Conventions

- **Files:** PascalCase for components (`UserItem.tsx`), camelCase for utilities (`githubReducer.ts`)
- **Components:** PascalCase (`UserItem`, `GithubState`)
- **Functions/Variables:** camelCase (`searchUsers`, `setLoading`)
- **Types/Interfaces:** PascalCase (`User`, `GithubContextType`)
- **Constants:** UPPER_SNAKE_CASE (`SEARCH_USERS`, `SET_LOADING`)
- **CSS Classes:** kebab-case (`btn-primary`, `card-grid`)

### Formatting (Prettier)
- Single quotes for strings
- 2 space indentation
- No semicolons required (but used for consistency)
- Max line length: auto-determined

---

## Error Handling

### Console Usage
- **Avoid `console.log`** in production code (ESLint warns)
- Use `console.warn()` for warnings
- Use `console.error()` for errors

### Async/Await
- Always use `try/catch` for async operations (when adding error handling)
- Type caught errors explicitly: `catch (error: unknown)`

---

## Environment Variables

- Prefix with `VITE_` for client-side access
- Access via `import.meta.env.VITE_VARIABLE_NAME`
- Never commit `.env.local` files
- Example: `import.meta.env.VITE_GITHUB_CLIENT_ID`

---

## Common Pitfalls to Avoid

1. **Infinite loops in useEffect** - Always memoize Context functions with `useCallback`
2. **Using relative imports** - Prefer path aliases (`@types/user` not `../../types/user`)
3. **Implicit any types** - Always provide explicit types for function parameters
4. **Unused variables** - Prefix with `_` if intentionally unused: `_unusedVar`
5. **Missing dependency arrays** - ESLint will warn; either fix or disable with comment
6. **Forgotten null checks** - Check nullable values before accessing properties

---

## Git Workflow

- Commit message format: Descriptive present tense (e.g., "Add user profile component")
- No force push to main/master
- Run `npm run lint` before committing

---

## Current Architecture Notes

- **State Management:** Context API with useReducer pattern (Phase 3 will migrate to TanStack Query)
- **Routing:** React Router v7 with `useParams` for route parameters
- **API Calls:** Axios (will be wrapped in TanStack Query hooks in Phase 3)
- **Testing:** Infrastructure ready, tests not yet written (Phase 4-5)
