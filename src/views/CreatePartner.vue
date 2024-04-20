<template>
    <div>
        <Top />
    </div>
    <container class="create-partner">

          <el-form
            ref="ruleFormRef"
            :model="formPartner"
            label-position="left"
            size="medium"
            label-width="auto"
            status-icon
            style="width: 80%;"
          >
            <el-form-item label="Наименование" prop="name">
                <el-input v-model="formPartner.name" />
            </el-form-item>
            <el-form-item label="Тип контрагента" prop="type">
                <el-checkbox v-model="formPartner.is_contractor" label="подрядчик" size="large"/>
                <el-checkbox v-model="formPartner.is_supplier" label="поставщик" size="large"/>
                <el-checkbox v-model="formPartner.is_carrier" label="перевозчик" size="large"/>
                <el-checkbox v-model="formPartner.is_client" label="клиент" size="large"/>
                <!-- <el-checkbox v-model="ruleForm.is_other" label="другое" size="large"/> -->
            </el-form-item>
          </el-form>
          
          <el-text >Адреса</el-text>
          <!-- Форма для адресов -->
          <div v-for="(address, index) in formAddress" :key="index">
            <el-form
              ref="ruleFormRef"
              :model="address"
              label-position="left"
              size="medium"
              label-width="auto"
              status-icon
              style="width: 80%;"
            >
              <el-form-item label="Адрес" prop="address">
                <el-autocomplete
                  v-model="address.address"
                  :fetch-suggestions="fetchAddressSuggestions"
                  :trigger-on-focus="false"
                  clearable
                  @select="selectAddress"
                  style="width: 100%;"
                >
                </el-autocomplete>
              </el-form-item>
              <el-form-item label="Наименование" prop="name">
                <el-input v-model="address.name" />
              </el-form-item>
              <!-- Форма для контактов -->
              <el-form-item label="Контакты">
                <div v-for="(contact, idx) in address.contacts" :key="idx">
                  <el-form
                    :model="contact"
                    label-position="left"
                    size="medium"
                    status-icon
                  >
                    <el-form-item label="Имя">
                      <el-input v-model="contact.name" />
                    </el-form-item>
                    <el-form-item label="Телефон">
                      <el-input v-model="contact.phone" />
                    </el-form-item>
                          <!-- Кнопка для удаления контакта -->
                    <el-button @click="deleteContact(index, idx)">Удалить контакт</el-button>
                  </el-form>
                </div>

                <el-button
                  color="#FFFF6F"
                  style="color: #4d4d4d; margin-top: 1rem;"
                  @click="addContact(address)"
                >
                  Добавить контакт
                </el-button>
              </el-form-item>

              <el-button @click="deleteAddress(index)">Удалить адрес</el-button>
            </el-form>
          </div>

          <el-button color="#FFFF6F" style="color: #4d4d4d; margin-bottom: 1rem;" @click="addAddress">Добавить адрес</el-button>
          <el-button type="primary" @click="createPartner()">Создать контрагента</el-button>

    </container>
</template>

<script lang="ts" setup>
import Top from '../components/blocks/create_partners/Top.vue'
import router from '@/router';
import { ref } from 'vue'
import { ElNotification } from 'element-plus';


//нотификации
const success_notification = () => {
  ElNotification({
    title: 'Успешно',
    message: 'Новый контрагент создан',
    type: 'success',
    position: 'bottom-right',
  })
}

const error_notification = (error) => {
  ElNotification({
    title: 'Ошибка',
    message: 'Не удалось создать контрагента' + error,
    type: 'error',
    position: 'bottom-right',
  })
}

//референсы для форм

// Интерфейс для контакта
interface ContactInterface {
  name: string;
  number: string;
}

// Интерфейс для адреса
interface AddressInterface {
  name: string;
  address: string;
  location_type: number;
  contacts: ContactInterface[]; // Список контактов для адреса
}

// Создание начального контакта
const initialContact = (): ContactInterface => ({
  name: '',
  number: '',
});

// Создание начального адреса
const initialAddress = (): AddressInterface => ({
  name: '',
  address: '',
  location_type: 0,  //should be 1 !!CHANGE!!
  contacts: [initialContact()], // Создаем начальный контакт для каждого нового адреса
});

// Референс на массив адресов
const formAddress = ref<AddressInterface[]>([initialAddress()]);

const ruleFormRef = ref(null)
const formPartner = ref({
    name: '',
    is_supplier: false,
    is_contractor: false,
    is_carrier: false,
    is_client: false,
    //is_other: false,
    locations: formAddress.value
})

// валидация ввода в формы
// const rulesPartner = ref({
//     name: [
//         { required: true, message: 'Введите наименование', trigger: 'blur' },
//     ],
// })

// const rulesAddress = ref({
//     name: [
//         { required: true, message: 'Введите наименование', trigger: 'blur' },
//     ],
// })

// const rulesContacts = ref({
//     name: [
//         { required: true, message: 'Введите имя', trigger: 'blur' },
//     ],
//     phone: [
//         { required: true, message: 'Введите телефон', trigger: 'blur' },
//     ],
// })

//отправляем данные о контрагенте на бек
function createPartner() {
// Формирование JSON объекта для контрагента
        const partnerJson = formPartner.value;

        // Формирование JSON объектов для адресов
        // const addressesJson = formAddress.value.map(address => {
        //   return {
        //       name: address.name,
        //       address: address.address,
        //       contacts: address.contacts.map(contact => {
        //       return {
        //           name: contact.name,
        //           phone: contact.phone
        //       };
        //       })
        //   };
        // });

        // Создание объекта, содержащего информацию о контрагенте и его адресах
        // const combinedData = {
        // partner: partnerJson,
        // locations: addressesJson
        // };

        // Преобразование объекта в JSON-строку
        const partnerCombinedJson = JSON.stringify(partnerJson, null, 2); // Форматирование с отступами для лучшей читаемости

        // Вывод результата в консоль
        console.log("Создание контрагента и адресов: ", formPartner.value.name);
        
    // console.log("createPartner" + partnerCombinedJson);
    fetch('http://89.104.68.248:8000/api/partner/add', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: partnerCombinedJson
  })
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then(data => {
    // partner_id = data.id;
    console.log('Создан partner с id:', data.id);
       success_notification();
       router.push({path: '/partners/'});
  })
  .catch(error => {
    console.error('There was an error creating the order:', error);
    // error_notification(error);
  });
}

//работа с автозаполнением адресов
interface Address {
    value: string
}

////переменные для автозаполнения
// const addressQuery = ref('');
const addressSuggestions = ref<Address[]>([]);

////функции для автозаполнения
const fetchAddressSuggestions = async (queryString: string, cb: any) => {
    await loadAddresses(queryString)
    const results = addressSuggestions.value
  cb(results)
}

////загрузка адресов с сервера
const loadAddresses = async (queryString: string) => {

    var url = "http://suggestions.dadata.ru/suggestions/api/4_1/rs/suggest/address";    
    var token = "ada8aadfdbb93503bcdb4ea54c989e735ec1d850";

    var options: RequestInit = {
        method: "POST",
        mode: "cors",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
            "Authorization": "Token " + token
        },
        body: JSON.stringify({query: queryString})
    }

    try {
        const response = await fetch(url, options);
        const data = await response.json();
        addressSuggestions.value = data.suggestions;
        console.log('Address suggestions:', addressSuggestions.value);

    } catch (error) {
        console.error('Failed to fetch address suggestions:', error);
    }
}

// Сохранение текущего адреса для выбора
let selectedAddress: AddressInterface | null = null;

// Выбор адреса
const selectAddress = (item: Address) => {
  console.log(item);
  // Создаем новый объект адреса на основе выбранного элемента
  selectedAddress = {
    name: '', // Заполняем необходимые свойства пустыми значениями или значениями по умолчанию
    address: item.value,
    location_type: 1, // Используем значение из выбранного элемента для свойства address
    contacts: [], // Мы не знаем контактов для выбранного адреса, поэтому оставляем это пустым
  };
  console.log(selectedAddress);
};


// Добавление адреса
const addAddress = () => {
  const newAddress = initialAddress(); // Создаем новый объект адреса
  formAddress.value.push(newAddress); // Добавляем его в список адресов
};
// Удаление контакта по индексу
const deleteContact = (addressIndex: number, contactIndex: number) => {
  const address = formAddress.value[addressIndex]; // Получаем адрес по индексу
  address.contacts.splice(contactIndex, 1); // Удаляем контакт из списка контактов адреса по его индексу
};

// Добавление нового контакта к адресу
const addContact = (address: AddressInterface) => {
  const newContact = initialContact(); // Создаем новый объект контакта
  address.contacts.push(newContact); // Добавляем его в список контактов адреса
};
// Удаление адреса по индексу
const deleteAddress = (index: number) => {
  formAddress.value.splice(index, 1); // Удаляем адрес из массива по его индексу
};
</script>

<style>
.create-partner {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin: 2vh auto;
    width: 60%;
}

.create-partner > div {
    width: 100%; /* Разрешаем дочернему элементу занимать доступное пространство */
}

.circular {
  display: inline;
  height: 30px;
  width: 30px;
  animation: loading-rotate 2s linear infinite;
}
</style>