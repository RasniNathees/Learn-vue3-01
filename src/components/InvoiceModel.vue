<template>
  <div class="invoice-model-wrap flex flex-column">
    <form @submit.prevent="submitInvoice" class="invoice-content flex flex-column">
      <h1>New Invoice</h1>

      <!-- Bill from -->
      <div class="bill-to flex flex-column">
        <h4>Bill From</h4>
        <div class="input flex flex-column">
          <label for="billerStreetAddress"> Street Address</label>
          <input
            type="text"
            id="billerStreetAddress"
            required
            v-model="newInvoice.billerStreetAddress"
          />
        </div>
        <!-- Location -->
        <div class="location-details flex">
          <div class="input flex flex-column">
            <label for="billerCity"> City</label>
            <input type="text" id="billerCity" required v-model="newInvoice.billerCity" />
          </div>
          <div class="input flex flex-column">
            <label for="billerZipCode"> ZipCode</label>
            <input type="text" id="billerZipCode" required v-model="newInvoice.billerZipCode" />
          </div>
          <div class="input flex flex-column">
            <label for="billerCountry"> Country</label>
            <input type="text" id="billerCountry" required v-model="newInvoice.billerCountry" />
          </div>
        </div>
      </div>

      <!-- Bill To -->
      <div class="bill-from flex flex-column">
        <h4>Bill T</h4>
        <div class="input flex flex-column">
          <label for="clientName"> Client Name</label>
          <input type="text" id="clientName" required v-model="newInvoice.clientName" />
        </div>
        <div class="input flex flex-column">
          <label for="clientEmail"> Client Email</label>
          <input type="text" id="clientEmail" required v-model="newInvoice.clientEmail" />
        </div>
        <div class="input flex flex-column">
          <label for=" clientStreetAddress"> Client's Street Address</label>
          <input
            type="text"
            id=" clientStreetAddress"
            required
            v-model="newInvoice.clientStreetAddress"
          />
        </div>
        <!-- Location -->
        <div class="location-details flex">
          <div class="input flex flex-column">
            <label for="billerCity"> City</label>
            <input type="text" id="billerCity" required v-model="newInvoice.clientCity" />
          </div>
          <div class="input flex flex-column">
            <label for="billerZipCode"> ZipCode</label>
            <input type="text" id="billerZipCode" required v-model="newInvoice.clientZipCode" />
          </div>
          <div class="input flex flex-column">
            <label for="billerCountry"> Country</label>
            <input type="text" id="billerCountry" required v-model="newInvoice.clientCountry" />
          </div>
        </div>
      </div>

      <!-- invoice Work -->
      <div class="invoice-work flex flex-column">
        <div class="payment flex">
          <div class="input flex flex-column">
            <label for="invoiceDate"> Invoice Date</label>
            <input
              disabled
              type="text"
              id="invoiceDate"
              required
              v-model="newInvoice.invoiceDate"
            />
          </div>
          <div class="input flex flex-column">
            <label for="paymentDueDate"> Payment Due Date </label>
            <input
              disabled
              type="text"
              id="paymentDueDate"
              required
              v-model="newInvoice.paymentDueDate"
            />
          </div>
        </div>
        <div class="input flex flex-column">
          <label for="paymentTerms"> Payment Terms</label>
          <select id="paymentTerms" required v-model="newInvoice.paymentTerms">
            <option value="3">Net 3 Days</option>
            <option value="7">Net 7 Days</option>
          </select>
        </div>
        <div class="input flex flex-column">
          <label for="productDescription"> Product Description</label>
          <input
            type="text"
            id="productDescription"
            required
            v-model="newInvoice.productDescription"
          />
        </div>
      </div>

      <!-- work Item -->
      <div class="work-item">
        <h3>Item List</h3>
        <table class="table-items">
          <thead>
            <tr class="flex table-heading">
              <th class="item-name">Item Name</th>
              <th class="qty">Qty</th>
              <th class="price">Price</th>
              <th class="total">Total</th>
              <th class="action">Action</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in newInvoice.invoiceItemList" :key="item.id" class="flex table-item">
              <td class="item-name"><input type="text" v-model="item.name" /></td>
              <td class="qty"><input type="text" v-model="item.qty" /></td>
              <td class="price"><input type="text" v-model="item.price" /></td>
              <td class="total">{{ (item.total = item.qty * item.price) }}</td>
              <td class="action">
                <img src="@/assets/logo.svg" alt="" />
              </td>
            </tr>
          </tbody>
        </table>
        <div @click="addNewItem" class="button flex">
          <img src="" alt="" />
          <span>Add New</span>
        </div>
      </div>

      <!-- save -->
      <div class="save-exit flex">
        <div class="left flex">
          <button type="button" @click="closeInvoiceModel" class="red">Cencel</button>
        </div>
        <div class="right flex">
          <button @click="saveInvoice" type="submit" class="dark-purple">save</button>
          <button @click="saveDraft" type="submit" class="dark-purple">Draft</button>
        </div>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { reactive, watch } from 'vue'
import type { invoice } from '@/interface/IInvoice'
import { useInvoiceModelStore } from '@/stores/invoiceModelStore'
import { uuid } from 'vue3-uuid'
import { db } from '@/firestore/firestoreInit'
import { doc, setDoc } from 'firebase/firestore'

const invoiceModelStore = useInvoiceModelStore()

const newInvoice: invoice = reactive({
  docId: '',
  billerStreetAddress: '',
  billerCity: '',
  billerZipCode: undefined,
  billerCountry: '',
  clientName: '',
  clientEmail: '',
  clientStreetAddress: '',
  clientCity: '',
  clientZipCode: undefined,
  clientCountry: '',
  invoiceDate: '',
  paymentTerms: '',
  paymentDueDate: '',
  productDescription: '',
  invoicePending: false,
  invoiceDraft: false,
  invoiceItemList: [{ id: uuid.v4(), name: '', qty: 0, price: 0, total: 0 }],
  invoiceTotal: 0
})

const dateUnix = Date.now()
const options: Intl.DateTimeFormatOptions = {
  weekday: 'short', // Or 'long' or 'narrow'
  year: 'numeric', // Or other formatting options
  month: 'long',
  day: 'numeric'
}
newInvoice.invoiceDate = new Date(dateUnix).toLocaleDateString('en-us', options)

watch(
  () => newInvoice.paymentTerms,
  () => {
    const date = new Date()
    date.setDate(date.getDate() + parseInt(newInvoice.paymentTerms))
    newInvoice.paymentDueDate = date.toLocaleString('en-us', options)
  }
)

const addNewItem = (): void => {
  const newItem = {
    id: uuid.v4(),
    name: '',
    qty: 0,
    price: 0,
    total: 0
  }
  newInvoice.invoiceItemList.push(newItem)
}

const closeInvoiceModel = (): void => {
  invoiceModelStore.toggleInvoiceModel()
}

const invoiceTotal = (): void => {
  newInvoice.invoiceTotal = 0
  newInvoice.invoiceTotal = newInvoice.invoiceItemList.reduce((accumulator, currentItem) => {
    return (accumulator += currentItem.total)
  }, newInvoice.invoiceTotal)
}

const insertToDatabase = async (): Promise<void> => {
  invoiceTotal()
  const id = uuid.v4()
  newInvoice.docId = id
  await setDoc(doc(db, 'InvoiceApp', id), newInvoice)
  invoiceModelStore.toggleInvoiceModel()
}

const submitInvoice = (): void => {
  insertToDatabase()
}

const saveInvoice = (): void => {
  newInvoice.invoicePending = true
}

const saveDraft = (): void => {
  newInvoice.invoiceDraft = true
}
</script>
