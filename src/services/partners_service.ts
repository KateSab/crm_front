import { ElNotification } from 'element-plus';
import { ContactInterface, AddressInterface } from '@/interfaces/IPartners';
import { ref } from 'vue';

//нотификации
export const success_notification = () => {
    ElNotification({
        title: 'Успешно',
        message: 'Новый контрагент создан',
        type: 'success',
        position: 'bottom-right',
    })
}
export const error_notification = (error) => {
    ElNotification({
        title: 'Ошибка',
        message: 'Не удалось создать контрагента' + error,
        type: 'error',
        position: 'bottom-right',
    })
}

// Создание начального контакта
export const initialContact = (): ContactInterface => ({
    name: '',
    number: '',
});

// Создание начального адреса
export const initialAddress = (): AddressInterface => ({
    name: '',
    address: '',
    location_type: 0,  //should be 1 !!CHANGE!!
    contacts: [initialContact()], // Создаем начальный контакт для каждого нового адреса
});

// Референс на массив адресов
export const formAddress = ref<AddressInterface[]>([initialAddress()]);

export const formPartner = ref({
    name: '',
    is_supplier: false,
    is_contractor: false,
    is_carrier: false,
    is_other: false,
    locations: formAddress.value
})

// Добавление нового адреса
export const addAddress = (): void => {
    const newAddress = initialAddress(); // Создаем новый объект адреса
    formAddress.value.push(newAddress); // Добавляем его в список адресов
};

// Удаление адреса по индексу
export const deleteAddress = (index: number): void => {
    formAddress.value.splice(index, 1); // Удаляем адрес из массива по его индексу
};

// Добавление нового контакта к адресу
export const addContact = (address: AddressInterface): void => {
    const newContact = initialContact(); // Создаем новый объект контакта
    address.contacts.push(newContact); // Добавляем его в список контактов адреса
};

// Удаление контакта по индексу
export const deleteContact = (addressIndex: number, contactIndex: number): void => {
    const address = formAddress.value[addressIndex]; // Получаем адрес по индексу
    address.contacts.splice(contactIndex, 1); // Удаляем контакт из списка контактов адреса по его индексу
};