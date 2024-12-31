import { evaluate } from "mathjs";

export const sanitizeExpression = (
  expression: string,
  removeFromEnd?: boolean
): string => {
  if (!expression) return "";

  // Remove consecutive operators, keeping only the last one
  expression = expression.replace(/([+\-*/]){2,}/g, "$1");

  // Remove invalid operators at the beginning
  expression = expression.replace(/^[+*/]/, "");

  // Remove invalid operators at the end
  if (removeFromEnd) {
    expression = expression.replace(/[+\-*/]$/, "");
  }

  return expression;
};

export const validateExpression = (expression: string): boolean => {
  const validPattern = /^-?\d+(\.\d+)?([+\-*/]-?\d+(\.\d+)?)*$/;
  return validPattern.test(expression);
};

export const performOperation = (expression: string): number => {
  if (!validateExpression(expression)) {
    throw new Error("Invalid expression");
  }

  return evaluate(expression);
};
