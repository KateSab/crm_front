// Создание
export interface ICustHead {
    sell_link: string | null;
    client: {
        id: number | null;
        name: string | null;
    };
    income_ratio: number | null; //наценка
}

export interface ICustTable {
    name: string | null;
    description: string | null;
    shipment_count: number | null;
    adjustment_count: number | null;
    branding_info: string | null;
    shipment_location: {
        id: number | null;
        name: string | null;
    };
    plan_product_unit_costprice: number | null;
    plan_branging_unit_costprice: number | null;
    total_cost_per_unit: number | null;
    total_cost_for_circulation: number | null;
    markup_for_additional_costs: number | null;
    adjustment_price: number | null;
    price_per_unit_for_client: number | null;
    price_for_circulation_for_client: number | null;
    margin: number | null;
    margin_percent: number | null;
}

export interface ICustFooter {
    UK: number | null;
    store_cost: number | null;
    plan_delivery_cost: number | null;
    plan_moves_cost: number | null;
    plan_shipment_cost: number | null;
    plan_design_cost: number | null;
    plan_workers_cost: number | null;
    plan_other_expenses: number | null;
    is_from_marketing: boolean;
    is_from_marketing_cost: number | null;
    sum_cost: number | null;
}

export interface ICustGeneralCost {
    self_order_cost: number | null;
    sum_client_cost: number | null;
    margin_cost: number | null;
    margin_percent: number | null;
}


//Для отправки на бек
export interface ICustomerOrderCreateProducts {
    name: string;
    description: string;
    shipment_count: number;
    adjustment_count: number;
    branding_info: string;
    plan_product_unit_costprice: number;
    plan_branging_unit_costprice: number;
    adjustment_price: number;
    shipment_location_id: number;
}

export interface ICustomerOrderCreate {
    creator_id: number;
    client_id: number;
    sell_link: string;
    income_ratio: number; //наценка
    plan_delivery_cost: number;
    plan_moves_cost: number;
    plan_shipment_cost: number;
    plan_design_cost: number;
    plan_workers_cost: number;
    plan_other_expenses: number;
    is_from_marketing: boolean;
    products: ICustomerOrderCreateProducts[];
}