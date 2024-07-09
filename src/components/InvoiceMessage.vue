<template>
  <div class="invoice-message flex">
    <div class="model-content">
      <p>Are you sure you want to cancel? Data wont save?</p>
      <div class="flex buttons">
        <button @click="returnToForm" class="dark-purple">Return</button>
        <button @click="close" class="red">Close</button>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { useInvoiceModelStore } from '@/stores/invoiceModelStore'

const invoiceStore = useInvoiceModelStore()

const returnToForm = (): void => {
  invoiceStore.toggleMessageeModel()
}

const close = (): void => {
  invoiceStore.toggleMessageeModel()
  invoiceStore.toggleInvoiceModel()
}
</script>
