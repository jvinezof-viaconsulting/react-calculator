import React from "react";

export const FluentProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <div data-testid="fluent-provider" data-theme="web-light">
      {children}
    </div>
  );
};

export const Card = ({ children }: { children: React.ReactNode }) => (
  <div data-testid="card">{children}</div>
);

export const Field = ({
  children,
  className,
  size,
}: {
  children: React.ReactNode;
  className?: string;
  size?: string;
}) => (
  <div data-testid="field" className={className} data-size={size}>
    {children}
  </div>
);

export const Input = ({
  value,
  readOnly,
}: {
  value: string;
  readOnly?: boolean;
}) => <input data-testid="input" value={value} readOnly={readOnly} />;

// eslint-disable-next-line react-refresh/only-export-components
export const webLightTheme = {
  theme: "light",
};
