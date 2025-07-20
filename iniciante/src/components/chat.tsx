import { Bot, MessageSquare } from "lucide-react";
import Markdown from "react-markdown";

import { Card, CardContent } from "./ui/card";

type ChatProps = {
	game: string;
	question: string;
	answer: string;
};

export function Chat({ game, question, answer }: ChatProps) {
	return (
		<Card className="bg-[#2A2634] mt-8 border-0 rounded-sm">
			<CardContent>
				<div className="space-y-4">
					<div className="flex items-start space-x-3">
						<div className="flex-shrink-0">
							<div className="flex size-8 items-center justify-center rounded-full bg-primary/10">
								<MessageSquare className="size-4 text-primary" />
							</div>
						</div>

						<div className="flex-1">
							<p className="mb-1 font-medium text-foreground">
								Pergunta sobre: {game}
							</p>

							<p className="whitespace-pre-line text-muted-foreground text-sm leading-relaxed">
								{question}
							</p>
						</div>
					</div>

					<div className="flex items-start space-x-3">
						<div className="flex-shrink-0">
							<div className="flex size-8 items-center justify-center rounded-full bg-primary/10">
								<Bot className="size-4 text-secondary-foreground" />
							</div>
						</div>

						<div className="flex-1">
							<p className="mb-1 font-medium text-foreground">Resposta da IA</p>

							<div className="text-muted-foreground whitespace-pre-line text-sm leading-relaxed">
								<Markdown>{answer}</Markdown>
							</div>
						</div>
					</div>
				</div>
			</CardContent>
		</Card>
	);
}
