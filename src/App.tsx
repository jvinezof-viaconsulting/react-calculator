import {
  FluentProvider,
  webLightTheme,
} from "@fluentui/react-components";

import Calculator from "./components/calculator/calculator";
import KeyboardShortcuts from "./components/keyboard-shortcuts/keyboard-shortcuts";

function App() {
  return (
    <FluentProvider theme={webLightTheme}>
      <Calculator />
      <KeyboardShortcuts />
    </FluentProvider>
  );
}

export default App;
