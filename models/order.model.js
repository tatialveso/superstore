import { model, Schema } from 'mongoose'

const orderSchema = new Schema(
    {
        products: [
            {
                type: Schema.Types.ObjectId,
                ref: "Product"
            }
        ],
        salesDate: {
            type: Date
        }
    }
)

const OrderModel = model("Order", orderSchema)

export default OrderModel