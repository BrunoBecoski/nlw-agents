import { Wand } from "lucide-react";
import { Button } from "./components/ui/button";
export function App() {
	return (
		<div>
			<Button variant="default">Hello Word</Button>
			<Button variant="destructive">Hello Word</Button>
			<Button variant="ghost">Hello Word</Button>
			<Button variant="link">Hello Word</Button>
			<Button variant="outline">Hello Word</Button>
			<Button variant="secondary">Hello Word</Button>
			<Button size="default">
				<Wand />
			</Button>
			<Button size="icon">
				<Wand />
			</Button>
			<Button size="lg">
				<Wand />
			</Button>
			<Button size="sm">
				<Wand />
			</Button>
		</div>
	);
}
