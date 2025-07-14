import type { ReactNode } from "react";

interface BackgroundProps {
	children: ReactNode;
}

export function Background({ children }: BackgroundProps) {
	return (
		<div className="bg-[url(./assets/bg.jpg)] bg-cover h-screen">
			{children}
		</div>
	);
}
