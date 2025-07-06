import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

interface Pokemon {
	name: string;
	url: string;
}

interface PokemonDetails {
	id: number;
	name: string;
	sprites: {
		front_default: string;
	};
	types: Array<{
		type: {
			name: string;
		};
	}>;
	height: number;
	weight: number;
}

interface PokemonCardProps {
	pokemon: Pokemon;
}

export function PokemonCard({ pokemon }: PokemonCardProps) {
	const navigate = useNavigate();
	const [details, setDetails] = useState<PokemonDetails | null>(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchDetails = async () => {
			try {
				const response = await fetch(pokemon.url);
				const data = await response.json();
				setDetails(data);
			} catch (error) {
				console.error("Error fetching Pokemon details:", error);
			} finally {
				setLoading(false);
			}
		};

		fetchDetails();
	}, [pokemon.url]);

	const handleClick = () => {
		navigate({
			pathname: `/details/${pokemon.name}`,
		});
	};

	if (loading) {
		return (
			<div className="cursor-pointer rounded-md border border-gray-200 bg-white hover:shadow-lg transition-shadow">
				<div className="p-6">
					<div className="animate-pulse">
						<div className="w-24 h-24 bg-gray-200 rounded-full mx-auto mb-4"></div>
						<div className="h-4 bg-gray-200 rounded mb-2"></div>
						<div className="h-3 bg-gray-200 rounded w-2/3 mx-auto"></div>
					</div>
				</div>
			</div>
		);
	}

	if (!details) {
		return null;
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

	return (
		<div
			onClick={handleClick}
			className="cursor-pointer rounded-md border border-gray-200 bg-white hover:shadow-xl hover:scale-105 transition-all duration-200 opacity-75"
		>
			<div className="p-6 text-center">
				<img
					src={
						 details.sprites.front_default || "https://placehold.co/96x96/EFEFEF/AAAAAA?text=No+disponible&font=poppins"
					}
					alt={details.name}
					className="w-24 h-24 mx-auto mb-4"
				/>
				<h3 className="font-bold text-lg capitalize mb-2">
					{details.name}
				</h3>
				<p className="text-sm text-gray-500 mb-3">
					#{details.id.toString().padStart(3, "0")}
				</p>
				<div className="flex flex-wrap gap-1 justify-center">
					{details.types.map((type) => (
						<span
							key={type.type.name}
							className={`${
								typeColors[type.type.name] || "bg-gray-400"
							} text-white text-xs inline-block rounded-full px-2 py-0.5 font-semibold`}
						>
							{type.type.name}
						</span>
					))}
				</div>
			</div>
		</div>
	);
}
