
// formatValue.ts
export const formatFloat = (value: string): string => {
    // Удаляем все кроме цифр, точки и запятой
    let cleanValue = value.replace(/[^0-9,.]/g, '').replace(/,/g, '.');

    // Проверяем, есть ли в числе точка
    const indexOfDot = cleanValue.indexOf('.');
    if (indexOfDot !== -1) {
        // Если точка есть, убедимся, что других точек нет и оставляем не более двух цифр после точки
        cleanValue = cleanValue.substring(0, indexOfDot + 1) + cleanValue.substring(indexOfDot).replace(/\./g, '').substring(0, 2);
    }

    // Добавляем разделители тысячных разрядов
    let formattedValue = cleanValue.replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
    return formattedValue;
};

export const formatInt = (value: string): string => {
    // Удаляем все кроме цифр
    let cleanValue = value.replace(/[^0-9]/g, '');

    // Добавляем разделители тысячных разрядов
    let formattedValue = cleanValue.replace(/\B(?=(\d{3})+(?!\d))/g, ' ');

    return formattedValue;
}