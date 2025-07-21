import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod/v4";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import {
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
	Form as UiForm,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { env } from "@/env";
import { generateAnswer } from "@/services/gemini";

const formSchema = z.object({
	apiKey: z
		.string()
		.min(39, { message: "Api Key inválida" })
		.startsWith("AIzaSy", { message: "Api Key inválida" }),
	game: z.string().min(1, { message: "Por favor selecione im jogo" }),
	question: z
		.string()
		.min(1, "Pergunta é obrigatória")
		.min(10, "Pergunta deve ter pelo menos 10 caracteres")
		.max(500, "Pergunta deve ter menos de 500 caracteres"),
});

type FormData = z.infer<typeof formSchema>;

interface FormProps {
	setGame: (game: string) => void;
	setQuestions: (questions: string[]) => void;
	setAnswers: (answers: string[]) => void;
}

export function Form({ setGame, setAnswers, setQuestions }: FormProps) {
	const form = useForm<FormData>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			apiKey: env.VITE_GEMINI_API_KEY,
			game: "",
			question: "",
		},
	});

	async function handleForm(data: FormData) {
		const answer = await generateAnswer(data);

		setGame(data.game);
		setQuestions([data.question]);
		setAnswers([answer]);
	}

	return (
		<section className="bg-gradient-to-r from-[#9572FC] via-[#43E7AD] to-[#E2D45C] rounded-lg pt-1 animate-appear">
			<Card className="bg-[#2A2634] border-0 rounded-sm">
				<CardHeader>
					<CardTitle className="text-2xl">Assistente de Meta</CardTitle>
					<CardDescription className="text-[#A1A1AA]">
						Pergunte sobre estratégias, build e dicas para seus jogos!
					</CardDescription>
				</CardHeader>

				<CardContent>
					<UiForm {...form}>
						<form
							onSubmit={form.handleSubmit(handleForm)}
							className="space-y-4 my-3"
						>
							<div className="flex gap-4">
								<FormField
									control={form.control}
									name="apiKey"
									render={({ field }) => {
										return (
											<FormItem className="flex-1">
												<FormLabel>API KEY do Gemini</FormLabel>

												<FormControl>
													<Input
														{...field}
														placeholder="Informe a API KEY do Gemini"
														type="password"
													/>
												</FormControl>

												<FormMessage />
											</FormItem>
										);
									}}
								/>

								<FormField
									control={form.control}
									name="game"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Jogo</FormLabel>

											<Select
												onValueChange={field.onChange}
												defaultValue={field.value}
											>
												<FormControl>
													<SelectTrigger>
														<SelectValue placeholder="Selecione um jogo" />
													</SelectTrigger>
												</FormControl>

												<SelectContent>
													<SelectItem value="Age of Empires II: Definitive Edition">
														Age of Empires II: Definitive Edition
													</SelectItem>

													<SelectItem value="Minecraft">Minecraft</SelectItem>

													<SelectItem value="Overwatch 2">
														Overwatch 2
													</SelectItem>
												</SelectContent>
											</Select>
											<FormMessage />
										</FormItem>
									)}
								/>
							</div>
							<FormField
								control={form.control}
								name="question"
								render={({ field }) => {
									return (
										<FormItem>
											<FormLabel>Pergunta</FormLabel>

											<FormControl>
												<Textarea
													{...field}
													placeholder="EX: Como fazer um Fast Castle"
												/>
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
				</CardContent>
			</Card>
		</section>
	);
}
