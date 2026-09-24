import React from "react";

interface AppShellProps {
  children: React.ReactNode;
  footer?: React.ReactNode;
  className?: string;
}

export default function AppShell({
  children,
  footer,
  className = "",
}: AppShellProps) {
  return (
    <main className="min-h-screen bg-[#040814] flex justify-center items-stretch text-slate-100 font-sans selection:bg-red-500 selection:text-white">
      {/* Smartphone frame no desktop e 100% no mobile */}
      <div
        className={`relative w-full max-w-md min-h-screen flex flex-col justify-between bg-gradient-to-b from-[#0a142f] via-[#091126] to-[#040817] shadow-2xl border-x border-slate-800/40 ${className}`}
      >
        <div className="flex-1 flex flex-col min-h-0 relative">
          {children}
        </div>
        {footer && <footer className="shrink-0">{footer}</footer>}
      </div>
    </main>
  );
}
