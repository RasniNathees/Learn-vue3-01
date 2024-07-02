<template>
  <div class="app flex">
    <Navigation />
    <div class="flex flex-column app-content">
      <transition name="invoice-animation">
        <InvoiceModel v-if="invoiceModelStore.invoiceModel" />
      </transition>

      <RouterView />
    </div>
  </div>
</template>

<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import Navigation from './components/Navigation.vue'
import InvoiceModel from './components/InvoiceModel.vue'
import { useInvoiceModelStore } from '@/stores/invoiceModelStore'

const invoiceModelStore = useInvoiceModelStore()
</script>
