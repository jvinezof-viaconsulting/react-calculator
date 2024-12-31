import { Button as FluentButton } from "@fluentui/react-components";
import { forwardRef } from "react";

export interface ButtonProps {
  value: string;
  onClick: (value: string) => void;
  onKeyDown?: (event: React.KeyboardEvent, index?: number) => void;
}

const appearance = {
  "/": "primary",
  "*": "primary",
  "-": "primary",
  "+": "primary",
} as const;

type appearanceKey = keyof typeof appearance;

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ value, onClick, onKeyDown }, ref) => (
    <FluentButton
      ref={ref}
      onClick={() => onClick(value)}
      onKeyDown={onKeyDown}
      tabIndex={0}
      aria-label={`Button ${value}`}
      size="large"
      appearance={appearance[value as appearanceKey]}
      className={value === "H" || value === "C" ? "danger" : undefined}
    >
      {value}
    </FluentButton>
  )
);

export default Button;
