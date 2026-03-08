# API Backend Integration Audit Report
**Generated:** ${new Date().toISOString()}
**Project:** IdeaPulse Frontend

## Executive Summary

This report identifies **CRITICAL ISSUES** with API endpoint configurations across the frontend application. Multiple inconsistencies in backend URL configurations have been found that will cause connection failures.

---

## 🔴 CRITICAL ISSUES FOUND

### 1. **Inconsistent Backend Port Configuration**
**Severity:** CRITICAL

Multiple files are configured to connect to different ports:

| File | Configured Port | Issue |
|------|----------------|-------|
| `.env` & `.env.example` | `3000` | ✅ Correct (per README) |
| `utils/api.ts` | `5000` (fallback) | ❌ WRONG - Should be 3000 |
| `app/api/ideas/route.ts` | `3001` (fallback) | ❌ WRONG - Should be 3000 |
| `app/api/analyzer/run-full/route.ts` | `3001` (fallback) | ❌ WRONG - Should be 3000 |
| `actions/create-idea/AiAction.ts` | Uses `AI_API_URL` (undefined) | ❌ WRONG - Should use NEXT_PUBLIC_API_URL |

**Impact:** API calls will fail when environment variables are not set, causing complete application failure.

---

### 2. **Hardcoded Backend URLs**
**Severity:** HIGH

The following files bypass environment variables and use hardcoded URLs:

| File | Line | Hardcoded URL | Issue |
|------|------|---------------|-------|
| `app/idea/[id]/page.tsx` | ~79 | `http://127.0.0.1:3000` | ❌ Should use env variable |

**Impact:** Deployment to production will fail as it will still try to connect to localhost.

---

### 3. **Missing Environment Variable**
**Severity:** MEDIUM

`actions/create-idea/AiAction.ts` uses `AI_API_URL` which is:
- ❌ Not defined in `.env` or `.env.example`
- ❌ Not documented in README.md
- ❌ Falls back to `https://localhost:3000` (HTTPS on localhost will fail)

---

## 📋 Complete API Endpoint Inventory

### Authentication APIs
| Endpoint | Frontend Location | Backend URL | Status |
|----------|------------------|-------------|--------|
| `POST /auth/register` | `lib/auth.ts:15` | `${API_URL}/auth/register` | ✅ Correct |
| `POST /auth/login` | `lib/auth.ts:28` | `${API_URL}/auth/login` | ✅ Correct |
| `GET /auth/google` | `app/auth/login/page.tsx:48` | `${NEXT_PUBLIC_API_URL}/auth/google` | ✅ Correct |

### Idea Management APIs
| Endpoint | Frontend Location | Backend URL | Status |
|----------|------------------|-------------|--------|
| `GET /api/ideas` | `app/api/ideas/route.ts:6` | `${API_URL}/api/ideas` | ⚠️ Port issue |
| `POST /api/ideas` | `app/api/ideas/route.ts:27` | `${API_URL}/api/ideas` | ⚠️ Port issue |
| `GET /ideas/:id` | `app/api/ideas/[id]/route.ts:11` | `${API_URL}/ideas/${id}` | ⚠️ Port issue |
| `POST /api/ideas` | `app/idea/[id]/page.tsx:79` | `http://127.0.0.1:3000/api/ideas` | ❌ Hardcoded |

### Idea Vault APIs
| Endpoint | Frontend Location | Backend URL | Status |
|----------|------------------|-------------|--------|
| `GET /idea-vault/ideas` | `app/idea-vault/page.tsx:35` | `${API_URL}/idea-vault/ideas` | ✅ Correct |
| `POST /idea-vault/ideas` | `app/create/page.tsx:127` | `${API_URL}/idea-vault/ideas` | ✅ Correct |

### Idea Studio APIs
| Endpoint | Frontend Location | Backend URL | Status |
|----------|------------------|-------------|--------|
| `POST /idea-studio/generate` | `app/create/page.tsx:67` | `${API_URL}/idea-studio/generate` | ✅ Correct |

### AI Analyzer APIs
| Endpoint | Frontend Location | Backend URL | Status |
|----------|------------------|-------------|--------|
| `POST /api/analyzer/run-full` | `app/api/analyzer/run-full/route.ts:9` | `${API_URL}/api/analyzer/run-full` | ⚠️ Port issue |
| `GET /api/analyzer/job/:id/status` | `app/analyzer/page.tsx:177` | `/api/analyzer/job/${jobId}/status` | ⚠️ Missing route file |
| `GET /api/analyzer/job/:id/result` | `utils/analyzer-client.ts:66` | `${baseUrl}/job/${jobId}/result` | ⚠️ Missing route file |
| `POST /api/analyzer/snapshot` | `app/api/analyzer/snapshot/route.ts:7` | `${API_URL}/api/analyzer/snapshot` | ✅ Correct |

### AI Tools APIs
| Endpoint | Frontend Location | Backend URL | Status |
|----------|------------------|-------------|--------|
| `POST /api/ai/idea-tools` | `actions/create-idea/AiAction.ts:20` | `${AI_API_URL}/api/ai/idea-tools` | ❌ Wrong env var |

---

## 🔧 REQUIRED FIXES

### Fix 1: Standardize Port Configuration
**Priority:** CRITICAL

Update the following files:

#### `utils/api.ts`
```typescript
// BEFORE:
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

// AFTER:
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';
```

#### `app/api/ideas/route.ts`
```typescript
// BEFORE:
const API_URL = process.env.API_URL || 'http://localhost:3001';

// AFTER:
const API_URL = process.env.API_URL || 'http://localhost:3000';
```

#### `app/api/analyzer/run-full/route.ts`
```typescript
// BEFORE:
const API_URL = process.env.API_URL || 'http://localhost:3001';

// AFTER:
const API_URL = process.env.API_URL || 'http://localhost:3000';
```

---

### Fix 2: Remove Hardcoded URLs
**Priority:** HIGH

#### `app/idea/[id]/page.tsx` (Line ~79)
```typescript
// BEFORE:
const response = await fetch('http://127.0.0.1:3000/api/ideas', {

// AFTER:
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';
const response = await fetch(`${API_URL}/api/ideas`, {
```

---

### Fix 3: Fix AI Action Environment Variable
**Priority:** MEDIUM

#### `actions/create-idea/AiAction.ts`
```typescript
// BEFORE:
const apiUrl = process.env.AI_API_URL || "https://localhost:3000";

// AFTER:
const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";
```

---

### Fix 4: Create Missing API Route Files
**Priority:** MEDIUM

The following API routes are called but don't have corresponding route files:

1. **`app/api/analyzer/job/[job_id]/status/route.ts`** - MISSING
2. **`app/api/analyzer/job/[job_id]/result/route.ts`** - MISSING

These need to be created to proxy requests to the backend.

---

## 📊 Environment Variables Summary

### Currently Defined (in .env)
```bash
NEXT_PUBLIC_API_URL=http://localhost:3000  # ✅ Client-side API calls
API_URL=http://localhost:3000              # ✅ Server-side API calls
```

### Missing/Undefined
```bash
AI_API_URL=                                # ❌ Used but not defined
```

### Recommendation
Remove `AI_API_URL` usage and use `NEXT_PUBLIC_API_URL` consistently.

---

## 🎯 Testing Checklist

After applying fixes, test the following:

- [ ] Authentication (Login/Register)
- [ ] Google OAuth redirect
- [ ] Fetch ideas from vault
- [ ] Create new idea
- [ ] Save idea to vault
- [ ] Generate AI content (Idea Studio)
- [ ] Start AI analysis
- [ ] Poll analysis progress
- [ ] View analysis results
- [ ] Save analysis snapshot
- [ ] Export idea as DOC

---

## 📝 Additional Recommendations

1. **Create a centralized API client**
   - Create `lib/api-client.ts` to handle all API calls
   - Centralize error handling and retry logic
   - Add request/response interceptors

2. **Add API health check**
   - Create `/api/health` endpoint
   - Check backend connectivity on app load
   - Display user-friendly error if backend is down

3. **Improve error messages**
   - Replace generic "Failed to fetch" with specific error messages
   - Add backend error details to user notifications

4. **Add request timeout handling**
   - Set reasonable timeouts for all fetch calls
   - Handle timeout errors gracefully

5. **Environment validation**
   - Add startup check to validate all required env vars are set
   - Fail fast with clear error message if misconfigured

---

## 🚀 Deployment Considerations

Before deploying to production:

1. ✅ Update `NEXT_PUBLIC_API_URL` to production backend URL
2. ✅ Update `API_URL` to production backend URL
3. ✅ Ensure no hardcoded localhost URLs remain
4. ✅ Test all API endpoints in staging environment
5. ✅ Configure CORS on backend for production domain
6. ✅ Set up proper SSL certificates
7. ✅ Configure authentication cookies for production domain

---

## Summary Statistics

- **Total API Endpoints Found:** 15
- **Correctly Configured:** 6 (40%)
- **Issues Found:** 9 (60%)
  - Critical: 3
  - High: 1
  - Medium: 5

**Overall Status:** ⚠️ **REQUIRES IMMEDIATE ATTENTION**

---

*End of Report*
