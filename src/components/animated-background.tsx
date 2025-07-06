import { useEffect, useState } from "react"

interface FloatingElement {
  id: number
  x: number
  y: number
  size: number
  duration: number
  delay: number
  type: "pokeball" | "circle" | "triangle"
}

export function AnimatedBackground() {
  const [elements, setElements] = useState<FloatingElement[]>([])

  useEffect(() => {
    const generateElements = () => {
      const newElements: FloatingElement[] = []
      const elementCount = 15

      for (let i = 0; i < elementCount; i++) {
        newElements.push({
          id: i,
          x: Math.random() * 100,
          y: Math.random() * 100,
          size: Math.random() * 60 + 20,
          duration: Math.random() * 20 + 15,
          delay: Math.random() * 5,
          type: ["pokeball", "circle", "triangle"][Math.floor(Math.random() * 3)] as "pokeball" | "circle" | "triangle",
        })
      }
      setElements(newElements)
    }

    generateElements()
  }, [])

  const renderElement = (element: FloatingElement) => {
    const baseClasses = "absolute opacity-10 animate-float"
    const style = {
      left: `${element.x}%`,
      top: `${element.y}%`,
      width: `${element.size}px`,
      height: `${element.size}px`,
      animationDuration: `${element.duration}s`,
      animationDelay: `${element.delay}s`,
    }

    switch (element.type) {
      case "pokeball":
        return (
          <div key={element.id} className={baseClasses} style={style}>
            <div className="w-full h-full rounded-full bg-gradient-to-b from-red-400 to-white border-4 border-gray-800 relative">
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-white rounded-full border-2 border-gray-800"></div>
              <div className="absolute top-1/2 left-0 right-0 h-1 bg-gray-800"></div>
            </div>
          </div>
        )
      case "circle":
        return (
          <div
            key={element.id}
            className={`${baseClasses} rounded-full bg-gradient-to-br from-blue-400 to-purple-500`}
            style={style}
          ></div>
        )
      case "triangle":
        return (
          <div key={element.id} className={baseClasses} style={style}>
            <div className="w-0 h-0 border-l-[30px] border-r-[30px] border-b-[52px] border-l-transparent border-r-transparent border-b-yellow-400 opacity-60"></div>
          </div>
        )
      default:
        return null
    }
  }

  return (
    <>
      {/* Gradiente animado de fondo */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-indigo-100 to-purple-100 animate-gradient-shift"></div>
        <div className="absolute inset-0 bg-gradient-to-tl from-pink-50 via-transparent to-cyan-50 animate-gradient-shift-reverse"></div>
      </div>

      {/* <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-indigo-100 to-purple-100"></div>
        <div className="absolute inset-0 bg-gradient-to-tl from-pink-50 via-transparent to-cyan-50"></div>
      </div> */}

      {/* Elementos flotantes */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">{elements.map(renderElement)}</div>

      {/* Efectos de luz */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
        <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-1/4 left-1/3 w-96 h-96 bg-pink-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>
    </>
  )
}
