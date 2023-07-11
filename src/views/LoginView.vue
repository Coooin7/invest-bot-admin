<script setup lang="ts">
import { router } from '@/routes';
import { UserService } from '@/servies/user';
import { reactive } from 'vue';
import Card from '@/components/futuristic/Card.vue';
import Button from '@/components/futuristic/Button.vue'
import FormRowInput from '@/components/futuristic/form/FormRowInput.vue'
import TextAnimate from '@/components/futuristic/TextAnimate.vue'
const form = reactive({
    username: 'test',
    password: '1234',
})
const data = reactive({
    loading:false
})
function login(e: Event) {
    e.preventDefault()
    data.loading = true
    UserService.login().then(() => {
        data.loading = false
        // MessageBox.success('login sucess')
        router.replace('/')
    }).catch(()=>{
        data.loading = false
    })

}
</script>
<template>
    <div class="logup-page flex justify-center items-center min-h-[100vh] select-none">
        <Card>
            <template #header>
                <p class="text-center">
                    <TextAnimate text="Wecome to Coooin"/>
                </p>
            </template>
            <template #body>
                <form @submit="login" class="w-full flex justify-center items-center py-8">
                    <img class="w-[30%] aspect-square" src="logo.png">
                    <div class="pl-8 flex flex-col items-end">
                        <FormRowInput class="py-2" name="username" placeholder="username" type="text" v-model="form.username" />
                        <FormRowInput class="py-4" name="password" placeholder="password" type="password" v-model="form.password" />
                        <Button class="py-4" :loading="data.loading">Login</Button>
                    </div>
                </form>
            </template>
        </Card>
    </div>
</template>
<style scoped>
</style>