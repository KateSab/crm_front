export interface IRuleForm {
    status_id: number;
    sell_order_id: number | null;
    client_id: number | null;
    shipment_location_id: number | null;
    shipment_date_planned: string;
    base_margin: number;
    delivery_cost_planned: number | null;
    shipment_cost_planned: number | null;
    other_expenses_planned: number | null;
    instructions: string;
    self_cost_total: number | null;
    rrc_total: number | null;
    marginality_total: number | null;
    marginality_total_in_percents: number | null;
}

export interface IProduct {
    name: string;
    design_link: string;
    count: number;
    shipment_location_id: number;
    planned_supplier_id: number;
    planned_type_of_branding_id: number;
    planned_contractor_id: number;
    product_cost_price_planned: number;
    branding_cost_price_planned: number;
    cost_price_global: number;
    price: number;
    rrc_global: number;
    marginality: number,
    marginality_in_percents: number,
    editable: boolean;
}