import { model, Schema } from "mongoose";

const productSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
        },
        price: {
            type: Number,
        },
        category: {
            type: String,
            enum: ["Vasos", "Flores", "Ferramentas", "Móveis"],
        },
        orders: [
            {
                type: Schema.Types.ObjectId,
                ref: "Order"
            }
        ],
    }
);

const ProductModel = model("Product", productSchema);

export default ProductModel;