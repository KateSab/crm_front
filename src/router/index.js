import { createRouter, createWebHistory } from 'vue-router'
import index from '../store'
import MainPage from '../views/MainPage.vue'
import Login from '../views/Login.vue'
import CarriersView from '../views/CarriersView.vue'
import ContractorsView from '../views/ContractorsView.vue'
import SuppliersView from '../views/SuppliersView.vue'
import BuyersView from '../views/BuyersView.vue'
import MovingView from '../views/MovingView.vue'
import BillsView from '../views/BillsView.vue'
import StockView from '../views/StockView.vue'
import PartnersView from '../views/PartnersView.vue'
import CreateBuyersOrder from '../views/CreateBuyersOrder.vue'
import CreateSuppliersOrder from '../views/CreateSuppliersOrder.vue'

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/',
    name: 'MainPage',
    component: MainPage
  },
  {
    path: '/carriers',
    name: 'carriers',
    component: CarriersView,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/contractors',
    name: 'contractors',
    component: ContractorsView,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/suppliers',
    name: 'suppliers',
    component: SuppliersView,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/suppliers/create',
    name: 'createSuppliersOrder',
    component: CreateSuppliersOrder,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/buyers',
    name: 'buyers',
    component: BuyersView,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/buyers/create',
    name: 'createBuyersOrder',
    component: CreateBuyersOrder,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/moving',
    name: 'moving',
    component: MovingView,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/bills',
    name: 'bills',
    component: BillsView,
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
    component: PartnersView,
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

  // const requires_auth = to.matched.some(record => record.meta.requiresAuth);
  // const is_logged = index.getters.isLoggedIn;

  // if(requires_auth && is_logged) {
  //   next();
  // } else {
  //   next('/login');
  // }

  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (index.getters.isLoggedIn) {
      next()
      return
    }
    next('/login')
  } else {
    next()
  }
})

export default router
