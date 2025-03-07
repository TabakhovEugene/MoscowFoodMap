"use client";

import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import { FoodEstablishment } from "@/lib/types";
import LoadingOverlay from "./LoadingOverlay";

const MapComponent = dynamic(() => import("@/components/Map"), { ssr: false });

interface MapWrapperProps {
    data: FoodEstablishment[];
    isLoading: boolean;
}

export default function MapWrapper({ data, isLoading }: MapWrapperProps) {
    return (
        <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            exit={{ opacity: 0, x: 50 }}
            className="relative w-full h-full p-4 rounded-lg border border-gray-300 shadow-md bg-white"
        >
            {isLoading ? <LoadingOverlay /> : <MapComponent data={data} />}
        </motion.div>
    );
}