/**
 * Test suite for Node Project Starter library
 *
 * This file demonstrates best practices for testing with Vitest.
 * Replace these tests with your actual test cases.
 */

import { describe, expect, it } from "vitest";
import { fc, test } from "@fast-check/vitest";
import {
	add,
	calculate,
	divide,
	greet,
	isEven,
	isValidEmail,
	multiply,
	subtract,
	type GreetingOptions,
	type Operation,
} from "../src/index.js";

describe("Mathematical Operations", () => {
	describe("add", () => {
		it("should add two positive numbers", () => {
			expect(add(2, 3)).toBe(5);
		});

		it("should add two negative numbers", () => {
			expect(add(-2, -3)).toBe(-5);
		});

		it("should add a positive and negative number", () => {
			expect(add(10, -5)).toBe(5);
		});

		it("should handle zero", () => {
			expect(add(0, 5)).toBe(5);
			expect(add(5, 0)).toBe(5);
			expect(add(0, 0)).toBe(0);
		});

		// Property-based test with @fast-check
		test.prop([fc.integer(), fc.integer()])("should be commutative", (a, b) => {
			expect(add(a, b)).toBe(add(b, a));
		});

		test.prop([fc.integer(), fc.integer()])(
			"should be associative with third number",
			(a, b) => {
				const c = 10;
				expect(add(add(a, b), c)).toBe(add(a, add(b, c)));
			},
		);
	});

	describe("subtract", () => {
		it("should subtract two positive numbers", () => {
			expect(subtract(10, 3)).toBe(7);
		});

		it("should subtract two negative numbers", () => {
			expect(subtract(-10, -3)).toBe(-7);
		});

		it("should handle zero", () => {
			expect(subtract(5, 0)).toBe(5);
			expect(subtract(0, 5)).toBe(-5);
		});

		test.prop([fc.integer(), fc.integer()])("should satisfy a - b + b = a", (a, b) => {
			expect(add(subtract(a, b), b)).toBe(a);
		});
	});

	describe("multiply", () => {
		it("should multiply two positive numbers", () => {
			expect(multiply(4, 5)).toBe(20);
		});

		it("should multiply by zero", () => {
			expect(multiply(5, 0)).toBe(0);
			expect(multiply(0, 5)).toBe(0);
		});

		it("should multiply by one", () => {
			expect(multiply(5, 1)).toBe(5);
			expect(multiply(1, 5)).toBe(5);
		});

		it("should multiply negative numbers", () => {
			expect(multiply(-2, 3)).toBe(-6);
			expect(multiply(-2, -3)).toBe(6);
		});

		test.prop([fc.integer(), fc.integer()])("should be commutative", (a, b) => {
			expect(multiply(a, b)).toBe(multiply(b, a));
		});
	});

	describe("divide", () => {
		it("should divide two positive numbers", () => {
			expect(divide(10, 2)).toBe(5);
		});

		it("should divide negative numbers", () => {
			expect(divide(-10, 2)).toBe(-5);
			expect(divide(-10, -2)).toBe(5);
		});

		it("should divide by one", () => {
			expect(divide(5, 1)).toBe(5);
		});

		it("should throw error when dividing by zero", () => {
			expect(() => divide(10, 0)).toThrow("Division by zero is not allowed");
		});

		it("should throw error when dividing zero by zero", () => {
			expect(() => divide(0, 0)).toThrow("Division by zero is not allowed");
		});

		test.prop([fc.integer(), fc.integer({ min: 1 })])(
			"should satisfy (a / b) * b ≈ a for non-zero divisors",
			(a, b) => {
				const result = divide(a, b);
				expect(Math.abs(multiply(result, b) - a)).toBeLessThan(0.0001);
			},
		);
	});
});

describe("Utility Functions", () => {
	describe("isEven", () => {
		it("should return true for even numbers", () => {
			expect(isEven(0)).toBe(true);
			expect(isEven(2)).toBe(true);
			expect(isEven(4)).toBe(true);
			expect(isEven(-2)).toBe(true);
		});

		it("should return false for odd numbers", () => {
			expect(isEven(1)).toBe(false);
			expect(isEven(3)).toBe(false);
			expect(isEven(-1)).toBe(false);
			expect(isEven(-3)).toBe(false);
		});

		test.prop([fc.integer()])("should satisfy n is even ⟺ n+2 is even", (n) => {
			expect(isEven(n)).toBe(isEven(n + 2));
		});
	});

	describe("isValidEmail", () => {
		it("should return true for valid email addresses", () => {
			expect(isValidEmail("user@example.com")).toBe(true);
			expect(isValidEmail("test.user@example.co.uk")).toBe(true);
			expect(isValidEmail("user+tag@example.com")).toBe(true);
		});

		it("should return false for invalid email addresses", () => {
			expect(isValidEmail("invalid-email")).toBe(false);
			expect(isValidEmail("@example.com")).toBe(false);
			expect(isValidEmail("user@")).toBe(false);
			expect(isValidEmail("user @example.com")).toBe(false);
			expect(isValidEmail("")).toBe(false);
		});
	});
});

describe("Greeting Functions", () => {
	describe("greet", () => {
		it("should create a default greeting", () => {
			const options: GreetingOptions = { name: "Alice" };
			expect(greet(options)).toBe("Hello, Alice!");
		});

		it("should create a formal greeting", () => {
			const options: GreetingOptions = { name: "Dr. Smith", formal: true };
			expect(greet(options)).toBe("Good day, Dr. Smith.");
		});

		it("should use custom prefix", () => {
			const options: GreetingOptions = { name: "Bob", prefix: "Hey" };
			expect(greet(options)).toBe("Hey, Bob!");
		});

		it("should handle both custom prefix and formal flag", () => {
			// Formal flag takes precedence
			const options: GreetingOptions = {
				name: "Prof. Jones",
				formal: true,
				prefix: "Hi",
			};
			expect(greet(options)).toBe("Good day, Prof. Jones.");
		});

		it("should handle empty name", () => {
			const options: GreetingOptions = { name: "" };
			expect(greet(options)).toBe("Hello, !");
		});
	});
});

describe("Calculator Function", () => {
	describe("calculate", () => {
		it("should perform addition", () => {
			expect(calculate(10, 5, "add")).toBe(15);
		});

		it("should perform subtraction", () => {
			expect(calculate(10, 5, "subtract")).toBe(5);
		});

		it("should perform multiplication", () => {
			expect(calculate(10, 5, "multiply")).toBe(50);
		});

		it("should perform division", () => {
			expect(calculate(10, 5, "divide")).toBe(2);
		});

		it("should throw error for division by zero", () => {
			expect(() => calculate(10, 0, "divide")).toThrow("Division by zero is not allowed");
		});

		// Property-based test for all operations
		test.prop([fc.integer(), fc.integer({ min: 1 }), fc.constantFrom<Operation>("add", "subtract", "multiply", "divide")])(
			"should return a number for valid operations",
			(a, b, op) => {
				const result = calculate(a, b, op);
				expect(typeof result).toBe("number");
				expect(Number.isFinite(result)).toBe(true);
			},
		);
	});
});

describe("Edge Cases and Error Handling", () => {
	it("should handle very large numbers", () => {
		const large = Number.MAX_SAFE_INTEGER;
		expect(add(large, 0)).toBe(large);
		expect(multiply(large, 1)).toBe(large);
	});

	it("should handle very small numbers", () => {
		const small = Number.MIN_SAFE_INTEGER;
		expect(add(small, 0)).toBe(small);
		expect(multiply(small, 1)).toBe(small);
	});

	it("should handle decimal numbers", () => {
		expect(add(0.1, 0.2)).toBeCloseTo(0.3);
		expect(multiply(0.2, 3)).toBeCloseTo(0.6);
	});
});
