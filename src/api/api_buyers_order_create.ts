import { formatDate } from '@/services/utils/format_date_utils';
import { toRaw } from 'vue';
import { success_notification, error_notification } from '@/services/utils/notification_utils';
import router from '@/router';

let order_id: number = null;

export function submitTableForm(productsList) {
    const requestBody = {
        buyer_order_id: order_id,
        products: toRaw(productsList.value)
    };

    fetch('http://89.104.68.248:8000/api/products/add', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestBody)
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            console.log('Products added successfully:', data);
        })
        .catch(error => {
            console.error('Error adding products:', error);
            error_notification(error);
        });
}

//отправка данных на бек(без таблицы)
export function submitForm(ruleForm, productsList) {
    ruleForm.shipment_date_planned = formatDate(ruleForm.shipment_date_planned);
    fetch('http://89.104.68.248:8000/api/customerorder/add', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(ruleForm)
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            console.log('Order created:', data);
            console.log('Received order id:', data.id);
            submitTableForm(productsList);
            const message_success: string = `Заказ №№${data.id} сформирован`;
            success_notification(message_success);
            router.push({ path: '/buyers' })
              .then(() => {
                console.log('Navigation to /buyers succeeded');
              })
              .catch((error) => {
                console.error('Navigation to /buyers failed', error);
              });
        })
        .catch(error => {
            console.error('There was an error creating the order:', error);
            const message_error: string = `'Не удалось сформировать заказ' №${error}`;
            error_notification(message_error);
        });
}
