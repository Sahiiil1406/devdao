import React from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  CheckCircle2,
  XCircle,
  Code,
  Layers,
  Terminal,
  Palette,
} from "lucide-react";
import { redirect, useNavigate } from "react-router";

const ProblemCard = ({
  id = "1",
  title = "Hello World",
  description = "Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.",
  difficulty = "medium",
  category = "react",
  solved = false,
}) => {
  const navigate = useNavigate();
  const getDifficultyColor = (difficulty) => {
    switch (difficulty.toLowerCase()) {
      case "beginner":
        return "bg-[#86cae9]/10 hover:bg-[#86cae9]/20 border-[#86cae9]/20";
      case "easy":
        return "bg-[#85efac]/10 hover:bg-[#85efac]/20 border-[#85efac]/20";
      case "medium":
        return "bg-[#f19c41]/10 hover:bg-[#f19c41]/20 border-[#f19c41]/20";
      case "hard":
        return "bg-[#f87272]/10 hover:bg-[#f87272]/20 border-[#f87272]/20";
      case "expert":
        return "bg-[#d8b4fe]/10 hover:bg-[#d8b4fe]/20 border-[#d8b4fe]/20";
      default:
        return "bg-blue-500/10 hover:bg-blue-500/20 border-blue-500/20";
    }
  };

  const getDifficultyTextColor = (difficulty) => {
    switch (difficulty.toLowerCase()) {
      case "beginner":
        return "bg-[#86cae9]";
      case "easy":
        return "bg-[#85efac]";
      case "medium":
        return "bg-[#f19c41]";
      case "hard":
        return "bg-[#f87272]";
      case "expert":
        return "bg-[#d8b4fe]";
      default:
        return "bg-blue-400";
    }
  };

  const getCategoryIcon = (category) => {
    switch (category.toLowerCase()) {
      case "react":
        return <Code className="w-4 h-4" />;
      case "system design":
        return <Layers className="w-4 h-4" />;
      case "devops":
        return <Terminal className="w-4 h-4" />;
      case "css":
        return <Palette className="w-4 h-4" />;
      default:
        return <Code className="w-4 h-4" />;
    }
  };

  const getCategoryColor = (category) => {
    switch (category.toLowerCase()) {
      case "react":
        return "text-blue-400 border-blue-400";
      case "system design":
        return "text-purple-400 border-purple-400";
      case "devops":
        return "text-orange-400 border-orange-400";
      case "css":
        return "text-pink-400 border-pink-400";
      default:
        return "text-gray-400 border-gray-400";
    }
  };

  return (
    <Card
      onClick={() => {
        navigate(`../problem/${category}/${id}`);
      }}
      className={`p-6 transition-all duration-300 border-1 h-[200px] ${getDifficultyColor(
        difficulty
      )} hover:scale-105 hover:shadow-lg bg-[#222222] border-[white] cursor-pointer`}
    >
      <div className="space-y-4">
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <h3 className="text-xl font-semibold text-white">{title}</h3>
          </div>
          {solved ? (
            <CheckCircle2 className="w-6 h-6 text-green-400" />
          ) : (
            <XCircle className="w-6 h-6 text-gray-400" />
          )}
        </div>

        <p className="text-gray-300 text-sm line-clamp-2">{description}</p>

        <div className="flex items-center justify-between mt-auto">
          <div className="flex gap-4">
            <Badge
              variant="outline"
              className={`${getDifficultyTextColor(
                difficulty
              )} border-current font-medium`}
            >
              {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
            </Badge>
            <Badge
              variant="outline"
              className={`${getCategoryColor(
                category
              )} border-current font-medium flex items-center gap-1`}
            >
              {getCategoryIcon(category)}
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </Badge>
          </div>
          {/* <span
						className={`text-xs ${solved ? "text-green-400" : "text-gray-400"}`}
					>
						{solved ? "Completed" : "Not solved"}
					</span> */}
        </div>
      </div>
    </Card>
  );
};

export default ProblemCard;
