export interface FoodEstablishment {
    global_id: number;
    Cells: {
        Name: string;
        TypeObject: string;
        IsNetObject: boolean;
        OperatingCompany: string;
        Address: string;
        SeatsCount: number;
        geoData: {
            coordinates: [number, number];
        };
    };
}

export interface FoodFilters {
    company: string;
    type: string;
    isChain: boolean;
}