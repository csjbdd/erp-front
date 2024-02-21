<script setup>
import { ref, computed, onMounted, onBeforeUnmount, inject } from 'vue';
import { useLayout } from '@/layout/composables/layout';
import { useRouter } from 'vue-router';

const { layoutConfig, onMenuToggle } = useLayout();

const outsideClickListener = ref(null);
const topbarMenuActive = ref(false);
const displayConfirmation = ref(false);
const visibleRight = ref(false);
const router = useRouter();
const store = inject('store');


onMounted(() => {
    bindOutsideClickListener();
});

const openConfirmation = () => {
    displayConfirmation.value = true;
};

const closeConfirmation = (tf) => {
    if(tf) {
        store.dispatch("auth/logout_act");
        router.push('/');
    }else displayConfirmation.value = false;
};

onBeforeUnmount(() => {
    unbindOutsideClickListener();
});

const logoUrl = computed(() => {
    return '/layout/images/YA.jpg';
});

const onTopBarMenuButton = () => {
    topbarMenuActive.value = !topbarMenuActive.value;
};
const logout = () => {
    if(confirm('로그아웃 하시겠습니까?')) {
        store.dispatch('auth/logout_act');
    }
};
const topbarMenuClasses = computed(() => {
    return {
        'layout-topbar-menu-mobile-active': topbarMenuActive.value
    };
});

const bindOutsideClickListener = () => {
    if (!outsideClickListener.value) {
        outsideClickListener.value = (event) => {
            if (isOutsideClicked(event)) {
                topbarMenuActive.value = false;
            }
        };
        document.addEventListener('click', outsideClickListener.value);
    }
};
const unbindOutsideClickListener = () => {
    if (outsideClickListener.value) {
        document.removeEventListener('click', outsideClickListener);
        outsideClickListener.value = null;
    }
};
const isOutsideClicked = (event) => {
    if (!topbarMenuActive.value) return;

    const sidebarEl = document.querySelector('.layout-topbar-menu');
    const topbarEl = document.querySelector('.layout-topbar-menu-button');

    return !(sidebarEl.isSameNode(event.target) || sidebarEl.contains(event.target) || topbarEl.isSameNode(event.target) || topbarEl.contains(event.target));
};
</script>

<template>
    <div class="layout-topbar">
        <router-link to="/home" class="layout-topbar-logo">
            <img :src="logoUrl" alt="logo" />
            <span>유앤안 세무회계</span>
        </router-link>
        <button class="p-link layout-menu-button layout-topbar-button" @click="onMenuToggle()">
            <i class="pi pi-bars"></i>
        </button>
        
        <button class="p-link layout-topbar-menu-button layout-topbar-button" @click="onTopBarMenuButton()">
            <i class="pi pi-ellipsis-v"></i>
        </button>
        <div class="layout-topbar-menu" :class="topbarMenuClasses">
            <button v-tooltip.bottom="'캘린더'" @click="onTopBarMenuButton()" class="p-link layout-topbar-button">
                <i class="pi pi-calendar"></i>
                <span>Calendar</span>
            </button>
            <button v-tooltip.bottom="'프로필'" @click="onTopBarMenuButton()" class="p-link layout-topbar-button">
                <i class="pi pi-user"></i>
                <span>Profile</span>
            </button>
            <button class="p-link layout-topbar-button" @click="openConfirmation" v-tooltip.bottom="'로그아웃'"> 
                <i class="pi pi-power-off"></i>
                <span>로그아웃</span>
                <Dialog header="확인" v-model:visible="displayConfirmation" :style="{ width: '350px' }" :modal="true">
                    <div class="flex align-items-center justify-content-center">
                        <i class="pi pi-exclamation-triangle mr-3" style="font-size: 2rem" />
                        <span>로그아웃 하시겠습니까?</span>
                    </div>
                    <template #footer>
                        <Button label="아니오" icon="pi pi-times" @click="closeConfirmation(false)" class="p-button-text" />
                        <Button label="네" icon="pi pi-check" @click="closeConfirmation(true)" class="p-button-text" autofocus />
                    </template>
                </Dialog>
            </button>
            <button class="p-link layout-topbar-button" @click="visibleRight = true">
                <img src="/demo/images/avatar/amyelsner.png" data-pc-section="image">
            </button>
             <Sidebar v-model:visible="visibleRight" :baseZIndex="1000" position="right" class="w-full md:w-25rem lg:w-25rem">
                <div class="flex align-items-center gap-3">
                    <img src="/demo/images/avatar/amyelsner.png" data-pc-section="image">   
                    <h5><span class="font-bold">홍길동</span></h5>
                    <span class="text-color-secondary font-medium mb-5">Isabella Andolini</span>
                </div>
                <div class="flex flex-column mx-auto md:mx-0">
                    <span class="mb-2 font-semibold">홍길동</span>
                    <span class="text-color-secondary font-medium mb-5">Isabella Andolini</span>
                    <ul class="list-none m-0 p-0">
                        <li>
                            <a
                                class="cursor-pointer flex surface-border mb-3 p-3 align-items-center border-1 surface-border border-round hover:surface-hover transition-colors transition-duration-150">
                                <span>
                                    <i class="pi pi-user text-xl text-primary"></i>
                                </span>
                                <div class="ml-3">
                                    <span class="mb-2 font-semibold">Profile</span>
                                    <p class="text-color-secondary m-0">Lorem ipsum date visale</p>
                                </div>
                            </a>
                        </li>
                        <li>
                            <a
                                class="cursor-pointer flex surface-border mb-3 p-3 align-items-center border-1 surface-border border-round hover:surface-hover transition-colors transition-duration-150">
                                <span>
                                    <i class="pi pi-money-bill text-xl text-primary"></i>
                                </span>
                                <div class="ml-3">
                                    <span class="mb-2 font-semibold">Billing</span>
                                    <p class="text-color-secondary m-0">Amet mimin mıollit</p>
                                </div>
                            </a>
                        </li>
                        <li>
                            <a
                                class="cursor-pointer flex surface-border mb-3 p-3 align-items-center border-1 surface-border border-round hover:surface-hover transition-colors transition-duration-150">
                                <span>
                                    <i class="pi pi-cog text-xl text-primary"></i>
                                </span>
                                <div class="ml-3">
                                    <span class="mb-2 font-semibold">Settings</span>
                                    <p class="text-color-secondary m-0">Exercitation veniam</p>
                                </div>
                            </a>
                        </li>
                        <li>
                            <a
                                class="cursor-pointer flex surface-border mb-3 p-3 align-items-center border-1 surface-border border-round hover:surface-hover transition-colors transition-duration-150">
                                <span>
                                    <i class="pi pi-power-off text-xl text-primary"></i>
                                </span>
                                <div class="ml-3">
                                    <span class="mb-2 font-semibold">Sign Out</span>
                                    <p class="text-color-secondary m-0">Sed ut perspiciatis</p>
                                </div>
                            </a>
                        </li>
                    </ul>
                </div>
            </Sidebar>
        </div>
    </div>
</template>

<style lang="scss" scoped></style>
