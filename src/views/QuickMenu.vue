<script setup>
import { ref, onMounted } from 'vue';

const picklistValue = ref([
    [
        { name: '대시보드', no: 1 },
        { name: '결재함', no: 1 },
        { name: '메뉴1', no: 1 },
        { name: '메뉴2', no: 1 },
    ],
    [
        { name: '퀵메뉴 설정', no: 1 },
        { name: '캘린더', no: 2 },
        { name: '프로필', no: 3 },
    ]
]);



const layout = ref('grid');
const sortKey = ref(null);
const sortOrder = ref(null);
const sortField = ref(null);
const sortOptions = ref([
    { label: 'Price High to Low', value: '!price' },
    { label: 'Price Low to High', value: 'price' }
]);


onMounted(() => {
});

const onSortChange = (event) => {
    const value = event.value.value;
    const sortValue = event.value;

    if (value.indexOf('!') === 0) {
        sortOrder.value = -1;
        sortField.value = value.substring(1, value.length);
        sortKey.value = sortValue;
    } else {
        sortOrder.value = 1;
        sortField.value = value;
        sortKey.value = sortValue;
    }
};
</script>

<template>
    <div class="grid">
        <div class="col-12">
            <div class="card">
                <div class="flex justify-content-between align-items-center mb-5">
                    <h5>퀵메뉴 설정</h5>
                    <div>
                        <Button label="저장" icon="pi pi-check" :disabled="true"/>
                    </div>
                </div>
                <PickList v-model="picklistValue" listStyle="height:250px" dataKey="no">
                    <template #sourceheader> 메뉴 리스트 </template>
                    <template #targetheader> 퀵메뉴 리스트 </template>
                    <template #item="slotProps">
                        <div>{{ slotProps.item.name }}</div>
                    </template>
                </PickList>
                
            </div>
        </div>
    </div>

</template>
