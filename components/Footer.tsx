import Link from "next/link";
import Logo from "./Logo";
import { Mail, MapPin, Phone, ShieldCheck } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-black/80 border-t border-white/10 pt-16 pb-12 text-sm text-gray-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          {/* Brand Col */}
          <div className="md:col-span-2 space-y-4">
            <Logo size="large" />
            <p className="text-sm text-gray-400 max-w-md leading-relaxed">
              Advancing engineering, agriculture, and urban intelligence through live research-backed masterclasses and patent formulation.
            </p>
            <div className="flex items-center gap-2 text-xs text-gray-400 font-mono">
              <ShieldCheck className="w-4 h-4 text-cyan-400" />
              <span>Official Registrations via Google Form & Google Meet</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono uppercase tracking-wider text-white font-bold">
              Research Domains
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a href="#workshops" className="hover:text-cyan-400 transition-colors">
                  AI & ML in Agriculture
                </a>
              </li>
              <li>
                <a href="#workshops" className="hover:text-cyan-400 transition-colors">
                  Autonomous Density Traffic
                </a>
              </li>
              <li>
                <a href="#workshops" className="hover:text-cyan-400 transition-colors">
                  Patent & Grant Novelty Dossier
                </a>
              </li>
              <li>
                <a href="#workshops" className="hover:text-cyan-400 transition-colors">
                  GreenBinX Smart IoT
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Details */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono uppercase tracking-wider text-white font-bold">
              Direct Contact & Support
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-cyan-400 flex-shrink-0" />
                <a href="mailto:support@metaquestsolutions.com" className="hover:text-white transition-colors">
                  support@metaquestsolutions.com
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-indigo-400 flex-shrink-0" />
                <span>+91 98765 43210</span>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                <span>Innovation & Incubation Hub, India</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-500">
          <div>
            © {new Date().getFullYear()} MetaQuest Solutions. All rights reserved.
          </div>
          <div className="flex items-center gap-6">
            <a href="#faq" className="hover:text-gray-400 transition-colors">
              Refund Policy
            </a>
            <a href="#faq" className="hover:text-gray-400 transition-colors">
              Terms of Service
            </a>
            <a href="#faq" className="hover:text-gray-400 transition-colors">
              Privacy Policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
