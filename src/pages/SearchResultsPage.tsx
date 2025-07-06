import { useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { PokemonCard } from "../components/pokemon-card";
import { PaginationControls } from "../components/pagination-controls";
import { SearchForm } from "./../components/search-form";

interface Pokemon {
	name: string;
	url: string;
}

interface PokemonListResponse {
	count: number;
	next: string | null;
	previous: string | null;
	results: Pokemon[];
}

export function SearchResultsPage() {
	const [searchParams] = useSearchParams();
	const query = searchParams.get("q") || "";
	const page = Number.parseInt(
		searchParams.get("page") ||
			import.meta.env.VITE_PAGINATION_DEFAULT_START_PAGE ||
			"1"
	);

	const [pokemon, setPokemon] = useState<Pokemon[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);
	const [totalCount, setTotalCount] = useState(0);
	const [hasNext, setHasNext] = useState(false);
	const [hasPrevious, setHasPrevious] = useState(false);

	const itemsPerPage =
		Number.parseInt(import.meta.env.VITE_PAGINATION_ITEMS_PER_PAGE) || 20;
	const offset = (page - 1) * itemsPerPage;
	const API_BASE_URL = import.meta.env.VITE_POKEMON_API_BASE_URL || "";

	useEffect(() => {
		const fetchPokemon = async () => {
			setLoading(true);
			setError(null);

			try {
				if (query) {
					const response = await fetch(
						`${API_BASE_URL}${query.toLowerCase()}`
					);

					if (response.ok) {
						const pokemonData = await response.json();
						setPokemon([
							{
								name: pokemonData.name,
								url: `${API_BASE_URL}${pokemonData.name}`,
							},
						]);
						setTotalCount(1);
						setHasNext(false);
						setHasPrevious(false);
					} else {
						setPokemon([]);
						setTotalCount(0);
						setError(
							`No se encontró ningún Pokémon con el nombre "${query}"`
						);
					}
				} else {
					const response = await fetch(
						`${API_BASE_URL}?limit=${itemsPerPage}&offset=${offset}`
					);
					const data: PokemonListResponse = await response.json();

					setPokemon(data.results);
					setTotalCount(data.count);
					setHasNext(data.next !== null);
					setHasPrevious(data.previous !== null);
				}
			} catch (err) {
				setError(
					"Error al cargar los Pokémon. Por favor, intenta de nuevo."
				);
				console.error("Error fetching Pokemon:", err);
			} finally {
				setLoading(false);
			}
		};

		fetchPokemon();
	}, [query, page, offset, API_BASE_URL, itemsPerPage]);

	if (loading) {
		return (
			<div className="py-8">
				<div className="mb-6">
					<div className="space-y-4 text-center">
						<h1 className="text-5xl font-bold text-gray-900 drop-shadow-lg mb-4">
							<Link to="/">PokéSearch</Link>
						</h1>
						<p className="text-xl text-gray-700 drop-shadow-sm mb-8">
							Descubre y explora el mundo de los Pokémon
						</p>
					</div>
					<div className="bg-white rounded-2xl shadow-xl p-8">
						<SearchForm />
					</div>
				</div>
				<div className="flex justify-center items-center py-12">
					<div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
				</div>
			</div>
		);
	}

	if (error) {
		return (
			<div className="py-8">
				<div className="mb-6">
					<div className="space-y-4 text-center">
						<h1 className="text-5xl font-bold text-gray-900 drop-shadow-lg mb-4">
							<Link to="/">PokéSearch</Link>
						</h1>
						<p className="text-xl text-gray-700 drop-shadow-sm mb-8">
							Descubre y explora el mundo de los Pokémon
						</p>
					</div>
					<div className="bg-white rounded-2xl shadow-xl p-8">
						<SearchForm />
					</div>
				</div>
				<div className="max-w-2xl mx-auto flex items-center gap-2 rounded-md border border-red-300 bg-red-50 p-4 text-sm text-red-700">
					<span>{error}</span>
				</div>
			</div>
		);
	}

	if (pokemon.length === 0) {
		return (
			<div className="py-8">
				<div className="mb-6">
					<div className="space-y-4 text-center">
						<h1 className="text-5xl font-bold text-gray-900 drop-shadow-lg mb-4">
							<Link to="/">PokéSearch</Link>
						</h1>
						<p className="text-xl text-gray-700 drop-shadow-sm mb-8">
							Descubre y explora el mundo de los Pokémon
						</p>
					</div>
					<div className="bg-white rounded-2xl shadow-xl p-8">
						<SearchForm />
					</div>
				</div>
				<div className="max-w-2xl mx-auto flex items-center gap-2 rounded-md border border-yellow-300 bg-yellow-50 p-4 text-sm text-yellow-700">
					<span>No se encontraron Pokémon.</span>
				</div>
			</div>
		);
	}

	const totalPages = Math.ceil(totalCount / itemsPerPage);

	return (
		<div className="py-8">
			<div className="space-y-4 text-center">
				<h1 className="text-5xl font-bold text-gray-900 mb-4 drop-shadow-lg">
					<Link to="/">PokéSearch</Link>
				</h1>
				<p className="text-xl text-gray-700 drop-shadow-sm mb-8">
					Descubre y explora el mundo de los Pokémon
				</p>
			</div>
			<div className="bg-white/75 rounded-2xl shadow-xl p-8">
				<SearchForm />
			</div>
			<div className="w-full py-12 space-y-8">
				<div className="text-center">
					<p className="text-gray-600">
						{query
							? `Resultado para "${query}"`
							: `Mostrando ${pokemon.length} de ${totalCount} Pokémon`}
					</p>
				</div>

				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
					{pokemon.map((poke) => (
						<PokemonCard key={poke.name} pokemon={poke} />
					))}
				</div>

				{!query && totalPages > 1 && (
					<PaginationControls
						currentPage={page}
						totalPages={totalPages}
						hasNext={hasNext}
						hasPrevious={hasPrevious}
						query={query}
					/>
				)}
			</div>
		</div>
	);
}
