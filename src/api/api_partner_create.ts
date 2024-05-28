import { success_notification, error_notification } from '@/services/utils/notification_utils';
import router from '@/router';

export function createPartner(partner: any) {
    fetch('http://89.104.68.248:8000/api/partner/add', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: partner
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            const message_success: string = `Создан partner с id:№${data.id}`;
            success_notification(message_success);
            router.push({ path: '/partners' })
              .then(() => {
                console.log('Navigation to /partners succeeded');
              })
              .catch((error) => {
                console.error('Navigation to /partners failed', error);
              });
        })
        .catch(error => {
            const message_error: string = `Не удалось создать контрагента №${error}`
            error_notification(message_error);
        });
}
