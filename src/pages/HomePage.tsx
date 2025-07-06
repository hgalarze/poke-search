import { SearchForm } from "./../components/search-form";
import { Link } from "react-router-dom";

export function HomePage() {
	return (
		<div className="min-h-screen flex flex-col justify-center">
			<div className="space-y-4 text-center">
				<h1 className="text-5xl font-bold text-gray-900 mb-4 drop-shadow-lg">
					<Link to="/">PokéSearch</Link>
				</h1>
				<p className="text-xl text-gray-700 drop-shadow-sm mb-8">
					Descubre y explora el mundo de los Pokémon
				</p>
			</div>

			<div className="space-y-4">
				<div className="bg-white/75 backdrop-blur-sm rounded-2xl shadow-xl p-8 border border-white/20">
					<SearchForm />
				</div>

				<p className="text-sm text-gray-500 text-center">
					Busca por nombre específico o deja vacío para ver todos los
					Pokémon
				</p>
			</div>
		</div>
	);
}
