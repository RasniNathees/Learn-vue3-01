import { defineStore } from 'pinia'

export const useInvoiceModelStore = defineStore('invoice', {
  state: () => ({
    invoiceModel: false,
    messageModel: false,
    loading: false
  }),
  getters: {},
  actions: {
    toggleInvoiceModel(): void {
      this.invoiceModel = !this.invoiceModel
    },
    toggleMessageeModel(): void {
      this.messageModel = !this.messageModel
    },
    toggleLoading(): void {
      this.loading = !this.loading
    }
  }
})
