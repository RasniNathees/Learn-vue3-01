<template>
  <div class="app flex">
    <Navigation />
    <div class="flex flex-column app-content">
      <Loading v-show="invoiceModelStore.loading" />
      <transition name="invoice-message-model">
        <InvoiceMessage v-show="invoiceModelStore.messageModel" />
      </transition>

      <transition name="invoice-animation">
        <InvoiceModel v-if="invoiceModelStore.invoiceModel" />
      </transition>

      <RouterView />
    </div>
  </div>
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router'
import Navigation from './components/Navigation.vue'
import InvoiceModel from './components/InvoiceModel.vue'
import InvoiceMessage from '@/components/InvoiceMessage.vue'
import Loading from '@/components/Loading.vue'

import { useInvoiceModelStore } from '@/stores/invoiceModelStore'

const invoiceModelStore = useInvoiceModelStore()

invoiceModelStore.loadInvoiceData()
</script>
