import type React from "react";
import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Search } from "lucide-react";

export function SearchForm() {
	const navigate = useNavigate();
	const [searchParams] = useSearchParams();
	const [searchTerm, setSearchTerm] = useState(searchParams.get("q") || "");

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();

		const params = new URLSearchParams();
		if (searchTerm.trim()) {
			params.set("q", searchTerm.trim());
		}
		params.set("page", "1");

		navigate({
			pathname: "/search",
			search: params.toString(),
		});
	};

	return (
		<form
			onSubmit={handleSubmit}
			className="flex flex-col sm:flex-row gap-4"
		>
			<div className="flex-1">
				<input
					type="text"
					placeholder="Buscar Pokémon por nombre..."
					value={searchTerm}
					onChange={(e) => setSearchTerm(e.target.value)}
					className="text-lg py-3 px-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent w-full"
				/>
			</div>
			<button
				type="submit"
				className="inline-flex items-center justify-center px-8 py-3 text-lg font-semibold rounded-md bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 w-full sm:w-auto cursor-pointer"
			>
				<Search className="w-5 h-5 mr-2" />
				Buscar
			</button>
		</form>
	);
}
