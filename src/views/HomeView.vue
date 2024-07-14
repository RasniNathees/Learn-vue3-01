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
            <span>Filter by Status: {{ filteredText }}</span>
            <img src="@/assets/filter.png" width="20px" height="20px" alt="" />
            <ul v-show="showFilter" class="filter-menu">
              <li @click="filterdInvoice">Draft</li>
              <li @click="filterdInvoice">Pending</li>
              <li @click="filterdInvoice">Paid</li>
              <li @click="filterdInvoice">Clear Filter</li>
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
import type { invoice } from '@/interface/IInvoice'
const invoiceModelStore = useInvoiceModelStore()
let filteredText = ref<string>('')
let showFilter = ref<boolean>(false)
const totalInvoices = computed(() => invoiceModelStore.invoiceData.length)
const showFilterMenu = (): void => {
  showFilter.value = !showFilter.value
}

const filterdInvoice = (event: Event) => {
  const html = event.target as HTMLElement
  if (html.innerText != 'Clear Filter') {
    filteredText.value = html.innerText
  } else {
    filteredText.value = ''
  }

  filteredData()
}
let invoiceData = computed(() => invoiceModelStore.invoiceData)

const filteredData = () => {
  if (filteredText.value === 'Draft') {
    invoiceData = computed<invoice[]>(() =>
      invoiceModelStore.invoiceData.filter((invoice) => invoice.invoiceDraft === true)
    )
  } else if (filteredText.value === 'Pending') {
    invoiceData = computed<invoice[]>(() =>
      invoiceModelStore.invoiceData.filter((invoice) => invoice.invoicePending === true)
    )
  } else if (filteredText.value === 'Paid') {
    invoiceData = computed<invoice[]>(() =>
      invoiceModelStore.invoiceData.filter((invoice) => invoice.invoicePaid === true)
    )
  } else {
    invoiceData = computed(() => invoiceModelStore.invoiceData)
  }
}
const openInvoiceModel = (): void => {
  invoiceModelStore.toggleNew()
  const isModelOpen = invoiceModelStore.invoiceModel
  if (!isModelOpen) invoiceModelStore.toggleInvoiceModel()
}
</script>
