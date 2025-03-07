"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { MdExpandLess, MdExpandMore } from "react-icons/md";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent } from "@/components/ui/card";
import { FoodFilters } from "@/lib/types";

interface FiltersPanelProps {
    filters: FoodFilters;
    setFilters: (filters: FoodFilters) => void;
}

export default function FiltersPanel({ filters, setFilters }: FiltersPanelProps) {
    const [showFilters, setShowFilters] = useState(true);

    return (
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
    );
}