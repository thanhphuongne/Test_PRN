import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  title: "Post Management System",
  description: "Manage your posts with ease",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-gray-50">
        <header className="bg-gray-900 text-white shadow-lg">
          <div className="container mx-auto px-4 py-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <h1 className="text-3xl font-bold">Post Management System</h1>
              <nav className="flex gap-4">
                <Link 
                  href="/" 
                  className="text-blue-300 hover:text-blue-100 transition-colors font-medium"
                >
                  Home
                </Link>
                <Link 
                  href="/create" 
                  className="text-blue-300 hover:text-blue-100 transition-colors font-medium"
                >
                  Create Post
                </Link>
              </nav>
            </div>
          </div>
        </header>
        <main className="container mx-auto px-4 py-8">
          {children}
        </main>
      </body>
    </html>
  );
}
