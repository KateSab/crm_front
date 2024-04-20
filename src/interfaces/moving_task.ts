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
            min: string; // уточнить формат
            max: string; // уточнить формат
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