import React, { useState, useEffect, useCallback } from "react";

const Compare = ({ children, initialPosition = 50, showHandle = true }) => {
	const [sliderValue, setSliderValue] = useState(initialPosition);
	const [isDragging, setIsDragging] = useState(false);

	// Handle mouse/touch movement
	const handleMove = useCallback((clientX, bounds) => {
		const rect = bounds;
		const xPos = Math.min(Math.max(0, clientX - rect.left), rect.width);
		const newValue = (xPos / rect.width) * 100;
		setSliderValue(Math.min(100, Math.max(0, newValue)));
	}, []);

	// Mouse events
	const handleMouseDown = () => setIsDragging(true);

	const handleMouseMove = useCallback(
		(e) => {
			if (!isDragging) return;
			handleMove(e.clientX, e.currentTarget.getBoundingClientRect());
		},
		[isDragging, handleMove]
	);

	// Touch events
	const handleTouchMove = useCallback(
		(e) => {
			if (!isDragging) return;
			handleMove(e.touches[0].clientX, e.currentTarget.getBoundingClientRect());
		},
		[isDragging, handleMove]
	);

	// Clean up event listeners
	useEffect(() => {
		const handleMouseUp = () => setIsDragging(false);

		if (isDragging) {
			window.addEventListener("mouseup", handleMouseUp);
			window.addEventListener("touchend", handleMouseUp);
		}

		return () => {
			window.removeEventListener("mouseup", handleMouseUp);
			window.removeEventListener("touchend", handleMouseUp);
		};
	}, [isDragging]);

	// Ensure we have exactly two children
	if (!Array.isArray(children) || children.length !== 2) {
		console.error("Compare component requires exactly two children");
		return null;
	}

	return (
		<div className="flex flex-col items-center w-full max-w-lg mx-auto">
			<div
				className="relative w-full h-64 overflow-hidden select-none touch-none"
				onMouseDown={handleMouseDown}
				onMouseMove={handleMouseMove}
				onTouchStart={handleMouseDown}
				onTouchMove={handleTouchMove}
			>
				{/* First Image */}
				<div className="absolute top-0 left-0 w-full h-full">{children[0]}</div>

				{/* Second Image with Clip Path */}
				<div
					className="absolute top-0 left-0 w-full h-full"
					style={{
						clipPath: `polygon(0 0, ${sliderValue}% 0, ${sliderValue}% 100%, 0% 100%)`,
					}}
				>
					{children[1]}
				</div>

				{/* Slider Handle */}
				{showHandle && (
					<div
						className="absolute top-0 w-1 h-full cursor-ew-resize bg-white shadow-lg"
						style={{
							left: `calc(${sliderValue}% - 2px)`,
							touchAction: "none",
						}}
					>
						{/* Handle Knob */}
						<div className="absolute top-1/2 left-1/2 w-6 h-6 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white shadow-lg flex items-center justify-center">
							<div className="w-4 h-4 rounded-full bg-gray-200 flex items-center justify-center">
								<svg
									className="w-3 h-3 text-gray-600"
									fill="none"
									stroke="currentColor"
									viewBox="0 0 24 24"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={2}
										d="M9 5l7 7-7 7"
									/>
								</svg>
							</div>
						</div>
					</div>
				)}
			</div>
		</div>
	);
};

export default Compare;
