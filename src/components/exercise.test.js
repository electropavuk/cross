
class Fractions {
	constructor(numerator, denominator) {
		this.numerator = numerator
		this.denominator = denominator
	}

	static gcd(a, b) {
		return b ? Fractions.gcd(b, a % b) : a;
	}

	static lcm(a, b) {
		return a * b / Fractions.gcd(a, b)
	}

	static reduce_fraction(a, b) {
		const k = Fractions.gcd(a, b)
		return [Math.floor(a / k), Math.floor(b / k)]
	}
}
const addition = (n1, d1, n2, d2) => {
	return Fractions.reduce_fraction(n1 * d2 / Fractions.gcd(d1, d2) + n2 * d1 / Fractions.gcd(d1, d2), Fractions.lcm(d1, d2))
}

const subtraction = (n1, d1, n2, d2) => {
	return Fractions.reduce_fraction(n1 * d2 / Fractions.gcd(d1, d2) - n2 * d1 / Fractions.gcd(d1, d2), Fractions.lcm(d1, d2))
}

const multiply = (n1, d1, n2, d2) => {
	return Fractions.reduce_fraction(n1 * n2, d1 * d2)
}

const division = (n1, d1, n2, d2) => {
	return Fractions.reduce_fraction(n1 * d2, d1 * n2)
}


test('Addiction', () => {
	expect(addition(3, 4, 2, 2)).toStrictEqual([7, 4])
});

test('Sub', () => {
	expect(subtraction(1, 4, 2, 2)).toStrictEqual([-3, 4])
})

test('Mul', () => {
	expect(multiply(1, 4, 2, 2)).toStrictEqual([1, 4])
})

test('Div', () => {
	expect(division(4, 3, 2, 2)).toStrictEqual([4, 3])
})
