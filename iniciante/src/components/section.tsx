import { useState } from "react";
import { Chat } from "./chat";
import { Form } from "./form";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "./ui/card";

export function Section() {
	const [question, setQuestion] = useState("");
	const [answer, setAnswer] = useState("");

	return (
		<>
			<section className="bg-gradient-to-r from-[#9572FC] via-[#43E7AD] to-[#E2D45C] rounded-lg pt-1 animate-appear">
				<Card className="bg-[#2A2634] border-0 rounded-sm">
					<CardHeader>
						<CardTitle className="text-2xl">Assistente de Meta</CardTitle>
						<CardDescription className="text-[#A1A1AA]">
							Pergunte sobre estratégias, build e dicas para seus jogos!
						</CardDescription>
					</CardHeader>

					<CardContent>
						<Form setQuestion={setQuestion} setAnswer={setAnswer} />
					</CardContent>
				</Card>
			</section>

			{answer && (
				<section className="bg-gradient-to-b from-[#9572FC] via-[#43E7AD] to-[#E2D45C] rounded-lg pl-1 animate-appear">
					<Chat question={question} answer={answer} />
				</section>
			)}
		</>
	);
}
