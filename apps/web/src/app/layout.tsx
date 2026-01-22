import type { Metadata } from "next";
import Script from "next/script";
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
        {process.env.NODE_ENV !== "development" && (
          <Script
            id="microsoft-clarity"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `
              (function(c,l,a,r,i,t,y){
                c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
              })(window, document, "clarity", "script", "uy6ztjn0i5");
            `,
            }}
          />
        )}
        <Providers>
          <SidebarProvider>
            <AppLayout>{children}</AppLayout>
          </SidebarProvider>
        </Providers>
      </body>
    </html>
  );
}
