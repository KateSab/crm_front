import axios from "axios";

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
