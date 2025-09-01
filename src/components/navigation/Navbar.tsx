// components/navigation/Navbar.tsx
"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  return (
    <header className="relative w-full">
      <div className="mx-auto max-w-7xl px-4 lg:px-6 py-lg lg:py-4">
        {/* barra superior */}
        <div className="flex items-center justify-between gap-4">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/img/logo-andean.svg"
              alt="Andean Republic"
              width={150}
              height={36}
              priority
            />
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-2">
            <NavLink href="/about">ABOUT US</NavLink>
            <NavLink href="/products">PRODUCTS</NavLink>
            <NavLink href="/experiences">EXPERIENCES</NavLink>
            <NavLink href="/blog">BLOG</NavLink>
          </nav>

          {/* CTA Desktop */}
          <div className="hidden lg:flex">
            <Link
              href="/signup"
              className="inline-flex items-center rounded-full border border-[#3067B0] px-5 h-10 text-[#3067B0] hover:bg-[#3067B0] hover:text-white transition"
            >
              SIGN UP
            </Link>
          </div>

          {/* Mobile actions */}
          <div className="flex lg:hidden items-center gap-3">
            <IconButton ariaLabel="Search" onClick={() => {}}>
              <SearchIcon />
            </IconButton>
            <IconButton ariaLabel="Open menu" onClick={() => setOpen(true)}>
              <MenuIcon />
            </IconButton>
          </div>
        </div>
      </div>

      {/* Drawer móvil/tablet */}
      <div className={`fixed inset-0 z-[60] lg:hidden ${open ? "" : "pointer-events-none"}`}>
        {/* overlay */}
        <button
          aria-label="Close menu"
          onClick={() => setOpen(false)}
          className={`absolute inset-0 bg-black/40 transition-opacity ${open ? "opacity-100" : "opacity-0"}`}
        />
        {/* panel */}
        <aside
          className={`absolute right-0 top-0 h-full w-[86%] max-w-[360px] bg-white shadow-xl transition-transform duration-300 ${open ? "translate-x-0" : "translate-x-full"}`}
        >
          <div className="flex items-center justify-between px-5 py-5 border-b">
            <span className="text-lg font-semibold">Menu</span>
            <button onClick={() => setOpen(false)} className="p-2 rounded-md hover:bg-neutral-100" aria-label="Close">
              <CloseIcon />
            </button>
          </div>
          <nav className="flex flex-col px-5 py-4">
            <MobileItem href="/about" onClickClose={() => setOpen(false)}>ABOUT US</MobileItem>
            <MobileItem href="/products" onClickClose={() => setOpen(false)}>PRODUCTS</MobileItem>
            <MobileItem href="/experiences" onClickClose={() => setOpen(false)}>EXPERIENCES</MobileItem>
            <MobileItem href="/blog" onClickClose={() => setOpen(false)}>BLOG</MobileItem>

            <Link
              href="/signup"
              onClick={() => setOpen(false)}
              className="mt-4 inline-flex h-12 items-center justify-center rounded-xl bg-[#3067B0] px-5 text-white"
            >
              SIGN UP
            </Link>
          </nav>
        </aside>
      </div>
    </header>
  );
}

/* ——— Subcomponentes ——— */

function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="
        no-underline
        px-lg py-[var(--spacing-xs,4px)]
        rounded-full inline-flex items-center gap-2
        font-semibold uppercase tracking-wide
        text-[var(--Blue-500)] visited:text-[var(--Blue-500)]
        hover:bg-white/70
        transition
      "
    >
      {children}
      <span className="opacity-60">▾</span>
    </Link>
  );
}


function MobileItem({
  href, children, onClickClose,
}: { href: string; children: React.ReactNode; onClickClose: () => void }) {
  return (
    <Link
      href={href}
      onClick={onClickClose}
      className="py-3 border-b text-[#2A2A2A] visited:text-[#2A2A2A] hover:text-[#3067B0]"
    >
      {children}
    </Link>
  );
}

function IconButton({ children, ariaLabel, onClick }:{ children:React.ReactNode; ariaLabel:string; onClick:()=>void }) {
  return (
    <button
      aria-label={ariaLabel}
      onClick={onClick}
      className="h-10 w-10 inline-flex items-center justify-center rounded-full border border-[#3067B0] text-[#3067B0] hover:bg-[#3067B0] hover:text-white transition"
    >
      {children}
    </button>
  );
}

/* ——— SVG icons ——— */
function SearchIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2" />
      <path d="M20 20L17 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}
function MenuIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M3 6h18M3 12h18M3 18h18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}
function CloseIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}
