// Создание

export interface ICustomerOrderCreate {
    creator_id: number | null;
    client_id: number | null;
    sell_link: string | null;
    income_ratio: number | null; //наценка
    plan_delivery_cost: number | null;
    plan_moves_cost: number | null;
    plan_shipment_cost: number | null;
    plan_design_cost: number | null;
    plan_workers_cost: number | null;
    plan_other_expenses: number | null;
    is_from_marketing: boolean | null;

    UK: number | null;
    store_cost: number | null;
    is_from_marketing_cost: number | null;
    sum_cost: number | null;

    self_order_cost: number | null;
    sum_client_cost: number | null;
    margin_cost: number | null;
    margin_percent: number | null;
}

export interface ICustomerOrderCreateProduct {
    name: string | null;
    description: string | null;
    shipment_count: number | null;
    adjustment_count: number | null;
    branding_info: string | null;
    plan_product_unit_costprice: number | null;
    plan_branging_unit_costprice: number | null;
    other_unit_expenses: number | null;
    shipment_location_id: number | null;
}