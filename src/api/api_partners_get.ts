import axios from 'axios';

export async function getPartnersApi(limit: number = 1000, keyName: string = undefined) {
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

        let partnersList;

        if (keyName !== undefined) {
            // Обработка данных, если keyName был передан
            partnersList = responseData.map((partner) => ({
                id: partner.id,
                name: partner.name
            }));
        } else {
            // Обработка данных, если keyName не был передан
            partnersList = responseData.map((partner) => ({
                id: partner.id,
                name: partner.name,
                is_contractor: partner.is_contractor,
                is_carrier: partner.is_carrier,
                is_client: partner.is_client,
                is_supplier: partner.is_supplier,
                addresses: partner.locations.map((location) => ({
                    address: location.address,
                    name: location.name,
                    location_type: location.location_type
                })),
            }));
        }

        return partnersList;
    } catch (error) {
        throw error;
    }
}


// Функция для запроса данных клиентов с сервера с возможностью указания параметров фильтрации
// export async function getClientsApi(options: { limit?: number; filters?: Record<string, boolean> } = {}) {
//   const url = 'http://89.104.68.248:8000/api/partner/get_filter';
//   const params: Record<string, any> = {
//     'limit': options.limit || 1000
//   };

//   // Добавляем фильтры, если они указаны
//   if (options.filters) {
//     Object.keys(options.filters).forEach((key) => {
//       if (options.filters?.[key]) {
//         params[key] = true;
//       }
//     });
//   }

//   try {
//     const response = await axios.get(url, { params });
//     const clientsData = response.data;

//     // Преобразуем данные клиентов в формат, подходящий для хранилища
//     const clientsList = clientsData.map((client: any) => ({ // Можно указать конкретный тип данных клиента
//       id: client.id,
//       name: client.name
//     }));

//     return clientsList;
//   } catch (error) {
//     throw error;
//   }
// }
