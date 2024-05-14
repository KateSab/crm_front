<template>
    <div class="task">
        <container class="moving-tasks" style="width: 100%;">
            <div>
                <el-row gutter="20" justify="center" style="margin-top: 1rem;">
                    <el-col :span="12">
                        ОТКУДА
                        <el-row justify="center">
                            <el-time-picker
                                v-model="formTask.from.time.min"
                                type="datetime"
                                format="hh:mm"
                                value-format="x"
                                change="handleChange"
                            />
                            <el-time-picker
                                v-model="formTask.from.time.max"
                                type="datetime"
                                format="hh:mm"
                                value-format="x"
                                change="handleChange"
                            />
                        </el-row>
                        Адрес
                        <el-row justify="center">
                            <el-autocomplete
                            v-model="formTask.from.address"
                            :fetch-suggestions="searchAddresses"
                            clearable
                            class="inline-input w-50"
                            placeholder="Введите адрес"
                            @select="address => handleSelectAddress(address, formTask.from.address)"
                            value-key="label"
                            />
                        </el-row>
                        Контакт
                        <el-row justify="center">
                            <el-select v-model="formTask.from.contact" placeholder="Select" style="width: 240px">
                                <el-option
                                    v-for="item in contacts"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value"
                                />
                            </el-select>
                        </el-row>
                    </el-col>
                    <el-col :span="12">
                        КУДА
                        <el-row justify="center">
                            <el-time-picker
                                v-model="formTask.to.time.min"
                                type="datetime"
                                format="hh:mm"
                                value-format="x"
                                change="handleChange"
                            />
                            <el-time-picker
                                v-model="formTask.to.time.max"
                                type="datetime"
                                format="hh:mm"
                                value-format="x"
                                change="handleChange"
                            />
                        </el-row>
                        Адрес
                        <el-autocomplete
                        v-model="formTask.to.address"
                        :fetch-suggestions="handleFetchSuggestions"
                        clearable
                        class="inline-input w-50"
                        placeholder="Введите адрес"
                        @select="address => handleSelectAddress(address, formTask.to.address)"
                        value-key="label"
                        />
                        Контакт
                        <el-row justify="center">
                            <el-select v-model="formTask.from.contact" placeholder="Select" style="width: 240px">
                                <el-option
                                    v-for="item in contacts"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value"
                                />
                            </el-select>
                        </el-row>
                    </el-col>
                </el-row>
                <el-row gutter="20">
                    <el-col :span="8">
                        <el-date-picker
                            v-model="formTask.lead_date"
                            type="datetime"
                            format="DD.MM.YYYY"
                            value-format="x"
                        />
                    </el-col>
                    <el-col :span="8">
                        <el-input
                        v-model="formTask.deal_link"
                        placeholder="ссылка"
                        clearable
                        />
                    </el-col>
                    <el-col :span="8">
                        <el-select v-model="formTask.type" placeholder="тип задачи" style="width: 240px">
                            <el-option
                                v-for="item in types"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value"
                            />
                        </el-select>
                    </el-col>
                </el-row>
                <el-row gutter="20" justify="center">
                    СОДЕРЖИМОЕ ДОСТАВКИ
                </el-row>
                <el-row gutter="20" justify="center">
                    таблица
                </el-row>
                комментарий
                <container>
                    <el-form-item>
                        <el-input v-model="formTask.comment" :rows="4" type="textarea"/>
                    </el-form-item>
                </container>
            </div>
            <el-button color="#FFFF6F" style="color: #4d4d4d; margin-bottom: 1rem;">Создать задачу</el-button>
        </container>
    </div>
    {{ formTask }}
</template>

<script setup lang="ts">
import store from '@/store/index';
import { onMounted, ref} from 'vue';
import { types } from '@/interfaces/IMovingTask'
import { formTask } from '@/interfaces/IMovingTask'
import { addresses, searchAddresses, handleFetchSuggestions, handleSelectAddress } from '@/services/moving_task_service'

const contacts = ref<any[]>([]);

onMounted(async () => {
    try {
        await store.dispatch('get_addresses');
        addresses.value = store.state.addresses;
        console.log("Got addresses and contscts for create moving task successfully");
      } catch (error) {
        console.error("Failed to get addresses for create moving task:", error);
      }
});
</script>

<style>
.task{
    width: 80%;
    margin: 1rem 4rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}
</style>