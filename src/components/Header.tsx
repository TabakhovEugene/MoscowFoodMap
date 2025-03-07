// Четко обозначить типы (контракты) данных с API в файле lib/types.ts
//
// Вынести определение обращения к API в lib/api.ts и API ключ в .env
//
// Выделить в элементы главной страницы (фильтры, загрузка) в отдельные компоненты.
//
// Убедиться, что билд приложение собирается (npm run build)

"use client";

import { motion } from "framer-motion";
import { MdRestaurant } from "react-icons/md";

export default function Header() {
    return (
        <motion.div
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="absolute left-[180px] top-3 transform -translate-x-1/2 w-3/4 bg-gradient-to-r from-green-500 to-green-700 shadow-lg rounded-2xl p-1 text-center text-xl font-semibold text-white z-50 flex items-center justify-center"
        >
            <MdRestaurant className="mr-2" size={24} />
            <span>Точки общественного питания по Москве</span>
        </motion.div>
    );
}
