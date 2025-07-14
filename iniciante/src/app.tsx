import logoImg from "./assets/logo.svg";
import { Background } from "./components/background";

export function App() {
	return (
		<Background>
			<main className="flex flex-col items-center">
				<img src={logoImg} alt="Esports" />

				<section className="text-white text-center">
					<h2>Assistente de Meta</h2>
					<p>Pergunte sobre estratégias, build e dicas para seus jogos!</p>
				</section>
			</main>
		</Background>
	);
}
