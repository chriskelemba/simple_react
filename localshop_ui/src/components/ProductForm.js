import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

const ProductForm = () => {
    const [data, setData] = useState({
        productName: '',
        productQuantity: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Form Validation
        if (data.productName.trim() === '' || data.productQuantity.trim() === '') {
            toast.error("Fields cannot be empty", {
                position: toast.POSITION.TOP_RIGHT,
                autoClose: 3000,
            });
        } else {
            const token = sessionStorage.getItem("accessToken");

            axios.post("http://localhost:4000/api/product/addProduct", data, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            })
            .then(res => {
                setData({
                    productName: '',
                    productQuantity: '',
                });

                toast.success("Product successfully added", {
                    position: toast.POSITION.TOP_RIGHT,
                    autoClose: 3000,
                });
            })
            .catch(err => {
                console.error(err);
                toast.error("Failed to add product", {
                    position: toast.POSITION.TOP_RIGHT,
                    autoClose: 3000,
                });
            });
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen p-4 bg-gray-100">
            <form
                className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md mx-auto"
                onSubmit={handleSubmit}
            >
                <h2 className="text-2xl font-bold text-pink-600 mb-6 text-center">
                    Add New Product
                </h2>
                <div className="mb-6">
                    <label
                        className="block text-pink-600 text-sm font-semibold mb-2"
                        htmlFor="productName"
                    >
                        Product Name
                    </label>
                    <input
                        type="text"
                        className="w-full px-4 py-2 border border-pink-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-500"
                        name="productName"
                        value={data.productName}
                        onChange={handleChange}
                        placeholder="Enter product name"
                    />
                </div>
                <div className="mb-6">
                    <label
                        className="block text-pink-600 text-sm font-semibold mb-2"
                        htmlFor="productQuantity"
                    >
                        Product Quantity
                    </label>
                    <input
                        type="number"
                        className="w-full px-4 py-2 border border-pink-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-500"
                        name="productQuantity"
                        value={data.productQuantity}
                        onChange={handleChange}
                        placeholder="Enter quantity"
                    />
                </div>
                <button
                    type="submit"
                    className="w-full py-3 bg-pink-600 hover:bg-pink-700 text-white font-bold rounded-lg transition-colors duration-300"
                >
                    Add Product
                </button>
                <ToastContainer />
            </form>
        </div>
    );
};

export default ProductForm;
