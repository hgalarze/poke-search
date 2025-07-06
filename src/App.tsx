import { Outlet } from "react-router-dom"
import { AnimatedBackground } from "./components/animated-background"

function App() {

  return (
    <>
    <AnimatedBackground />
    <div className="min-h-screen relative">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <Outlet />
        </div>
      </div>
    </div>
    </>
  )
}

export default App