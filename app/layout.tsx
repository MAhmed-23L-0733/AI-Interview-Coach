import type { Metadata } from "next";
import { Suspense } from "react";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/providers/ThemeProvider";
import { Navbar } from "@/components/shared/Navbar";
import { NavbarSkeleton } from "@/components/shared/NavbarSkeleton";
import { Footer } from "@/components/shared/Footer";
import { ConditionalLayout } from "@/components/shared/ConditionalLayout";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "AI Interview Coach | Technical Interview Practice",
  description:
    "Master technical interviews with voice-led AI practice, real-time feedback, and modular diagnostics.",
};

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({
  children,
}: RootLayoutProps): React.JSX.Element {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${inter.variable} ${jetbrainsMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-screen flex-col font-sans">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <ConditionalLayout>
            <Suspense fallback={<NavbarSkeleton />}>
              <Navbar />
            </Suspense>
          </ConditionalLayout>
          <main className="flex flex-1 flex-col">{children}</main>
          <ConditionalLayout>
            <Footer />
          </ConditionalLayout>
        </ThemeProvider>
      </body>
    </html>
  );
}
