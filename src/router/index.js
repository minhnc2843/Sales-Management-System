import { createRouter, createWebHistory } from "vue-router";
import List from "../views/products/ListProduct.vue";
import Detail from "../views/products/DetailProduct.vue";
import Add from "../views/products/AddProduct.vue";
import Update from "../views/products/UpdateProduct.vue";
// sản phẩm
import CustomerList from "@/views/customer/CustomerList.vue";
import CustomerEdit from "@/views/customer/CustomerEdit.vue";
import CustomerDetail from "@/views/customer/CustomerDetail.vue";
import CustomerAdd from "@/views/customer/CustomerAdd.vue";
//khách hàng
import ListDonHang from "../views/donhang/ListDonHang.vue";
import EditDonHang from "../views/donhang/EditDonHang.vue";
import DetailDonHang from "@/views/donhang/DetailDonHang.vue";
import CreateDonHang from "@/views/donhang/CreateDonHang.vue";
// đơn hàng
import ThongKe from "@/views/ThongKe.vue";
// thống kê
import Login from "@/views/Login.vue";
import { useAuthStore } from "@/store/auth.js";
import App from "@/App.vue";    
const routes = [
    {
        path: '/products',
        name: 'List',
        component: List,
    },
    {
        path: '/products/detail/:id',
        name: 'Detail',
        component: Detail,
    },
    {
        path: '/products/add',
        name: 'Add',
        component:Add,
    },
    {
        path: '/products/edit/:id',
        name: 'Edit',
        component: Update,
    },
    // Routes cho khách hàng
    {
        path: '/customers',
        name: 'CustomerList',
        component: CustomerList,
    },
    {
        path: '/customers/add',
        name: 'CustomerAdd',
        component: CustomerAdd,
    },
    {
        path: '/customers/edit/:id',
        name: 'CustomerEdit',
        component: CustomerEdit,
    },
    {
        path: '/customers/detail/:id',
        name: 'CustomerDetail',
        component: CustomerDetail,
    },
    //đơn hàng
    {
        path: '/donhangs',
        name: 'ListDonHang',
        component: ListDonHang,
    },

    {
        path: '/:catchAll(.*)',
        component: { template: '<h1>404 Page not found</h1>' }
    },
    {
        path: '/orders/edit/:id',
        name: 'EditDonHang',
        component: EditDonHang,
    },
    {
        path: '/orders/detail/:id',
        name: 'DetailDonHang',
        component: DetailDonHang,
    },
    {
        path: '/orders/add',
        name: 'CreateDonHang',
        component: CreateDonHang,
    },
    {
        path: '/thongke',
        name: 'ThongKe',
        component: ThongKe, 
    },
    { path: '/', name: 'Login', component: Login },
  {
    path: '/app',
    name: 'App',
    component: App,
    
  }

    

];

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes
});

export default router;
