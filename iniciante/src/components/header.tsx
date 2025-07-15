import logoImg from "../assets/logo.svg";

export function Header() {
	return (
		<header className="flex justify-center mt-8">
			<img src={logoImg} alt="Esports" className="w-64" />
		</header>
	);
}
