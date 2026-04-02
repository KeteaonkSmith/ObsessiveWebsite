/**
 * Strip HTML tags and special characters to prevent XSS.
 * Always run user input through this before storing in state or displaying.
 */
export function sanitize(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;')
}

/** Basic RFC-compliant email validation */
export function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

/**
 * Rate-limit helper — returns true if the action is allowed.
 * Uses in-memory state only (never localStorage).
 * Limits contact form to 3 submissions per session.
 */
const _submissionCount = { count: 0 }
export function canSubmit() {
  if (_submissionCount.count >= 3) return false
  _submissionCount.count++
  return true
}
