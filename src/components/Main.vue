
<template>
    <div class="container">
        <div class="row">
            <div class="col">
                <router-link to="/display">Go to display</router-link>
            </div>
        </div>

        <div class="row">
            <div class="col">
                <span>Add new sale:</span>
            </div>
        </div>
        <div class="row">
            <div class="col-4">
                <div class="input-group">
                    <input 
                        v-model="newSale"
                        type="number"
                        class="form-control"
                        @keyup.enter="addLocalSale()"
                    >
                    <button
                        class="btn btn-primary btn-sm input-group-append" 
                        @click="addLocalSale()"
                    >
                        Add
                    </button>
                </div>
            </div>
            <div class="col">
                <div class="warning-text">
                    <span 
                        v-if="showAddWarning"
                        class="text-danger"
                    >
                        Please fill in a number to add
                    </span>
                </div>
            </div>
        </div>

        <div class="row">
            <div class="col">
                <span class="m-3">Sales overview</span>
            </div>
            <div class="col">
                <button 
                    class="btn btn-warning"
                    data-bs-toggle="modal"
                    data-bs-target="#modal_remove"
                >
                    Remove All
                </button>
                <div
                    id="modal_remove"
                    class="modal fade"
                    tabindex="-1"
                >
                    <div class="modal-dialog">
                        <div class="modal-content">
                            <div class="modal-body">
                                Are you sure you want to remove all sales?
                            </div>
                            <div class="modal-footer">
                                <button 
                                    class="btn btn-warning"
                                    data-bs-dismiss="modal"
                                    @click="onRemoveAllSales"
                                >
                                    Yes
                                </button>
                                <button
                                    type="button"
                                    class="btn btn-secondary"
                                    data-bs-dismiss="modal"
                                >
                                    Close
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div
            v-if="localSaleValues.length > 0"
            class="row"
        >
            <div class="col">
                <div class="sales-list">
                    <div
                        v-for="(sale,index) in localSaleValues"
                        :key="'sale_'+index"
                        class="row"
                    >
                        <div class="col-4">
                            <div class="input-group mb-2">
                                <input
                                    v-model="localSaleValues[index]"
                                    type="number"
                                    class="form-control"
                                    :name="'sale_input_' + index"
                                > 
                                <button
                                    class="btn btn-success input-group-append"
                                    @click="updateLocalSale(index)"
                                >
                                    <BootstrapIcon icon="arrow-clockwise" />
                                </button>
                                <button
                                    class="btn btn-danger input-group-append" 
                                    @click="removeLocalSale(index)"
                                >
                                    <BootstrapIcon icon="x-lg" />
                                </button>
                            </div>
                        </div> 

                        <div class="col">
                            <div class="warning-text">
                                <span 
                                    v-if="warning[index]?.length > 0"
                                    class="text-danger"
                                >
                                    {{ warning[index] }}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div
            v-else
            class="row"
        >
            <div class="col">
                <span>No current sales. Add some with the input at the top!</span>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import useStatistics from '../composables/useStatistics';

const { addSale, newSale, sales, removeSale, updateSale, removeAllSales } = useStatistics();

const localSaleValues = ref();
const warning = ref({});
const showAddWarning = ref(false);

const addLocalSale = () => {
    if (newSale.value >= 0 && newSale.value != "") {
        addSale();
        cloneSales();
        showAddWarning.value = false;
    } else {
        showAddWarning.value = true;
    }
};

const updateLocalSale = (index) => {
    console.log(localSaleValues.value[index]);
    if (localSaleValues.value[index] >= 0 && localSaleValues.value[index] != "") {
        updateSale(index, localSaleValues.value[index]);
        warning.value[index] = "";
    } else {
        warning.value[index] = "Please fill in a number before updating";
    }   
};

const removeLocalSale = (index) => {
    removeSale(index);
    cloneSales();
};

const cloneSales = () => {
    localSaleValues.value = JSON.parse(JSON.stringify(sales.value));
};

cloneSales();

const onRemoveAllSales = () => {
    removeAllSales();
    cloneSales();
};

</script>

<style>
.warning-text {
    height: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
}
</style>
