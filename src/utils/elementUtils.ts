// Imports
import React from 'react'

// Render element or component by provided condition
export function renderIf(condition: boolean, renderFn: () => React.ReactNode) {
    return condition ? renderFn() : null
}