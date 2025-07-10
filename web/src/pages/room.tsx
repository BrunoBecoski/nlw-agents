import { Navigate, useParams } from "react-router-dom";

type RoomParams = {
	roomId: string;
};

export function Room() {
	const params = useParams<RoomParams>();

	if (!params.roomId) {
		return <Navigate replace to="/" />;
	}

	return (
		<div className="flex flex-col items-center h-screen w-screen gap-4">
			<h1 className="text-4xl my-4">Detalhes da Sala</h1>

			<div className="flex justify-center items-center h-full w-full">
				<p className="animate-spin w-fit">{params.roomId}</p>
			</div>
		</div>
	);
}
