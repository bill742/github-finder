# Claude Development Guide

This document provides guidelines for working in this repository.

## Project Overview

**Tech Stack:** React 18 + TypeScript + Vite + React Router v7 + TanStack Query v5
**Styling:** Tailwind CSS v4 + Shadcn/UI
**Build Tool:** Vite 7.3.1
**Package Manager:** npm
**TypeScript:** Strict mode enabled

---

## Architecture

### State Management
TanStack Query v5 is used for all server state. There is no Context API or useReducer pattern for data fetching.

Custom hooks in `src/hooks/` wrap TanStack Query:
- `useSearchUsers(text, page)` — paginated user search (28 per page)
- `useUser(username)` — single user profile
- `useUserRepos(username)` — user's repositories (10 most recent)

QueryClient is configured in `App.tsx` with `retry: 1` and `staleTime: 5 minutes`.

### API Layer
All GitHub API calls live in `src/api/github.ts`. Functions are plain async functions consumed by the TanStack Query hooks — not called directly from components.

### Routing
React Router v7 via `react-router-dom`. Routes defined in `App.tsx`:
- `/` → Home (search)
- `/about` → About
- `/user/:login` → User profile
- `*` → NotFound

### UI Components
Shadcn/UI components live in `src/components/ui/` (Badge, Button, Card, Input). Use the `cn()` utility from `src/lib/utils.ts` (clsx + tailwind-merge) for conditional class names.

---

## Code Style

### Import Order
```typescript
// 1. External dependencies
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

// 2. Internal imports via path aliases
import { User } from '@types/user';
import { fetchUser } from '@api/github';

// 3. Relative imports (same module)
import UserItem from './UserItem';
```

### Path Aliases
- `@/*` → `./src/*`
- `@components/*` → `./src/components/*`
- `@hooks/*` → `./src/hooks/*`
- `@types/*` → `./src/types/*`
- `@api/*` → `./src/api/*`
- `@utils/*` → `./src/utils/*`
- `@context/*` → `./src/context/*` (legacy — avoid)

### TypeScript

- Use `type` for object shapes, unions, intersections
- Use `interface` for objects that may be extended
- Export types from `src/types/`
- No implicit `any`
- Nullable values: `Type | null` (not `Type | undefined`)
- Async functions must return `Promise<void>` or `Promise<Type>`

```typescript
// Good
export type User = {
  login: string;
  avatar_url: string;
  id: number;
};

const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
  e.preventDefault();
};
```

### React Components

- Functional components only
- Use `React.FC<PropsType>` for typing
- Use `<>` shorthand instead of `<Fragment>`
- Default export at end of file

```typescript
interface UserItemProps {
  user: User;
}

const UserItem: React.FC<UserItemProps> = ({ user }) => {
  return <>{user.login}</>;
};

export default UserItem;
```

### Naming Conventions

- **Files:** PascalCase for components (`UserItem.tsx`), camelCase for utilities (`githubReducer.ts`)
- **Components:** PascalCase
- **Functions/Variables:** camelCase
- **Types/Interfaces:** PascalCase
- **Constants:** UPPER_SNAKE_CASE
- **CSS Classes:** kebab-case

---

## Environment Variables

- Prefix with `VITE_` for client-side access
- Access via `import.meta.env.VITE_VARIABLE_NAME`
- Never commit `.env.local`
- GitHub API credentials: `VITE_GITHUB_CLIENT_ID`, `VITE_GITHUB_CLIENT_SECRET`

---

## Error Handling

- Avoid `console.log` in production code (ESLint warns)
- Use `console.warn()` and `console.error()` where appropriate
- Always use `try/catch` for async operations; type errors as `catch (error: unknown)`

---

## Common Pitfalls

1. **Don't use Context API for data fetching** — use TanStack Query hooks instead
2. **Use path aliases** — prefer `@types/user` over `../../types/user`
3. **No implicit `any`** — always type function parameters explicitly
4. **Prefix intentionally unused variables** with `_` (e.g., `_unusedVar`)
5. **Null checks** — always check nullable values before accessing properties

---

## Git Workflow

- Commit message format: descriptive present tense (e.g., `Add user profile component`)
- Run `npm run lint` before committing
- No force push to main/master
