"use client";

import { motion } from "framer-motion";
import { MdFastfood } from "react-icons/md";

export default function LoadingOverlay() {
    return (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-green-900 bg-opacity-50 text-white text-lg font-semibold rounded-lg">
            <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1.5 }}>
                <MdFastfood size={50} className="text-white" />
            </motion.div>
            <p className="mt-4">Ищем заведения для Вас...</p>
        </div>
    );
}