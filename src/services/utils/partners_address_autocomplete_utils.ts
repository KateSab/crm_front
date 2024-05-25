import { ref } from 'vue';
import { AddressInterface } from '@/interfaces/IPartners';

export interface Address {  //работа с автозаполнением адресов
    value: string
}

export const addressSuggestions = ref<Address[]>([]); //переменная для автозаполнения

/**
 * Loads address suggestions from the server based on the provided query string.
 * Updates the addressSuggestions ref with the received suggestions.
 * 
 * @param {string} queryString - The query string to search for address suggestions.
 * @returns {Promise<void>} A promise that resolves when the address suggestions have been loaded.
 * @throws {Error} If there is an error while fetching address suggestions from the server.
 */
export const loadAddresses = async (queryString: string) => {  //загрузка адресов с сервера 

    var url = "http://suggestions.dadata.ru/suggestions/api/4_1/rs/suggest/address";
    var token = "ada8aadfdbb93503bcdb4ea54c989e735ec1d850";

    var options: RequestInit = {
        method: "POST",
        mode: "cors",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
            "Authorization": "Token " + token
        },
        body: JSON.stringify({ query: queryString })
    }

    try {
        const response = await fetch(url, options);
        const data = await response.json();
        addressSuggestions.value = data.suggestions;
        console.log('Address suggestions:', addressSuggestions.value);

    } catch (error) {
        console.error('Failed to fetch address suggestions:', error);
    }
}

export let selectedAddress: AddressInterface | null = null; // Сохранение текущего адреса для выбора

// Выбор адреса
export const selectAddress = (item: Address) => {
    console.log(item);
    // Создаем новый объект адреса на основе выбранного элемента
    selectedAddress = {
        name: '', // Заполняем необходимые свойства пустыми значениями или значениями по умолчанию
        address: item.value,
        location_type: 1, // Используем значение из выбранного элемента для свойства address
        //contacts: [], // Мы не знаем контактов для выбранного адреса, поэтому оставляем это пустым
    };
    console.log(selectedAddress);
};