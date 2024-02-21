<script setup>
import LoadingBar from '@/components/LoadingBar.vue'
import {inject, computed} from 'vue';
const store = inject('store');
const isLoading = computed(()=> store.getters["util/isLoading"])
</script>

<template>
    <router-view />
    <LoadingBar v-if="isLoading"/>
</template>

<style scoped></style>



