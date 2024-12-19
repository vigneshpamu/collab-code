import { authMiddleware } from '@clerk/nextjs/server'

export default authMiddleware({
  publicRoutes: (req) =>
    !req.url.includes('/dashboard') &&
    !req.url.includes('/code') &&
    !req.url.includes('/resume-dashboard') &&
    !req.url.includes('/leetcode') &&
    !req.url.includes('/my-resume') &&
    !req.url.includes('/problems:id'),
})

export const config = {
  matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
}
