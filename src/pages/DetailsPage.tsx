import { Suspense } from "react";
import { useParams } from "react-router-dom";
import { PokemonDetail } from "../components/pokemon-detail";

export function DetailsPage() {
	const { pokemon } = useParams();

	return (
		<Suspense
			fallback={
				<div className="flex justify-center items-center py-12">
					<div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
				</div>
			}
		>
			<PokemonDetail name={pokemon || ""} />
		</Suspense>
	);
}
