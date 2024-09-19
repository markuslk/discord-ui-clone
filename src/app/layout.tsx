"use client";
import { Home } from "lucide-react";
import { Inter } from "next/font/google";
import { useParams } from "next/navigation";
import NavLink from "./components/NavLink";
import "./globals.css";
import { data } from "./servers/[serverId]/layout";

const inter = Inter({ subsets: ["latin"] });

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
          <div className="hidden space-y-2 overflow-y-auto bg-gray-900 p-3 md:block">
            <NavLink href="/">
              <Home />
            </NavLink>
            <hr className="mx-2 rounded border-t-2 border-t-white/[.06]" />
            {data.map((server) => (
              <NavLink
                key={server.id}
                active={+serverId === +server.id}
                href={`/servers/${server.id}/channels/${server.categories[0].channels[0].id}`}
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
