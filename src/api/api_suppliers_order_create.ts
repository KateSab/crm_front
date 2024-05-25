import router from '@/router';
import { formatDate } from '@/services/utils/format_date_utils';
import { success_notification, error_notification } from '@/services/utils/notification_utils';

export function submitForm(ruleForm) {
    ruleForm.shipment_date_planned = formatDate(ruleForm.shipment_date_planned);
    fetch('http://89.104.68.248:8000/api/supplier_order/add', {
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
            console.log('Received order id:', data.id);
            const message_success: string = `Заказ  №№${data.id} сформирован`
            success_notification(message_success);
            router.push({ path: '/suppliers' });
        })
        .catch(error => {
            const message_error: string = `Не удалось сформировать заказ №${error}`;
            error_notification(message_error);
        });
}