import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod/v4";

import { env } from "@/env";
import { generateAnswer } from "@/services/gemini";
import { Button } from "./ui/button";
import {
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
	Form as UiForm,
} from "./ui/form";
import { Input } from "./ui/input";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "./ui/select";
import { Textarea } from "./ui/textarea";

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

export function Form() {
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

		console.log(answer);
	}

	return (
		<UiForm {...form}>
			<form onSubmit={form.handleSubmit(handleForm)} className="space-y-4 my-3">
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
										<SelectItem value="minecraft">Minecraft</SelectItem>

										<SelectItem value="age-of-empires-2-de">
											Age of Empires II: Definitive Edition
										</SelectItem>

										<SelectItem value="overwatch-2">Overwatch 2</SelectItem>
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
									<Textarea {...field} placeholder="EX: Como fazer uma cama" />
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
	);
}
