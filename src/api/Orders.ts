import axios from 'axios';

export async function fetchBuyersOrders() {
    try {
        const params = {
            offset: 0,
            limit: 50,
            status_id: 1,
        };

        const response = await axios.get('http://89.104.68.248:8000/api/customerorder/get_filter', { params });
        console.log("данные о заказах покупателей получены", response.data)
        return response.data;
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
}

