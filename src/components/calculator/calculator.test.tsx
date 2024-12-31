import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { forwardRef } from "react";
import { ButtonProps } from "../button/button";
import Calculator from "./calculator";
import * as mathOperations from "../../utils/math-operations/math-operations";

jest.mock("../display/display", () => ({
  __esModule: true,
  default: ({ value }: { value: string }) => (
    <input data-testid="display" value={value} readOnly />
  ),
}));

jest.mock("../button/button", () => ({
  __esModule: true,
  default: forwardRef(
    (
      { value, onClick, onKeyDown }: ButtonProps,
      ref: React.ForwardedRef<HTMLButtonElement>
    ) => (
      <button
        data-testid={`button-${value}`}
        onClick={() => onClick(value)}
        onKeyDown={onKeyDown}
        ref={ref}
      >
        {value}
      </button>
    )
  ),
}));

jest.mock("../history/history", () => ({
  __esModule: true,
  default: ({ history }: { history: string[] }) => (
    <div data-testid="history">
      {history.map((item, index) => (
        <div key={index}>{item}</div>
      ))}
    </div>
  ),
}));

describe("Calculator Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders initial state correctly", () => {
    render(<Calculator />);
    expect(screen.getByTestId("display")).toHaveValue("");
    expect(screen.getByTestId("history")).toBeInTheDocument();
    expect(screen.getAllByTestId(/^button-/)).toHaveLength(18);
  });

  test("handles numeric button clicks", async () => {
    render(<Calculator />);
    await userEvent.click(screen.getByTestId("button-1"));
    await userEvent.click(screen.getByTestId("button-2"));
    await userEvent.click(screen.getByTestId("button-3"));
    expect(screen.getByTestId("display")).toHaveValue("123");
  });

  test("handles operator button clicks", async () => {
    render(<Calculator />);
    await userEvent.click(screen.getByTestId("button-1"));
    await userEvent.click(screen.getByTestId("button-+"));
    await userEvent.click(screen.getByTestId("button-2"));
    expect(screen.getByTestId("display")).toHaveValue("1+2");
  });

  test("handles equals button click", async () => {
    render(<Calculator />);
    await userEvent.click(screen.getByTestId("button-1"));
    await userEvent.click(screen.getByTestId("button-+"));
    await userEvent.click(screen.getByTestId("button-2"));
    await userEvent.click(screen.getByTestId("button-="));
    expect(screen.getByTestId("display")).toHaveValue("3");
  });

  test("handles clear button click", async () => {
    render(<Calculator />);
    await userEvent.click(screen.getByTestId("button-1"));
    await userEvent.click(screen.getByTestId("button-C"));
    expect(screen.getByTestId("display")).toHaveValue("");
  });

  test("handles history clear button click", async () => {
    render(<Calculator />);
    await userEvent.click(screen.getByTestId("button-1"));
    await userEvent.click(screen.getByTestId("button-="));
    await userEvent.click(screen.getByTestId("button-H"));
    expect(screen.getByTestId("display")).toHaveValue("");
    expect(screen.getByTestId("history")).toBeEmptyDOMElement();
  });

  test("handles keyboard input", async () => {
    const user = userEvent.setup();
    render(<Calculator />);

    await user.keyboard("1");
    await user.keyboard("+");
    await user.keyboard("2");
    await user.keyboard("{Enter}");

    expect(screen.getByTestId("display")).toHaveValue("3");
  });

  test("handles backspace key", async () => {
    const user = userEvent.setup();
    render(<Calculator />);

    await user.keyboard("1");
    await user.keyboard("2");
    await user.keyboard("{Backspace}");

    expect(screen.getByTestId("display")).toHaveValue("1");
  });

  test("handles arrow key navigation", () => {
    render(<Calculator />);
    const button1 = screen.getByTestId("button-1");
    fireEvent.keyDown(button1, { key: "ArrowRight" });
    expect(document.activeElement).toBeTruthy();
  });

  test('handles button navigation at boundaries', () => {
    render(<Calculator />);
    
    // Test wrapping from last to first button (nextIndex >= buttons.length)
    const lastButton = screen.getByTestId('button-H'); // Last button 'H'
    fireEvent.keyDown(lastButton, { key: 'ArrowRight' });
    const firstButton = screen.getByTestId('button-7'); // First button '7'
    expect(document.activeElement).toBe(firstButton);
  
    // Test wrapping from first to last button (nextIndex < 0)
    fireEvent.keyDown(firstButton, { key: 'ArrowLeft' });
    expect(document.activeElement).toBe(lastButton);
  });

  test("handles invalid expressions", async () => {
    render(<Calculator />);
    await userEvent.click(screen.getByTestId("button-1"));
    await userEvent.click(screen.getByTestId("button-+"));
    await userEvent.click(screen.getByTestId("button-="));
    expect(screen.getByTestId("display")).toHaveValue("1");
  });

  test("handles component unmount", () => {
    const { unmount } = render(<Calculator />);
    const removeEventListenerSpy = jest.spyOn(window, "removeEventListener");
    unmount();
    expect(removeEventListenerSpy).toHaveBeenCalledWith(
      "keydown",
      expect.any(Function)
    );
  });

  test("handles multiple operations", async () => {
    render(<Calculator />);
    await userEvent.click(screen.getByTestId("button-1"));
    await userEvent.click(screen.getByTestId("button-+"));
    await userEvent.click(screen.getByTestId("button-2"));
    await userEvent.click(screen.getByTestId("button-="));
    await userEvent.click(screen.getByTestId("button-*"));
    await userEvent.click(screen.getByTestId("button-3"));
    await userEvent.click(screen.getByTestId("button-="));
    expect(screen.getByTestId("display")).toHaveValue("9");
  });

  test("displays error message when calculation fails", async () => {
    const performOperationSpy = jest.spyOn(mathOperations, "performOperation");
    performOperationSpy.mockImplementation(() => {
      throw new Error("Test Error");
    });

    render(<Calculator />);

    await userEvent.click(screen.getByTestId("button-1"));
    await userEvent.click(screen.getByTestId("button-="));

    expect(screen.getByTestId("display")).toHaveValue("Error: Test Error");
  });
});
