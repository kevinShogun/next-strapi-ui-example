import { Card } from "../components/Card";
import { getPrograms, getProgramsEs } from "./lib/programs";


export default async function Home() {
	const programs = await getPrograms();
	const programsEs = await getProgramsEs();
	let currentLang = "es";

	console.log(programs);

	return (
		<main className="flex min-h-screen flex-col items-center justify-center p-8">
			<h1
				className="text-2xl hidden font-bold text-center text-gray-900 dark:text-white"
				style={{
					fontFamily: "Montserrat",
					fontWeight: "bold",
					textShadow: "2px 2px 4px #aaa",
					letterSpacing: "-1px",
					lineHeight: "1.2",
					marginBottom: "20px",
					marginTop: "20px",
				}}
			>
				{currentLang === "en" ? "English Programs" : "Programas de Inglés"}
			</h1>
			<div className="w-full">
				<Card programs={programs} programsEs={programsEs} />
			</div>
		</main>
	);
}
