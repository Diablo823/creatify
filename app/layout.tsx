import type { Metadata } from "next";
import "./globals.css";
import { IBM_Plex_Sans } from "next/font/google";
import { cn } from "@/lib/utils";
import { ClerkProvider } from "@clerk/nextjs";
import { Suspense } from "react";
import LoadingSpinner from "@/components/ui/LoadingSpinner";

const IBMPlex = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-ibm-plex",
});

export const metadata: Metadata = {
  title: "Creatify",
  description: "AI Powered Image Generator",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider
      appearance={{
        variables: { colorPrimary: "#624cf5" },
      }}
    >
      <html lang="en">
        <body
          className={cn("font-IBMPlex antialiased", IBMPlex.variable)}
          suppressHydrationWarning
        >
          <Suspense fallback={<LoadingSpinner />}>{children}</Suspense>
        </body>
      </html>
    </ClerkProvider>
  );
}
