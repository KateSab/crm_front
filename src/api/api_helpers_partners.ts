import store from '@/store';

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