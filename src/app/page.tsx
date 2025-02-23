"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { motion, AnimatePresence } from "framer-motion";
import { MdFastfood, MdExpandLess, MdExpandMore } from "react-icons/md";
import { GiKnifeFork, GiHotMeal, GiPizzaSlice, GiCoffeeCup } from "react-icons/gi";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent } from "@/components/ui/card";
import Header from "@/components/Header";

const API_KEY = "5b0a81d6-1d44-4d94-9c95-592927b0fc59";
const API_URL = "https://apidata.mos.ru/v1/datasets/1903/rows";

const MapComponent = dynamic(() => import("@/components/Map"), { ssr: false });

export default function FoodMap() {
    const [data, setData] = useState([]);
    const [filters, setFilters] = useState({ company: "", type: "", isChain: false });
    const [showFilters, setShowFilters] = useState(true);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        fetchData();
    }, [filters]);

    const fetchData = async () => {
        try {
            setIsLoading(true);
            let filterQuery = [];

            if (filters.company) filterQuery.push(`startswith(Name,'${filters.company}') eq true`);
            if (filters.type) filterQuery.push(`startswith(TypeObject,'${filters.type}') eq true`);
            if (filters.isChain) filterQuery.push("IsNetObject eq true");

            let url = `${API_URL}?api_key=${API_KEY}`;
            if (filterQuery.length > 0) {
                url += `&$filter=${encodeURIComponent(filterQuery.join(" and "))}`;
            }

            setTimeout(async () => {
                const response = await fetch(url);
                if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
                const result = await response.json();
                setData(result);
                setIsLoading(false);
            }, 500);
        } catch (error) {
            console.error("Ошибка загрузки данных:", error);
            setIsLoading(false);
        }
    };

    return (
        <div className="relative flex flex-col h-screen bg-gradient-to-b from-green-50 to-green-300">
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

            <div className="h-12 relative z-10">
                <Header />
            </div>

            <div className="flex flex-grow p-4 z-10">
                <motion.div
                    initial={{ x: -300, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                    className="w-1/4"
                >
                    <Card className="mr-4 p-0 shadow-lg rounded-xl bg-white border border-gray-200">
                        <CardContent>
                            <h2 className="text-2xl font-semibold my-4 text-gray-800">Фильтры</h2>
                            <AnimatePresence>
                                {showFilters && (
                                    <motion.div
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ duration: 0.3, ease: "easeOut" }}
                                        exit={{ opacity: 0 }}
                                    >
                                        <div className="space-y-4">
                                            <Input
                                                placeholder="Наименование"
                                                value={filters.company}
                                                onChange={(e) => setFilters({ ...filters, company: e.target.value })}
                                                className="p-2 border rounded-lg focus:ring-2 focus:ring-green-500"
                                            />
                                            <Input
                                                placeholder="Вид заведения"
                                                value={filters.type}
                                                onChange={(e) => setFilters({ ...filters, type: e.target.value })}
                                                className="p-2 border rounded-lg focus:ring-2 focus:ring-green-500"
                                            />
                                            <div className="flex items-center space-x-2">
                                                <Checkbox
                                                    checked={filters.isChain}
                                                    onCheckedChange={() => setFilters({ ...filters, isChain: !filters.isChain })}
                                                />
                                                <span className="text-gray-700">Сетевое заведение</span>
                                            </div>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                            <Button
                                onClick={() => setShowFilters(!showFilters)}
                                className="w-full p-0 mt-6 bg-green-700 hover:bg-green-800 text-white rounded-lg transition-all flex items-center justify-center"
                            >
                                {showFilters ? <MdExpandLess size={24} /> : <MdExpandMore size={24} />}
                            </Button>
                        </CardContent>
                    </Card>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                    exit={{ opacity: 0, x: 50 }}
                    className="relative w-full h-full p-4 rounded-lg border border-gray-300 shadow-md bg-white"
                >
                    {isLoading ? (
                        <div className="absolute inset-0 flex flex-col items-center justify-center bg-green-900 bg-opacity-50 text-white text-lg font-semibold rounded-lg">
                            <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1.5 }}>
                                <MdFastfood size={50} className="text-white" />
                            </motion.div>
                            <p className="mt-4">Ищем заведения для Вас...</p>
                        </div>
                    ) : (
                        <MapComponent data={data} />
                    )}
                </motion.div>
            </div>
        </div>
    );
}
