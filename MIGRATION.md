# Frontend Migration Summary: Supabase → NestJS Backend

## Completed Changes

### 1. Environment Configuration
- **Updated `.env`**: Replaced Supabase credentials with NestJS backend URL (port 3000)
- **Updated `.env.example`**: Removed Supabase config, added NestJS backend URLs

### 2. Authentication System
- **Created `lib/auth.ts`**: New auth service with register, login, and token management
- **Updated `app/auth/login/page.tsx`**: Replaced Supabase auth with NestJS backend auth
- **Updated `middleware.ts`**: Replaced Supabase middleware with JWT token validation
- **Updated `app/auth/callback/route.ts`**: Handle Google OAuth tokens from NestJS

### 3. API Routes Migration
All API routes now use `API_URL` environment variable pointing to NestJS backend (port 3000):
- ✅ `app/api/analyzer/run-full/route.ts`
- ✅ `app/api/analyzer/job/[job_id]/status/route.ts`
- ✅ `app/api/analyzer/job/[job_id]/result/route.ts`
- ✅ `app/api/analyzer/snapshot/route.ts`
- ✅ `app/api/ideas/route.ts`
- ✅ `app/api/ideas/[id]/route.ts`

### 4. Documentation
- **Updated `README.md`**: Removed Supabase references, documented NestJS authentication

## Files to Remove (Optional Cleanup)
- `lib/supabase.ts` - No longer needed
- `app/auth/signin/page.tsx` - Duplicate of login page (uses NextAuth, not needed)

## Next Steps

1. **Remove Supabase dependencies** from `package.json`:
   ```bash
   npm uninstall @supabase/supabase-js @supabase/ssr
   ```

2. **Test authentication flow**:
   - Email/Password registration
   - Email/Password login
   - Google OAuth login
   - Token persistence
   - Protected route access

3. **Update Google OAuth callback URL** in NestJS backend:
   - Should redirect to: `http://localhost:3000/auth/callback?access_token=<token>`

4. **Configure CORS** in NestJS backend to allow frontend origin

## Authentication Flow

### Email/Password:
1. User submits credentials → `authService.login()` or `authService.register()`
2. Frontend calls NestJS `/auth/login` or `/auth/register`
3. Backend returns JWT token
4. Token stored in localStorage as `auth_token`
5. Middleware checks token on protected routes

### Google OAuth:
1. User clicks "Continue with Google"
2. Redirects to NestJS `/auth/google`
3. Google OAuth flow completes
4. NestJS redirects to `/auth/callback?access_token=<token>`
5. Callback route sets httpOnly cookie
6. User redirected to dashboard

## Environment Variables

```env
NEXT_PUBLIC_API_URL=http://localhost:3000
API_URL=http://localhost:3000
```

- `NEXT_PUBLIC_API_URL`: Used in client-side code
- `API_URL`: Used in server-side API routes
