<template>
  <div class="invoice-view container">
    <RouterLink class="nav-link" :to="{ name: 'home' }">Go Back</RouterLink>
    <div class="invoice-detail flex flex-column">
      <div class="header flex">
        <div class="left flex">
          <span>Status</span>
          <div
            class="status-button"
            :class="{ pending: invoice?.invoicePending, draft: invoice?.invoiceDraft }"
          >
            <span v-if="invoice?.invoicePending">Pending</span>
            <span v-if="invoice?.invoiceDraft">Draft</span>
          </div>
        </div>
        <div class="right flex">
          <button class="red">Delete</button>
          <button class="dark-purple">Edit</button>
          <button class="green">Paid</button>
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
import { useRoute, RouterLink } from 'vue-router'
const invoiceStore = useInvoiceModelStore()
const route = useRoute()
const docId: string | string[] = route.params.invoiceId
const invoice = invoiceStore.getInvoice(docId)
console.log(invoiceStore.invoiceData)
</script>
