import { defineStore } from 'pinia'

export const useInvoiceModelStore = defineStore('invoice', {
  state: () => ({
    invoiceModel: false
  }),
  getters: {},
  actions: {
    toggleInvoiceModel() {
      this.invoiceModel = !this.invoiceModel
    }
  }
})
