import { useEffect, useState } from "react";

const GRID_SIZE = 20;
const STORAGE_KEY = "pixel-canvas";

function App() {
  const [color, setColor] = useState("#00ccff");
  const [hoveredPixel, setHoveredPixel] = useState(null);
  const [pixels, setPixels] = useState(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : Array(GRID_SIZE * GRID_SIZE).fill("#ffffff");
  });

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
    localStorage.setItem(STORAGE_KEY, JSON.stringify(pixels));
  }, [pixels]);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center py-10">
      <h1 className="text-3xl font-bold text-blue-600 mb-6">Pixel Canvas Demo</h1>

      <div className="flex items-center gap-4 mb-6">
        <label className="font-medium text-gray-700">Pick a color:</label>
        <input
          type="color"
          value={color}
          onChange={(e) => setColor(e.target.value)}
          className="w-10 h-10 border border-gray-300 rounded"
        />

        <button
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
          onClick={() => alert("Pretend wallet is connected!")}
        >
          Mock Wallet Connect
        </button>

      </div>

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
              }}
            />
          );
        })}



      </div>
    </div>
  );
}

export default App;
