import { MessageSquare } from "lucide-react";

import { Card, CardContent, CardHeader } from "@/components/ui/card";

interface QuestionProps {
	question: string;
}

export function Question({ question }: QuestionProps) {
	return (
		<Card className="bg-[#2A2634] border-0 rounded-l-lg rounded-r-none">
			<CardHeader className="flex items-center gap-4">
				<div className="flex size-8 items-center justify-center rounded-full bg-primary/10">
					<MessageSquare className="size-4 text-primary" />
				</div>

				<p className="mb-1 font-medium text-foreground">Pergunta</p>
			</CardHeader>

			<CardContent className="flex-1">
				<p className="whitespace-pre-line text-muted-foreground text-sm leading-relaxed">
					{question}
				</p>
			</CardContent>
		</Card>
	);
}
