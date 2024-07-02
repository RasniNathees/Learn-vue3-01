import { defineStore } from 'pinia'

export const useInvoiceModelStore = defineStore('invoice', {
  state: () => ({
    invoiceModel: false
  }),
  getters: {},
  actions: {
    toggleInvoiceModel(): void {
      this.invoiceModel = !this.invoiceModel
    }
  }
})
