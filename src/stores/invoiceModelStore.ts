import { defineStore } from 'pinia'
import type { invoice } from '@/interface/IInvoice'
import { db } from '@/firestore/firestoreInit'
import { doc, query, collection, getDocs } from 'firebase/firestore'

export const useInvoiceModelStore = defineStore('invoice', {
  state: () => ({
    invoiceModel: false,
    messageModel: false,
    loading: false,
    invoiceData: [] as invoice[]
  }),
  getters: {
    getInvoice(state) {
      return (docId: string | string[]) =>
        state.invoiceData.find((invoice) => invoice.docId === docId)
    }
  },
  actions: {
    toggleInvoiceModel(): void {
      this.invoiceModel = !this.invoiceModel
    },
    toggleMessageeModel(): void {
      this.messageModel = !this.messageModel
    },
    toggleLoading(): void {
      this.loading = !this.loading
    },
    async loadInvoiceData() {
      this.loading = true
      const firebaseQuery = query(collection(db, 'InvoiceApp'))

      const querySnapshot = await getDocs(firebaseQuery)
      querySnapshot.forEach((doc) => {
        if (!this.invoiceData.some((invoice) => invoice.docId === doc.id)) {
          const data: invoice = {
            docId: doc.id,
            billerStreetAddress: doc.data().billerStreetAddress,
            billerCity: doc.data().billerCity,
            billerZipCode: doc.data().billerZipCode,
            billerCountry: doc.data().billerCountry,
            clientName: doc.data().clientName,
            clientEmail: doc.data().clientEmail,
            clientStreetAddress: doc.data().clientStreetAddress,
            clientCity: doc.data().clientCity,
            clientZipCode: doc.data().clientZipCode,
            clientCountry: doc.data().clientCountry,
            invoiceDate: doc.data().invoiceDate,
            paymentTerms: doc.data().paymentTerms,
            paymentDueDate: doc.data().paymentDueDate,
            productDescription: doc.data().productDescription,
            invoicePending: doc.data().invoicePending,
            invoiceDraft: doc.data().invoiceDraft,
            invoiceItemList: doc.data().invoiceItemList,
            invoiceTotal: doc.data().invoiceTotal
          }
          this.invoiceData.push(data)
        }
      })

      this.loading = false
    }
  }
})
