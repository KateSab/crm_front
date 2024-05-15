import axios from 'axios';

export async function getPartnersApi(limit: number = 1000, keyName: string) {
    const url = 'http://89.104.68.248:8000/api/partner/get_filter';
    const params = {
        'limit': limit,
        [keyName]: true
    };

    try {
        const response = await axios.get(url, { params });
        const responseData = response.data;

        // Преобразуем данные клиентов в формат, подходящий для хранилища
        const clientsList = responseData.map((partner: any) => ({ // Можно указать конкретный тип данных клиента
            id: partner.id,
            name: partner.name
        }));

        return clientsList;
    } catch (error) {
        throw error;
    }
};


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
