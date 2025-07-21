import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import z from "zod/v4";

import { Button } from "@/components/ui/button";
import { Card, CardHeader } from "@/components/ui/card";
import {
	FormControl,
	FormField,
	FormItem,
	FormMessage,
	Form as UiForm,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { Answer } from "./answer";
import { Question } from "./question";

type ChatProps = {
	game: string | null;
	questions: string[];
	answers: string[] | null;
};

const formSchema = z.object({
	question: z
		.string()
		.min(1, "Pergunta é obrigatória")
		.min(10, "Pergunta deve ter pelo menos 10 caracteres")
		.max(500, "Pergunta deve ter menos de 500 caracteres"),
});

type FormData = z.infer<typeof formSchema>;

export function Chat({ game, questions, answers }: ChatProps) {
	const form = useForm<FormData>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			question: "",
		},
	});

	async function handleForm(data: FormData) {
		console.log(data);
	}

	return (
		<section>
			<div className="bg-gradient-to-r from-[#9572FC] via-[#43E7AD] to-[#E2D45C] pl-1">
				<Card className="bg-[#2A2634] border-0 rounded-l-lg rounded-r-none mb-1">
					<CardHeader>
						<p className="font-medium text-foreground">
							Pergunta sobre: {game}
						</p>
					</CardHeader>
				</Card>

				<div className="space-y-1">
					<Question question={questions[0]} />

					{answers && <Answer answer={answers[0]} />}
				</div>
			</div>

			<UiForm {...form}>
				<form
					onSubmit={form.handleSubmit(handleForm)}
					className="space-y-4 my-3 bg-[#2A2634] p-4"
				>
					<FormField
						control={form.control}
						name="question"
						render={({ field }) => {
							return (
								<FormItem className="flex-1">
									<FormControl>
										<Textarea {...field} placeholder="Faça outra pergunta" />
									</FormControl>

									<FormMessage />
								</FormItem>
							);
						}}
					/>

					<Button
						type="submit"
						className="w-full bg-gradient-to-l from-[#9572FC] via-[#43E7AD] to-[#E2D45C] font-bold text-black uppercase cursor-pointer hover:-translate-y-0.5 hover:shadow-[#FFF86B33] hover:shadow-md "
						disabled={form.formState.isSubmitting}
					>
						{form.formState.isSubmitting ? "Perguntando..." : "Perguntar"}
					</Button>
				</form>
			</UiForm>
		</section>
	);
}
