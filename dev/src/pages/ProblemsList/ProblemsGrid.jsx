import React, { useState, useMemo } from "react";
import ProblemCard from "./ProblemCard";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Filter, Search } from "lucide-react";
import { problems } from "@/lib/data";


export default function ProblemsGrid() {
	const [searchQuery, setSearchQuery] = useState("");
	const [selectedDifficulty, setSelectedDifficulty] = useState("all");
	const [selectedCategory, setSelectedCategory] = useState("all");

	const difficulties = ["all", "beginner", "easy", "medium", "hard", "expert"];
	const categories = ["all", "react", "system design", "devops", "css"];

	const filteredProblems = useMemo(() => {
		return problems.filter((problem) => {
			const matchesSearch = problem.title
				.toLowerCase()
				.includes(searchQuery.toLowerCase());
			const matchesDifficulty =
				selectedDifficulty === "all" ||
				problem.difficulty === selectedDifficulty;
			const matchesCategory =
				selectedCategory === "all" || problem.category === selectedCategory;
			return matchesSearch && matchesDifficulty && matchesCategory;
		});
	}, [searchQuery, selectedDifficulty, selectedCategory]);

	const getDifficultyColor = (difficulty) => {
		switch (difficulty) {
			case "beginner":
				return "bg-[#86cae9]/20 text-[#86cae9] hover:bg-[#86cae9]/30";
			case "easy":
				return "bg-[#85efac]/20 text-[#85efac] hover:bg-[#85efac]/30";
			case "medium":
				return "bg-[#f19c41]/20 text-[#f19c41] hover:bg-[#f19c41]/30";
			case "hard":
				return "bg-[#f87272]/20 text-[#f87272] hover:bg-[#f87272]/30";
			case "expert":
				return "bg-[#d8b4fe]/20 text-[#d8b4fe] hover:bg-[#d8b4fe]/30";
			default:
				return "bg-blue-500/20 text-blue-400 hover:bg-blue-500/30";
		}
	};

	const getCategoryColor = (category) => {
		switch (category) {
			case "react":
				return "bg-blue-500/20 text-blue-400 hover:bg-blue-500/30";
			case "system design":
				return "bg-purple-500/20 text-purple-400 hover:bg-purple-500/30";
			case "devops":
				return "bg-orange-500/20 text-orange-400 hover:bg-orange-500/30";
			case "css":
				return "bg-pink-500/20 text-pink-400 hover:bg-pink-500/30";
			default:
				return "bg-gray-500/20 text-gray-400 hover:bg-gray-500/30";
		}
	};

	return (
		<div className="min-h-screen  p-6 relative overflow-hidden mx-6 rounded-3xl mt-4">
			<div className="relative z-10 space-y-8 mt-8">
				{/* Filters */}
				<div className="space-y-4">
					<div className="flex flex-col md:flex-row gap-4 items-center justify-between  bg-gradient-to-r from-gray-100/20  to-gray-600/40 p-4 rounded-lg backdrop-blur-sm">
						<div className="relative w-full md:w-64">
							<Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
							<Input
								placeholder="Search problems..."
								className="pl-10 border border-gray-200/40 focus:bg-gray-200/10 focus:outline-none focus:border-gray-500 active:border-gray-500"
								value={searchQuery}
								onChange={(e) => setSearchQuery(e.target.value)}
							/>
						</div>
						<div className="flex flex-wrap gap-2 items-center">
							<Filter className="text-gray-400 w-4 h-4" />
							{difficulties.map((difficulty) => (
								<Badge
									key={difficulty}
									className={`cursor-pointer transition-all text-white ${
										selectedDifficulty === difficulty
											? getDifficultyColor(difficulty)
											: "bg-gray-200/20"
									}`}
									onClick={() => setSelectedDifficulty(difficulty)}
								>
									{difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
								</Badge>
							))}
							{categories.map((category) => (
								<Badge
									key={category}
									className="cursor-pointer transition-all bg-gray-200/20"
									onClick={() => setSelectedCategory(category)}
								>
									{category.charAt(0).toUpperCase() + category.slice(1)}
								</Badge>
							))}
						</div>
					</div>
				</div>

				{/* Problems Grid */}
				<div className="grid gap-6 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 max-w-[1200px]">
					{filteredProblems.map((problem, index) => (
						<div
							key={index}
							className="transform transition-all duration-300 hover:translate-y-[-4px]"
						>
							<ProblemCard {...problem} />
						</div>
					))}
				</div>

				{/* No Results */}
				{filteredProblems.length === 0 && (
					<div className="text-center py-12">
						<p className="text-gray-400">
							No problems found matching your criteria. Try adjusting your
							filters.
						</p>
					</div>
				)}
			</div>
		</div>
	);
}
