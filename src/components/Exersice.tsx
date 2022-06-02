import { IonContent, IonHeader, IonToolbar, IonTitle, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonItem, IonInput, IonLabel, IonApp, IonPage, IonCardSubtitle } from "@ionic/react"
import { IonReactRouter } from "@ionic/react-router";
import { useEffect, useState } from "react"

class Fractions {
	numerator: number;
	denominator: number;
	constructor(numerator: number, denominator: number) {
		this.numerator = numerator
		this.denominator = denominator
	}

	static gcd(a: number, b: number): any {
		return b ? Fractions.gcd(b, a % b) : a;
	}

	static lcm(a: number, b: number): any {
		return a * b / Fractions.gcd(a, b)
	}

	static reduce_fraction(a: number, b: number) {
		const k = Fractions.gcd(a, b)
		return [Math.floor(a / k), Math.floor(b / k)]
	}
}

const addition = (n1: number, d1: number, n2: number, d2: number) => {
	return Fractions.reduce_fraction(n1 * d2 / Fractions.gcd(d1, d2) + n2 * d1 / Fractions.gcd(d1, d2), Fractions.lcm(d1, d2))
}

const subtraction = (n1: number, d1: number, n2: number, d2: number) => {
	return Fractions.reduce_fraction(n1 * d2 / Fractions.gcd(d1, d2) - n2 * d1 / Fractions.gcd(d1, d2), Fractions.lcm(d1, d2))
}

const multiply = (n1: number, d1: number, n2: number, d2: number) => {
	return Fractions.reduce_fraction(n1 * n2, d1 * d2)
}

const division = (n1: number, d1: number, n2: number, d2: number) => {
	return Fractions.reduce_fraction(n1 * d2, d1 * n2)
}

const Exersice = () => {

	const [X, setX] = useState('')
	const [Y, setY] = useState('')

	const [answer, setAnswer] = useState<any>({
		"add": [0, 0],
		"sub": [0, 0],
		"div": [0, 0],
		"mul": [0, 0]
	})

	const handleX = (currentX: any) => {
		setX(currentX)
	}

	const handleY = (currentY: any) => {
		setY(currentY)
	}

	useEffect(() => {
		const A = X.split('/').map(x => +x)
		const B = Y.split('/').map(x => +x)

		if (A.length === 2 && B.length === 2) {
			const [n1, d1, n2, d2] = [...A, ...B]

			setAnswer({
				"add": addition(n1, d1, n2, d2),
				"sub": subtraction(n1, d1, n2, d2),
				"div": division(n1, d1, n2, d2),
				"mul": multiply(n1, d1, n2, d2)
			})
		}


	}, [X, Y])

	return (
		<IonApp>
			<IonReactRouter>
				<IonPage>
					<IonHeader>
						<IonToolbar>
							<IonTitle>Маурін Андрій</IonTitle>
							<IonTitle>КН-31</IonTitle>
							<IonTitle>Залік</IonTitle>
						</IonToolbar>
					</IonHeader>
					<IonContent>
						<IonCard>
							<IonCardHeader>
								<IonCardTitle>
									Завдання
								</IonCardTitle>
								<IonCardSubtitle>
									Розробити сервіс для арифметичних операцій над звичайними дробами. Дріб задається чисельником і знаменником. Після операцій, дроби, за необхідністю, скоротити. Результат також виводиться у вигляді дробу.
								</IonCardSubtitle>
							</IonCardHeader>
							<IonCardContent>
								<IonItem>
									<IonLabel position="fixed">X</IonLabel>
									<IonInput value={X} onIonChange={e => handleX(e.detail.value!)} />
								</IonItem>
								<IonItem>
									<IonLabel position="fixed">Y</IonLabel>
									<IonInput value={Y} onIonChange={e => handleY(e.detail.value!)} />
								</IonItem>
								{answer.add[0] !== 0 && answer.add[1] !== 0 && answer.sub[0] !== 0 && answer.sub[1] !== 0 &&
									<p>
										Add: {answer.add.join('/')}<br />
										Sub: {answer.sub.join('/')}<br />
										Mul: {answer.mul.join('/')}<br />
										Div: {answer.div.join('/')}<br />
									</p>
								}
							</IonCardContent>
						</IonCard>
					</IonContent>
				</IonPage>
			</IonReactRouter>
		</IonApp>
	)
}

export default Exersice