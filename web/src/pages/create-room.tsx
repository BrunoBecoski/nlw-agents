import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";

import { Button } from "@/components/ui/button";

type GetRoomsAPIResponse = Array<{
	id: string;
	name: string;
}>;

export function CreateRoom() {
	const { data, isLoading } = useQuery({
		queryKey: ["get-rooms"],
		queryFn: async () => {
			const response = await fetch("http://localhost:3333/rooms");
			const result: GetRoomsAPIResponse = await response.json();

			return result;
		},
	});

	return (
		<div className="flex flex-col items-center h-screen w-screen gap-4">
			<h1 className="text-4xl my-4">Criar Sala</h1>

			{isLoading && <p className="animate-bounce">Carregando...</p>}

			<div className="flex justify-center flex-wrap gap-2">
				{data?.map((room) => (
					<Button key={room.id} className="cursor-pointer" variant="ghost">
						<Link to={`/room/${room.id}`}>{room.name}</Link>
					</Button>
				))}
			</div>
		</div>
	);
}
