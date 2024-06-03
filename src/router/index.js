import {createRouter, createWebHistory} from 'vue-router'
import index from '../store'
import MainPage from '@/views/MainPage.vue'
import Login from '@/views/Login.vue'
import Buyers from '@/views/buyers/Buyers.vue'
import CustomerorderCreate from '@/views/buyers/create/CustomerorderCreate.vue'
import Suppliers from '@/views/suppliers/Suppliers.vue'
import SuppliersCreate from '@/views/suppliers/create/SuppliersCreate.vue'
import Contractors from '@/views/contractors/Contractors.vue'
import Carriers from '@/views/carriers/Carriers.vue'
import Moving from '@/views/moving_tasks/Moving.vue'
import MovingTaskCreate from '@/views/moving_tasks/create/MovingTaskCreate.vue'
import Bills from '@/views/bills/Bills.vue'
import StockView from '@/views/stock/StockView.vue'
import Partners from '@/views/partners/Partners.vue'
import PartnersCreatePartner from '@/views/partners/create/PartnersCreatePartner.vue'
import Catalogs from '@/views/catalogs/Catalogs.vue'
import CatalogsAddresses from '@/views/catalogs/CatalogsAddresses.vue'
import CatalogsContacts from '@/views/catalogs/CatalogsContacts.vue'

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta: {
      requiresAuth: false
    }
  },
  {
    path: '/',
    name: 'MainPage',
    component: MainPage,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/buyers',
    name: 'buyers',
    component: Buyers,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/buyers/create',
    name: 'CustomerorderCreate',
    component: CustomerorderCreate,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/suppliers',
    name: 'suppliers',
    component: Suppliers,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/suppliers/create',
    name: 'suppliersCreate',
    component: SuppliersCreate,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/contractors',
    name: 'contractors',
    component: Contractors,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/carriers',
    name: 'carriers',
    component: Carriers,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/moving',
    name: 'moving',
    component: Moving,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/moving/create',
    name: 'movingTaskCreate',
    component: MovingTaskCreate,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/bills',
    name: 'bills',
    component: Bills,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/stock',
    name: 'stock',
    component: StockView,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/partners',
    name: 'partners',
    component: Partners,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/partners/create',
    name: 'partnersCreatePartner',
    component: PartnersCreatePartner,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/catalogs',
    name: 'catalogs',
    component: Catalogs,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/catalogs/addresses',
    name: 'catalogsAddresses',
    component: CatalogsAddresses,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/catalogs/contacts',
    name: 'catalogsContacts',
    component: CatalogsContacts,
    meta: {
      requiresAuth: true
    }
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  console.log(index.getters.isLoggedIn)
  console.log(index.state.token)
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (index.getters.isLoggedIn) {
      next();
    }
    next('/login');
  } else {
    next();
  }
})

export default router
