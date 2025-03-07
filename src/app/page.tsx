"use client";

import { useState, useEffect } from "react";
import Header from "@/components/Header";
import BackgroundIcons from "@/components/BackgroundIcons";
import FiltersPanel from "@/components/FiltersPanel";
import MapWrapper from "@/components/MapWrapper";
import { fetchFoodEstablishments } from "@/lib/api";
import { FoodEstablishment, FoodFilters } from "@/lib/types";

export default function FoodMap() {
    const [data, setData] = useState<FoodEstablishment[]>([]);
    const [filters, setFilters] = useState<FoodFilters>({ company: "", type: "", isChain: false });
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const getData = async () => {
            try {
                setIsLoading(true);

                setTimeout(async () => {
                    const result = await fetchFoodEstablishments(filters);
                    setData(result);
                    setIsLoading(false);
                }, 500);
            } catch (error) {
                console.error("Ошибка загрузки данных:", error);
                setIsLoading(false);
            }
        };

        getData();
    }, [filters]);

    return (
        <div className="relative flex flex-col h-screen bg-gradient-to-b from-green-50 to-green-300">
            <BackgroundIcons />

            <div className="h-12 relative z-10">
                <Header />
            </div>

            <div className="flex flex-grow p-4 z-10">
                <FiltersPanel filters={filters} setFilters={setFilters} />
                <MapWrapper data={data} isLoading={isLoading} />
            </div>
        </div>
    );
}