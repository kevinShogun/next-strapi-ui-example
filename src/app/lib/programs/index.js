import { API_URL } from "../../config";
export async function getPrograms() {
	const res = await fetch(
		`${API_URL}/english-programs?populate[lessons]=*&locale=en`, { next: { revalidate: 300 } });
	if (!res.ok) return null;

	const { data } = await res.json();
	return data;
}

export async function getProgramsEs() {
	const res = await fetch(
		`${API_URL}/english-programs?populate[lessons]=*&locale=es-CR`
	);
	if (!res.ok) return null;

	const { data } = await res.json();
	return data;
}

export async function getProgramsOnly(lang) {
	const res = await fetch(
		`${process.env.NEXT_PUBLIC_API_URL}/api/english-programs?locale=${lang}`
	);
	console.log("aqui");
	if (!res.ok) return null;

	const { data } = await res.json();
	return [
		...data.map((program) => ({
			id: program.id,
			title: program.attributes.title,
			slug: program.attributes.slug,
			locale: program.attributes.locale,
			description: program.attributes.description,
			aviableDate: program.attributes.aviableDate,
			lessonsQuantity: program.attributes.lessonsQuantity,
		})),
	];
}

export async function getOneProgramOnly(slug) {
	const res = await fetch(
		`${process.env.NEXT_PUBLIC_API_URL}/api/english-programs?filters[slug]=${slug}&locale=en`
	);
	if (!res.ok) return null;

	const resEsp = await fetch(
		`${process.env.NEXT_PUBLIC_API_URL}/api/english-programs?filters[slug]=${slug}&locale=es-CR`
	);
	if (!resEsp.ok) return null;

	const { data: dataEs } = await resEsp.json();
	const { data } = await res.json();

	const fullData = [
		...data.map((program) => ({
			id: program.id,
			title: program.attributes.title,
			slug: program.attributes.slug,
			locale: program.attributes.locale,
			description: program.attributes.description,
			lessonsQuantity: program.attributes.lessonsQuantity,
			aviableDate: program.attributes.aviableDate,
		})),
		...dataEs.map((program) => ({
			id: program.id,
			title: program.attributes.title,
			slug: program.attributes.slug,
			locale: program.attributes.locale,
			description: program.attributes.description,
			lessonsQuantity: program.attributes.lessonsQuantity,
			aviableDate: program.attributes.aviableDate,
		})),
	];
	return fullData;
}
