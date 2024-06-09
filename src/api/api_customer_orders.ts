import axios from "axios";
import router from '@/router';
import { success_notification, error_notification } from '@/services/utils/notification_utils';
import { ICustHead, ICustTable, ICustFooter, ICustGeneralCost, ICustomerOrderCreate } from '@/interfaces/ICustomerOrder';

export async function getCustomerOrdersApi(limit: number = 1000, status_id: number = 1) {
    const params = {
        'limit': limit,
        'status_id': status_id
    };
    const url = 'http://89.104.68.248:8000/api/customerorder/get_filter';
    try {
        const response = await axios.get(url, { params });
        return response.data.map((order: any) => ({
            id: order.id,
            create_date: order.create_date,
            client: order.client_id,
            instructions: order.instructions,
            status: order.status_id
        }));
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
}

// преобразование данных в json
export const jsonCustomerOrder = (header: ICustHead, tableData: ICustTable[], footer: ICustFooter, result: ICustGeneralCost) => {
    const table = tableData.map(row => {
        return {
            'name': row.name,
            'description': row.description,
            'shipment_count': row.shipment_count,
            'adjustment_count': row.adjustment_count,
            'branding_info': row.branding_info,
            'plan_product_unit_costprice': row.plan_product_unit_costprice,
            'plan_branging_unit_costprice': row.plan_branging_unit_costprice,
            'adjustment_price': row.adjustment_price,
            'shipment_location_id': row.shipment_location.id,
        }
    });
    const customerorder: ICustomerOrderCreate = {
        'creator_id': 1, //id текущего юзера
        'client_id': header.client.id,
        'sell_link': header.sell_link,
        'income_ratio': header.income_ratio, //наценка
        'plan_delivery_cost': footer.plan_delivery_cost,
        'plan_moves_cost': footer.plan_moves_cost,
        'plan_shipment_cost': footer.plan_shipment_cost,
        'plan_design_cost': footer.plan_design_cost,
        'plan_workers_cost': footer.plan_workers_cost,
        'plan_other_expenses': footer.plan_other_expenses,
        'is_from_marketing': footer.is_from_marketing,
        'products': table,
    };

    postCustomerOrderApi(customerorder);
}

const postCustomerOrderApi = async (customerorder: ICustomerOrderCreate) => {
    fetch('http://89.104.68.248:8000/api/customer_orders', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(customerorder)
    })
        .then(response => {
            if (!response.ok) {
                error_notification('');
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            success_notification('Заказ создан');
            router.push({ path: '/buyers' });
            console.log('Customer order created:', data);
            return data;
        })
        .catch(error => {
            error_notification('\n' + error);
            console.error('Error:', error);
            throw error;
        });

    console.log('Customer order created:', customerorder);
}