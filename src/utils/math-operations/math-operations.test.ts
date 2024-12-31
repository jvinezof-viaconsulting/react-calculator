import { sanitizeExpression, validateExpression, performOperation } from './math-operations';

describe('sanitizeExpression', () => {
  test('removes consecutive operators, keeping only the last one', () => {
    expect(sanitizeExpression('2++3')).toBe('2+3');
    expect(sanitizeExpression('4--5')).toBe('4-5');
    expect(sanitizeExpression('6**7')).toBe('6*7');
    expect(sanitizeExpression('8//9')).toBe('8/9');
  });

  test('removes invalid operators at the beginning', () => {
    expect(sanitizeExpression('+2+3')).toBe('2+3');
    expect(sanitizeExpression('*4-5')).toBe('4-5');
    expect(sanitizeExpression('/6*7')).toBe('6*7');
  });

  test('removes invalid operators at the end when removeFromEnd is true', () => {
    expect(sanitizeExpression('2+3+', true)).toBe('2+3');
    expect(sanitizeExpression('4-5-', true)).toBe('4-5');
    expect(sanitizeExpression('6*7*', true)).toBe('6*7');
    expect(sanitizeExpression('8/9/', true)).toBe('8/9');
  });

  test('does not remove valid operators at the end when removeFromEnd is false', () => {
    expect(sanitizeExpression('2+3+')).toBe('2+3+');
    expect(sanitizeExpression('4-5-')).toBe('4-5-');
    expect(sanitizeExpression('6*7*')).toBe('6*7*');
    expect(sanitizeExpression('8/9/')).toBe('8/9/');
  });

  test('returns an empty string for an empty input', () => {
    expect(sanitizeExpression('')).toBe('');
  });
});

describe('validateExpression', () => {
  test('returns true for valid expressions', () => {
    expect(validateExpression('2+3')).toBe(true);
    expect(validateExpression('4-5')).toBe(true);
    expect(validateExpression('6*7')).toBe(true);
    expect(validateExpression('8/9')).toBe(true);
  });

  test('returns false for expressions with invalid characters', () => {
    expect(validateExpression('2 + 3')).toBe(false);
    expect(validateExpression('2+3a')).toBe(false);
    expect(validateExpression('4-5!')).toBe(false);
    expect(validateExpression('6*7@')).toBe(false);
    expect(validateExpression('8/9#')).toBe(false);
  });

  test('returns false for expressions with unbalanced parentheses', () => {
    expect(validateExpression('(2+3')).toBe(false);
    expect(validateExpression('4-5)')).toBe(false);
    expect(validateExpression('(6*7')).toBe(false);
    expect(validateExpression('8/9)')).toBe(false);
  });

  test('returns false for expressions with balanced parentheses', () => {
    expect(validateExpression('((4-5)*6)')).toBe(false);
    expect(validateExpression('(7*(8/9))')).toBe(false);
  });
});

describe('performOperation', () => {
  test('evaluates addition correctly', () => {
    expect(performOperation('2+3')).toBe(5);
    expect(performOperation('-5+5')).toBe(0);
  });

  test('evaluates subtraction correctly', () => {
    expect(performOperation('5-2')).toBe(3);
  });

  test('evaluates multiplication correctly', () => {
    expect(performOperation('3*4')).toBe(12);
  });

  test('evaluates division correctly', () => {
    expect(performOperation('10/2')).toBe(5);
  });

  test('division by zero returns Infinity', () => {
    expect(performOperation('10/0')).toBe(Infinity);
  });

  test('evaluates complex expression correctly', () => {
    expect(performOperation('2+3*4-5/5')).toBe(13);
  });

  test('throws error on invalid expression', () => {
    expect(() => performOperation('2++3')).toThrow('Invalid expression');
  });

  test('evaluates expression with multiple operators correctly', () => {
    expect(performOperation('2+3*4-5')).toBe(9);
  });
});
