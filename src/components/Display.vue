<template>
    <div class="container">
        <div class="row">
            <div class="col-6">
                <div class="card total">
                    <div class="card-header">
                        <span>Total</span>
                    </div>
                    <div class="card-body">
                        <div class="card-text">
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

        <div class="col-6">
            <div class="card average">
                <div class="card-header">
                    <span>Average</span>
                </div>
                <div class="card-body">
                    <div class="card-text">
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
        </div>

        <div class="col">
            <div class="card top">
                <div class="card-header">
                    <span>Top {{ topAmount }}</span>
                </div>

                <div class="card-body">
                    <div class="card-text">
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

.top {

    ul {
        list-style: none;
    }
}
</style>