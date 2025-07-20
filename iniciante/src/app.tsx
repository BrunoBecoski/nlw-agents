import { useState } from "react";

import { Background } from "./components/background";
import { Header } from "./components/header";
import { Section } from "./components/section";

export function App() {
	const [showHeader, setShowHeader] = useState(true);

	return (
		<Background>
			{showHeader && <Header />}

			<main className="max-w-xl w-[90%] m-auto mt-12">
				<Section setShowHeader={setShowHeader} />
			</main>
		</Background>
	);
}
