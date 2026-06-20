import HolographicMorph from "../components/HolographicMorph";

export default function App() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-void text-white">
      <HolographicMorph>
        <div className="text-center">
          <h1 className="text-2xl md:text-4xl font-bold">HolographicMorph Test</h1>
          <p className="mt-2 text-sm text-white/70">This is a temporary render for visual testing.</p>
        </div>
      </HolographicMorph>
    </div>
  );
}