import { useMemo, useState } from "react";
import {
  Calculator,
  Scale,
  Ruler,
  RefreshCcw,
  ArrowRight,
} from "lucide-react";

type Mode = "gsm" | "weight" | "dimension";

const paperSizes = {
  A3: { width: 297, height: 420 },
  A4: { width: 210, height: 297 },
  A5: { width: 148, height: 210 },
  A6: { width: 105, height: 148 },
};

type PaperSize = keyof typeof paperSizes | "Custom";

const inputClass =
  "w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100";

export default function GsmCalculator() {
  const [mode, setMode] = useState<Mode>("gsm");

  const [size, setSize] = useState<PaperSize>("A4");
  const [width, setWidth] = useState("210");
  const [height, setHeight] = useState("297");

  const [gsm, setGsm] = useState("80");
  const [weight, setWeight] = useState("5");
  const [quantity, setQuantity] = useState("1");

  // Dimension mode
  const [fixedDimension, setFixedDimension] = useState<"width" | "height">(
    "width"
  );
  const [fixedValue, setFixedValue] = useState("210");

  const area = (Number(width) * Number(height)) / 1000000;

  const result = useMemo(() => {
    const g = Number(gsm);
    const w = Number(weight);
    const q = Number(quantity);
    const a = area;

    if (mode === "gsm") {
      if (a <= 0 || w <= 0 || q <= 0) return null;

      return {
        value: (w * 1000) / (a * q),
        unit: "GSM",
        label: "Calculated GSM",
      };
    }

    if (mode === "weight") {
      if (a <= 0 || g <= 0 || q <= 0) return null;

      return {
        value: (a * g * q) / 1000,
        unit: "KG",
        label: "Total Weight",
      };
    }

    const fixed = Number(fixedValue);

    if (fixed <= 0 || g <= 0 || w <= 0 || q <= 0) return null;

    const totalArea = (w * 1000) / (g * q);

    const calculatedDimension = (totalArea * 1000000) / fixed;

    return {
      value: calculatedDimension,
      unit: "MM",
      label:
        fixedDimension === "width"
          ? "Calculated Height"
          : "Calculated Width",
    };
  }, [
    mode,
    area,
    gsm,
    weight,
    quantity,
    fixedValue,
    fixedDimension,
  ]);

  const reset = () => {
    setMode("gsm");
    setSize("A4");
    setWidth("210");
    setHeight("297");
    setGsm("80");
    setWeight("5");
    setQuantity("1");
    setFixedDimension("width");
    setFixedValue("210");
  };

  const changeSize = (value: PaperSize) => {
    setSize(value);

    if (value !== "Custom") {
      setWidth(String(paperSizes[value].width));
      setHeight(String(paperSizes[value].height));
    }
  };

  const modes = [
    {
      id: "gsm" as Mode,
      name: "GSM Calculator",
      description: "Calculate GSM from weight",
      icon: Scale,
    },
    {
      id: "weight" as Mode,
      name: "Weight Calculator",
      description: "Calculate paper weight",
      icon: Calculator,
    },
    {
      id: "dimension" as Mode,
      name: "Dimension Calculator",
      description: "Calculate paper dimensions",
      icon: Ruler,
    },
  ];

  return (
    <div className="min-h-screen bg-[#f8fafc] p-4 md:p-8">
      <div className="mx-auto max-w-5xl">

        {/* Header */}
        <div className="mb-8 flex items-start justify-between">
          <div>
            <div className="mb-3 flex items-center gap-2 text-blue-600">
              <Calculator size={19} />
              <span className="text-xs font-bold uppercase tracking-[2px]">
                Dot Print Tools
              </span>
            </div>

            <h1 className="text-3xl font-bold tracking-tight text-gray-900">
              GSM Calculator
            </h1>

            <p className="mt-2 text-sm text-gray-500">
              Calculate GSM, paper weight and dimensions.
            </p>
          </div>

          <button
            onClick={reset}
            className="flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm font-medium text-gray-600 hover:bg-gray-50"
          >
            <RefreshCcw size={15} />
            <span className="hidden sm:block">Reset</span>
          </button>
        </div>

        {/* Mode Selector */}
        <div className="mb-6 grid grid-cols-1 gap-3 sm:grid-cols-3">
          {modes.map((item) => {
            const Icon = item.icon;
            const active = mode === item.id;

            return (
              <button
                key={item.id}
                onClick={() => setMode(item.id)}
                className={`rounded-2xl border p-4 text-left transition ${
                  active
                    ? "border-blue-600 bg-blue-600 text-white shadow-lg shadow-blue-100"
                    : "border-gray-200 bg-white text-gray-700 hover:border-blue-300"
                }`}
              >
                <div className="mb-4 flex items-center justify-between">
                  <Icon size={22} />
                  {active && <ArrowRight size={18} />}
                </div>

                <h3 className="font-semibold">{item.name}</h3>

                <p
                  className={`mt-1 text-xs ${
                    active ? "text-blue-100" : "text-gray-400"
                  }`}
                >
                  {item.description}
                </p>
              </button>
            );
          })}
        </div>

        {/* Calculator */}
        <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
          <div className="grid md:grid-cols-2">

            {/* Inputs */}
            <div className="space-y-5 p-5 md:p-8">

              <div>
                <h2 className="text-lg font-bold text-gray-900">
                  Enter Details
                </h2>
                <p className="mt-1 text-sm text-gray-400">
                  Enter the required values below.
                </p>
              </div>

              {/* GSM MODE */}
              {mode === "gsm" && (
                <>
                  <Input
                    label="Paper Weight"
                    value={weight}
                    onChange={setWeight}
                    unit="Grams"
                  />

                  <Input
                    label="Quantity"
                    value={quantity}
                    onChange={setQuantity}
                    unit="Sheets"
                  />

                  <DimensionInputs
                    size={size}
                    width={width}
                    height={height}
                    setWidth={setWidth}
                    setHeight={setHeight}
                    changeSize={changeSize}
                  />
                </>
              )}

              {/* WEIGHT MODE */}
              {mode === "weight" && (
                <>
                  <Input
                    label="Paper GSM"
                    value={gsm}
                    onChange={setGsm}
                    unit="GSM"
                  />

                  <Input
                    label="Quantity"
                    value={quantity}
                    onChange={setQuantity}
                    unit="Sheets"
                  />

                  <DimensionInputs
                    size={size}
                    width={width}
                    height={height}
                    setWidth={setWidth}
                    setHeight={setHeight}
                    changeSize={changeSize}
                  />
                </>
              )}

              {/* DIMENSION MODE */}
              {mode === "dimension" && (
                <>
                  <Input
                    label="Paper GSM"
                    value={gsm}
                    onChange={setGsm}
                    unit="GSM"
                  />

                  <Input
                    label="Single Sheet Weight"
                    value={weight}
                    onChange={setWeight}
                    unit="Grams"
                  />

                  <Input
                    label="Quantity"
                    value={quantity}
                    onChange={setQuantity}
                    unit="Sheets"
                  />

                  <div>
                    <label className="mb-2 block text-sm font-semibold text-gray-700">
                      Fixed Dimension
                    </label>

                    <select
                      value={fixedDimension}
                      onChange={(e) =>
                        setFixedDimension(e.target.value as "width" | "height")
                      }
                      className={inputClass}
                    >
                      <option value="width">Keep Width Fixed</option>
                      <option value="height">Keep Height Fixed</option>
                    </select>
                  </div>

                  <Input
                    label={
                      fixedDimension === "width"
                        ? "Fixed Width"
                        : "Fixed Height"
                    }
                    value={fixedValue}
                    onChange={setFixedValue}
                    unit="MM"
                  />
                </>
              )}

              {/* Formula */}
              <div className="rounded-xl bg-blue-50 p-4">
                <p className="text-xs font-bold uppercase tracking-wider text-blue-700">
                  Calculation Formula
                </p>

                <p className="mt-2 text-sm text-blue-900">
                  {mode === "gsm" &&
                    "GSM = Weight (g) × 1000 ÷ Area (m²) ÷ Quantity"}

                  {mode === "weight" &&
                    "Weight (kg) = Area × GSM × Quantity ÷ 1000"}

                  {mode === "dimension" &&
                    "Area = Weight × 1000 ÷ (GSM × Quantity)"}
                </p>
              </div>
            </div>

            {/* Result */}
            <div className="flex flex-col justify-between bg-[#111827] p-6 text-white md:p-8">

              <div>
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/10">
                  {mode === "gsm" && <Scale size={23} />}
                  {mode === "weight" && <Calculator size={23} />}
                  {mode === "dimension" && <Ruler size={23} />}
                </div>

                <p className="mt-8 text-sm text-gray-400">
                  {result?.label || "Calculated Result"}
                </p>

                <div className="mt-3 flex items-baseline gap-2">
                  <h2 className="text-5xl font-bold tracking-tight">
                    {result ? result.value.toFixed(8) : "—"}
                  </h2>

                  <span className="text-lg font-semibold text-blue-400">
                    {result?.unit || ""}
                  </span>
                </div>

                <p className="mt-3 text-sm text-gray-400">
                  {mode === "gsm" && "Grams per Square Metre"}
                  {mode === "weight" && "Total Paper Weight"}
                  {mode === "dimension" && "Calculated Paper Dimension"}
                </p>
              </div>

              <div className="mt-12 space-y-4 border-t border-white/10 pt-6 text-sm">

                {mode !== "dimension" && (
                  <>
                    <ResultRow
                      label="Width"
                      value={`${width || 0} mm`}
                    />
                    <ResultRow
                      label="Height"
                      value={`${height || 0} mm`}
                    />
                    <ResultRow
                      label="Paper Area"
                      value={`${area.toFixed(4)} m²`}
                    />
                  </>
                )}

                {mode === "dimension" && (
                  <>
                    <ResultRow
                      label="Fixed Dimension"
                      value={`${fixedValue || 0} mm`}
                    />
                    <ResultRow
                      label="Calculated Dimension"
                      value={`${result?.value.toFixed(2) || "—"} mm`}
                    />
                  </>
                )}

                <ResultRow
                  label="Quantity"
                  value={`${quantity || 0} Sheets`}
                />
              </div>
            </div>
          </div>
        </div>

        <p className="mt-6 text-center text-xs text-gray-400">
          Dot Print · Professional Printing Tools
        </p>
      </div>
    </div>
  );
}

/* Reusable Input */

function Input({
  label,
  value,
  onChange,
  unit,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  unit: string;
}) {
  return (
    <div>
      <label className="mb-2 block text-sm font-semibold text-gray-700">
        {label}
      </label>

      <div className="relative">
        <input
          type="number"
          min="0"
          step="any"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={`${inputClass} pr-20`}
          placeholder="Enter value"
        />

        <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-semibold text-gray-400">
          {unit}
        </span>
      </div>
    </div>
  );
}

/* Dimension Inputs */

function DimensionInputs({
  size,
  width,
  height,
  setWidth,
  setHeight,
  changeSize,
}: {
  size: PaperSize;
  width: string;
  height: string;
  setWidth: (value: string) => void;
  setHeight: (value: string) => void;
  changeSize: (value: PaperSize) => void;
}) {
  return (
    <>
      <div>
        <label className="mb-2 block text-sm font-semibold text-gray-700">
          Paper Size
        </label>

        <select
          value={size}
          onChange={(e) => changeSize(e.target.value as PaperSize)}
          className={inputClass}
        >
          <option value="A3">A3 (297 × 420 mm)</option>
          <option value="A4">A4 (210 × 297 mm)</option>
          <option value="A5">A5 (148 × 210 mm)</option>
          <option value="A6">A6 (105 × 148 mm)</option>
          <option value="Custom">Custom Size</option>
        </select>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <Input
          label="Width"
          value={width}
          onChange={setWidth}
          unit="MM"
        />

        <Input
          label="Height"
          value={height}
          onChange={setHeight}
          unit="MM"
        />
      </div>
    </>
  );
}

/* Result Row */

function ResultRow({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center justify-between gap-3">
      <span className="text-gray-400">{label}</span>
      <span className="font-semibold text-white">{value}</span>
    </div>
  );
}