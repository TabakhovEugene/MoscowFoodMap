import { FoodEstablishment, FoodFilters } from './types';

const API_URL = "https://apidata.mos.ru/v1/datasets/1903/rows";

export async function fetchFoodEstablishments(filters: FoodFilters): Promise<FoodEstablishment[]> {
    try {
        let filterQuery = [];

        if (filters.company) filterQuery.push(`startswith(Name,'${filters.company}') eq true`);
        if (filters.type) filterQuery.push(`startswith(TypeObject,'${filters.type}') eq true`);
        if (filters.isChain) filterQuery.push("IsNetObject eq true");

        let url = `${API_URL}?api_key=${process.env.NEXT_PUBLIC_API_KEY}`;
        if (filterQuery.length > 0) {
            url += `&$filter=${encodeURIComponent(filterQuery.join(" and "))}`;
        }

        const response = await fetch(url);
        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
        return await response.json();
    } catch (error) {
        console.error("Ошибка загрузки данных:", error);
        throw error;
    }
}