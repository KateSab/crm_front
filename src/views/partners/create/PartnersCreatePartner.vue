<template>
  <div>
    <PartnersCreateTop />
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
          <el-checkbox v-model="formPartner.is_other" label="другое" size="large"/>
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
            @select="handleAddressSelect"
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
                <el-input v-model="contact.number" />
              </el-form-item>
                    <!-- Кнопка для удаления контакта -->
              <el-button @click="handleDeleteContact(index, idx)">Удалить контакт</el-button>
            </el-form>
          </div>
          <el-button
            color="#FFFF6F"
            style="color: #4d4d4d; margin-top: 1rem;"
            @click="handleAddContact(address)"
          >
            Добавить контакт
          </el-button>
        </el-form-item>
        <el-button @click="handleDeleteAddress(index)">Удалить адрес</el-button>
      </el-form>
    </div>
    <el-button color="#FFFF6F" style="color: #4d4d4d; margin-bottom: 1rem;" @click="handleAddAddress()">Добавить адрес</el-button>
    <el-button type="primary" @click="preparePartner()">Создать контрагента</el-button>
  </container>
</template>

<script lang="ts" setup>
import PartnersCreateTop from '@/views/partners/create/PartnersCreateTop.vue'
import {createPartner} from '@/api/partner_add_api';
import { Address } from '@/services/utils/partners_address_autocomplete_utils'
import {addressSuggestions, loadAddresses, selectAddress} from '@/services/utils/partners_address_autocomplete_utils';
import { formAddress, formPartner, addAddress, deleteAddress, addContact, deleteContact } from '@/services/utils/partners_utils';
import { AddressInterface } from '@/interfaces/IPartners';

function preparePartner() {
  const partnerJson = formPartner.value;  // Формирование JSON объекта для контрагента
  const partnerCombinedJson = JSON.stringify(partnerJson, null, 2);  // Преобразование объекта в JSON-строку
  console.log("Создание контрагента и адресов: ", formPartner.value.name);  // Вывод результата в консоль
  createPartner(partnerCombinedJson);
}

//функции для автозаполнения
const fetchAddressSuggestions = async (queryString: string, cb: any) => {
    await loadAddresses(queryString)
    const results = addressSuggestions.value
  cb(results)
}

const handleAddressSelect = (item: Address): void => {
  selectAddress(item); // Вызываем функцию selectAddress при выборе адреса
};

const handleAddAddress = (): void => {
  addAddress(); // Добавляем новый адрес
};

const handleDeleteAddress = (index: number): void => {
  deleteAddress(index); // Удаляем адрес по индексу
};

const handleAddContact = (address: AddressInterface): void => {
  addContact(address); // Добавляем новый контакт к адресу
};

const handleDeleteContact = (addressIndex: number, contactIndex: number): void => {
  deleteContact(addressIndex, contactIndex); // Удаляем контакт по индексу
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
</style>@/services/utils/partners_address_autocomplete_service@/services/utils/partners_address_autocomplete_service@/services/utils/partners_service@/services/utils/partners_address_autocomplete_utils@/services/utils/partners_address_autocomplete_utils@/services/utils/partners_utils@/api/partner_add_api