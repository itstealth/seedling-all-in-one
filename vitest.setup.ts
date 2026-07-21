import React from 'react'

// Disable React.StrictMode for testing to prevent double-render
// Must be done before importing anything else that uses React
Object.defineProperty(React, 'StrictMode', {
  value: function StrictMode({ children }: { children: React.ReactNode }) {
    return children
  },
  writable: true,
  configurable: true
})

import '@testing-library/jest-dom/vitest'
