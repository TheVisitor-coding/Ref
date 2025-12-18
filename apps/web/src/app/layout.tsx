import type { Metadata } from "next";
import "./globals.css";
import Providers from "@/components/providers/Providers";
import { SidebarProvider } from "@/components/providers/SidebarProviders";
import AppLayout from "@/components/organisms/layouts/AppLayout";

const fontInter = {
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
}

export const metadata: Metadata = {
  title: "REF - L'application de gestion pour coachs sportifs",
  description: "REF est une application web conçue pour les coachs sportifs afin de simplifier la gestion de leurs clients, optimiser les performances et offrir un suivi personnalisé.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body className={`${fontInter.variable} overflow-x-hidden bg-background `}>
        <Providers>
          <SidebarProvider>
            <AppLayout>{children}</AppLayout>
          </SidebarProvider>
        </Providers>
      </body>
    </html>
  );
}
