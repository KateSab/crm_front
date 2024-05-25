//create task
import { ref } from 'vue';

const addresses = ref([]);

const searchAddresses = async (queryString: string, cb: any) => {
    try {
        const filteredAddresses = addresses.value.filter(addr =>
            addr.address.toLowerCase().includes(queryString.toLowerCase())
        );
        const suggestions = filteredAddresses.map(addr => ({
            value: addr.id,
            label: `${addr.name} - ${addr.address}`,
        }));
        cb(suggestions);
    } catch (error) {
        console.error('Failed to fetch addresses:', error);
    }
};

const handleFetchSuggestions = async (queryString: string, cb: any) => {
    await searchAddresses(queryString, cb);
};

const handleSelectAddress = (data: string, targetField: string) => {
    console.log('Selected field:', data);
    targetField = data;
};

export { addresses, searchAddresses, handleFetchSuggestions, handleSelectAddress };