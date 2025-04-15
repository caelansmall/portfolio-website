"use client"
import { Boxes } from "app/background-boxes"
import { cn } from "lib/utils"

export default function Hero() {
  return (
    <div className="h-230 relative w-full overflow-hidden bg-slate-900 flex flex-col justify-center items-start rounded-lg">
      <div className="absolute inset-0 w-full h-full bg-slate-900 z-20 [mask-image:radial-gradient(transparent,white)] pointer-events-none" />

      <Boxes />

      <h1 className="relative justify-center items-start font-light z-999 text-8xl text-left text-white font-mono pl-15">
        Caelan Small
      </h1>

      <h1 className="relative justify-center items-start font-light z-999 text-5xl text-left text-white font-mono pl-15">
        Software Engineer
      </h1>

    </div>
  )
}
