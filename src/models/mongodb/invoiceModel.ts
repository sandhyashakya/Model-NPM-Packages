import mongoose, { Model, Schema } from 'mongoose';
import { COMMAN_STATUS, INVOICE_PAYMENT_TYPE, PURCHASE_STATUS, INVOICE_TYPE } from '../../constants/app';
import { IFileStorageItemsSchema, IInvoiceModelAttributes, IPurchaseSchema } from '@kipipackages/interfaces';

const fileStorageItemSchema: Schema<IFileStorageItemsSchema> = new Schema<IFileStorageItemsSchema>(
    {
        fileStorageId: { type: String, required: true },
        type: { type: String, required: true, enum: Object.values(INVOICE_TYPE) },
    },
    { _id: false },
);

const PurchaseSchema: Schema<IPurchaseSchema> = new Schema<IPurchaseSchema>(
    {
        productId: { type: String, required: true },
        quantity: { type: Number, required: true },
    },
    { _id: false },
);

const InvoiceSchema: Schema<IInvoiceModelAttributes> = new Schema<IInvoiceModelAttributes>(
    {
        purchaseNo: {
            type: String,
            required: false,
            trim: true,
        },
        invoiceNo: {
            type: String,
            required: true,
            trim: true,
        },
        gstAmount: {
            type: Number,
            required: true,
            trim: true,
        },
        totalPaidAmount: {
            type: Number,
            required: true,
            trim: true,
        },
        purchaseType: {
            type: String,
            enum: Object.values(INVOICE_PAYMENT_TYPE),
            required: true,
            trim: true,
        },
        date: {
            type: Date,
            required: true,
            trim: true,
        },
        dueDate: {
            type: Date,
            trim: true,
        },
        vendorId: {
            type: String,
            required: true,
            trim: true,
        },
        purchaseList: {
            type: [PurchaseSchema],
            required: true,
            trim: true,
        },
        totalAmount: {
            type: Number,
            trim: false,
        },
        academicYearId: {
            type: String,
        },
        fileStorageList: {
            type: [fileStorageItemSchema],
            required: true,
        },
        instituteId: {
            type: String,
            required: true,
            trim: true,
        },
        amountStatus: {
            type: String,
            enum: Object.values(PURCHASE_STATUS),
            default: PURCHASE_STATUS.UNPAID,
            required: true,
        },
        status: {
            type: String,
            enum: Object.values(COMMAN_STATUS),
            default: COMMAN_STATUS.ACTIVE,
            required: true,
        },
        createdBy: {
            type: String,
        },
        updatedBy: {
            type: String,
        },
        deletedBy: {
            type: String,
        },
    },
    {
        timestamps: true,
        versionKey: false,
    },
);

const InvoiceModel: Model<IInvoiceModelAttributes> = mongoose.model<IInvoiceModelAttributes>('invoices', InvoiceSchema);

export default InvoiceModel;
