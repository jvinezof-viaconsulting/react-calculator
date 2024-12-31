import { render, screen } from "@testing-library/react";
import History from "./history";

describe("History Component", () => {
  test("renders the history title", () => {
    render(<History history={[]} />);
    const titleElement = screen.getByText(/history/i);
    expect(titleElement).toBeInTheDocument();
  });

  test("renders an empty history list when no history is provided", () => {
    render(<History history={[]} />);
    const listItems = screen.queryAllByRole("listitem");
    expect(listItems).toHaveLength(0);
  });

  test("renders the correct number of history entries", () => {
    const historyEntries = ["Entry 1", "Entry 2", "Entry 3"];
    render(<History history={historyEntries} />);
    const listItems = screen.getAllByRole("listitem");
    expect(listItems).toHaveLength(historyEntries.length);
  });

  test("renders the correct history entries", () => {
    const historyEntries = ["Entry 1", "Entry 2", "Entry 3"];
    render(<History history={historyEntries} />);
    historyEntries.forEach((entry) => {
      expect(screen.getByText(entry)).toBeInTheDocument();
    });
  });
});
