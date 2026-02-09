"use client"
import { Boxes } from "app/background-boxes"
import DecryptedText from "./decrypted-text"

export default function Hero() {
  return (
    <div className="relative w-full h-screen min-h-[600px] overflow-hidden bg-slate-900 flex flex-col justify-center items-start">

      {/* Mobile gradient fallback */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 md:hidden z-0" />

      {/* Boxes background */}
      <Boxes />

      {/* Radial mask overlay */}
      <div className="absolute inset-0 w-full h-full bg-slate-900/40 z-10 [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)] pointer-events-none" />

      {/* Content - REMOVED pointer-events-none from this wrapper */}
      <div className="relative z-20 flex flex-col px-6 md:px-12 lg:px-15 w-full pointer-events-none">

        <DecryptedText
          text="Caelan Small"
          speed={80}
          maxIterations={30}
          sequential={true}
          className="font-light text-4xl sm:text-6xl md:text-7xl lg:text-8xl text-left text-white font-mono"
          parentClassName="font-light text-4xl sm:text-6xl md:text-7xl lg:text-8xl text-left text-white font-mono"
          encryptedClassName="font-light text-4xl sm:text-6xl md:text-7xl lg:text-8xl text-left text-white font-mono"
          animateOn="view"
        />

        <DecryptedText
          text="Software Engineer"
          speed={80}
          maxIterations={30}
          sequential={true}
          className="font-light text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-left text-white font-mono mt-2 md:mt-4"
          parentClassName="font-light text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-left text-white font-mono mt-2 md:mt-4"
          encryptedClassName="font-light text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-left text-white font-mono mt-2 md:mt-4"
          animateOn="view"
        />

      </div>

    </div>
  )
}