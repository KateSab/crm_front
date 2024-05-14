// Интерфейс для контакта
export interface ContactInterface {
    name: string;
    number: string;
}

// Интерфейс для адреса
export interface AddressInterface {
    name: string;
    address: string;
    location_type: number;
    contacts?: ContactInterface[]; // Список контактов для адреса
}