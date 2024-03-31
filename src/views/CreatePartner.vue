<template>
    <div>
        <Top />
    </div>
    <container class="create-partner">

        <el-form
            ref="ruleFormRef"
            :model="formPartner"
            :rules="rulesPartner"
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
        <el-form
            ref="ruleFormRef"
            :model="formAddress"
            :rules="rulesAddress"
            label-position="left"
            size="medium"
            label-width="auto"
            status-icon
            style="width: 80%;"
            v-for="(Address, index) in addressList" :key="index" 
        >
            <el-form-item label="Адрес" prop="address">

                <el-autocomplete
                    v-model="addressQuery"
                    :fetch-suggestions="fetchAddressSuggestions"
                    :trigger-on-focus="false"
                    clearable
                    @select="selectAddress"
                    style="width: 100%;"
                >
                </el-autocomplete>
                
            </el-form-item>
            <el-form-item label="Наименование" prop="name">
                <el-input v-model="formAddress.name" />
            </el-form-item>
            <el-form-item label="Контакты">
                <el-form
                    :model="formContacts"
                    :rules="rulesContacts"
                    label-position="left"
                    size="medium"
                    status-icon
                    v-for="(Contact, index) in contactsList" :key="index"
                    >
                    <el-form-item label="Имя" prop="name">
                        <el-input v-model="formContacts.name" />
                    </el-form-item>
                    <el-form-item label="Телефон" prop="phone" style="margin-top: 1rem;">
                        <el-input v-model="formContacts.phone" />
                    </el-form-item>
                    <el-button color="#FFFF6F" style="color: #4d4d4d; margin-top: 1rem;" @click="addContact">Добавить контакт</el-button>
                </el-form>
            </el-form-item>
            <el-button color="#FFFF6F" style="color: #4d4d4d" @click="addAddress">Добавить адрес</el-button>
        </el-form>

        <el-button type="primary" @click="createPartner()">Создать контрагента</el-button>
    </container>
</template>

<script lang="ts" setup>
import Top from '../components/blocks/create_partners/Top.vue'
import { ref } from 'vue'
import { onMounted } from 'vue'

let partner_id = null

//референсы для форм
const ruleFormRef = ref(null)
const formPartner = ref({
    name: '',
    is_supplier: false,
    is_contractor: false,
    is_carrier: false,
    is_client: false,
    //is_other: false,
})

////формы для адресов
interface formAddress {
    name: string;
    address: string;
    contractor_id: string; // Замените тип на подходящий
    location_type: number; // Замените тип на подходящий
}
const formAddress = ref([{
    name: '',
    address: '',
    contractor_id: partner_id,
    location_type: 1,
}])
const addressList = ref<formAddress[]>([]);

////формы для контактов
interface formContacts {
    name: string;
    phone: string;
}
const formContacts = ref({
    name: '',
    phone: '',
})
const contactsList = ref<formContacts[]>([]);

// валидация ввода в формы
const rulesPartner = ref({
    name: [
        { required: true, message: 'Введите наименование', trigger: 'blur' },
    ],
})

const rulesAddress = ref({
    name: [
        { required: true, message: 'Введите наименование', trigger: 'blur' },
    ],
})

const rulesContacts = ref({
    name: [
        { required: true, message: 'Введите имя', trigger: 'blur' },
    ],
    phone: [
        { required: true, message: 'Введите телефон', trigger: 'blur' },
    ],
})

//отправляем данные о контрагенте на бек
function createPartner() {
//     console.log("createPartner" + JSON.stringify(ruleForm));
//     fetch('http://89.104.68.248:8000/api/contractor/add', {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json'
//     },
//     body: JSON.stringify(ruleForm.value)
//   })
//   .then(response => {
//     if (!response.ok) {
//       throw new Error('Network response was not ok');
//     }
//     return response.json();
//   })
//   .then(data => {
//     partner_id = data.id;
//     console.log('Создан partner с id:', partner_id);
//   })
//   .catch(error => {
//     console.error('There was an error creating the order:', error);
//     // error_notification(error);
//   });
}

//работа с автозаполнением адресов
interface Address {
    value: string
}

////переменные для автозаполнения
const addressQuery = ref('');
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

//выбор адреса
const selectAddress = (item: Address) => {
  console.log(item)
}

//добавление адреса
const addAddress = () => {
    addressList.value.push({
        name: '',
        address: '',
        contractor_id: partner_id,
        location_type: 1
    });
};

//добавление контакта
const addContact = () => {
    contactsList.value.push({
        name: '',
        phone: '',
    })
}
</script>

<style>
.create-partner {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 2vh 25vw 0vh 25vw;
    width: 50%;
}

.circular {
  display: inline;
  height: 30px;
  width: 30px;
  animation: loading-rotate 2s linear infinite;
}
</style>