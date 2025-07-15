import { Background } from "./components/background";
import { Header } from "./components/header";
import { Section } from "./components/section";

export function App() {
	return (
		<Background>
			<Header />

			<main className="max-w-xl w-[90%] m-auto mt-12">
				<Section />
			</main>
		</Background>
	);
}
