import React from 'react';

export type Language = 'ru' | 'uz' | 'en' | 'tj';

export interface PackageItem {
  name: string;
  price: string;
  duration: string;
  features: string[];
  description?: string;
  isPopular?: boolean;
}

export interface ServiceData {
  id: string;
  title: string;
  subtitle: string;
  icon: React.ReactNode;
  description: string;
  packages: PackageItem[];
  extraInfo?: {
    title: string;
    items: string[];
  }[];
  process?: {
    title: string;
    steps: { title: string; desc: string }[];
  };
  stack?: string[];
}
