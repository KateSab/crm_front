import axios from "axios"; // Подключаем стор

export async function getLocationsApi(limit: number = 1000): Promise<Array<object>> {
    const url = 'http://89.104.68.248:8000/api/locations/get_filter';
    const params = {
        'limit': limit
    };
    try {
        const response = await axios.get(url, { params });
        return Promise.resolve(response.data);
    } catch (error) {
        return Promise.reject(error);
    }
}