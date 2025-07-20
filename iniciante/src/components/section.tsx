import { useEffect, useState } from "react";

import { Chat } from "./chat";
import { Form } from "./form";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "./ui/card";

interface SectionProps {
	setShowHeader: (value: boolean) => void;
}

export function Section({ setShowHeader }: SectionProps) {
	const [game, setGame] = useState("");
	const [question, setQuestion] = useState("");
	const [answer, setAnswer] = useState("");

	useEffect(() => {
		if (answer) {
			setShowHeader(false);
		}
	}, [answer]);

	return (
		<>
			{answer ? (
				<section className="bg-gradient-to-b from-[#9572FC] via-[#43E7AD] to-[#E2D45C] rounded-lg pl-1 animate-appear">
					<Chat game={game} question={question} answer={answer} />
				</section>
			) : (
				<section className="bg-gradient-to-r from-[#9572FC] via-[#43E7AD] to-[#E2D45C] rounded-lg pt-1 animate-appear">
					<Card className="bg-[#2A2634] border-0 rounded-sm">
						<CardHeader>
							<CardTitle className="text-2xl">Assistente de Meta</CardTitle>
							<CardDescription className="text-[#A1A1AA]">
								Pergunte sobre estratégias, build e dicas para seus jogos!
							</CardDescription>
						</CardHeader>

						<CardContent>
							<Form
								setGame={setGame}
								setQuestion={setQuestion}
								setAnswer={setAnswer}
							/>
						</CardContent>
					</Card>
				</section>
			)}
		</>
	);
}
