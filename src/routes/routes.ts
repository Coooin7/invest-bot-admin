import HomeView from '../views/HomeView.vue'
import LoginView from '../views/LoginView.vue'
import RransactionView from '../views/RransactionView.vue'
import RobotDetailView from '@/views/RobotDetailView.vue'
import RobotsView from '@/views/robots/IndexView.vue'
export const routes = [
    {
        name:'ranking',
        path:'/',
        component:HomeView,
        meta:{
            title:'Competition Ranking',
            requiresAuth: true,
        }
    },
    {
        name:'login',
        path:'/login',
        component:LoginView,
        meta:{
            title:'Login',
            requiresAuth: false,
        }
    },
    {
        name:'transaction',
        path:'/transaction',
        component:RransactionView,
        meta:{
            title:'Transaction Data',
            requiresAuth: true,
        }
    },
    {
        name:'robots',
        path:'/robots',
        children:[
            {
                name:'Robots',
                path:'',
                component:RobotsView,
                meta:{
                    title:'Robots',
                    requiresAuth: true,
                }
            },
            {
                name:'robot-details',
                path:':userName',
                component:RobotDetailView,
                meta:{
                    title:'Robot',
                    requiresAuth: true,
                }
            },
        ]
    },
]
