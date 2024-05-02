import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "@/components/ui/sonner";
import ExitModel from "@/components/modals/exit-modal";
import HeartsModal from "@/components/modals/heartsModel";
import PracticeModal from "@/components/modals/practice-model";


const font = Nunito({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "ToungeTrek",
  description: "developed by Muhammad Shahzad Ali",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={font.className}>
        <ClerkProvider>
          <Toaster/>
          <ExitModel/>
          <HeartsModal/>
          <PracticeModal/>
          {children}
        </ClerkProvider>
      </body>
    </html>
  );
}
