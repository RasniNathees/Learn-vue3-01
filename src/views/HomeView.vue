<template>
  <div class="home container">
    <div class="header flex">
      <div class="div left flex flex-column">
        <h1>Invoices</h1>
        <span>there are {{ totalInvoices }} invoices</span>
      </div>
      <div class="right flex">
        <div class="filter flex">
          <div @click="showFilterMenu" class="flex">
            <span>Filter Menue</span>
            <img src="@/assets/filter.png" width="20px" height="20px" alt="" />
            <ul v-show="showFilter" class="filter-menu">
              <li>sdf</li>
              <li>sdf</li>
              <li>sdf</li>
              <li>sdf</li>
            </ul>
          </div>
        </div>
        <div @click="openInvoiceModel" class="button flex">
          <div class="inner-button flex">
            <img src="@/assets/add.png" width="20px" height="20px" alt="" />
          </div>
          <span>Add New</span>
        </div>
      </div>
    </div>
    <div>
      <Invoice v-for="(invoice, index) in invoiceData" :key="index" :data="invoice" />
    </div>
  </div>
</template>
<script setup lang="ts">
import { computed, ref } from 'vue'
import { useInvoiceModelStore } from '@/stores/invoiceModelStore'

import Invoice from '@/components/Invoice.vue'
const invoiceModelStore = useInvoiceModelStore()

let showFilter = ref<boolean>(false)
const totalInvoices = computed(() => invoiceModelStore.invoiceData.length)
const showFilterMenu = (): void => {
  showFilter.value = !showFilter.value
}

const openInvoiceModel = (): void => {
  const isModelOpen = invoiceModelStore.invoiceModel
  if (!isModelOpen) invoiceModelStore.toggleInvoiceModel()
}

const invoiceData = computed(() => invoiceModelStore.invoiceData)
</script>
