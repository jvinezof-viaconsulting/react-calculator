import { render, screen } from "@testing-library/react";
import App from "./App";

jest.mock("./components/calculator/calculator", () => ({
  __esModule: true,
  default: () => <div data-testid="mock-calculator">Calculator Component</div>,
}));

jest.mock("./components/keyboard-shortcuts/keyboard-shortcuts", () => ({
  __esModule: true,
  default: () => (
    <div data-testid="mock-keyboard-shortcuts">
      Keyboard Shortcuts Component
    </div>
  ),
}));

describe("App Component", () => {
  test("renders without crashing", () => {
    render(<App />);
    expect(document.body).toBeInTheDocument();
  });

  test("renders Calculator component", () => {
    render(<App />);
    const calculatorElement = screen.getByTestId("mock-calculator");
    expect(calculatorElement).toBeInTheDocument();
  });

  test("renders KeyboardShortcuts component", () => {
    render(<App />);
    const keyboardShortcutsElement = screen.getByTestId(
      "mock-keyboard-shortcuts"
    );
    expect(keyboardShortcutsElement).toBeInTheDocument();
  });

  test("wraps components in FluentProvider", () => {
    render(<App />);
    const fluentProvider = document.querySelector('[data-theme="web-light"]');
    expect(fluentProvider).toBeInTheDocument();
  });
});
