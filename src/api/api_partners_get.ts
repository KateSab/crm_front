import axios from 'axios';
import { PartnerInterface } from "@/interfaces/IPartners";

/**
 * Retrieves partners data from the API based on the specified limit and optional keyName filter.
 * @param {number} [limit=1000] The maximum number of partners to retrieve. Default is 1000.
 * @param {string} [keyName=undefined] The name of the key to filter partners. Default is undefined (no filtering).
 * @returns {Promise<Array<Object>>} A promise that resolves with an array of partner objects.
 * @throws {Error} If there is an error while fetching partners data from the API.
 */
export async function getPartnersApi(limit: number = 1000, keyName: string | undefined = undefined): Promise<Array<object>> {
    const url = 'http://89.104.68.248:8000/api/partner/get_filter';
    const params = {
        'limit': limit
    };

    if (keyName !== undefined) {
        params[keyName] = true;
    }

    try {
        const response = await axios.get(url, { params });
        const responseData = response.data;

        let partnersList: PartnerInterface[];

        if (keyName !== undefined) {
            // Обработка данных, если keyName был передан
            partnersList = responseData.map((partner: PartnerInterface) => ({
                id: partner.id,
                name: partner.name
            }));
        } else {
            // Обработка данных, если keyName не был передан
            partnersList = responseData.map((partner: PartnerInterface) => ({
                id: partner.id,
                name: partner.name,
                is_contractor: partner.is_contractor,
                is_carrier: partner.is_carrier,
                is_other: partner.is_other,
                is_supplier: partner.is_supplier,
                addresses: partner.locations.map((location) => ({
                    address: location.address,
                    name: location.name,
                    location_type: location.location_type
                })),
            }));
        }

        return Promise.resolve(partnersList);
    } catch (error) {
        return Promise.reject(error);
    }
}