'use client'

import { useRef, useState, useCallback } from 'react'

export function useDraggable() {
  const [offset, setOffset] = useState({ x: 0, y: 0 })
  const offsetRef = useRef({ x: 0, y: 0 })
  const startRef = useRef({ mouseX: 0, mouseY: 0, offsetX: 0, offsetY: 0 })

  const onMouseDown = useCallback((e: React.MouseEvent) => {
    e.preventDefault()
    startRef.current = {
      mouseX: e.clientX,
      mouseY: e.clientY,
      offsetX: offsetRef.current.x,
      offsetY: offsetRef.current.y,
    }
    document.body.style.cursor = 'grabbing'
    document.body.style.userSelect = 'none'

    const onMove = (ev: MouseEvent) => {
      const newOffset = {
        x: startRef.current.offsetX + ev.clientX - startRef.current.mouseX,
        y: startRef.current.offsetY + ev.clientY - startRef.current.mouseY,
      }
      offsetRef.current = newOffset
      setOffset(newOffset)
    }

    const onUp = () => {
      document.body.style.cursor = ''
      document.body.style.userSelect = ''
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mouseup', onUp)
    }

    window.addEventListener('mousemove', onMove)
    window.addEventListener('mouseup', onUp)
  }, [])

  const dragStyle = {
    transform: `translate(${offset.x}px, ${offset.y}px)`,
    position: 'relative' as const,
    zIndex: offset.x !== 0 || offset.y !== 0 ? 20 : undefined,
  }

  return { dragStyle, onMouseDown }
}
