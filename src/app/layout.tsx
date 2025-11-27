import './globals.css';
import type { Metadata } from 'next';
import { AuthProvider } from './../components/AuthContext';

export const metadata: Metadata = {
  title: 'CodeCafe Lab Admin',
  description: 'Manage blogs, dashboard, and settings',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="bg-gray-100 text-gray-800 antialiased font-sans min-h-screen" suppressHydrationWarning>
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
