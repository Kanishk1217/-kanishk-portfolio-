"use client"

import dynamic from "next/dynamic"

const ShaderGradientCanvas = dynamic(
  () => import("shadergradient").then((m) => ({ default: m.ShaderGradientCanvas })),
  { ssr: false }
)

const ShaderGradient = dynamic(
  () => import("shadergradient").then((m) => ({ default: m.ShaderGradient })),
  { ssr: false }
)

export function ShaderBackground() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0">
      <ShaderGradientCanvas style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}>
        <ShaderGradient
          type="waterPlane"
          animate="on"
          uSpeed={0.06}
          uStrength={1.2}
          uDensity={1.0}
          uFrequency={5.5}
          uAmplitude={0}
          positionX={0}
          positionY={0}
          positionZ={0}
          rotationX={50}
          rotationY={0}
          rotationZ={-60}
          color1="#000000"
          color2="#0d0d12"
          color3="#111120"
          reflection={0.05}
          wireframe={false}
          shader="defaults"
          envPreset="city"
          lightType="3d"
          grain="on"
          uTime={0}
        />
      </ShaderGradientCanvas>
    </div>
  )
}
