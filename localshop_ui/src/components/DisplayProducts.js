import { useState, useEffect } from "react";
import axios from "axios";
import EditProduct from "./EditProduct";

const DisplayProducts = () => {
    const [data, setData] = useState([]);
    const [editingProduct, setEditingProduct] = useState(null);
    const [deletingProduct, setDeletingProduct] = useState(null);

    const token = sessionStorage.getItem("accessToken");

    useEffect(() => {
        axios.get("http://localhost:4000/api/product/getAllProducts", {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        })
          .then((res) => {
            setData(res.data);
          })
          .catch((err) => console.log(err));
    }, [token]);

    const handleEdit = (product) => {
        setEditingProduct(product);
    };

    const handleDelete = (product) => {
        setDeletingProduct(product);
    };

    const handleDeleteConfirm = () => {
        axios.delete(`http://localhost:4000/api/product/deleteProduct/${deletingProduct.productID}`, {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
        })
        .then((res) => {
            setData(data.filter((d) => d.productID !== deletingProduct.productID));
            setDeletingProduct(null);
        })
        .catch((err) => {
            console.log(err);
            setDeletingProduct(null);
        });
    };

    const handleDeleteCancel = () => {
        setDeletingProduct(null);
    };

    const handleClose = () => {
        setEditingProduct(null);
    };

    return (
        <div className="p-6 relative">
            {editingProduct && (
                <EditProduct product={editingProduct} onClose={handleClose} />
            )}
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
                    <thead className="bg-pink-600 text-white">
                        <tr>
                            <th className="py-3 px-4 text-left">Flower Name</th>
                            <th className="py-3 px-4 text-left">Quantity</th>
                            <th className="py-3 px-4 text-left">Price</th>
                            <th className="py-3 px-4 text-left">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="text-gray-700">
                        {data.map((d, i) => (
                            <tr key={i} className={`border-b ${i % 2 === 0 ? 'bg-gray-50' : 'bg-white'}`}>
                                <td className="py-3 px-4 font-medium">{d.productName}</td>
                                <td className={`py-3 px-4 ${d.productQuantity === 0 ? 'text-red-500 font-bold' : ''}`}>
                                    {d.productQuantity === 0 ? "Out of Stock" : d.productQuantity}
                                </td>
                                <td className="py-3 px-4 font-medium">${d.productPrice}</td>
                                <td className="py-3 px-4 flex space-x-2">
                                    <button 
                                        className="bg-pink-500 hover:bg-pink-600 text-white py-2 px-4 rounded-lg transition-colors duration-300"
                                        onClick={() => handleEdit(d)}
                                    >
                                        Edit
                                    </button>
                                    <button 
                                        className="bg-purple-500 hover:bg-purple-600 text-white py-2 px-4 rounded-lg transition-colors duration-300"
                                        onClick={() => handleDelete(d)}
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {deletingProduct && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
                        <h2 className="text-2xl font-semibold text-pink-600 mb-4">Confirm Deletion</h2>
                        <p className="text-gray-700 mb-6">Are you sure you want to delete {deletingProduct.productName}?</p>
                        <div className="flex justify-end space-x-4">
                            <button 
                                className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-lg transition-colors duration-300"
                                onClick={handleDeleteConfirm}
                            >
                                Yes
                            </button>
                            <button 
                                className="bg-gray-500 hover:bg-gray-600 text-white py-2 px-4 rounded-lg transition-colors duration-300"
                                onClick={handleDeleteCancel}
                            >
                                No
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default DisplayProducts;
