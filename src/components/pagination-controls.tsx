import { ChevronLeft, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface PaginationControlsProps {
	currentPage: number;
	totalPages: number;
	hasNext: boolean;
	hasPrevious: boolean;
	query: string;
}

export function PaginationControls({
	currentPage,
	totalPages,
	hasNext,
	hasPrevious,
	query,
}: PaginationControlsProps) {
	const navigate = useNavigate();

	const navigateToPage = (page: number) => {
		const params = new URLSearchParams();
		if (query) {
			params.set("q", query);
		}
		params.set("page", page.toString());

		navigate({
			pathname: "/search",
			search: params.toString(),
		});
	};

	const getVisiblePages = () => {
		const pages = [];
		const maxVisible =
			Number.parseInt(
				import.meta.env.VITE_PAGINATION_MAX_VISIBLE_PAGES
			) || 5;
		let start = Math.max(1, currentPage - Math.floor(maxVisible / 2));
		const end = Math.min(totalPages, start + maxVisible - 1);

		if (end - start + 1 < maxVisible) {
			start = Math.max(1, end - maxVisible + 1);
		}

		for (let i = start; i <= end; i++) {
			pages.push(i);
		}

		return pages;
	};

	return (
		<div className="flex flex-wrap sm:flex-nowrap items-center justify-center gap-2">
			<button
				onClick={() => navigateToPage(currentPage - 1)}
				disabled={!hasPrevious}
				className="inline-flex items-center gap-1 rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
			>
				<ChevronLeft className="w-4 h-4" />
				Anterior
			</button>

			{getVisiblePages().map((page) => {
				const isCurrent = page === currentPage;
				return (
					<button
						key={page}
						onClick={() => navigateToPage(page)}
						className={`items-center justify-center rounded-md px-3 py-1.5 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer ${
							isCurrent
								? "bg-blue-600 text-white"
								: "border border-gray-300 bg-white text-gray-700 hover:bg-gray-50"
						} ${!isCurrent ? "hidden sm:inline-flex" : ""}`}
					>
						{page}
					</button>
				);
			})}

			<button
				onClick={() => navigateToPage(currentPage + 1)}
				disabled={!hasNext}
				className="inline-flex items-center gap-1 rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
			>
				Siguiente
				<ChevronRight className="w-4 h-4" />
			</button>
		</div>
	);
}
