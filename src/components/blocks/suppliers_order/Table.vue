<template>
  <el-container>
        <el-table :data="tableData" style="display: flex; align-items: center" max-height="300" width="350">
            <el-table-column prop="name" label="Наименование" width="200" />
            <el-table-column prop="count" label="Количество" width="120" />
            <el-table-column prop="print_type" label="Тип печати" width="170" />
            <el-table-column prop="link" label="Ссылка" width="350"> <el-link href="{{ link }}">тут типо ссылка</el-link></el-table-column>
            <el-table-column fixed="right" prop="comment" label="Комментарий" width="320"/>    
        </el-table>
      </el-container>
        <!-- добавить кнопку "начать приемку" -->
</template>

<script lang="ts" setup>
import { ref } from 'vue'


const tableData = ref([
  {
    name: 'Папка-конверт А4',
    count: '400шт.',
    print_type: 'Тампопечать',
    link: 'https://www.google.com/search?q=%D0%B0%D1%8F%D0%BA%D1%81+js&sca_esv=c193d274b524a767&ei=HC3KZbH9Hq3pi-gPl_iCqA4&ved=0ahUKEwix--C2g6aEAxWt9AIHHRe8AOUQ4dUDCBA&uact=5&oq=%D0%B0%D1%8F%D0%BA%D1%81+js&gs_lp=Egxnd3Mtd2l6LXNlcnAiC9Cw0Y_QutGBIGpzMgUQABiABDILEC4YgAQYmwMYqAMyBRAAGIAEMgUQABiABDIFEAAYgAQyBRAAGIAEMhEQLhiABBjHARivARimAxioAzIFEAAYgAQyBRAAGIAESJQOUMMDWLQMcAF4AZABAJgBjQegAY0HqgEDNi0xuAEDyAEA-AEBwgIKEAAYRxjWBBiwA-IDBBgAIEGIBgGQBgg&sclient=gws-wiz-serp',
    comment: 'Заказ покупателя №1',
  },
  {
    name: 'Папка-конверт А4',
    count: '400шт.',
    print_type: 'Тампопечать',
    link: 'https://www.google.com/search?q=%D0%B0%D1%8F%D0%BA%D1%81+js&sca_esv=c193d274b524a767&ei=HC3KZbH9Hq3pi-gPl_iCqA4&ved=0ahUKEwix--C2g6aEAxWt9AIHHRe8AOUQ4dUDCBA&uact=5&oq=%D0%B0%D1%8F%D0%BA%D1%81+js&gs_lp=Egxnd3Mtd2l6LXNlcnAiC9Cw0Y_QutGBIGpzMgUQABiABDILEC4YgAQYmwMYqAMyBRAAGIAEMgUQABiABDIFEAAYgAQyBRAAGIAEMhEQLhiABBjHARivARimAxioAzIFEAAYgAQyBRAAGIAESJQOUMMDWLQMcAF4AZABAJgBjQegAY0HqgEDNi0xuAEDyAEA-AEBwgIKEAAYRxjWBBiwA-IDBBgAIEGIBgGQBgg&sclient=gws-wiz-serp',
    comment: 'Заказ покупателя №1',
  },
  {
    name: 'Папка-конверт А4',
    count: '400шт.',
    print_type: 'Тампопечать',
    link: 'https://www.google.com/search?q=%D0%B0%D1%8F%D0%BA%D1%81+js&sca_esv=c193d274b524a767&ei=HC3KZbH9Hq3pi-gPl_iCqA4&ved=0ahUKEwix--C2g6aEAxWt9AIHHRe8AOUQ4dUDCBA&uact=5&oq=%D0%B0%D1%8F%D0%BA%D1%81+js&gs_lp=Egxnd3Mtd2l6LXNlcnAiC9Cw0Y_QutGBIGpzMgUQABiABDILEC4YgAQYmwMYqAMyBRAAGIAEMgUQABiABDIFEAAYgAQyBRAAGIAEMhEQLhiABBjHARivARimAxioAzIFEAAYgAQyBRAAGIAESJQOUMMDWLQMcAF4AZABAJgBjQegAY0HqgEDNi0xuAEDyAEA-AEBwgIKEAAYRxjWBBiwA-IDBBgAIEGIBgGQBgg&sclient=gws-wiz-serp',
    comment: 'Заказ покупателя №1',
  },
  {
    name: 'Папка-конверт А4',
    count: '400шт.',
    print_type: 'Тампопечать',
    link: 'https://www.google.com/search?q=%D0%B0%D1%8F%D0%BA%D1%81+js&sca_esv=c193d274b524a767&ei=HC3KZbH9Hq3pi-gPl_iCqA4&ved=0ahUKEwix--C2g6aEAxWt9AIHHRe8AOUQ4dUDCBA&uact=5&oq=%D0%B0%D1%8F%D0%BA%D1%81+js&gs_lp=Egxnd3Mtd2l6LXNlcnAiC9Cw0Y_QutGBIGpzMgUQABiABDILEC4YgAQYmwMYqAMyBRAAGIAEMgUQABiABDIFEAAYgAQyBRAAGIAEMhEQLhiABBjHARivARimAxioAzIFEAAYgAQyBRAAGIAESJQOUMMDWLQMcAF4AZABAJgBjQegAY0HqgEDNi0xuAEDyAEA-AEBwgIKEAAYRxjWBBiwA-IDBBgAIEGIBgGQBgg&sclient=gws-wiz-serp',
    comment: 'Заказ покупателя №1',
  },
  {
    name: 'Папка-конверт А4',
    count: '400шт.',
    print_type: 'Тампопечать',
    link: 'https://www.google.com/search?q=%D0%B0%D1%8F%D0%BA%D1%81+js&sca_esv=c193d274b524a767&ei=HC3KZbH9Hq3pi-gPl_iCqA4&ved=0ahUKEwix--C2g6aEAxWt9AIHHRe8AOUQ4dUDCBA&uact=5&oq=%D0%B0%D1%8F%D0%BA%D1%81+js&gs_lp=Egxnd3Mtd2l6LXNlcnAiC9Cw0Y_QutGBIGpzMgUQABiABDILEC4YgAQYmwMYqAMyBRAAGIAEMgUQABiABDIFEAAYgAQyBRAAGIAEMhEQLhiABBjHARivARimAxioAzIFEAAYgAQyBRAAGIAESJQOUMMDWLQMcAF4AZABAJgBjQegAY0HqgEDNi0xuAEDyAEA-AEBwgIKEAAYRxjWBBiwA-IDBBgAIEGIBgGQBgg&sclient=gws-wiz-serp',
    comment: 'Заказ покупателя №1',
  },
  {
    name: 'Папка-конверт А4',
    count: '400шт.',
    print_type: 'Тампопечать',
    link: 'https://www.google.com/search?q=%D0%B0%D1%8F%D0%BA%D1%81+js&sca_esv=c193d274b524a767&ei=HC3KZbH9Hq3pi-gPl_iCqA4&ved=0ahUKEwix--C2g6aEAxWt9AIHHRe8AOUQ4dUDCBA&uact=5&oq=%D0%B0%D1%8F%D0%BA%D1%81+js&gs_lp=Egxnd3Mtd2l6LXNlcnAiC9Cw0Y_QutGBIGpzMgUQABiABDILEC4YgAQYmwMYqAMyBRAAGIAEMgUQABiABDIFEAAYgAQyBRAAGIAEMhEQLhiABBjHARivARimAxioAzIFEAAYgAQyBRAAGIAESJQOUMMDWLQMcAF4AZABAJgBjQegAY0HqgEDNi0xuAEDyAEA-AEBwgIKEAAYRxjWBBiwA-IDBBgAIEGIBgGQBgg&sclient=gws-wiz-serp',
    comment: 'Заказ покупателя №1',
  },
])
</script>