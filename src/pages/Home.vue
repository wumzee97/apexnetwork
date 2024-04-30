<script lang="ts" setup>
import AppNavBar from "../components/AppNavBar.vue";
import AppTab from "../components/AppTab.vue";
import AppButton from "../components/AppButton.vue";
import IconFilter from "../components/icons/IconFilter.vue";
import AppInput from "../components/AppInput.vue";
import AppSelectInput from "../components/AppSelectInput.vue";
import AppDropdownMenu from "../components/AppDropdownMenu.vue"
import { ref, watch } from "vue";
import type { IOptions, IPaymentData } from "../types";
import IconChevronDown from "../components/icons/IconChevronDown.vue";
import AppPagination from "../components/AppPagination.vue";
import AppLoader from "../components/AppLoader.vue"
import { useAppFormatter } from "../composables/useAppFormatters";
import moment from "moment";

const formatter = useAppFormatter();

const userStatusOptions = ref([
  { text: "All", value: "all", marked: false },
  { text: "Active", value: "active", marked: true },
  { text: "Inactive", value: "inactive", marked: true },
]);
const paymentStatusOptions = ref([
  { text: "All", value: "all", marked: false },
  { text: "Paid", value: "paid", marked: true },
  { text: "Unpaid", value: "unpaid", marked: true },
  { text: "Overdue", value: "overdue", marked: true },
]);

const userStatus = ref(userStatusOptions.value[0]);
const paymentStatus = ref(paymentStatusOptions.value[0]);
const payments = ref<IPaymentData[]>([]);
const rowsPerPage = ref(10);
const state = ref("all");
const page = ref(1);
const noOfPages = ref(1);
const name = ref("");
const amount = ref<number>();
const perPageOptions = ref([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 20, 50, 100]);
const loading = ref(false);

 async function handleUserStatusUpdate(value: IOptions) {
   userStatus.value = value;
   await fetchTransactions().then(() => {
    
    setTimeout(() => {
      if(value.value !== 'all'){
        
         const obj = payments.value.filter(item => item.user.status == value.value)
         payments.value = obj
         

      }

    }, 1000)
   })
}

function handlePaymentStatusUpdate(value: IOptions) {
  paymentStatus.value = value;
  state.value = value.value;
  fetchTransactions();
}

async function fetchTransactions() {
  loading.value = true;
  const currentDate = moment();
  fetch(
    `https://apex-payments-eca4dc83534e.herokuapp.com/api/transactions?page=${page.value}&per_page=${rowsPerPage.value}&state=${state.value}`
  )
    .then((data) => {
      return data.json();
    })
    .then((transactions) => {
      payments.value = transactions.data;
      noOfPages.value = transactions.last_page;
      payments.value.forEach((payment) => {
        if (
          !payment.payment_made_at &&
          !moment(payment.payment_expected_at).isBefore(currentDate)
        ) {
          payment.status = "unpaid";
        } else if (
          !payment.payment_made_at &&
          moment(payment.payment_expected_at).isBefore(currentDate)
        ) {
          payment.status = "overdue";
        } else {
          payment.status = "paid";
        }
        if(userStatus.value.value != 'all'){
          const obj = payments.value.filter(item => item.user.status == userStatus.value.value)
         payments.value = obj
        }
      });

      loading.value = false;
    }).catch(error => {
      console.log(error)
    })
}

function handlePageChange(value: number) {
  page.value = value;
  fetchTransactions();
}

function handleTabChange(value: string) {
  state.value = value;
  fetchTransactions();
}

watch(name, () => {
  const obj = payments.value.filter((item) =>
    item.user.name.toLowerCase().includes(name.value.toLowerCase())
  );
  payments.value = obj;
  if (name.value == "") {
    fetchTransactions();
  }
});

watch(amount, () => {
  const obj = payments.value.filter(
    (item) => item.amount === Number(amount.value)
  );
  if (obj.length) {
    payments.value = obj;
  }
  if (!amount.value) {
    fetchTransactions();
  }
});

fetchTransactions();
</script>

<template>
  <div class="bg-[#FAFAFA] w-full pb-16">
    <AppNavBar />
    <div class="px-4 lg:px-16 pt-24">
      <div class="flex flex-col lg:flex-row justify-between mt-8">
        <div class="lg:basis-7/12">
          <AppTab @change="handleTabChange" />
        </div>
        <AppButton class="mt-6 lg:mt-0">Pay Dues</AppButton>
      </div>

      <div class="bg-white w-full h-full p-6 rounded-2xl mt-6">
        <div class="flex justify-end">
          <button
            class="h-14 w-[112px] bg-[#FAFAFA] rounded-xl border border-[#EEEFF2] text-primary font-medium flex items-center justify-center"
          >
            <IconFilter class="mr-3" /> Filters
          </button>
        </div>

        <div class="flex flex-col lg:flex-row gap-6 mt-8">
          <div class="w-full">
            <p class="font-bold text-dark mb-3">Name</p>
            <AppInput placeholder="Name" type="text" v-model="name" />
          </div>
          <div class="w-full">
            <p class="font-bold text-dark mb-3">Amount</p>
            <AppInput type="number" v-model="amount" />
          </div>
          <div class="w-full">
            <p class="font-bold text-dark mb-3">User's Status</p>
            <AppSelectInput
              :options="userStatusOptions"
              v-model="userStatus"
              @update:model-value="handleUserStatusUpdate"
            />
          </div>
          <div class="w-full">
            <p class="font-bold text-dark mb-3">Payment Status</p>
            <AppSelectInput
              :options="paymentStatusOptions"
              v-model="paymentStatus"
              @update:model-value="handlePaymentStatusUpdate"
            />
          </div>
        </div>
        <AppLoader v-if="loading && !payments.length" />
        
        <div class="overflow-x-scroll" v-else-if="payments.length">
        
        <table  class="w-full mt-12 table-auto ">
          <thead class="border-y border-[#EEEFF2] h-16 w-full">
            <tr class="h-20">
              <th class="" scope="col"></th>
              <th scope="col"class="text-light-purple font-medium text-left px-8 lg:px-0">Name</th>
              <th scope="col" class="text-light-purple font-medium text-left px-8 lg:px-0">
                User Status
              </th>
              <th scope="col" class="text-light-purple font-medium text-left px-8 lg:px-0">
                Payment Status
              </th>
              <th scope="col" class="text-light-purple font-medium text-left px-8 lg:px-0">Amount</th>
              <th scope="col" class="text-light-purple font-medium text-left px-8 lg:px-0">Actions</th>
            </tr>
          </thead>


          <tbody >
          
            <tr
              class=" h-20 border-b border-[#EEEFF2] hover:bg-[#F9FAFB] py-5"
              v-for="payment in payments"
              :key="payment?.id"
            >
              <td class="">
                <input type="radio" class="rounded-full h-5 w-5" />
              </td>
              <td class="px-8 lg:px-0">
                <p class="font-semibold text-dark">{{ payment.user.name }}</p>
                <p class="text-content-secondary font-medium">
                  {{ payment.user.email }}
                </p>
              </td>
              <td class="px-8 lg:px-0 ">
                <div
                  class="w-[88px] capitalize h-[32px] rounded-lg text-sm font-medium flex items-center justify-center"
                  :class="
                    payment.user.status == 'active'
                      ? 'text-primary bg-[#E7F7EF]'
                      : 'text-warning bg-[#FFF0E6]'
                  "
                >
                  <span
                    class="h-1.5 w-1.5 rounded-full mr-1.5"
                    :class="
                      payment.user.status == 'active'
                        ? 'bg-primary'
                        : 'bg-warning'
                    "
                  ></span>
                  {{ payment.user.status }}
                </div>
                <p class="text-content-body font-medium mt-1">
                  Last Login:
                  {{ formatter.formatDate(payment.user.last_login_at) }}
                </p>
              </td>
              <td class="px-8 lg:px-0">
                <div
                  class="w-fit px-4 max h-[32px] capitalize rounded-lg text-sm font-medium flex-auto flex items-center justify-center"
                  :class="
                    payment.status == 'paid'
                      ? 'text-[#8C62FF] bg-[#F4F0FF]'
                      : payment.status == 'overdue'
                      ? 'text-error bg-[#FFF0F0]'
                      : 'text-[#D4A701] bg-[#FEF7DC]'
                  "
                >
                  <span
                    class="h-1.5 w-1.5 rounded-full mr-1.5"
                    :class="
                      payment.status == 'paid'
                        ? 'bg-[#8C62FF]'
                        : payment.status == 'overdue'
                        ? 'bg-error'
                        : 'bg-[#D4A701]'
                    "
                  ></span>
                  {{ payment.status }}
                </div>
                <p
                  class="text-content-body font-medium mt-1"
                  v-if="payment.status == 'paid'"
                >
                  Paid on: {{ formatter.formatDate(payment.payment_made_at) }}
                </p>
                <p v-else class="text-content-body font-medium mt-1">
                  {{ payment.status == "overdue" ? "Dued" : "Dues" }} on:
                  {{ formatter.formatDate(payment.payment_expected_at) }}
                </p>
              </td>
              <td class="px-8 lg:px-0">
                <p class="font-semibold text-text-dark">
                  ${{ payment.amount.toLocaleString() }}
                </p>
                <p class="font-medium text-content-secondary">
                  {{ payment.currency }}
                </p>
              </td>
              <td class="px-8 lg:px-0">
               
                <AppDropdownMenu />
              </td>
            </tr>
          </tbody>

         
        </table>
        </div>
        
        <div v-else class="flex justify-center items-center h-96 text-light-purple text-center w-full">
          
         No data found
          
          </div>

        <div class="flex justify-between items-center mt-4">
          <div class="flex items-center">
            <p class="text-sm text-light-purple py-8">Show result:</p>
            <div class="grid border border-[#EEEFF2] rounded-lg ml-4">
              <select
                v-model="rowsPerPage"
                @change="fetchTransactions"
                name=""
                class="text-sm px-2 row-start-1 col-start-1 focus:outline-none rounded-lg appearance-none font-bold w-[68px] h-[38px]"
                id=""
              >
                <option v-for="i in perPageOptions" :key="i" :value="i">
                  {{ i }}
                </option>
              </select>

              <IconChevronDown
                width="16px"
                height="16px"
                class="pointer-events-none row-start-1 col-start-1 ml-11 mt-3"
              />
            </div>
          </div>

          <AppPagination :pages="noOfPages" @change="handlePageChange" />
        </div>
      </div>
    </div>
  </div>
</template>
