"use client";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { ReactNode } from "react";

const NavLink = ({ href, children }: { href: string; children: ReactNode }) => {
  const pathname = usePathname();
  return (
    <Link href={href} className="group relative block">
      <div className="absolute -left-3 flex h-full items-center">
        <div
          className={`${pathname === href ? "h-10" : "h-5 scale-0 opacity-0 group-hover:scale-100 group-hover:opacity-100"} w-1 origin-left rounded-r bg-white transition-all duration-200`}
        />
      </div>
      <div className="group-active:translate-y-px">
        <div
          className={`${pathname === href ? "rounded-2xl bg-brand text-white" : "rounded-3xl bg-gray-700 text-gray-100 group-hover:rounded-2xl group-hover:bg-brand group-hover:text-white"} flex size-12 cursor-pointer items-center justify-center overflow-hidden transition-all duration-200`}
        >
          {children}
        </div>
      </div>
    </Link>
  );
};
export default NavLink;
