import { ref } from 'vue';

export interface MovingTask {
    create_date: string;
    lead_date: string;
    status: number;
    creator: number;
    type: number;
    deal_link: string;
    priority: number;
    content: [
        {
            name: string;
            count: number; // default: 1
        }
    ];
    comment: string;
    from: {
        address: string; // из структуры контрагента "name - locations.name - locations.address"
        contact: string; // contact.name - contact.phone
        time: {
            min: string;
            max: string;
        };
    };
    to: {
        address: string;
        contact: string;
        time: {
            min: string;
            max: string;
        };
    };
}

export interface AddressGot {
    id: number;
    address: string;
    name: string;
    partner_id: number;
}

export interface CreateMovingTask {
    create_date: Date; //???
    lead_date: Date;
    creator: number; // user.id
    type: number;
    // 0 - Запланированная (можно выбрать при условии, если разница между датой создания и датой выполнения не менее 15 часов)
    // 1- День в день
    // 2- Срочная
    deal_link: string;
    priority: number; // ???
    content: [ // table
        {
            name: string;
            count: number; // default: 1
        }
    ];
    comment: string;
    from: { // запрос на бек - вывод вернувшихся значений в выпадающий список - сохранение значений по событию выбора
        address: string; // из структуры контрагента "name - locations.name - locations.address"
        contact: string; // contact.name - contact.phone
        time: {
            min: string; // timestamp
            max: string; // timestamp
        };
    };
    to: {
        address: string;
        contact: string;
        time: {
            min: string;
            max: string;
        };
    }
}

export const types = [
    { label: "Запланированная", value: 0 },
    { label: "День в день", value: 1 },
    { label: "Срочная", value: 2 },
]

export const initialTask = (): CreateMovingTask => ({
    create_date: new Date(),
    lead_date: new Date(),
    creator: 0, // Установите идентификатор пользователя по умолчанию или из хранилища
    type: null,
    deal_link: "",
    priority: null,
    content: [{ name: "", count: 1 }],
    comment: "",
    from: {
        address: '',
        contact: "",
        time: {
            min: "",
            max: "",
        },
    },
    to: {
        address: "",
        contact: "",
        time: {
            min: "",
            max: "",
        },
    },
});

export const formTask = ref<CreateMovingTask>(initialTask());