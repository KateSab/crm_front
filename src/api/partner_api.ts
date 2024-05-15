import { success_notification, error_notification } from '@/services/utils/partners_utils';
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
            console.log('Создан partner с id:', data.id);
            success_notification();
            router.push({ path: '/partners' });
        })
        .catch(error => {
            console.error('There was an error creating the order:', error);
            error_notification(error);
        });
}