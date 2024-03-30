import HomeView from '../views/HomeView.vue'
import SiteHomeView from '../views/site/HomeView.vue'
import RransactionView from '../views/RransactionView.vue'
import RobotDetailView from '@/views/robots/RobotDetailView.vue'
import RobotsView from '@/views/robots/IndexView.vue'
import ConfigsView from '@/views/configs/IndexView.vue'
import IndexLogViewVue from '@/views/logs/IndexLogView.vue'
import LlmkeyView from '@/views/llmkey/IndexView.vue'

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
        name:'home',
        path:'/home',
        component:SiteHomeView,
        meta:{
            title:'home',
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
    {
        name:'configs',
        path:'/configs',
        children:[
            {
                name:'configs',
                path:'',
                component:ConfigsView,
                meta:{
                    title:'Configs',
                    requiresAuth: true,
                }
            },
        ]
    },
    {
        name:'logs',
        path:'/logs',
        children:[
            {
                name:'logs',
                path:'',
                component:IndexLogViewVue,
                meta:{
                    title:'Logs',
                    requiresAuth: true,
                }
            },
        ]
    },
    {
        name:'llmkey',
        path:'/llmkey',
        children:[
            {
                name:'llmkey',
                path:'',
                component:LlmkeyView,
                meta:{
                    title:'LlmKey',
                    requiresAuth: true,
                }
            },
        ]
    },
]
