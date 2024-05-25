import { ElNotification } from 'element-plus';

export const success_notification = (message_text: string) => {
    ElNotification({
        title: 'Успешно',
        message: message_text,
        type: 'success',
        position: 'bottom-right',
    })
}

export const error_notification = (error: string) => {
    ElNotification({
        title: 'Ошибка',
        message: 'Не удалось сформировать заказ' + error,
        type: 'error',
        position: 'bottom-right',
    })
}