import { render, screen } from "@testing-library/react";
import KeyboardShortcuts from "./keyboard-shortcuts";

describe("KeyboardShortcuts Component", () => {
  test("renders the title", () => {
    render(<KeyboardShortcuts />);
    const titleElement = screen.getByText(/keyboard shortcuts/i);
    expect(titleElement).toBeInTheDocument();
  });

  test("renders the correct number of shortcuts", () => {
    render(<KeyboardShortcuts />);
    const listItems = screen.getAllByRole("listitem");
    expect(listItems).toHaveLength(7);
  });

  test("renders the correct shortcut descriptions", () => {
    render(<KeyboardShortcuts />);
    const shortcuts = [
      { keys: "Enter", description: "Calculates the result of the expression" },
      { keys: "Backspace", description: "Deletes the last character" },
      {
        keys: "Tab or Arrow Left/Arrow Right",
        description: "Navigate through buttons and fields",
      },
      { keys: "Space", description: "Select the focused number" },
      { keys: "Shift + C", description: "Clears the current expression" },
      { keys: "Shift + H", description: "Clears the current history" },
      { keys: "0-9, +, -, *, /", description: "Insert numbers and operators" },
    ];

    shortcuts.forEach(({ keys, description }) => {
      const shortcutElement = screen.getByText((_, element) => {
        const hasText = (node: Element | null) =>
          node?.textContent === `${keys}: ${description}`;
        const elementHasText = hasText(element);
        const childrenDontHaveText = Array.from(element?.children || []).every(
          (child) => !hasText(child)
        );
        return elementHasText && childrenDontHaveText;
      });
      expect(shortcutElement).toBeInTheDocument();
    });
  });
});
