import store from '@/store'; // Подключаем стор

// Функция для загрузки данных всех контрагентов
export async function getPrtners() {
  try {
    await store.dispatch('get_partners');
    return store.state.partners;
  } catch (error) {
    console.error("Failed to get partners:", error);
    throw error;
  }
}

// Функция для загрузки данных клиентов
export async function getClients() {
  try {
    await store.dispatch('get_clients');
    return store.state.clients;
  } catch (error) {
    console.error("Failed to get clients:", error);
    throw error;
  }
}

// Функция для загрузки данных мест отгрузки
export async function getShipmentLocations() {
  try {
    await store.dispatch('get_shipment_locations');
    return store.state.shipment_locations;
  } catch (error) {
    console.error("Failed to get shipment locations:", error);
    throw error;
  }
}

// Функция для загрузки данных контрагентов
export async function getContractors() {
  try {
    await store.dispatch('get_contractors');
    return store.state.contractors;
  } catch (error) {
    console.error("Failed to get contractors:", error);
    throw error;
  }
}

// Функция для загрузки данных поставщиков
export async function getSuppliers() {
  try {
    await store.dispatch('get_suppliers');
    const suppliersNames = store.state.suppliers;
    console.log("Suppliers names:", suppliersNames);
    return suppliersNames;
  } catch (error) {
    console.error("Failed to get suppliers:", error);
    throw error;
  }
}

// Функция для загрузки типов заявок
export async function getTypesOfApplications() {
  try {
    await store.dispatch('get_types_of_applications');
    const typesOfApplicationsTitles = store.state.types_of_applications.map(typeOfApplication => ({ name: typeOfApplication.title, id: typeOfApplication.id }));
    console.log("Types of applications titles:", typesOfApplicationsTitles);
    return typesOfApplicationsTitles;
  } catch (error) {
    console.error("Failed to get types of applications titles:", error);
    throw error;
  }
}

//  