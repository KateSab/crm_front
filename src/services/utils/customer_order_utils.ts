import { ICustFooter, ICustHead, ICustTable, ICustGeneralCost } from "@/interfaces/ICustomerOrder";
import { formatToInt, formatToFloat } from "@/services/utils/format_calculating_utils";

export const calculateFieldsTable = (footer: ICustFooter, header: ICustHead, tableData: ICustTable[], row?: ICustTable, result?: ICustGeneralCost) => {
  console.log("tableData: ", tableData);
  // Себестоимость итого за ед.
  if (row.plan_product_unit_costprice && row.plan_branging_unit_costprice) {
    row.total_cost_per_unit = formatToInt(row.plan_product_unit_costprice) + formatToInt(row.plan_branging_unit_costprice);
  }
  // Себестоимость итого за тираж
  if (row.shipment_count && row.adjustment_count && row.total_cost_per_unit) {
    row.total_cost_for_circulation = formatToInt(row.total_cost_per_unit) * (formatToInt(row.shipment_count) + formatToInt(row.adjustment_count));
    calculateSelfOrderCost(tableData, footer, result);
  }
  // Наценка за доп. траты
  if (row.shipment_count && row.total_cost_for_circulation) {
    calculateMarkupForAdditionalCost(tableData, footer, header, result);
  } else {
    row.markup_for_additional_costs = 0;
  }
};

// Наценка за доп. траты
export const calculateMarkupForAdditionalCost = (tableData: ICustTable[], footer: ICustFooter, header: ICustHead, result: ICustGeneralCost) => {
  tableData.forEach(row => {
    const markup = formatToFloat(row.total_cost_for_circulation) /
      (tableData.reduce((sum, item) => {
        return sum + formatToFloat(item.total_cost_for_circulation);
      }, 0)) *
      formatToFloat(footer.sum_cost) / formatToFloat(row.shipment_count);
    row.markup_for_additional_costs = Math.round(markup * 100) / 100;
    calculatePricePerUnitForClient(row, header, result, tableData);
  });
};
// Маржа в процентах
const marginPercent = (row: ICustTable) => {
  if (row.margin && row.price_for_circulation_for_client) {
    const margin_percent = formatToFloat(row.margin) / formatToFloat(row.price_for_circulation_for_client) * 100;
    row.margin_percent = Math.round(margin_percent * 100) / 100;
  }
}
// Маржа
const calculateMargin = (row: ICustTable) => {
  if (row.price_for_circulation_for_client && row.total_cost_for_circulation) {
    row.margin = formatToInt(row.price_for_circulation_for_client) - formatToInt(row.total_cost_for_circulation);
    marginPercent(row);
  }
}
// Цена для клиента за тираж
const calculatePriceForCirculationForClient = (row: ICustTable, resultForm: ICustGeneralCost, tableData: ICustTable[]) => {
  row.price_for_circulation_for_client = formatToInt(row.price_per_unit_for_client) * formatToInt(row.shipment_count);
  calculateMargin(row);
  calculatePriceForCirculationForClientResult(tableData, resultForm);

}
// Цена для клиента за ед.
export const calculatePricePerUnitForClient = (row: ICustTable, header: ICustHead, resultForm: ICustGeneralCost, tableData: ICustTable[]) => {
  console.log(tableData);
  if (row.shipment_count && row.plan_product_unit_costprice && row.markup_for_additional_costs && row.adjustment_price) {
    const first = formatToFloat(row.total_cost_per_unit) * formatToFloat(header.income_ratio);
    const second = (formatToFloat(row.total_cost_per_unit) * formatToFloat(row.adjustment_count)) / formatToFloat(row.shipment_count);
    const price_per_unit_for_client = first + second + formatToFloat(row.adjustment_price) + formatToFloat(row.markup_for_additional_costs);
    row.price_per_unit_for_client = Math.round(price_per_unit_for_client);
    calculatePriceForCirculationForClient(row, resultForm, tableData);
  };
}

export const calculateFieldsFooter = (tableData: ICustTable[], footerForm: ICustFooter, resultForm: ICustGeneralCost, header?: ICustHead) => {
  // УК
  footerForm.UK = tableData.length * 1024;
  sumCost(footerForm);
  if (header) {
    calculateMarkupForAdditionalCost(tableData, footerForm, header, resultForm);
  }
};
// Итого доп.затрат	
const sumCost = (footerForm: ICustFooter) => {
  footerForm.sum_cost = Object.keys(footerForm).reduce((sum, key) => {
    if (key === 'is_from_marketing' || key === 'sum_cost') {
      return sum;
    }
    const value = footerForm[key] !== undefined ? parseInt((footerForm[key]).toString().replace(/\s/g, '')) : 0;
    return !isNaN(value) ? sum + value : sum;
  }, 0);
}
// Сделка с маркетинга
export const isFromMarketingCost = (tableData: ICustTable[], footerForm: ICustFooter) => {
  if (footerForm.is_from_marketing === true) {
    footerForm.is_from_marketing_cost = tableData.reduce((sum: number, item: ICustTable) => {
      return sum + parseInt((item.total_cost_for_circulation).toString().replace(/\s/g, ''));
    }, 0) * 0.07;
    sumCost(footerForm);
  } else {
    footerForm.is_from_marketing_cost = 0;
    sumCost(footerForm);
  }
}

// Маржинальность по заказу
const calculateMarginPercent = (resultForm: ICustGeneralCost) => {
  if (resultForm.margin_cost && resultForm.sum_client_cost) {
    const margin_percent = formatToFloat(resultForm.margin_cost) / formatToFloat(resultForm.sum_client_cost) * 100;
    resultForm.margin_percent = Math.round(margin_percent * 100) / 100;
  } else {
    resultForm.margin_percent = 0;
  }
}
// Маржа по заказу
const calculateMarginCost = (resultForm: ICustGeneralCost) => {
  if (resultForm.sum_client_cost && resultForm.self_order_cost) {
    resultForm.margin_cost = formatToInt(resultForm.sum_client_cost) - formatToInt(resultForm.self_order_cost);
    calculateMarginPercent(resultForm);
  } else {
    resultForm.margin_cost = 0;
  };
}
// Себестоимость всего заказа
const calculateSelfOrderCost = (tableData: ICustTable[], footerForm: ICustFooter, resultForm: ICustGeneralCost) => {
  if (tableData.some(item => item.total_cost_for_circulation === undefined) && tableData.some(item => item.shipment_count === undefined)) {
    resultForm.self_order_cost = 0;
  } else {
    resultForm.self_order_cost =
      tableData.reduce((sum, item) => {
        return sum + formatToInt(item.total_cost_for_circulation);
      }, 0) + footerForm.sum_cost;
  };
}
// Цена всего заказа для клиента
const calculatePriceForCirculationForClientResult = (tableData: ICustTable[], resultForm: ICustGeneralCost) => {
  if (tableData.some(item => item.price_for_circulation_for_client === undefined)) {
    resultForm.sum_client_cost = 0;
  } else {
    resultForm.sum_client_cost =
      tableData.reduce((sum, item) => {
        return sum + formatToInt(item.price_for_circulation_for_client);
      }, 0);
    calculateMarginCost(resultForm);
  };
}