<template>
  <div class="invoice-view container">
    <RouterLink class="nav-link" :to="{ name: 'home' }">Go Back</RouterLink>
    <div class="invoice-detail flex flex-column">
      <div class="header flex">
        <div class="left flex">
          <span>Status</span>
          <div
            class="status-button"
            :class="{
              pending: invoice?.invoicePending,
              draft: invoice?.invoiceDraft,
              paid: invoice?.invoicePaid
            }"
          >
            <span v-if="invoice?.invoicePending">Pending</span>
            <span v-if="invoice?.invoiceDraft">Draft</span>
            <span v-if="invoice?.invoicePaid">Paid</span>
          </div>
        </div>
        <div class="right flex">
          <button @click="edit" class="dark-purple">Edit</button>
          <button @click="deleteInvoice" class="red">Delete</button>
          <button @click="paid" v-if="invoice?.invoicePending" class="green">Paid</button>
          <button @click="pending" v-if="invoice?.invoicePaid" class="green">Pending</button>
        </div>
      </div>
      <div class="body flex flex-column">
        <div class="top flex">
          <div class="left flex flex-column">
            <p><span>#</span>{{ invoice?.docId }}</p>
            <p>{{ invoice?.productDescription }}</p>
          </div>
          <div class="right flex flex-column">
            <p>{{ invoice?.billerStreetAddress }}</p>
            <p>{{ invoice?.clientCity }}</p>
            <p>{{ invoice?.billerZipCode }}</p>
            <p>{{ invoice?.billerCountry }}</p>
          </div>
        </div>
        <div class="middle flex">
          <div class="payment flex flex-column">
            <h4>Invoice Date</h4>
            <p>{{ invoice?.invoiceDate }}</p>
            <h4>Payment Date</h4>
            <p>{{ invoice?.paymentDueDate }}</p>
          </div>
          <div class="bill-to flex flex-column">
            <h4>Bill To</h4>
            <p>{{ invoice?.clientName }}</p>
            <p>{{ invoice?.clientStreetAddress }}</p>
            <p>{{ invoice?.clientCity }}</p>
            <p>{{ invoice?.clientZipCode }}</p>
            <p>{{ invoice?.clientCountry }}</p>
          </div>
          <div class="sent-to flex flex-column">
            <p>{{ invoice?.clientEmail }}</p>
          </div>
        </div>
        <div class="bottom flex flex-column">
          <div class="heading flex">
            <p>Item Name</p>
            <p>QTY</p>
            <p>Price</p>
            <p>Total</p>
          </div>
          <div v-for="(item, index) in invoice?.invoiceItemList" :key="index" class="item flex">
            <p>{{ item.name }}</p>
            <p>{{ item.qty }}</p>
            <p>${{ item.price }}</p>
            <p>${{ item.total }}</p>
          </div>
        </div>
        <div class="total flex">
          <p>Amount Due</p>
          <p>${{ invoice?.invoiceTotal }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useInvoiceModelStore } from '@/stores/invoiceModelStore'
import { useRoute, RouterLink, useRouter } from 'vue-router'
import { computed } from 'vue'
import { db } from '@/firestore/firestoreInit'
import { doc, updateDoc, deleteDoc } from 'firebase/firestore'
const invoiceStore = useInvoiceModelStore()
const route = useRoute()
const router = useRouter()
const docId: string | string[] = route.params.invoiceId
invoiceStore.currentInvoice(docId)
const invoice = computed(() => {
  invoiceStore.currentInvoice(docId)
  return invoiceStore.getInvoice()
})

const edit = () => {
  invoiceStore.toggleEdit()
  invoiceStore.toggleInvoiceModel()
}

const paid = async () => {
  invoiceStore.toggleLoading()
  const docRef = doc(db, 'InvoiceApp', invoice.value.docId)
  await updateDoc(docRef, {
    invoicePaid: true,
    invoicePending: false
  })
  invoice.value.invoicePaid = true
  invoice.value.invoicePending = false
  invoiceStore.loadInvoiceData()
}
const pending = async () => {
  invoiceStore.toggleLoading()
  const docRef = doc(db, 'InvoiceApp', invoice.value.docId)
  await updateDoc(docRef, {
    invoicePaid: false,
    invoicePending: true
  })
  invoice.value.invoicePaid = false
  invoice.value.invoicePending = true
  invoiceStore.loadInvoiceData()
}

const deleteInvoice = async () => {
  invoiceStore.toggleDelete()
  // invoiceStore.toggleMessageeModel()
  await deleteDoc(doc(db, 'InvoiceApp', invoice.value.docId))
  invoiceStore.invoiceData = []
  invoiceStore.loadInvoiceData()
  router.push({ name: 'home' })
}
</script>
