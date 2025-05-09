import type { Route } from "./+types/home";
import Navbar from "~/navbar";
import Hero from "~/hero";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function Home() {
  return (

    <Hero />
    
  )
}
