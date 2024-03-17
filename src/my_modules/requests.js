import axios from 'axios';

const base_url = "http://89.104.68.248:8000/api/";

function get_requests(url, params = {}) {
    try {
        const response = axios.get(base_url + url, { params });
        return response.data;
    } catch (error) {
        return { error: error.message };
    }
}

async function post_requests(url, params = {}) {
    try {
        const response = await axios.post(base_url + url, params);
        return response.data;
    } catch (error) {
        return { error: error.message };
    }
}
export { get_requests, post_requests }