import type { ReactNode } from "react";

interface BackgroundProps {
	children: ReactNode;
}

export function Background({ children }: BackgroundProps) {
	return (
		<main className="bg-[url(./assets/bg.svg)] bg-cover h-auto min-h-screen p-8">
			{children}
		</main>
	);
}
