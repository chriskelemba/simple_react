import React, { useState } from "react";
import axios from "axios";

const EditProduct = ({ product, onClose }) => {
    const [formData, setFormData] = useState({
        productName: product.productName,
        productQuantity: product.productQuantity,
        productPrice: product.productPrice,
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Update product logic here
        axios.put(`http://localhost:4000/api/product/updateProduct/${product.productID}`, formData)
            .then((res) => {
                console.log("Product updated", res.data);
                onClose();
            })
            .catch((err) => console.log(err));
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 z-50">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-lg">
                <h2 className="text-3xl font-semibold text-pink-600 mb-6">Edit Product</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="productName" className="block text-sm font-medium text-gray-700 mb-2">Flower Name</label>
                        <input
                            type="text"
                            id="productName"
                            name="productName"
                            value={formData.productName}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-500"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="productQuantity" className="block text-sm font-medium text-gray-700 mb-2">Quantity</label>
                        <input
                            type="number"
                            id="productQuantity"
                            name="productQuantity"
                            value={formData.productQuantity}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-500"
                            required
                        />
                    </div>
                    <div className="mb-6">
                        <label htmlFor="productPrice" className="block text-sm font-medium text-gray-700 mb-2">Price</label>
                        <input
                            type="number"
                            id="productPrice"
                            name="productPrice"
                            value={formData.productPrice}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-500"
                            required
                        />
                    </div>
                    <div className="flex justify-end space-x-4">
                        <button
                            type="submit"
                            className="bg-pink-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-pink-500"
                        >
                            Save
                        </button>
                        <button
                            type="button"
                            className="bg-gray-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500"
                            onClick={onClose}
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditProduct;
