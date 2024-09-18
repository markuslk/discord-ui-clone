"use client";
import { Inter } from "next/font/google";
import "./globals.css";
import { Activity, Airplay, AppWindow, Home } from "lucide-react";
import NavLink from "./components/NavLink";
import { useParams } from "next/navigation";

const inter = Inter({ subsets: ["latin"] });

let servers = [
  { id: "1", icon: Activity },
  { id: "2", icon: Airplay },
  { id: "3", icon: AppWindow },
];

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { serverId } = useParams();

  return (
    <html lang="en">
      <body className={inter.className}>
        <main className="flex h-screen text-gray-100">
          <div className="space-y-2 bg-gray-900 p-3">
            <NavLink href="/">
              <Home />
            </NavLink>
            <hr className="mx-2 rounded border-t-2 border-t-white/[.06]" />
            {servers.map((server) => (
              <NavLink
                key={server.id}
                active={+serverId === +server.id}
                href={`/servers/${server.id}/channels/1`}
              >
                <server.icon />
              </NavLink>
            ))}
          </div>
          {children}
        </main>
      </body>
    </html>
  );
}
