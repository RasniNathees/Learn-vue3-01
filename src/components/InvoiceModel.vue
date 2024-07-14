<template>
  <div @click="checkClick" ref="invoiceWrap" class="invoice-model-wrap flex flex-column">
    <form @submit.prevent="submitInvoice" class="invoice-content flex flex-column">
      <h1 v-if="!invoiceModelStore.isEdit">New Invoice</h1>
      <h1 v-else>Edit Invoice</h1>
      <!-- Bill from -->
      <div class="bill-to flex flex-column">
        <h4>Bill From</h4>
        <div class="input flex flex-column">
          <label for="billerStreetAddress"> Street Address</label>
          <input
            type="text"
            id="billerStreetAddress"
            required
            v-model="invoiceDetails.billerStreetAddress"
          />
        </div>
        <!-- Location -->
        <div class="location-details flex">
          <div class="input flex flex-column">
            <label for="billerCity"> City</label>
            <input type="text" id="billerCity" required v-model="invoiceDetails.billerCity" />
          </div>
          <div class="input flex flex-column">
            <label for="billerZipCode"> ZipCode</label>
            <input type="text" id="billerZipCode" required v-model="invoiceDetails.billerZipCode" />
          </div>
          <div class="input flex flex-column">
            <label for="billerCountry"> Country</label>
            <input type="text" id="billerCountry" required v-model="invoiceDetails.billerCountry" />
          </div>
        </div>
      </div>

      <!-- Bill To -->
      <div class="bill-from flex flex-column">
        <h4>Bill To</h4>
        <div class="input flex flex-column">
          <label for="clientName"> Client Name</label>
          <input type="text" id="clientName" required v-model="invoiceDetails.clientName" />
        </div>
        <div class="input flex flex-column">
          <label for="clientEmail"> Client Email</label>
          <input type="text" id="clientEmail" required v-model="invoiceDetails.clientEmail" />
        </div>
        <div class="input flex flex-column">
          <label for=" clientStreetAddress"> Client's Street Address</label>
          <input
            type="text"
            id=" clientStreetAddress"
            required
            v-model="invoiceDetails.clientStreetAddress"
          />
        </div>
        <!-- Location -->
        <div class="location-details flex">
          <div class="input flex flex-column">
            <label for="billerCity"> City</label>
            <input type="text" id="billerCity" required v-model="invoiceDetails.clientCity" />
          </div>
          <div class="input flex flex-column">
            <label for="billerZipCode"> ZipCode</label>
            <input type="text" id="billerZipCode" required v-model="invoiceDetails.clientZipCode" />
          </div>
          <div class="input flex flex-column">
            <label for="billerCountry"> Country</label>
            <input type="text" id="billerCountry" required v-model="invoiceDetails.clientCountry" />
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
              v-model="invoiceDetails.invoiceDate"
            />
          </div>
          <div class="input flex flex-column">
            <label for="paymentDueDate"> Payment Due Date </label>
            <input
              disabled
              type="text"
              id="paymentDueDate"
              required
              v-model="invoiceDetails.paymentDueDate"
            />
          </div>
        </div>
        <div class="input flex flex-column">
          <label for="paymentTerms"> Payment Terms</label>
          <select id="paymentTerms" required v-model="invoiceDetails.paymentTerms">
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
            v-model="invoiceDetails.productDescription"
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
            <tr
              v-for="item in invoiceDetails.invoiceItemList"
              :key="item.id"
              class="flex table-item"
            >
              <td class="item-name"><input type="text" v-model="item.name" /></td>
              <td class="qty"><input type="text" v-model="item.qty" /></td>
              <td class="price"><input type="text" v-model="item.price" /></td>
              <td class="total">{{ (item.total = item.qty * item.price) }}</td>
              <td class="action delete" @click="deleteItem(item.id)">
                <img src="@/assets/delete.png" alt="" />
              </td>
            </tr>
          </tbody>
        </table>
        <div @click="addNewItem" class="button flex">
          <img src="@/assets/add.png" alt="" height="24px" width="24px" />
          <span>Add New</span>
        </div>
      </div>

      <!-- save -->
      <div class="save-exit flex">
        <div class="left flex">
          <button type="button" @click="closeInvoiceModel" class="red">Cencel</button>
        </div>
        <div class="right flex">
          <button
            v-if="!invoiceModelStore.isEdit"
            @click="saveInvoice"
            type="submit"
            class="dark-purple"
          >
            save
          </button>
          <button
            v-if="!invoiceModelStore.isEdit"
            @click="saveDraft"
            type="submit"
            class="dark-purple"
          >
            Draft
          </button>
          <button
            v-if="invoiceModelStore.isEdit"
            @click="updateInvoice"
            type="submit"
            class="dark-purple"
          >
            Update Invoice
          </button>
        </div>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { reactive, watch, ref } from 'vue'
import type { invoice } from '@/interface/IInvoice'
import { useInvoiceModelStore } from '@/stores/invoiceModelStore'
import { uuid } from 'vue3-uuid'
import { db } from '@/firestore/firestoreInit'
import { doc, setDoc, updateDoc } from 'firebase/firestore'

const invoiceModelStore = useInvoiceModelStore()
const invoiceWrap = ref(null)
let invoiceDetails: invoice
if (invoiceModelStore.isEdit) {
  invoiceDetails = reactive(invoiceModelStore.getInvoice())
} else {
  invoiceDetails = reactive({
    docId: '',
    billerStreetAddress: '',
    billerCity: '',
    billerZipCode: 0,
    billerCountry: '',
    clientName: '',
    clientEmail: '',
    clientStreetAddress: '',
    clientCity: '',
    clientZipCode: 0,
    clientCountry: '',
    invoiceDate: '',
    paymentTerms: '',
    paymentDueDate: '',
    productDescription: '',
    invoicePending: false,
    invoiceDraft: false,
    invoicePaid: false,
    invoiceItemList: [{ id: uuid.v4(), name: '', qty: 0, price: 0, total: 0 }],
    invoiceTotal: 0
  })
}
const dateUnix = Date.now()
const options: Intl.DateTimeFormatOptions = {
  weekday: 'short', // Or 'long' or 'narrow'
  year: 'numeric', // Or other formatting options
  month: 'long',
  day: 'numeric'
}
if (!invoiceModelStore.isEdit) {
  invoiceDetails.invoiceDate = new Date(dateUnix).toLocaleDateString('en-us', options)

  watch(
    () => invoiceDetails.paymentTerms,
    () => {
      const date = new Date()
      date.setDate(date.getDate() + parseInt(invoiceDetails.paymentTerms))
      invoiceDetails.paymentDueDate = date.toLocaleString('en-us', options)
    }
  )
}
const addNewItem = (): void => {
  const newItem = {
    id: uuid.v4(),
    name: '',
    qty: 0,
    price: 0,
    total: 0
  }
  invoiceDetails.invoiceItemList.push(newItem)
}

const closeInvoiceModel = (): void => {
  invoiceModelStore.toggleInvoiceModel()
}

const invoiceTotal = (): void => {
  invoiceDetails.invoiceTotal = 0
  invoiceDetails.invoiceTotal = invoiceDetails.invoiceItemList.reduce(
    (accumulator, currentItem) => {
      return (accumulator += currentItem.total)
    },
    invoiceDetails.invoiceTotal
  )
}

const insertToDatabase = async (): Promise<void> => {
  invoiceModelStore.toggleLoading()
  invoiceTotal()
  const id = uuid.v4()
  invoiceDetails.docId = id
  await setDoc(doc(db, 'InvoiceApp', id), invoiceDetails)

  invoiceModelStore.toggleInvoiceModel()
  // invoiceModelStore.toggleLoading()
  invoiceModelStore.loadInvoiceData()
}

const submitInvoice = (): void => {
  if (!invoiceModelStore.isEdit) {
    insertToDatabase()
  } else {
    invoiceModelStore.toggleLoading()
    updateInvoice()
  }
}

const saveInvoice = (): void => {
  invoiceDetails.invoicePending = true
}

const saveDraft = (): void => {
  invoiceDetails.invoiceDraft = true
}

const checkClick = (event: Event): void => {
  if (event.target === invoiceWrap.value) {
    invoiceModelStore.toggleMessageeModel()
  }
}

const deleteItem = (id: string): void => {
  invoiceDetails.invoiceItemList = invoiceDetails.invoiceItemList.filter((item) => item.id != id)
}

const updateInvoice = async () => {
  const docRef = doc(db, 'InvoiceApp', invoiceDetails.docId)
  invoiceTotal()

  await updateDoc(docRef, {
    billerStreetAddress: invoiceDetails.billerStreetAddress,
    billerCity: invoiceDetails.billerCity,
    billerZipCode: invoiceDetails.billerZipCode,
    billerCountry: invoiceDetails.billerCountry,
    clientName: invoiceDetails.clientName,
    clientEmail: invoiceDetails.clientEmail,
    clientStreetAddress: invoiceDetails.clientStreetAddress,
    clientCity: invoiceDetails.clientCity,
    clientZipCode: invoiceDetails.clientZipCode,
    clientCountry: invoiceDetails.clientCountry,
    invoiceDate: invoiceDetails.invoiceDate,
    paymentTerms: invoiceDetails.paymentTerms,
    paymentDueDate: invoiceDetails.paymentDueDate,
    productDescription: invoiceDetails.productDescription,
    invoicePending: invoiceDetails.invoicePending,
    invoiceDraft: invoiceDetails.invoiceDraft,
    invoicePaid: invoiceDetails.invoicePaid,
    invoiceItemList: invoiceDetails.invoiceItemList,
    invoiceTotal: invoiceDetails.invoiceTotal
  })
  invoiceModelStore.invoiceModel = false
  invoiceModelStore.loadInvoiceData()
}
</script>
