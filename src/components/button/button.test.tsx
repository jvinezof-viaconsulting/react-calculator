import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { forwardRef } from "react";
import Button from "./button";

jest.mock("@fluentui/react-components", () => ({
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  Button: forwardRef(({ children, ...props }: any, ref) => (
    <button ref={ref} {...props}>
      {children}
    </button>
  )),
}));

describe("Button Component", () => {
  const mockOnClick = jest.fn();
  const mockOnKeyDown = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders the button with the correct value", () => {
    render(<Button value="7" onClick={mockOnClick} />);
    expect(screen.getByText("7")).toBeInTheDocument();
  });

  it("calls onClick with the correct value when clicked", async () => {
    render(<Button value="7" onClick={mockOnClick} />);
    const button = screen.getByText("7");
    await userEvent.click(button);
    expect(mockOnClick).toHaveBeenCalledWith("7");
  });

  it("calls onKeyDown when a key is pressed", async () => {
    render(
      <Button value="7" onClick={mockOnClick} onKeyDown={mockOnKeyDown} />
    );
    const button = screen.getByRole("button");
    fireEvent.keyDown(button, "ArrowRight");
    expect(mockOnKeyDown).toHaveBeenCalled();
  });

  it("applies the danger class to H and C buttons", () => {
    const { rerender } = render(<Button value="H" onClick={mockOnClick} />);
    expect(screen.getByRole("button")).toHaveClass("danger");

    rerender(<Button value="C" onClick={mockOnClick} />);
    expect(screen.getByRole("button")).toHaveClass("danger");
  });

  it("does not apply the danger class to other buttons", () => {
    render(<Button value="7" onClick={mockOnClick} />);
    expect(screen.getByRole("button")).not.toHaveClass("danger");
  });

  it("applies primary appearance to operators", () => {
    const operators = ["+", "-", "*", "/"];
    const { rerender } = render(<Button value="+" onClick={mockOnClick} />);

    operators.forEach((operator) => {
      rerender(<Button value={operator} onClick={mockOnClick} />);
      expect(screen.getByRole("button")).toHaveAttribute(
        "appearance",
        "primary"
      );
    });
  });

  it("correctly configures accessibility attributes", () => {
    render(<Button value="7" onClick={mockOnClick} />);
    const button = screen.getByRole("button");

    expect(button).toHaveAttribute("tabIndex", "0");
    expect(button).toHaveAttribute("aria-label", "Button 7");
  });

  it("passes the ref correctly", () => {
    const ref = jest.fn();
    render(<Button value="7" onClick={mockOnClick} ref={ref} />);
    expect(ref).toHaveBeenCalled();
  });
});
