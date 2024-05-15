import store from '@/store/index';
import { ElNotification } from 'element-plus';

export const success_notification = (order_id: number) => {
    ElNotification({
        title: 'Успешно',
        message: 'Заказ  №' + order_id + ' сформирован',
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

// Загрузка данных из хранилища
export const loadData = async (variable, stateKey: string, mapFunction = null) => {
    try {
        await store.dispatch(stateKey);
        console.log(`Got ${stateKey} successfully`);
        variable.value = store.state[stateKey];

        if (mapFunction) {
            mapFunction(variable.value);
        }
    } catch (error) {
        console.error(`Failed to get ${stateKey}:`, error);
    }
};

// Функция для формирования столбцов таблицы
export const fillTableColumns = (tableColumns, suppliers_names, types_of_applications_titles, contractors_names) => {
    tableColumns.value = [
        { prop: 'name', label: 'Наименование', width: '125', editable: true },
        { prop: 'design_link', label: 'Описание', width: '120', editable: true },
        { prop: 'count', label: 'Тираж', width: '60', editable: true },
        { prop: 'planned_supplier_id', label: 'Поставщик', width: '100', editable: true, type: 'select', options: suppliers_names },
        { prop: 'planned_type_of_branding_id', label: 'Вид нанесения', width: '150', editable: true, type: 'select', options: types_of_applications_titles },
        { prop: 'planned_contractor_id', label: 'Подрядчик', width: '120', editable: true, type: 'select', options: contractors_names },
        { prop: 'product_cost_price_planned', label: 'СС товара руб.', width: '80', editable: true },
        { prop: 'branding_cost_price_planned', label: 'СС нанесения руб.', width: '60', editable: true },
        { prop: 'cost_price_global', label: 'СС итого руб.', width: '80', editable: false },
        { prop: 'price', label: 'РРЦ / шт. руб.', width: '80', editable: true },
        { prop: 'rrc_global', label: 'РРЦ итого руб.', width: '100', editable: true },
        { prop: 'marginality', label: 'Маржа руб.', width: '100', editable: false },
        { prop: 'marginality_in_percents', label: 'Маржинальность %', width: '80', editable: false },
    ];
};

//удаление строки
export const deleteRow = (index, productsList) => {
    productsList.value.splice(index, 1);
};

//добавление строки
export const onAddItem = (productsList, ruleForm) => {
    productsList.value.push({
        name: '',
        design_link: '',
        count: null,
        shipment_location_id: ruleForm.shipment_location_id,
        planned_supplier_id: null, // изменено на supplier_id
        planned_type_of_branding_id: null, // изменено на type_of_application_id
        planned_contractor_id: null, // изменено на contractor_id
        product_cost_price_planned: null,
        branding_cost_price_planned: null,
        cost_price_global: null,  //поле с формулой расчета без возможности редактирования
        price: null,
        rrc_global: null,  //поле с формулой расчета, но с возможностью редактирования
        marginality: null,  //поле с формулой расчета без возможности редактирования
        marginality_in_percents: null,  //поле с формулой расчета без возможности редактирования
        editable: true,
    });
};

//редактирование строки
export const editRow = (row) => {
    row.editable = true;
};

//сохранение строки при редактировании
export const saveRow = (row, productsList) => {
    row.editable = false;
    console.log("данные добавленного продукта: ", productsList.value);
};

//функция для подсчета общей суммы себестоимости продукта
export const calculateCostPrice = (row) => {
    const costPriceOfGood = parseFloat(row.product_cost_price_planned);
    const costOfApplicationPrice = parseFloat(row.branding_cost_price_planned);
    const count = parseFloat(row.count);
    const costPrice = parseFloat(((costPriceOfGood + costOfApplicationPrice) * count).toFixed(2));
    return costPrice;
};

//функция для подсчета общей стоимости РРЦ
export const calculateRRCGlobal = (row) => {
    const rrcPerOne = parseFloat(row.price);
    const count = parseFloat(row.count);
    const rrcGlobal = parseFloat((rrcPerOne * count).toFixed(2));
    return rrcGlobal;
};

//функция для подсчета маржи в рублях
export const calculateMarginality = (row) => {
    const costPriceGlobal = parseFloat(row.cost_price_global);
    const rrcGlobal = parseFloat(row.rrc_global);
    const marginality = parseFloat((rrcGlobal - costPriceGlobal).toFixed(2));
    return marginality;
};

//функция для подсчета маржи в процентах
export const calculateMarginalityInPercents = (row) => {
    const costPriceGlobal = parseFloat(row.cost_price_global);
    const rrcGlobal = parseFloat(row.rrc_global);
    const marginalityInPercents = parseFloat((((rrcGlobal - costPriceGlobal) / rrcGlobal) * 100).toFixed(2));
    return marginalityInPercents;
};

// функция для подсчета итоговых значений по заказу
export const calculateInfo = (row, ruleForm, productsList) => {
    ruleForm.self_cost_total += row.cost_price_global;
    ruleForm.rrc_total += row.rrc_global;
    ruleForm.marginality_total += row.marginality;
    console.log("count of raws: ", productsList.value.length);
    ruleForm.marginality_total_in_percents = parseFloat((((ruleForm.rrc_total - ruleForm.self_cost_total) / ruleForm.rrc_total) * 100).toFixed(2));
}