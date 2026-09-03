import React from 'react';
import { SplashView } from '@/components/SplashView';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Splash | BAZAAR — AI Business Partner for Bharat',
  description: 'AI-Powered Merchant Intelligence & Commercial Copilot Platform for Indian Merchants',
};

export default function SplashPage() {
  return <SplashView />;
}
