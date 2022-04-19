<template>
    <div class="container">
        <div class="row">
            <div class="col title my-5">
                <h1>Donations</h1>
                <span class="mb-2">Help us raise money for our Ukrainian colleagues of the 32-m radio telescope in Zolovich!</span>
                <span>They are volunteering to carry victims of Russian attacks to hospitals using their private cars. We are helping raise money to buy them an <strong>ambulance and medical supplies</strong></span>
            </div>
        </div>
        <div class="row">
            <div class="col-8 offset-2">
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

            <div class="col-6">
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

.container {
    background-color: #fff;
    height: 100%
}

.title {
    display: flex;
    justify-content: center;
    flex-direction: column;
    margin: .2em;

    h1 {
        font-size: 4em;
    }
    span {
        font-size: 1.5em;
    }
    

}

.card {
    border: 0;
    margin-bottom: 1em;
}

.card-header {
    border: 0;
    background-color: #fff;
    font-size: 3em;
    display:flex;
    justify-content: center;
}

.card-body {
    background-color: #0057b7;
    color: #ffd700
}

.card-text {
    height: 200px;
    display: flex;
    justify-content: center;
    align-items: center;
}

.total {

    .card-text {
        font-size: 6em;
    }
}

.average {
    .card-text {
        font-size: 4em;
    }
}


.top {

    .card-text {
        font-size: 1.8em;
    }

    ul {
        list-style: none;
        margin: 0;
        padding: 0;
    }
}
</style>