import { Card } from "@fluentui/react-components";

const KeyboardShortcuts: React.FC = () => {
  const shortcuts = [
    { keys: "Enter", description: "Calculates the result of the expression" },
    { keys: "Backspace", description: "Deletes the last character" },
    {
      keys: "Tab/Arrow Right",
      description: "Navigate to next button",
    },
    {
      keys: "Shift + Tab/Arrow Left",
      description: "Navigate to previous button",
    },
    { keys: "Space", description: "Select the focused button" },
    { keys: "Shift + C", description: "Clear current expression" },
    { keys: "Shift + H", description: "Clear history" },
    { keys: "0-9", description: "Input numbers" },
    { keys: "+/-/*", description: "Input operators" },
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
