export interface invoice {
  docId: string
  billerStreetAddress: string
  billerCity: string
  billerZipCode: number
  billerCountry: string
  clientName: string
  clientEmail: string
  clientStreetAddress: string
  clientCity: string
  clientZipCode: number
  clientCountry: string
  invoiceDate: string
  paymentTerms: string
  paymentDueDate: string
  productDescription: string
  invoicePending: boolean
  invoiceDraft: boolean
  invoicePaid: boolean
  invoiceItemList: { id: string; name: string; qty: number; price: number; total: number }[]
  invoiceTotal: number
}
