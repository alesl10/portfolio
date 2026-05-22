'use client'

import { useRef, useState, useCallback } from 'react'

export function useResizable(minW = 260, minH = 100) {
  const [size, setSize] = useState<{ width?: number; height?: number }>({})
  const containerRef = useRef<HTMLDivElement>(null)
  const startRef = useRef({ mx: 0, my: 0, w: 0, h: 0 })

  const onResizeStart = useCallback((e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    const el = containerRef.current
    if (!el) return
    startRef.current = { mx: e.clientX, my: e.clientY, w: el.offsetWidth, h: el.offsetHeight }
    document.body.style.cursor = 'se-resize'
    document.body.style.userSelect = 'none'

    const onMove = (ev: MouseEvent) => {
      setSize({
        width: Math.max(minW, startRef.current.w + ev.clientX - startRef.current.mx),
        height: Math.max(minH, startRef.current.h + ev.clientY - startRef.current.my),
      })
    }
    const onUp = () => {
      document.body.style.cursor = ''
      document.body.style.userSelect = ''
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mouseup', onUp)
    }
    window.addEventListener('mousemove', onMove)
    window.addEventListener('mouseup', onUp)
  }, [minW, minH])

  const sizeStyle: React.CSSProperties = {
    ...(size.width  && { width:  size.width  }),
    ...(size.height && { height: size.height }),
  }

  return { containerRef, sizeStyle, onResizeStart, hasSize: !!size.height }
}
