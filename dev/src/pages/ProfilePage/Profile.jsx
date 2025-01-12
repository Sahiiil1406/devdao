import React from "react";
import { TrendingUp } from "lucide-react";
import {
  PolarGrid,
  Radar,
  RadarChart,
  PolarRadiusAxis,
} from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

const chartData = [
  { month: "January", desktop: 186, mobile: 80 },
  { month: "February", desktop: 305, mobile: 200 },
  { month: "March", desktop: 237, mobile: 120 },
  { month: "April", desktop: 73, mobile: 190 },
  { month: "May", desktop: 209, mobile: 130 },
  { month: "June", desktop: 214, mobile: 140 },
];

const chartConfig = {
  desktop: { label: "Desktop", color: "hsl(var(--chart-1))" },
  mobile: { label: "Mobile", color: "hsl(var(--chart-2))" },
};

const difficulties = [
  { name: "Beginner", total: 14, solved: 3, color: "text-blue-500" },
  { name: "Easy", total: 13, solved: 4, color: "text-green-500" },
  { name: "Medium", total: 100, solved: 2, color: "text-orange-500" },
  { name: "Hard", total: 56, solved: 1, color: "text-purple-500" },
  { name: "Extreme", total: 17, solved: 0, color: "text-pink-500" },
];

const ProfileDashboard = () => {
  return (
    <div className="min-h-screen bg-black-900 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Profile Header */}
        <div className="flex items-start gap-6 mb-8">
          <img
            src="https://avatars.githubusercontent.com/u/135805311?v=4"
            alt="Profile"
            className="w-24 h-24 rounded-lg object-cover"
          />
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-bold text-white">sahil-mengji</h1>
              <button className="text-gray-400 hover:text-gray-300">
                <TrendingUp className="w-5 h-5" />
              </button>
            </div>
            <p className="text-gray-400 mt-1">Joined less than a minute ago</p>
            <p className="text-gray-300 mt-4">
              You haven't added a bio yet—tell others a bit about yourself!
            </p>
            <button className="text-blue-400 hover:text-blue-300 mt-2">
              Update your bio
            </button>
          </div>
          <div className="relative w-32 h-32">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <div className="text-4xl font-bold text-white">10</div>
                <div className="text-sm text-gray-400">of 200</div>
              </div>
            </div>
          </div>
        </div>

        {/* Difficulty Stats & Radar Chart */}
        <div className="grid grid-cols-2 gap-6 mb-8">
          {/* Difficulty Stats */}
          <div className="grid grid-cols-3 gap-4">
            {difficulties.map((diff) => (
              <div
                key={diff.name}
                className="bg-[#27272A] rounded-lg p-4 flex flex-col items-center"
              >
                <div className={`text-sm ${diff.color} mb-2`}>{diff.name}</div>
                <div className="flex items-baseline gap-1">
                  <span className="text-2xl font-bold text-white">
                    {diff.solved}
                  </span>
                  <span className="text-gray-400 text-sm">/ {diff.total}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Radar Chart */}
          <Card>
            <CardHeader className="items-center pb-4">
              <CardTitle>Visitors Overview</CardTitle>
              <CardDescription>
                Total visitors for the last 6 months
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer config={chartConfig}>
                <RadarChart data={chartData}>
                  <ChartTooltip
                    cursor={false}
                    content={
                      <ChartTooltipContent
                        indicator="line"
                        labelKey="month"
                      />
                    }
                  />
                  <PolarGrid />
                  <Radar
                    dataKey="desktop"
                    fill="hsl(var(--chart-1))"
                    fillOpacity={0.6}
                  />
                  <Radar dataKey="mobile" fill="hsl(var(--chart-2))" />
                  <PolarRadiusAxis angle={60} axisLine={false} />
                </RadarChart>
              </ChartContainer>
            </CardContent>
          </Card>
        </div>

        {/* Bottom Cards */}
        <div className="grid grid-cols-3 gap-6">
          {/* Shared Solutions */}
          <Card>
            <CardHeader>
              <CardTitle>Shared Solutions</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-400">
                It looks like you haven't shared any solutions yet.
              </p>
              <button className="text-blue-400 hover:text-blue-300 mt-4">
                Explore your completed solutions and share your own!
              </button>
            </CardContent>
          </Card>

          {/* Badges */}
          <Card>
            <CardHeader>
              <CardTitle>Badges</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-400 text-center mb-6">
                You haven't earned a badge yet - keep going, you're close!
              </p>
              <div className="grid grid-cols-3 gap-4">
                {[...Array(4)].map((_, i) => (
                  <div
                    key={i}
                    className="w-16 h-16 rounded-full bg-gray-700"
                  >
                    <img src="/image.png" alt="image" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Recent Activity */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-7 gap-2">
                {[...Array(49)].map((_, i) => (
                  <div
                    key={i}
                    className="w-6 h-6 rounded bg-gray-700"
                  />
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ProfileDashboard;
