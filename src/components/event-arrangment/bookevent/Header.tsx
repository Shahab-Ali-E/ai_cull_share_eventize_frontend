import React from 'react';

export default function Header({
  title,
  subtitle,
}: {
  title: string;
  subtitle?: string;
}) {
  return (
    <>
      <h1 className="mb-4 text-4xl font-semibold text-primary md:text-7xl">
        {title}
      </h1>
      {subtitle && (
        <span className="text-sm font-light text-primary md:text-2xl">
          {subtitle}
        </span>
      )}
    </>
  );
}