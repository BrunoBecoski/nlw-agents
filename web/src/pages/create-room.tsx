import { Link } from "react-router-dom";

import { Button } from "@/components/ui/button";

export function CreateRoom() {
	return (
		<div>
			<h1>Criar Sala</h1>
			<Link to="/room">
				<Button variant="link">Acessar Sala</Button>
			</Link>
		</div>
	);
}
