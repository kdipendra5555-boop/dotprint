import {
  Phone,
  Mail,
  MapPin,
  ArrowUpRight,
  Printer,
} from "lucide-react";

import { Link } from "react-router-dom";

const quickLinks = [
  { name: "Home", href: "/" },
  { name: "About Us", href: "/about" },
  { name: "Our Products", href: "/products" },
  { name: "Contact Us", href: "/contact" },
];

const services = [
  "Wedding Cards",
  "Visiting Cards",
  "Posters & Banners",
  "Cash Memo",
  "Custom Printing",
];

const Footer = () => {
  return (
    <footer className="bg-[#FFFAF7] text-[#302525] border-t border-[#EADBD5]">

      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-6 lg:px-10 pt-16 pb-14">

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-10">

          {/* Brand */}
          <div>

            <Link to="/" className="inline-flex items-center gap-3 mb-6">

              <div className="w-12 h-12 rounded-xl bg-[#861F2D] flex items-center justify-center shadow-sm">
                <Printer size={24} className="text-white" />
              </div>

              <div>
                <h2 className="text-2xl font-extrabold tracking-tight text-[#861F2D]">
                  dotprint
                </h2>

                {/* <p className="text-[10px] tracking-[2px] text-[#8A7772] uppercase font-medium">
                  By Shailendra Press
                </p> */}
              </div>

            </Link>

            <p className="text-[#786B67] text-sm leading-7 max-w-xs">
              Bringing your ideas to life with premium quality printing,
              creative designs and reliable printing solutions.
            </p>

            {/* Social Media */}
            <div className="flex gap-3 mt-7">

              {/* Instagram */}
              <a
                href="https://www.instagram.com/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="w-10 h-10 rounded-full border border-[#EADBD5] text-[#861F2D] flex items-center justify-center hover:bg-[#861F2D] hover:text-white hover:border-[#861F2D] transition-all duration-300"
              >
                <svg
                  viewBox="0 0 24 24"
                  width="18"
                  height="18"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                >
                  <rect x="3" y="3" width="18" height="18" rx="5" />
                  <circle cx="12" cy="12" r="4" />
                  <circle cx="17.5" cy="6.5" r="1" fill="currentColor" />
                </svg>
              </a>

              {/* Facebook */}
              <a
                href="https://www.facebook.com/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="w-10 h-10 rounded-full border border-[#EADBD5] text-[#861F2D] flex items-center justify-center hover:bg-[#861F2D] hover:text-white hover:border-[#861F2D] transition-all duration-300"
              >
                <svg
                  viewBox="0 0 24 24"
                  width="18"
                  height="18"
                  fill="currentColor"
                >
                  <path d="M13.5 21v-8h2.7l.4-3h-3.1V8.1c0-.9.3-1.5 1.6-1.5h1.6V3.9c-.8-.1-1.6-.2-2.5-.2-2.5 0-4.2 1.5-4.2 4.3V10H7.2v3h2.8v8h3.5z" />
                </svg>
              </a>

            </div>
          </div>

          {/* Quick Links */}
          <div>

            <h3 className="text-[#302525] font-bold text-base mb-7">
              Quick Links
            </h3>

            <ul className="space-y-4 text-sm text-[#786B67]">

              {quickLinks.map((item) => (
                <li key={item.name}>
                  <Link
                    to={item.href}
                    className="hover:text-[#861F2D] hover:translate-x-1 inline-block transition-all duration-300"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}

            </ul>
          </div>

          {/* Services */}
          <div>

            <h3 className="text-[#302525] font-bold text-base mb-7">
              Our Services
            </h3>

            <ul className="space-y-4 text-sm text-[#786B67]">

              {services.map((item) => (
                <li key={item}>
                  <Link
                    to="/products"
                    className="hover:text-[#861F2D] hover:translate-x-1 inline-block transition-all duration-300"
                  >
                    {item}
                  </Link>
                </li>
              ))}

            </ul>
          </div>

          {/* Contact */}
          <div>

            <h3 className="text-[#302525] font-bold text-base mb-7">
              Get in Touch
            </h3>

            <div className="space-y-5 text-sm text-[#786B67]">

              <div className="flex gap-3 items-start">

                <MapPin
                  size={19}
                  className="text-[#861F2D] shrink-0 mt-0.5"
                />

                <p className="leading-6">
                  Kanpur, Uttar Pradesh, India
                </p>

              </div>

              <div className="flex gap-3 items-start">

                <Phone
                  size={18}
                  className="text-[#861F2D] shrink-0 mt-0.5"
                />

                <p>Contact us for enquiries</p>

              </div>

              <div className="flex gap-3 items-start">

                <Mail
                  size={19}
                  className="text-[#861F2D] shrink-0 mt-0.5"
                />

                <p>Get in touch with us</p>

              </div>

            </div>

            <Link
              to="/contact"
              className="inline-flex items-center gap-2 mt-7 text-sm font-bold text-[#861F2D] hover:gap-3 transition-all duration-300"
            >
              Get a Quote
              <ArrowUpRight size={17} />
            </Link>

          </div>

        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-[#EADBD5] bg-[#F8F0EC]">

        <div className="max-w-7xl mx-auto px-6 lg:px-10 py-6 flex flex-col sm:flex-row justify-between items-center gap-3">

          <p className="text-xs text-[#897873] text-center">
            © {new Date().getFullYear()} Dot Print. All rights reserved.
          </p>

          <p className="text-xs text-[#897873]">
            Made with{" "}
            <span className="text-[#861F2D]">♥</span>
            {" "}by{" "}
            <Link
              to="/invoicemydot"
              className="text-[#861F2D] font-semibold hover:underline"
            >
              Dot Print
            </Link>
          </p>

        </div>

      </div>

    </footer>
  );
};

export default Footer;