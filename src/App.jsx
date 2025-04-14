import { useEffect, useState } from "react";
import { PenLine } from 'lucide-react';

const GRID_SIZE = 10;

function App() {
  const [color, setColor] = useState("#00ccff");
  const [hoveredPixel, setHoveredPixel] = useState(null);
  const [pixels, setPixels] = useState([]);

  const handlePixelClick = (index) => {
    const updatedPixels = [...pixels];
    updatedPixels[index] = color;
    setPixels(updatedPixels);
  };

  const getXY = (index) => {
    const x = index % GRID_SIZE;
    const y = Math.floor(index / GRID_SIZE);
    return { x, y };
  };

  useEffect(() => {
    fetch(`${import.meta.env.BASE_URL}pixels.json`)
      .then(res => res.json())
      .then(data => {
        const flat = data.pixels.flat();
        console.log("Loaded Pixels:", flat);
        setPixels(flat);
      });
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center py-10">
      {/* Header */}
      <div className="w-full bg-white shadow px-6 py-4 flex flex-col sm:flex-row items-center justify-between mb-6">
        <h2 className="text-xl sm:text-2xl font-bold text-gray-800">EOS Pixel Master Demo</h2>
        <div className="text-sm text-gray-600 flex gap-6 mt-2 sm:mt-0">
          <p><strong>Canvas Size:</strong> 100 x 100</p>
          <p><strong>Total Pixels:</strong> 10,000</p>
        </div>
      </div>

      {/* Main 3-panel layout */}
      <div className="flex flex-col lg:flex-row w-full max-w-screen-xl px-4 gap-4">

        {/* Left Panel - Leaderboard */}
        <div className="w-full lg:w-64 bg-white rounded shadow p-4 text-sm text-gray-700">
          <h3 className="font-bold mb-2">Leaderboard</h3>
          <ul className="space-y-1">
            <li>👑 dalangtasoha – 1,250 px</li>
            <li>🌟 fairdrop2222 – 1,080 px</li>
            <li>💎 cryptobillionaire – 995 px</li>
            <li>🔥 pixelqueen – 812 px</li>
            <li>🧠 strategy101 – 688 px</li>
          </ul>
        </div>

        {/* Center Panel - Main Content */}
        <div className="w-full flex-1 flex flex-col items-center">
          {/* Toolbar */}
          <div className="flex items-center gap-4 mb-6">
            <div className="bg-white p-4 rounded shadow flex flex-col gap-4 items-center">
              <div className="flex flex-wrap gap-2">
                {["#000000", "#ff0000", "#00ff00", "#0000ff", "#ffff00", "#ff00ff", "#00ffff", "#ffffff", "#808080", "#800000", "#008000", "#000080"].map((c) => (
                  <div
                    key={c}
                    className={`w-8 h-8 rounded border-2 cursor-pointer ${color === c ? "border-blue-500" : "border-transparent"}`}
                    style={{ backgroundColor: c }}
                    onClick={() => setColor(c)}
                  />
                ))}
              </div>
            </div>

            <div className="flex items-center gap-2 px-2 py-1 bg-blue-100 rounded">
              <PenLine className="text-blue-600" />
              <span className="text-sm text-blue-600">Paint Tool</span>
            </div>

            <button
              className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
              onClick={() => alert("Pretend wallet is connected!")}
            >
              Mock Wallet Connect
            </button>
            <button
              className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
              onClick={() => setPixels(Array(GRID_SIZE * GRID_SIZE).fill("#ffffff"))}
            >
              Reset Canvas
            </button>

          </div>

          {/* Hover Info */}
          <div className="h-16 mb-4 flex items-center justify-center">
            {hoveredPixel ? (
              <div className="p-2 bg-white rounded shadow text-sm text-gray-700 border border-gray-300">
              <p><strong>Position:</strong> ({hoveredPixel.x}, {hoveredPixel.y})</p>
              <p><strong>Color:</strong> {hoveredPixel.color}</p>
            </div>
            
            ) : (
              <div className="text-gray-400 text-sm italic">Hover over a pixel to see info</div>
            )}
          </div>

          {/* Canvas */}
          <div
            className="grid"
            style={{
              gridTemplateColumns: `repeat(${GRID_SIZE}, 20px)`,
              gridTemplateRows: `repeat(${GRID_SIZE}, 20px)`,
              gap: "2px",
            }}
          >
            {pixels.map((pixelColor, i) => {
              const { x, y } = getXY(i);
              return (
                <div
                  key={i}
                  onClick={() => handlePixelClick(i)}
                  onMouseEnter={() => setHoveredPixel({ x, y, color: pixelColor })}
                  onMouseLeave={() => setHoveredPixel(null)}
                  className="border border-gray-300 cursor-pointer"
                  style={{
                    backgroundColor: pixelColor,
                    width: "20px",
                    height: "20px",
                    boxShadow: hoveredPixel?.x === x && hoveredPixel?.y === y ? "0 0 0 2px #3b82f6" : "none",
                  }}
                />
              );
            })}
          </div>
        </div>

        {/* Right Panel - Wallet */}
        <div className="w-full lg:w-64 bg-white rounded shadow p-4 text-sm text-gray-700">
          <h3 className="font-bold mb-2">Wallet</h3>
          <p><strong>User:</strong> demo-user@active</p>
          <p><strong>Balance:</strong> 12.3456 EOS</p>
          <div className="mt-2 p-2 bg-yellow-100 border border-yellow-300 rounded text-xs">
            Withdrawal limit reached.<br />Try again in 2h 34m.
          </div>
        </div>

      </div>
    </div>
  );
}

export default App;
