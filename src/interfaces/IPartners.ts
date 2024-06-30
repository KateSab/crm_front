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

// Интерфейс для контрагента
export interface PartnerInterface {
    id: number;
    name: string;
    is_contractor: boolean;
    is_carrier: boolean;
    is_other: boolean;
    is_supplier: boolean;
    locations?: AddressInterface[]; // Список адресов для контрагента
}