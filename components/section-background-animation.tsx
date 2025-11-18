"use client"

export function SectionBackgroundAnimation() {
  return (
    <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
      {/* Animated Gradient Waves */}
      <div className="absolute inset-0 opacity-20">
        <div
          className="absolute w-full h-full animate-wave-flow"
          style={{
            background: `
              linear-gradient(90deg, 
                rgba(5, 150, 105, 0.15) 0%, 
                transparent 25%, 
                rgba(234, 88, 12, 0.15) 50%, 
                transparent 75%, 
                rgba(5, 150, 105, 0.15) 100%
              )
            `,
          }}
        />
        <div
          className="absolute w-full h-full animate-wave-flow-reverse"
          style={{
            background: `
              linear-gradient(180deg, 
                rgba(5, 150, 105, 0.1) 0%, 
                transparent 30%, 
                rgba(234, 88, 12, 0.1) 60%, 
                transparent 100%
              )
            `,
          }}
        />
      </div>

      {/* Floating Geometric Shapes */}
      {[0, 1, 2].map((index) => {
        const colors = ['#059669', '#ea580c', '#059669'] // Green, Orange, Green
        const color = colors[index]
        const floatAnimations = ['float0', 'float1', 'float2']
        const rotateAnimations = ['rotateFloat0', 'rotateFloat1', 'rotateFloat2']
        const hexAnimations = ['hexFloat0', 'hexFloat1', 'hexFloat2']
        const floatDurations = [15, 17, 19]
        const rotateDurations = [18, 21, 24]
        const hexDurations = [20, 22, 24]

        return (
          <div key={index}>
            {/* Circles */}
            <div
              className="absolute rounded-full opacity-20 blur-xl"
              style={{
                width: `${200 + index * 50}px`,
                height: `${200 + index * 50}px`,
                backgroundColor: color,
                top: `${20 + index * 25}%`,
                left: `${10 + index * 30}%`,
                animation: `${floatAnimations[index]} ${floatDurations[index]}s ease-in-out infinite`,
              }}
            />
            {/* Triangles */}
            <div
              className="absolute opacity-15"
              style={{
                width: 0,
                height: 0,
                borderLeft: `${60 + index * 20}px solid transparent`,
                borderRight: `${60 + index * 20}px solid transparent`,
                borderBottom: `${100 + index * 30}px solid ${color}`,
                top: `${40 + index * 20}%`,
                right: `${15 + index * 25}%`,
                animation: `${rotateAnimations[index]} ${rotateDurations[index]}s ease-in-out infinite`,
              }}
            />
            {/* Hexagons */}
            <div
              className="absolute opacity-15 blur-sm"
              style={{
                width: `${80 + index * 20}px`,
                height: `${80 + index * 20}px`,
                backgroundColor: color,
                clipPath: "polygon(30% 0%, 70% 0%, 100% 50%, 70% 100%, 30% 100%, 0% 50%)",
                bottom: `${15 + index * 20}%`,
                left: `${50 + index * 15}%`,
                animation: `${hexAnimations[index]} ${hexDurations[index]}s ease-in-out infinite`,
              }}
            />
          </div>
        )
      })}
    </div>
  )
}

