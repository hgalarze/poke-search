import { useEffect, useState } from "react";
import { ArrowLeft, Ruler, Weight } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface PokemonDetails {
	id: number;
	name: string;
	sprites: {
		front_default: string;
		back_default: string;
	};
	types: Array<{
		type: {
			name: string;
		};
	}>;
	height: number;
	weight: number;
	abilities: Array<{
		ability: {
			name: string;
		};
		is_hidden: boolean;
	}>;
	stats: Array<{
		base_stat: number;
		stat: {
			name: string;
		};
	}>;
}

interface PokemonDetailProps {
	name: string;
}

export function PokemonDetail({ name }: PokemonDetailProps) {
	const navigate = useNavigate();
	const [pokemon, setPokemon] = useState<PokemonDetails | null>(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);
	const API_BASE_URL = import.meta.env.VITE_POKEMON_API_BASE_URL || "";

	useEffect(() => {
		const fetchPokemon = async () => {
			try {
				const response = await fetch(
					`${API_BASE_URL}${name.toLowerCase()}`
				);
				if (response.ok) {
					const data = await response.json();
					setPokemon(data);
				} else {
					setError("Pokémon no encontrado");
				}
			} catch (err) {
				setError("Error al cargar el Pokémon");
				console.error("Error fetching Pokemon:", err);
			} finally {
				setLoading(false);
			}
		};

		fetchPokemon();
	}, [name, API_BASE_URL]);

	const handleBack = () => {
		navigate(-1);
	};

	if (loading) {
		return (
			<div className="flex justify-center items-center py-12">
				<div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
			</div>
		);
	}

	if (error || !pokemon) {
		return (
			<div className="max-w-2xl mx-auto text-center">
				<div className="rounded-md border border-gray-200 bg-white">
					<div className="p-8">
						<p className="text-red-600 mb-4">{error}</p>
						<button
							onClick={handleBack}
							className="inline-flex items-center rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
						>
							<ArrowLeft className="w-4 h-4 mr-2" />
							Volver
						</button>
					</div>
				</div>
			</div>
		);
	}

	const typeColors: Record<string, string> = {
		normal: "bg-gray-400",
		fire: "bg-red-500",
		water: "bg-blue-500",
		electric: "bg-yellow-400",
		grass: "bg-green-500",
		ice: "bg-blue-200",
		fighting: "bg-red-700",
		poison: "bg-purple-500",
		ground: "bg-yellow-600",
		flying: "bg-indigo-400",
		psychic: "bg-pink-500",
		bug: "bg-green-400",
		rock: "bg-yellow-800",
		ghost: "bg-purple-700",
		dragon: "bg-indigo-700",
		dark: "bg-gray-800",
		steel: "bg-gray-500",
		fairy: "bg-pink-300",
	};

	const statNames: Record<string, string> = {
		hp: "HP",
		attack: "Ataque",
		defense: "Defensa",
		"special-attack": "At. Especial",
		"special-defense": "Def. Especial",
		speed: "Velocidad",
	};

	const getStatBarWidth = (baseStat: number) => {
		const percentage = Math.min((baseStat / 255) * 100, 100);
		return { width: `${percentage}%` };
	};

	return (
		<div className="max-w-4xl mx-auto py-8">
			<div className="mb-6">
				<button
					onClick={handleBack}
					className="inline-flex items-center gap-1 rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 cursor-pointer"
				>
					<ArrowLeft className="w-4 h-4 mr-2" />
					Volver
				</button>
			</div>
			<div className="overflow-hidden rounded-md border border-gray-200 bg-white/75">
				<div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-6">
					<div className="flex items-center justify-between">
						<div>
							<h2 className="text-3xl capitalize">
								{pokemon.name}
							</h2>
							<p className="text-blue-100">
								#{pokemon.id.toString().padStart(3, "0")}
							</p>
						</div>
						<div className="flex gap-2">
							{pokemon.types.map((type) => (
								<span
									key={type.type.name}
									className={`${
										typeColors[type.type.name] ||
										"bg-gray-400"
									} text-white inline-block rounded-full px-2 py-0.5 text-xs font-semibold`}
								>
									{type.type.name}
								</span>
							))}
						</div>
					</div>
				</div>

				<div className="p-8">
					<div className="grid md:grid-cols-2 gap-8">
						<div className="text-center">
							<div className="bg-gray-50 rounded-xl p-6 mb-4">
								<img
									src={
										pokemon.sprites.front_default ||
										"https://placehold.co/200x200/EFEFEF/AAAAAA?text=No+disponible&font=poppins"
									}
									alt={`${pokemon.name} frontal`}
									className="w-[200px] h-[200px] mx-auto"
								/>
							</div>
							{pokemon.sprites.back_default && (
								<div className="bg-gray-50 rounded-xl p-6">
									<img
										src={
											pokemon.sprites.back_default ||
											"https://placehold.co/200x200/EFEFEF/AAAAAA?text=No+disponible&font=poppins"
										}
										alt={`${pokemon.name} trasero`}
										className="w-[200px] h-[200px] mx-auto"
									/>
								</div>
							)}
						</div>
						<div className="space-y-6">
							<div className="grid grid-cols-2 gap-4">
								<div className="bg-blue-50 rounded-lg p-4 text-center">
									<Ruler className="w-6 h-6 mx-auto mb-2 text-blue-600" />
									<p className="text-sm text-gray-600">
										Altura
									</p>
									<p className="text-xl font-bold">
										{pokemon.height / 10} m
									</p>
								</div>
								<div className="bg-green-50 rounded-lg p-4 text-center">
									<Weight className="w-6 h-6 mx-auto mb-2 text-green-600" />
									<p className="text-sm text-gray-600">
										Peso
									</p>
									<p className="text-xl font-bold">
										{pokemon.weight / 10} kg
									</p>
								</div>
							</div>
							<div>
								<h3 className="text-lg font-semibold mb-3">
									Habilidades
								</h3>
								<div className="flex flex-wrap gap-2">
									{pokemon.abilities.map((ability, index) => (
										<span
											key={index}
											className={`capitalize inline-block rounded-full px-2 py-0.5 text-xs font-semibold ${
												ability.is_hidden
													? "bg-gray-500 text-white"
													: "border border-gray-300 bg-white text-gray-700 hover:bg-gray-50"
											}`}
										>
											{ability.ability.name.replace(
												"-",
												" "
											)}
											{ability.is_hidden && " (Oculta)"}
										</span>
									))}
								</div>
							</div>

							{/* Estadísticas */}
							<div>
								<h3 className="text-lg font-semibold mb-3">
									Estadísticas Base
								</h3>
								<div className="space-y-3">
									{pokemon.stats.map((stat) => (
										<div key={stat.stat.name}>
											<div className="flex justify-between mb-1">
												<span className="text-sm font-medium">
													{statNames[
														stat.stat.name
													] || stat.stat.name}
												</span>
												<span className="text-sm font-bold">
													{stat.base_stat}
												</span>
											</div>
											<div className="w-full bg-gray-200 rounded-full h-2">
												<div
													className="bg-blue-600 h-2 rounded-full transition-all duration-300"
													style={getStatBarWidth(stat.base_stat)}
												></div>
											</div>
										</div>
									))}
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
