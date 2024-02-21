<script setup>
import { useLayout } from '@/layout/composables/layout';
import { ref, computed, inject, onMounted, getCurrentInstance} from 'vue';
import AppConfig from '@/layout/AppConfig.vue';
import LoadingBar from '@/components/LoadingBar.vue'
import { mapGetters } from 'vuex'

const { layoutConfig } = useLayout();
const memberId = ref('');
const password = ref('');
const checked = ref('');
const axios = inject('axios');
const store = inject('store');
const router = inject('router');
const logoUrl = computed(() => {
    return 'layout/images/YA.jpg';
});
const loading = (tf) => {store.dispatch("util/updateIsLoading",tf);}
onMounted(() => {
    //로그인 되어있을때
    if(store.getters['auth/isLogin']) {
        router.push('home');
    }
    if(localStorage.getItem('rememberId') == null) {
        checked.value = false;
    }else {
        checked.value = true;
        memberId.value = localStorage.getItem('rememberId');
    } 
})

const submit = ()=> {
    if (memberId.value === '') {
        alert('ID를 입력하세요.')
        return
    }

    if (password.value === '') {
        alert('비밀번호를 입력하세요.')
        return
    }
    const param = {
        memberId: memberId.value,
        password: password.value,
        checked: checked.value
    }
    loading(true);
    store.dispatch('auth/login', param);
} 
let capsLockOn = ref(false);
const checkCapsLock = () => {
    if(!event.key)return
    if (event.getModifierState("CapsLock")) {
        capsLockOn = true;
    }else {
        capsLockOn = false;
    }
}
</script>

<template>
    <div class="surface-ground flex align-items-center justify-content-center min-h-screen min-w-screen overflow-hidden">
        <div class="flex flex-column align-items-center justify-content-center">
            <img :src="logoUrl" alt="Sakai logo" class="mb-5 w-6rem flex-shrink-0" />
            <div style="border-radius: 56px; padding: 0.3rem; background: linear-gradient(180deg, var(--primary-color) 10%, rgba(33, 150, 243, 0) 30%)">
                <div class="w-full surface-card py-8 px-5 sm:px-8" style="border-radius: 53px">
                    <div class="text-center mb-5">
                        <img src="/demo/images/login/avatar.png" alt="Image" height="50" class="mb-3" />
                        <div class="text-900 text-3xl font-medium mb-3">안녕하세요!, 유앤안 ERP시스템 입니다.</div>
                        <span class="text-red-600 font-medium" v-if="capsLockOn">현재 Caps lock이 켜져 있습니다.</span>
                    </div>

                    <div>
                        <label for="memberId" class="block text-900 text-xl font-medium mb-2">아이디</label>
                        <InputText id="memberId" type="text"  class="w-full md:w-30rem mb-5" style="padding: 1rem" @keydown="checkCapsLock" v-model="memberId" />

                        <label for="password" class="block text-900 font-medium text-xl mb-2">비밀번호</label>
                        <Password id="password" v-model="password" @keydown="checkCapsLock" :toggleMask="true" class="w-full mb-3" inputClass="w-full" :inputStyle="{ padding: '1rem' }"></Password>

                        <div class="flex align-items-center justify-content-between mb-5 gap-5">
                            <div class="flex align-items-center">
                                <Checkbox v-model="checked" id="checked" binary class="mr-2"></Checkbox>
                                <label for="checked">아이디 저장하기</label>
                            </div>
                            <a class="font-medium no-underline ml-2 text-right cursor-pointer" style="color: var(--primary-color)"></a>
                        </div>
                        <Button label="로그인" class="w-full p-3 text-xl" @click="submit"></Button>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <AppConfig simple />
</template>


<style scoped>
.pi-eye {
    transform: scale(1.6);
    margin-right: 1rem;
}

.pi-eye-slash {
    transform: scale(1.6);
    margin-right: 1rem;
}
</style>
