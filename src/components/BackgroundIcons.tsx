"use client";

import { GiKnifeFork, GiHotMeal, GiPizzaSlice, GiCoffeeCup } from "react-icons/gi";

export default function BackgroundIcons() {
    return (
        <div className="absolute top-5 left-10 inset-0 grid grid-cols-6 grid-rows-6 gap-6 opacity-10 pointer-events-none">
            {[...Array(164)].map((_, index) => {
                const icons = [GiKnifeFork, GiHotMeal, GiPizzaSlice, GiCoffeeCup];
                const Icon = icons[index % icons.length];
                return (
                    <Icon
                        key={index}
                        size={20}
                        className="text-green-700 animate-pulse"
                        style={{
                            position: "absolute",
                            top: `${(index % 10) * 10}%`,
                            left: `${Math.floor(index / 14) * 8.5}%`,
                        }}
                    />
                );
            })}
        </div>
    );
}