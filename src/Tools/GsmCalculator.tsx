import { useState } from "react";
import { Calculator, RefreshCcw, Scale } from "lucide-react";

type PaperSize = "A3" | "A4" | "A5" | "Custom";

const paperSizes: Record<Exclude<PaperSize, "Custom">, { width: number; height: number }> = {
  A3: { width: 297, height: 420 },
  A4: { width: 210, height: 297 },
  A5: { width: 148, height: 210 },
};

export default function GsmCalculator() {
  const [mode, setMode] = useState<"gsm" | "weight">("gsm");
  const [size, setSize] = useState<PaperSize>("A4");

  const [width, setWidth] = useState("210");
  const [height, setHeight] = useState("297");
  const [weight, setWeight] = useState("5");
  const [gsm, setGsm] = useState("80");
  const [quantity, setQuantity] = useState("100");

  const updateSize = (value: PaperSize) => {
    setSize(value);

    if (value !== "Custom") {
      setWidth(String(paperSizes[value].width));
      setHeight(String(paperSizes[value].height));
    }
  };

  const w = Number(width);
  const h = Number(height);
  const q = Number(quantity);
  const area = (w * h) / 1_000_000;

  const calculatedGsm =
    mode === "gsm" && area > 0 && Number(weight) > 0
      ? Number(weight) / area
      : 0;

  const calculatedWeight =
    mode === "weight" && area > 0 && Number(gsm) > 0
      ? (area * Number(gsm) * q) / 1000
      : 0;

  const reset = () => {
    setSize("A4");
    setWidth("210");
    setHeight("297");
    setWeight("5");
    setGsm("80");
    setQuantity("100");
  };

  const inputClass =
    "w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100";

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-8">
      <div className="mx-auto max-w-4xl">

        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <div className="mb-2 flex items-center gap-2 text-blue-600">
              <Calculator size={20} />
              <span className="text-xs font-semibold uppercase tracking-widest">
                Dot Print Tools
              </span>
            </div>

            <h1 className="text-2xl font-bold text-gray-900 md:text-3xl">
              GSM Calculator
            </h1>

            <p className="mt-1 text-sm text-gray-500">
              Calculate paper GSM and total paper weight easily.
            </p>
          </div>

          <button
            onClick={reset}
            className="flex items-center gap-2 rounded-xl border bg-white px-4 py-2.5 text-sm font-medium text-gray-600 hover:bg-gray-100"
          >
            <RefreshCcw size={16} />
            Reset
          </button>
        </div>

        {/* Calculator */}
        <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">

          {/* Tabs */}
          <div className="grid grid-cols-2 border-b p-2">
            <button
              onClick={() => setMode("gsm")}
              className={`rounded-xl py-3 text-sm font-semibold transition ${
                mode === "gsm"
                  ? "bg-blue-600 text-white"
                  : "text-gray-500 hover:bg-gray-50"
              }`}
            >
              Calculate GSM
            </button>

            <button
              onClick={() => setMode("weight")}
              className={`rounded-xl py-3 text-sm font-semibold transition ${
                mode === "weight"
                  ? "bg-blue-600 text-white"
                  : "text-gray-500 hover:bg-gray-50"
              }`}
            >
              Calculate Weight
            </button>
          </div>

          <div className="grid gap-8 p-5 md:grid-cols-2 md:p-8">

            {/* Inputs */}
            <div className="space-y-5">

              <div>
                <label className="mb-2 block text-sm font-semibold text-gray-700">
                  Paper Size
                </label>

                <select
                  value={size}
                  onChange={(e) => updateSize(e.target.value as PaperSize)}
                  className={inputClass}
                >
                  <option value="A3">A3 (297 × 420 mm)</option>
                  <option value="A4">A4 (210 × 297 mm)</option>
                  <option value="A5">A5 (148 × 210 mm)</option>
                  <option value="Custom">Custom Size</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="mb-2 block text-sm font-semibold text-gray-700">
                    Width (mm)
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={width}
                    onChange={(e) => {
                      setWidth(e.target.value);
                      setSize("Custom");
                    }}
                    className={inputClass}
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-gray-700">
                    Height (mm)
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={height}
                    onChange={(e) => {
                      setHeight(e.target.value);
                      setSize("Custom");
                    }}
                    className={inputClass}
                  />
                </div>
              </div>

              {mode === "gsm" ? (
                <>
                  <div>
                    <label className="mb-2 block text-sm font-semibold text-gray-700">
                      Single Sheet Weight (Grams)
                    </label>
                    <input
                      type="number"
                      min="0"
                      step="any"
                      value={weight}
                      onChange={(e) => setWeight(e.target.value)}
                      className={inputClass}
                      placeholder="Enter weight in grams"
                    />
                  </div>

                  <div className="rounded-xl bg-blue-50 p-4 text-sm text-blue-800">
                    <strong>Formula:</strong>
                    <p className="mt-1">
                      GSM = Weight (g) ÷ Area (m²)
                    </p>
                  </div>
                </>
              ) : (
                <>
                  <div>
                    <label className="mb-2 block text-sm font-semibold text-gray-700">
                      Paper GSM
                    </label>
                    <input
                      type="number"
                      min="0"
                      value={gsm}
                      onChange={(e) => setGsm(e.target.value)}
                      className={inputClass}
                      placeholder="Enter GSM"
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-semibold text-gray-700">
                      Quantity (Sheets)
                    </label>
                    <input
                      type="number"
                      min="0"
                      value={quantity}
                      onChange={(e) => setQuantity(e.target.value)}
                      className={inputClass}
                    />
                  </div>

                  <div className="rounded-xl bg-blue-50 p-4 text-sm text-blue-800">
                    <strong>Formula:</strong>
                    <p className="mt-1">
                      Weight = Area × GSM × Quantity
                    </p>
                  </div>
                </>
              )}
            </div>

            {/* Result */}
            <div className="flex flex-col justify-center rounded-2xl bg-slate-900 p-6 text-white md:p-8">

              <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl bg-white/10">
                <Scale size={24} />
              </div>

              <p className="text-sm text-slate-400">
                {mode === "gsm" ? "Calculated Paper GSM" : "Total Paper Weight"}
              </p>

              <h2 className="mt-3 text-5xl font-bold tracking-tight">
                {mode === "gsm"
                  ? calculatedGsm > 0
                    ? calculatedGsm.toFixed(2)
                    : "—"
                  : calculatedWeight > 0
                    ? calculatedWeight.toFixed(3)
                    : "—"}
              </h2>

              <p className="mt-2 text-lg font-medium text-blue-400">
                {mode === "gsm" ? "GSM (g/m²)" : "KG"}
              </p>

              <div className="mt-8 space-y-3 border-t border-white/10 pt-5 text-sm">
                <div className="flex justify-between">
                  <span className="text-slate-400">Paper Area</span>
                  <span>{area > 0 ? area.toFixed(4) : "—"} m²</span>
                </div>

                {mode === "weight" && (
                  <>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Quantity</span>
                      <span>{q || "—"} Sheets</span>
                    </div>

                    <div className="flex justify-between">
                      <span className="text-slate-400">Weight Per Sheet</span>
                      <span>
                        {area > 0 && Number(gsm) > 0
                          ? (area * Number(gsm)).toFixed(3)
                          : "—"}{" "}
                        g
                      </span>
                    </div>
                  </>
                )}
              </div>
            </div>

          </div>
        </div>

        <p className="mt-5 text-center text-xs text-gray-400">
          Dot Print • Professional Printing Tools
        </p>
      </div>
    </div>
  );
}