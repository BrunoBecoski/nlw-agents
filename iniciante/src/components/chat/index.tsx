import { Button } from "../ui/button";
import { Card, CardContent, CardHeader } from "../ui/card";
import { Input } from "../ui/input";
import { Answer } from "./answer";
import { Question } from "./question";

type ChatProps = {
	game: string;
	question: string;
	answer: string;
};

export function Chat({ game, question, answer }: ChatProps) {
	return (
		<div>
			<Card className="bg-[#2A2634] border-0 rounded-l-lg rounded-r-none mb-1">
				<CardHeader>
					<p className="font-medium text-foreground">Pergunta sobre: {game}</p>
				</CardHeader>
			</Card>

			<div className="space-y-1">
				<Question question={question} />

				<Answer answer={answer} />
			</div>
		</div>
	);
}
