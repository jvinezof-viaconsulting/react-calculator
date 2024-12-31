import { render, screen } from "@testing-library/react";
import Display from "./display";

describe("Display Component", () => {
  test('renders with default value "0" when no value is provided', () => {
    render(<Display value="" />);
    const inputElement = screen.getByRole("textbox");
    expect(inputElement).toHaveValue("0");
  });

  test("renders with the provided value", () => {
    const testValue = "Test Value";
    render(<Display value={testValue} />);
    const inputElement = screen.getByRole("textbox");
    expect(inputElement).toHaveValue(testValue);
  });

  test("renders as read-only", () => {
    render(<Display value="Read Only" />);
    const inputElement = screen.getByRole("textbox");
    expect(inputElement).toHaveAttribute("readonly");
  });
});
