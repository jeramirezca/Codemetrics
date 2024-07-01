import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "../components/Navbar";
import { ToastContainer, toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Codemetrics",
  description: "Pagina para generar estdisticas de tu código en python",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
      <link href="https://fonts.googleapis.com/icon?family=Material+Icons+Outlined" rel="stylesheet" />
      </head>
      <body className={inter.className}>
      <Navbar />
      <main className="flex min-h-screen flex-col bg-[#121212]">
        <div className="container mt-12 mx-auto px-12 py-4">
        {children}
        </div>
      
      </main>
      <ToastContainer position="bottom-right" pauseOnHover theme="dark"/>
        
        </body>
    </html>
  );
}
