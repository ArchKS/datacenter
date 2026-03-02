import React from 'react';

interface HeaderProps {
  title: string;
  subtitle: string;
}

export const Header: React.FC<HeaderProps> = ({ title, subtitle }) => {
  return (
    <header className="text-center pt-20 pb-16 px-6">
      <h1 className="apple-hero-title mb-4">{title}</h1>
      <p className="apple-subtitle">{subtitle}</p>
    </header>
  );
};
