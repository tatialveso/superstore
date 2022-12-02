import { model, Schema } from "mongoose";

const orderSchema = new Schema(
    {
        products: [
            {
                product: {
                    type: Schema.Types.ObjectId,
                    ref: "Product"
                },
                amount: {
                    type: Number
                },
            },
        ],
        salesDate: {
            type: Date,
            default: Date.now,
        },
    });

const OrderModel = model("Order", orderSchema);

export default OrderModel;