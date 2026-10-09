"use client";

import { useEffect } from "react";
import { ExternalLink, ShieldCheck } from "lucide-react";

export default function AdminRedirect() {
  useEffect(() => {
    window.location.href = "https://metaquest-admin.vercel.app";
  }, []);

  return (
    <div className="min-h-screen bg-[#070A12] flex items-center justify-center p-4 text-center">
      <div className="max-w-md p-8 rounded-3xl bg-zinc-950/80 border border-white/10 shadow-2xl backdrop-blur-xl">
        <div className="w-12 h-12 mx-auto rounded-2xl bg-gradient-to-tr from-cyan-500 to-indigo-600 text-white font-extrabold flex items-center justify-center text-lg mb-4 shadow-lg shadow-cyan-500/20">
          MQ
        </div>
        <h2 className="text-xl font-bold text-white mb-2">MetaQuest Control Hub</h2>
        <p className="text-xs text-gray-400 mb-6 font-mono">
          Redirecting to the dedicated administrative dashboard...
        </p>
        <a
          href="https://metaquest-admin.vercel.app"
          className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full font-bold text-xs text-black bg-white hover:bg-gray-100 transition-all shadow-lg hover:scale-105 active:scale-95"
        >
          <span>Open MetaQuest Admin</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </a>
      </div>
    </div>
  );
}
