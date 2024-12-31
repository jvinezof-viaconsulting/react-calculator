import { Card } from "@fluentui/react-components";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Button from "../button/button";
import Display from "../display/display";
import History from "../history/history";
import { performOperation, sanitizeExpression } from "../../utils/math-operations/math-operations";

const Calculator: React.FC = () => {
  const [expression, setExpression] = useState("");
  const [history, setHistory] = useState<string[]>([]);

  const buttons = useMemo(
    () => [
      "7",
      "8",
      "9",
      "/",
      "4",
      "5",
      "6",
      "*",
      "1",
      "2",
      "3",
      "-",
      "0",
      ".",
      "=",
      "+",
      "C",
      "H",
    ],
    []
  );

  const buttonRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const handleButtonClick = useCallback(
    (value: string) => {
      if (value === "=") {
        try {
          const newExpression = sanitizeExpression(expression, true);

          const result = performOperation(newExpression);
          setHistory([...history, `${newExpression} = ${result}`]);
          setExpression(result.toString());
        } catch (error) {
          setExpression(`${error}`);
        }
      } else if (value === "C") {
        setExpression("");
      } else if (value === "H") {
        setExpression("");
        setHistory([]);
      } else {
        const newExpression = sanitizeExpression(expression + value);
        setExpression(newExpression);
      }
    },
    [expression, history]
  );

  const handleKeyPress = useCallback(
    (event: KeyboardEvent) => {
      const { key } = event;

      if (buttons.includes(key)) {
        handleButtonClick(key);
      } else if (key === "Enter") {
        handleButtonClick("=");
      } else if (key === "Backspace") {
        setExpression((prev) => prev.slice(0, -1));
      }
    },
    [buttons, handleButtonClick]
  );

  const focusNextButton = (currentIndex: number, direction: number) => {
    let nextIndex = currentIndex + direction;
    if (nextIndex >= buttons.length) nextIndex = 0;
    if (nextIndex < 0) nextIndex = buttons.length - 1;
    buttonRefs.current[nextIndex]?.focus();
  };

  const handleKeyDownOnButton = (event: React.KeyboardEvent, index: number) => {
    if (event.key === "ArrowRight") focusNextButton(index, 1);
    if (event.key === "ArrowLeft") focusNextButton(index, -1);
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyPress);
    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, [expression, handleKeyPress]);

  return (
    <Card>
      <Display value={expression} />
      <div className="buttons">
        {buttons.map((btn, index) => (
          <Button
            key={btn}
            value={btn}
            onClick={handleButtonClick}
            ref={(el) => (buttonRefs.current[index] = el)}
            onKeyDown={(event) => handleKeyDownOnButton(event, index)}
          />
        ))}
      </div>
      <History history={history} />
    </Card>
  );
};

export default Calculator;
