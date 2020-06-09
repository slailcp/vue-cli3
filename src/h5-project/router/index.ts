import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';
import Flight from '@/h5-project/views/flight.vue';
import Hotel from '@/h5-project/views/hotel.vue';
import Train from '@/h5-project/views/train.vue';
import Car from '@/h5-project/views/car.vue';

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'Flight',
    component: Flight,
  },
  {
    path: '/Hotel',
    name: 'Hotel',
    component: Hotel,
  },
  {
    path: '/Train',
    name: 'Train',
    component: Train,
  },
  {
    path: '/Car',
    name: 'Car',
    component: Car,
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
