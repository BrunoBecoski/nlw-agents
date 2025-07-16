import type { ReactNode } from "react";

interface BackgroundProps {
	children: ReactNode;
}

export function Background({ children }: BackgroundProps) {
	return (
		<main className="bg-[url(./assets/bg.svg)] bg-cover h-screen">
			{children}
		</main>
	);
}
