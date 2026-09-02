import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Munim — AI Business Partner for Indian SMBs',
  description: 'Munim is the brain, AI Bazaar is the commerce layer, and Razorpay is the payment infrastructure.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
      </head>
      <body className="bg-[#f8f9fa] text-slate-900 min-h-screen font-sans antialiased selection:bg-[#059669] selection:text-white">
        {children}
      </body>
    </html>
  );
}
