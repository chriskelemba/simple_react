import { useState, useEffect } from "react";
import axios from "axios";
import EditSale from "./EditSale";

const DisplaySales = () => {
    const [data, setData] = useState([]);
    const [editingSale, setEditingSale] = useState(null);
    const [deletingSale, setDeletingSale] = useState(null);
    const [deletingAll, setDeletingAll] = useState(false);

    const token = sessionStorage.getItem("accessToken");

    useEffect(() => {
        axios.get("http://localhost:4000/api/sale/getAllSales", {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        })
        .then(res => {
            setData(res.data)
        })
        .catch(err => console.log(err))
    }, [token]);

    const handleDelete = (sale) => {
        setDeletingSale(sale);
    };

    const handleDeleteConfirm = () => {
        if (deletingSale) {
            axios.delete(`http://localhost:4000/api/sale/deleteSale/${deletingSale.saleID}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            })
            .then(() => {
                setData(data.filter((d) => d.saleID !== deletingSale.saleID));
                setDeletingSale(null);
            })
            .catch((err) => {
                console.log(err);
                setDeletingSale(null);
            });
        } else if (deletingAll) {
            axios.delete("http://localhost:4000/api/sale/deleteAllSales", {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            })
            .then(() => {
                setData([]);
                setDeletingAll(false);
            })
            .catch((err) => {
                console.log(err);
                setDeletingAll(false);
            });
        }
    };

    const handleDeleteCancel = () => {
        setDeletingSale(null);
        setDeletingAll(false);
    };

    const handleClose = () => {
        setEditingSale(null);
    };

    const totalPrice = data.reduce((acc, sale) => acc + sale.salePrice, 0);

    return (
        <div className="p-4">
            {editingSale && (
                <EditSale sale={editingSale} onClose={handleClose}/>
            )}
            <table className="w-full text-sm text-left text-gray-700">
                <thead className="text-xs text-gray-700 uppercase bg-pink-100">
                    <tr>
                        <th className="px-6 py-3" scope="col">Sale Name</th>
                        <th className="px-6 py-3" scope="col">Sale Quantity</th>
                        <th className="px-6 py-3" scope="col">Sale Price</th>
                        <th className="px-6 py-3" scope="col">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((d, i) => (
                        <tr key={i} className="bg-white border-b hover:bg-pink-50">
                            <td className="px-6 py-4 font-medium text-gray-900">{d.saleName}</td>
                            <td className="px-6 py-4 font-medium text-gray-900">{d.saleQuantity}</td>
                            <td className="px-6 py-4 font-medium text-gray-900">${d.salePrice}</td>
                            <td className="px-6 py-4">
                                <button 
                                    className="bg-pink-500 hover:bg-pink-600 text-white p-2 px-6 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400 transition-colors duration-300" 
                                    onClick={() => handleDelete(d)}
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                    <tr className="bg-pink-50">
                        <td colSpan="3" className="px-6 py-4 font-medium text-gray-900">Total Price:</td>
                        <td className="px-6 py-4 font-medium text-gray-900">${totalPrice}</td>
                        <td>
                            <button 
                                className="bg-red-500 hover:bg-red-600 text-white p-2 px-6 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400 transition-colors duration-300" 
                                onClick={() => setDeletingAll(true)}
                            >
                                Delete All
                            </button>
                        </td>
                    </tr>
                </tbody>
            </table>
            {deletingSale && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
                        <h2 className="text-2xl font-bold mb-4 text-pink-600">Are you sure you want to delete {deletingSale.saleName}?</h2>
                        <div className="flex justify-end space-x-2">
                            <button 
                                className="bg-red-500 hover:bg-red-600 text-white p-2 px-6 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400 transition-colors duration-300" 
                                onClick={handleDeleteConfirm}
                            >
                                Yes
                            </button>
                            <button 
                                className="bg-gray-500 hover:bg-gray-600 text-white p-2 px-6 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400 transition-colors duration-300" 
                                onClick={handleDeleteCancel}
                            >
                                No
                            </button>
                        </div>
                    </div>
                </div>
            )}
            {deletingAll && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
                        <h2 className="text-2xl font-bold mb-4 text-pink-600">Are you sure you want to delete all sales?</h2>
                        <div className="flex justify-end space-x-2">
                            <button 
                                className="bg-red-500 hover:bg-red-600 text-white p-2 px-6 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400 transition-colors duration-300" 
                                onClick={handleDeleteConfirm}
                            >
                                Yes
                            </button>
                            <button 
                                className="bg-gray-500 hover:bg-gray-600 text-white p-2 px-6 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400 transition-colors duration-300" 
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

export default DisplaySales;
