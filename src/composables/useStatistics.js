import { computed, ref } from 'vue';


const sales = ref([]);


const newSale = ref();

const topAmount = ref(5);
const channel = new BroadcastChannel('statistics');
export default function useStatistics() {

    const addSale = () => {
        sales.value = [newSale.value, ...sales.value];
        newSale.value = '';
        updateStoredSales();
        
    };
    
    const removeSale = (index) => {
        sales.value.splice(index, 1);
        updateStoredSales();
    };

    const updateSale = (index, value) => {
        console.log(index);
        sales.value[index] = value;
        updateStoredSales();
    };

    const updateStoredSales = () => {
        localStorage.setItem('storedSales', sales.value.filter(n => n).toString());
        channel.postMessage('update');
    };

    const retrieveSalesFromStore = () => {
        const storedSales = localStorage.getItem('storedSales');
        sales.value = storedSales
? storedSales.split(',').map(function(x){return parseInt(x);})
: [];
    };
    retrieveSalesFromStore();

    const statistics = computed (() => {
        const total = sales.value.reduce((a, b) => a + b, 0);
        const average = total / sales.value.length;
        const highest = Math.max(...sales.value);
        const topToDisplay = topAmount.value > sales.value.length
? sales.value.length
: topAmount.value;
        const top = getTopValues(sales.value, topToDisplay);
    
        return {
            total: total,
            average: average,
            highest: highest,
            top: top
        };
    });

    const getTopValues = (arr = [], num = 1) => {
        if(num > arr.length){
           return [];
        }
        const sorter = (a, b) => b - a;
        const descendingCopy = arr.slice().sort(sorter);
        return descendingCopy.splice(0, num);
     };

    const removeAllSales = () => {
        sales.value.length = 0;
        updateStoredSales();
    };

    return {
        addSale,
        newSale,
        removeSale,
        updateSale,
        updateStoredSales,
        sales,
        statistics,
        topAmount,
        retrieveSalesFromStore,
        removeAllSales
    };
} 