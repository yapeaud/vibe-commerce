import mongoose from "mongoose";

const productSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    description: String,
    image: String,
    category: {
        type: String,
        required: true
    },
    rating: Number,
    count: Number,
    externalId: Number
}, {
    timestamps: true
});

const productModel = mongoose.model("Product", productSchema);

export default productModel;