<script setup>
import RadioButton from 'primevue/radiobutton';
import Button from 'primevue/button';
import InputSwitch from 'primevue/inputswitch';
import Sidebar from 'primevue/sidebar';

import { ref } from 'vue';
import { useLayout } from '@/layout/composables/layout';

defineProps({
    simple: {
        type: Boolean,
        default: false
    }
});
const scales = ref([12, 13, 14, 15, 16]);
const visible = ref(false);

const { changeThemeSettings, setScale, layoutConfig } = useLayout();


const onConfigButtonClick = () => {
    visible.value = !visible.value;
};
const onChangeTheme = (theme, mode) => {
    const elementId = 'theme-css';
    const linkElement = document.getElementById(elementId);
    const cloneLinkElement = linkElement.cloneNode(true);
    const newThemeUrl = linkElement.getAttribute('href').replace(layoutConfig.theme.value, theme);
    cloneLinkElement.setAttribute('id', elementId + '-clone');
    cloneLinkElement.setAttribute('href', newThemeUrl);
    cloneLinkElement.addEventListener('load', () => {
        linkElement.remove();
        cloneLinkElement.setAttribute('id', elementId);
        changeThemeSettings(theme, mode === 'dark');
    });
    linkElement.parentNode.insertBefore(cloneLinkElement, linkElement.nextSibling);
    localStorage.setItem('darkTheme',mode);
    localStorage.setItem('theme',theme);
};
const decrementScale = () => {
    setScale(layoutConfig.scale.value - 1);
    applyScale();
};
const incrementScale = () => {
    setScale(layoutConfig.scale.value + 1);
    applyScale();
};
const applyScale = () => {
    document.documentElement.style.fontSize = layoutConfig.scale.value + 'px';
};
const menuModeChange = (val) => {
    localStorage.setItem('menuMode',val);
}
const outlinedChange = (val) => {
    localStorage.setItem('outlined',val);
}
const rippleChange = () => {
    localStorage.setItem('ripple',!layoutConfig.ripple.value);
    
}
applyScale();
if(!(!localStorage.getItem('theme') && !localStorage.getItem('darkTheme'))) {
    onChangeTheme(localStorage.getItem('theme'),localStorage.getItem('darkTheme'));
}
</script>

<template>
    <button class="layout-config-button p-link" type="button" @click="onConfigButtonClick()">
        <i class="pi pi-cog"></i>
    </button>

    <Sidebar v-model:visible="visible" position="right" :transitionOptions="'.3s cubic-bezier(0, 0, 0.2, 1)'" class="layout-config-sidebar w-20rem">
        <h5>크기</h5>
        <div class="flex align-items-center">
            <Button icon="pi pi-minus" type="button" @click="decrementScale()" class="p-button-text p-button-rounded w-2rem h-2rem mr-2" :disabled="layoutConfig.scale.value === scales[0]"></Button>
            <div class="flex gap-2 align-items-center">
                <i class="pi pi-circle-fill text-300" v-for="s in scales" :key="s" :class="{ 'text-primary-500': s === layoutConfig.scale.value }"></i>
            </div>
            <Button icon="pi pi-plus" type="button" pButton @click="incrementScale()" class="p-button-text p-button-rounded w-2rem h-2rem ml-2" :disabled="layoutConfig.scale.value === scales[scales.length - 1]"></Button>
        </div>

        <template v-if="!simple">
            <h5>메뉴</h5>
            <div class="flex">
                <div class="field-radiobutton flex-1">
                    <RadioButton @change="menuModeChange('static')" name="menuMode" value="static" v-model="layoutConfig.menuMode.value" inputId="mode1"></RadioButton>
                    <label for="mode1">보이기</label>
                </div>

                <div class="field-radiobutton flex-1">
                    <RadioButton @change="menuModeChange('overlay')" name="menuMode" value="overlay" v-model="layoutConfig.menuMode.value" inputId="mode2"></RadioButton>
                    <label for="mode2">숨기기</label>
                </div>
            </div>
        </template>

        <template v-if="!simple">
            <h5>채우기</h5>
            <div class="flex">
                <div class="field-radiobutton flex-1">
                    <RadioButton @change="outlinedChange('outlined')" name="inputStyle" value="outlined" v-model="layoutConfig.inputStyle.value" inputId="outlined_input"></RadioButton>
                    <label for="outlined_input">비우기</label>
                </div>
                <div class="field-radiobutton flex-1">
                    <RadioButton @change="outlinedChange('filled')" name="inputStyle" value="filled" v-model="layoutConfig.inputStyle.value" inputId="filled_input"></RadioButton>
                    <label for="filled_input">채우기</label>
                </div>
            </div>

            <h5>이펙트</h5>
            <InputSwitch v-model="layoutConfig.ripple.value" @change="rippleChange" ></InputSwitch>
        </template>

        


        <h5>밝게</h5>
        <div class="grid">
            <div class="col-3">
                <button class="p-link w-2rem h-2rem" @click="onChangeTheme('lara-light-indigo', 'light')">
                    <img src="/layout/images/themes/lara-light-indigo.png" class="w-2rem h-2rem" alt="Lara Light Indigo" />
                </button>
            </div>
            <div class="col-3">
                <button class="p-link w-2rem h-2rem" @click="onChangeTheme('lara-light-blue', 'light')">
                    <img src="/layout/images/themes/lara-light-blue.png" class="w-2rem h-2rem" alt="Lara Light Blue" />
                </button>
            </div>
            <div class="col-3">
                <button class="p-link w-2rem h-2rem" @click="onChangeTheme('lara-light-purple', 'light')">
                    <img src="/layout/images/themes/lara-light-purple.png" class="w-2rem h-2rem" alt="Lara Light Purple" />
                </button>
            </div>
            <div class="col-3">
                <button class="p-link w-2rem h-2rem" @click="onChangeTheme('lara-light-teal', 'light')">
                    <img src="/layout/images/themes/lara-light-teal.png" class="w-2rem h-2rem" alt="Lara Light Teal" />
                </button>
            </div>
        </div>
        <h5>어둡게</h5>
        <div class="grid">
            <div class="col-3">
                <button class="p-link w-2rem h-2rem" @click="onChangeTheme('lara-dark-indigo', 'dark')">
                    <img src="/layout/images/themes/lara-dark-indigo.png" class="w-2rem h-2rem" alt="Lara Dark Indigo" />
                </button>
            </div>
            <div class="col-3">
                <button class="p-link w-2rem h-2rem" @click="onChangeTheme('lara-dark-blue', 'dark')">
                    <img src="/layout/images/themes/lara-dark-blue.png" class="w-2rem h-2rem" alt="Lara Dark Blue" />
                </button>
            </div>
            <div class="col-3">
                <button class="p-link w-2rem h-2rem" @click="onChangeTheme('lara-dark-purple', 'dark')">
                    <img src="/layout/images/themes/lara-dark-purple.png" class="w-2rem h-2rem" alt="Lara Dark Purple" />
                </button>
            </div>
            <div class="col-3">
                <button class="p-link w-2rem h-2rem" @click="onChangeTheme('lara-dark-teal', 'dark')">
                    <img src="/layout/images/themes/lara-dark-teal.png" class="w-2rem h-2rem" alt="Lara Dark Teal" />
                </button>
            </div>
        </div>
    </Sidebar>
</template>

<style lang="scss" scoped></style>
