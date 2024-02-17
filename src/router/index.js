import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import CarriersView from '../views/CarriersView.vue'
import ContractorsView from '../views/ContractorsView.vue'
import SuppliersView from '../views/SuppliersView.vue'
import BuyersView from '../views/BuyersView.vue'
import MovingView from '../views/MovingView.vue'
import BillsView from '../views/BillsView.vue'
import StockView from '../views/StockView.vue'
import PartnersView from '../views/PartnersView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/carriers',
    name: 'carriers',
    component: CarriersView
  },
  {
    path: '/contractors',
    name: 'contractors',
    component: ContractorsView
  },
  {
    path: '/suppliers',
    name: 'suppliers',
    component: SuppliersView
  },
  {
    path: '/buyers',
    name: 'buyers',
    component: BuyersView
  },
  {
    path: '/moving',
    name: 'moving',
    component: MovingView
  },
  {
    path: '/bills',
    name: 'bills',
    component: BillsView
  },
  {
    path: '/stock',
    name: 'stock',
    component: StockView
  },
  {
    path: '/partners',
    name: 'partners',
    component: PartnersView
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
