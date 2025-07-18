import type { Route } from "./+types/home";
import Navbar from "~/navbar";
import Hero from "~/hero";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Portfolio | Caelan Small" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function Home() {
  return (
    <div
      style={{
        width: '100vw',
        height: '100vh',
        minHeight: '100vh',
        minWidth: '100vw',
        overflow: 'hidden',
        position: 'relative',
        padding: 0,
        margin: 0,
        boxSizing: 'border-box',
      }}
    >
      <Hero />
    </div>
  )
}
