/**
 * Node Project Starter - Sample Library Code
 *
 * This file demonstrates best practices for a TypeScript library.
 * Replace this with your actual library code.
 *
 * @packageDocumentation
 */

/**
 * Calculates the sum of two numbers.
 *
 * @param a - The first number to add
 * @param b - The second number to add
 * @returns The sum of a and b
 *
 * @example
 * ```typescript
 * const result = add(2, 3);
 * console.log(result); // 5
 * ```
 *
 * @example
 * ```typescript
 * // Works with negative numbers
 * const result = add(-5, 10);
 * console.log(result); // 5
 * ```
 */
export function add(a: number, b: number): number {
	return a + b;
}

/**
 * Calculates the difference between two numbers.
 *
 * @param a - The number to subtract from
 * @param b - The number to subtract
 * @returns The difference of a and b
 *
 * @example
 * ```typescript
 * const result = subtract(10, 3);
 * console.log(result); // 7
 * ```
 */
export function subtract(a: number, b: number): number {
	return a - b;
}

/**
 * Multiplies two numbers together.
 *
 * @param a - The first number to multiply
 * @param b - The second number to multiply
 * @returns The product of a and b
 *
 * @example
 * ```typescript
 * const result = multiply(4, 5);
 * console.log(result); // 20
 * ```
 */
export function multiply(a: number, b: number): number {
	return a * b;
}

/**
 * Divides one number by another.
 *
 * @param a - The dividend
 * @param b - The divisor
 * @returns The quotient of a and b
 * @throws {Error} If divisor is zero
 *
 * @example
 * ```typescript
 * const result = divide(10, 2);
 * console.log(result); // 5
 * ```
 *
 * @example
 * ```typescript
 * // Throws error for division by zero
 * try {
 *   divide(10, 0);
 * } catch (error) {
 *   console.error(error.message); // "Division by zero is not allowed"
 * }
 * ```
 */
export function divide(a: number, b: number): number {
	if (b === 0) {
		throw new Error("Division by zero is not allowed");
	}
	return a / b;
}

/**
 * Checks if a number is even.
 *
 * @param n - The number to check
 * @returns True if the number is even, false otherwise
 *
 * @example
 * ```typescript
 * console.log(isEven(4)); // true
 * console.log(isEven(7)); // false
 * ```
 */
export function isEven(n: number): boolean {
	return n % 2 === 0;
}

/**
 * Options for formatting a greeting.
 */
export interface GreetingOptions {
	/**
	 * The name to greet
	 */
	name: string;

	/**
	 * Whether to use formal greeting
	 * @defaultValue false
	 */
	formal?: boolean;

	/**
	 * Custom greeting prefix
	 * @defaultValue "Hello"
	 */
	prefix?: string;
}

/**
 * Creates a greeting message.
 *
 * @param options - The greeting options
 * @returns A formatted greeting string
 *
 * @example
 * ```typescript
 * const greeting = greet({ name: "Alice" });
 * console.log(greeting); // "Hello, Alice!"
 * ```
 *
 * @example
 * ```typescript
 * // Formal greeting
 * const greeting = greet({ name: "Dr. Smith", formal: true });
 * console.log(greeting); // "Good day, Dr. Smith."
 * ```
 *
 * @example
 * ```typescript
 * // Custom prefix
 * const greeting = greet({ name: "Bob", prefix: "Hey" });
 * console.log(greeting); // "Hey, Bob!"
 * ```
 */
export function greet(options: GreetingOptions): string {
	const { name, formal = false, prefix = "Hello" } = options;

	if (formal) {
		return `Good day, ${name}.`;
	}

	return `${prefix}, ${name}!`;
}

/**
 * Validates if a string is a valid email address.
 *
 * This is a simple validation for demonstration purposes.
 * For production use, consider more robust email validation.
 *
 * @param email - The email string to validate
 * @returns True if the email appears valid, false otherwise
 *
 * @example
 * ```typescript
 * console.log(isValidEmail("user@example.com")); // true
 * console.log(isValidEmail("invalid-email")); // false
 * ```
 */
export function isValidEmail(email: string): boolean {
	const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
	return emailRegex.test(email);
}

/**
 * Type representing a calculator operation.
 */
export type Operation = "add" | "subtract" | "multiply" | "divide";

/**
 * Performs a mathematical operation on two numbers.
 *
 * @param a - The first operand
 * @param b - The second operand
 * @param operation - The operation to perform
 * @returns The result of the operation
 * @throws {Error} If the operation is invalid or division by zero
 *
 * @example
 * ```typescript
 * console.log(calculate(10, 5, "add")); // 15
 * console.log(calculate(10, 5, "multiply")); // 50
 * ```
 */
export function calculate(a: number, b: number, operation: Operation): number {
	switch (operation) {
		case "add":
			return add(a, b);
		case "subtract":
			return subtract(a, b);
		case "multiply":
			return multiply(a, b);
		case "divide":
			return divide(a, b);
		default:
			throw new Error(`Invalid operation: ${operation}`);
	}
}
