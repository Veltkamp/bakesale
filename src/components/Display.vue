<template>
    <div class="container">
        <div class="row">
            <div class="col">
                <div class="total">
                    <span>Total:&nbsp;</span>
                    <vue3-autocounter 
                        ref="counter"
                        :start-amount="totalValues[0]"
                        :end-amount="totalValues[1]"
                        :duration="1"
                        prefix="&euro;"
                        suffix=""
                        separator=","
                        decimal-separator="."
                        :decimals="2"
                        :autoinit="true"
                    />
                </div>
            </div>
        </div>
    </div>

    <div class="row">
        <div class="col">
            <div class="average">
                <span>Average:&nbsp;</span>
                <vue3-autocounter 
                    ref="counter"
                    :start-amount="averageValues[0]"
                    :end-amount="averageValues[1]"
                    :duration="1"
                    prefix="&euro;"
                    suffix=""
                    separator=","
                    decimal-separator="."
                    :decimals="2"
                    :autoinit="true"
                />  
            </div>
        </div>
    </div>
    
    <div class="row">
        <div class="col">
            <div class="top">
                <span>Top {{ topAmount }}: </span>
                <ul>
                    <li 
                        v-for="(number,index) in statistics.top"
                        :key="'number_' + index"
                    >
                        #{{ index+1 }} &euro;{{ number }}
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script setup>
import {ref, watch } from 'vue';

import useStatistics from '../composables/useStatistics';

const { statistics, topAmount, retrieveSalesFromStore } = useStatistics();

const totalValues = ref([statistics.value.total,statistics.value.total]);
const averageValues = ref([statistics.value.average, statistics.value.average]);

watch(statistics, (currentValue, previousValue) => {
    totalValues.value = [previousValue.total, currentValue.total];
    averageValues.value = [previousValue.average, currentValue.average];
});

const channel = new BroadcastChannel('statistics');
channel.onmessage = (e) => {
    console.log(e);
    retrieveSalesFromStore();
};

</script>

<style lang="scss" scoped>
.total {
    font-size:5em;
    display: flex;
    justify-content: center;
}

.average {
    font-size:3em;
    display: flex;
    justify-content: center;
}

.top {
    font-size: 2em;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    
    ul {
        list-style: none;
    }
}
</style>