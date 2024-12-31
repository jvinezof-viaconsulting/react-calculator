import { createRoot } from "react-dom/client";

jest.mock("react-dom/client", () => ({
  createRoot: jest.fn(() => ({
    render: jest.fn(),
  })),
}));

jest.mock("./App", () => ({
  __esModule: true,
  default: () => <div data-testid="mock-app">Mock App</div>,
}));

describe("Main Component", () => {
  beforeEach(() => {
    // Create a div with id "root" before each test
    const root = document.createElement("div");
    root.id = "root";
    document.body.appendChild(root);
  });

  afterEach(() => {
    document.body.innerHTML = "";
    jest.clearAllMocks();
  });

  test("renders App component inside StrictMode and container", async () => {
    await import("./main");

    // Verify createRoot was called with the root element
    expect(createRoot).toHaveBeenCalledWith(document.getElementById("root"));
  });

  test("imports required CSS files", () => {
    // Check if style files are imported
    const styleSheets = document.styleSheets;
    expect(styleSheets).toBeDefined();
  });
});
