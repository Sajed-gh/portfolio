// utils/animations.js
// Small utility helpers for lightweight animation-related tasks.

export function throttle(fn, wait = 100) {
  let last = 0;
  return (...args) => {
    const now = Date.now();
    if (now - last >= wait) {
      last = now;
      fn(...args);
    }
  };
}

export function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

export default { throttle, clamp };
