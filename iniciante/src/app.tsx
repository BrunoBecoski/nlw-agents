import { useState } from "react";

import { Background } from "./components/background";
import { Chat } from "./components/chat";
import { Form } from "./components/form";
import { Header } from "./components/header";

export function App() {
	const [game, setGame] = useState<string | null>(null);
	const [questions, setQuestions] = useState<string[] | null>(null);
	const [answers, setAnswers] = useState<string[] | null>(null);

	return (
		<Background>
			{!questions && <Header />}

			<main className="max-w-xl w-[90%] m-auto mt-12">
				{questions ? (
					<Chat game={game} questions={questions} answers={answers} />
				) : (
					<Form
						setGame={setGame}
						setQuestions={setQuestions}
						setAnswers={setAnswers}
					/>
				)}
			</main>
		</Background>
	);
}
