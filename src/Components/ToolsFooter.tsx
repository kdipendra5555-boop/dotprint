import {
  Image,
  FileText,
  Calculator,
  Palette,
  CreditCard,
  Scissors,
  ArrowUpRight,
} from "lucide-react";

import { Link } from "react-router-dom";
import type { LucideIcon } from "lucide-react";

interface Tool {
  name: string;
  href: string;
}

interface ToolCategory {
  title: string;
  icon: LucideIcon;
  tools: Tool[];
}

const toolCategories: ToolCategory[] = [
  {
    title: "Design Tools",
    icon: Palette,
    tools: [
      { name: "Visiting Card Maker", href: "/tools/visiting-card-maker" },
      { name: "Flex Banner Maker", href: "/tools/flex-banner-maker" },
      { name: "Wedding Card Maker", href: "/tools/wedding-card-maker" },
      { name: "Poster Maker", href: "/tools/poster-maker" },
      { name: "ID Card Maker", href: "/tools/id-card-maker" },
      { name: "Letterhead Maker", href: "/tools/letterhead-maker" },
    ],
  },
  {
    title: "Photo Tools",
    icon: Image,
    tools: [
      { name: "Passport Photo Maker", href: "/tools/passport-photo-maker" },
      { name: "Background Remover", href: "/tools/background-remover" },
      { name: "Photo Enhancer", href: "/tools/photo-enhancer" },
      { name: "Image Resizer", href: "/tools/image-resizer" },
      { name: "Image DPI Checker", href: "/tools/dpi-checker" },
      { name: "Photo Sheet Arranger", href: "/tools/photo-sheet-arranger" },
      { name: "Photo Restoration", href: "/tools/photo-restoration" },
    ],
  },
  {
    title: "PDF & Print Tools",
    icon: FileText,
    tools: [
      { name: "PDF Print Layout", href: "/tools/pdf-print-layout" },
      { name: "PDF Merger", href: "/tools/pdf-merger" },
      { name: "PDF Splitter", href: "/tools/pdf-splitter" },
      { name: "PDF Compressor", href: "/tools/pdf-compressor" },
      { name: "JPG to PDF", href: "/tools/jpg-to-pdf" },
      { name: "PDF to JPG", href: "/tools/pdf-to-jpg" },
      { name: "CMYK Converter", href: "/tools/cmyk-converter" },
      { name: "Bleed & Crop Marks", href: "/tools/bleed-crop-marks" },
      { name: "Visiting Card Imposition", href: "/tools/visiting-card-imposition" },
    ],
  },
  {
    title: "Printing Calculators",
    icon: Calculator,
    tools: [
      { name: "Paper GSM Calculator", href: "/tools/paper-gsm-calculator" },
      { name: "Paper Cost Calculator", href: "/tools/paper-cost-calculator" },
      { name: "Flex Cost Calculator", href: "/tools/flex-cost-calculator" },
      { name: "Banner Cost Calculator", href: "/tools/banner-cost-calculator" },
      { name: "Visiting Card Calculator", href: "/tools/visiting-card-calculator" },
      { name: "Sticker Cost Calculator", href: "/tools/sticker-cost-calculator" },
      { name: "Vinyl Cost Calculator", href: "/tools/vinyl-cost-calculator" },
      { name: "Ink Cost Calculator", href: "/tools/ink-cost-calculator" },
      { name: "Printing Profit Calculator", href: "/tools/printing-profit-calculator" },
      { name: "Sheet Calculator", href: "/tools/sheet-calculator" },
      { name: "Banner Size Calculator", href: "/tools/banner-size-calculator" },
    ],
  },
  {
    title: "Business Printing",
    icon: CreditCard,
    tools: [
      { name: "Cash Memo Maker", href: "/tools/cash-memo-maker" },
      { name: "Bill Book Maker", href: "/tools/bill-book-maker" },
      { name: "Receipt Book Maker", href: "/tools/receipt-book-maker" },
      { name: "Invoice Designer", href: "/tools/invoice-designer" },
      { name: "Quotation Maker", href: "/tools/quotation-maker" },
      { name: "Challan Book Maker", href: "/tools/challan-book-maker" },
      { name: "Certificate Maker", href: "/tools/certificate-maker" },
      { name: "Envelope Designer", href: "/tools/envelope-designer" },
      { name: "Bulk ID Card Generator", href: "/tools/bulk-id-card-generator" },
    ],
  },
  {
    title: "Image & Finishing",
    icon: Scissors,
    tools: [
      { name: "Image Cropper", href: "/tools/image-cropper" },
      { name: "Image to PNG", href: "/tools/image-to-png" },
      { name: "Image to JPG", href: "/tools/image-to-jpg" },
      { name: "Print Quality Checker", href: "/tools/print-quality-checker" },
      { name: "Paper Thickness Estimator", href: "/tools/paper-thickness-estimator" },
      { name: "Print Margin Generator", href: "/tools/print-margin-generator" },
      { name: "Multiple Copies Layout", href: "/tools/multiple-copies-layout" },
      { name: "A3/A4/A5 Layout Generator", href: "/tools/paper-layout-generator" },
    ],
  },
];

const ToolsFooter = () => {
  return (
    <section className="border-t border-[#EADBD5] bg-[#FFFCFA]">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-14">

        <div className="mb-10">
          <span className="text-xs font-bold tracking-[2px] uppercase text-[#861F2D]">
            Dot Print Utilities
          </span>

          <h3 className="text-2xl font-extrabold text-[#302525] mt-2">
            Free Online Printing Tools
          </h3>

          <p className="text-sm text-[#897873] mt-2">
            Useful tools for printing professionals, designers and businesses.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-10">
          {toolCategories.map((category) => {
            const Icon = category.icon;

            return (
              <div key={category.title}>
                <h4 className="flex items-center gap-2 font-bold text-sm text-[#861F2D] mb-5">
                  <Icon size={17} />
                  {category.title}
                </h4>

                <ul className="space-y-3">
                  {category.tools.map((tool) => (
                    <li key={tool.href}>
                      <Link
                        to={tool.href}
                        className="text-sm text-[#786B67] hover:text-[#861F2D] hover:translate-x-1 inline-block transition-all duration-300"
                      >
                        {tool.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>

        <div className="mt-12 pt-7 border-t border-[#EADBD5] flex justify-center">
          <Link
            to="/tools"
            className="inline-flex items-center gap-2 text-sm font-bold text-[#861F2D] hover:gap-3 transition-all duration-300"
          >
            Explore All Printing Tools
            <ArrowUpRight size={17} />
          </Link>
        </div>

      </div>
    </section>
  );
};

export default ToolsFooter;
