"use client"
import { Boxes } from "app/background-boxes"
import DecryptedText from "./decrypted-text"

export default function Hero() {
  return (
    <div className="h-230 relative w-full overflow-hidden bg-slate-900 flex flex-col justify-center items-start rounded-lg">

      <div className="absolute inset-0 w-full h-full bg-slate-900 z-20 [mask-image:radial-gradient(transparent,white)] pointer-events-none" />

      <Boxes />

      <div className="flex flex-col pl-15">

        <DecryptedText
          text="Caelan Small"
          speed={80}
          maxIterations={30}
          sequential={true}
          className="relative justify-center items-start font-light z-999 text-8xl text-left text-white font-mono pl"
          parentClassName="relative justify-center items-start font-light z-999 text-8xl text-left text-white font-mono"
          encryptedClassName="relative justify-center items-start font-light z-999 text-8xl text-left text-white font-mono"
          animateOn="view"
        />

        <DecryptedText
          text="Software Engineer"
          speed={80}
          maxIterations={30}
          sequential={true}
          className="relative justify-center items-start font-light z-999 text-5xl text-left text-white font-mono"
          parentClassName="relative justify-center items-start font-light z-999 text-5xl text-left text-white font-mono"
          encryptedClassName="relative justify-center items-start font-light z-999 text-5xl text-left text-white font-mono"
          animateOn="view"
        />

      </div>

    </div>
  )
}
