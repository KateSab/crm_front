
// formatValue.ts
export const formatValue = (value: string): string => {
    return ` ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ' ').replace(/[^0-9,.]/g, '').replace(/,/g, '.');
};

