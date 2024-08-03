<template>
  <div class="invoice-message flex">
    <div class="model-content">
      <p v-if="!invoiceStore.isDelete">Are you sure you want to cancel? Data wont save?</p>
      <p v-else>Are you sure you want to Delete?</p>
      <div class="flex buttons">
        <button v-if="!invoiceStore.isDelete" @click="returnToForm" class="dark-purple">
          Return
        </button>
        <button v-if="!invoiceStore.isDelete" @click="close" class="red">Close</button>
        <button v-if="invoiceStore.isDelete" @click="dontDelete" class="dark-purple">No</button>
        <button v-if="invoiceStore.isDelete" @click="deleteInvoice" class="red">Yes</button>
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
const dontDelete = (): void => {
  invoiceStore.toggleMessageeModel()
  invoiceStore.toggleDelete()
}

const deleteInvoice = (): void => {
  invoiceStore.toggleMessageeModel()
  invoiceStore.toggleDeleteConfirm()

  setTimeout(() => {
    invoiceStore.toggleDelete()
  }, 300)
}
</script>
