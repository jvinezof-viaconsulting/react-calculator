import { Card } from "@fluentui/react-components";

const KeyboardShortcuts: React.FC = () => {
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

  return (
    <Card className="keyboard-shortcuts">
      <h2>Keyboard Shortcuts</h2>
      <ul>
        {shortcuts.map((shortcut, index) => (
          <li key={index}>
            <strong>{shortcut.keys}</strong>: {shortcut.description}
          </li>
        ))}
      </ul>
    </Card>
  );
};

export default KeyboardShortcuts;
