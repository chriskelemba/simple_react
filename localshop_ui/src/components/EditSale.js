import { useState } from "react";
import axios from "axios";

const EditSale = ({ sale, onClose }) => {
    const [saleName, setSaleName] = useState(sale.saleName);
    const [saleQuantity, setSaleQuantity] = useState(sale.saleQuantity);
    const [salePrice, setSalePrice] = useState(sale.salePrice);

    const token = sessionStorage.getItem("accessToken");

    const handleSubmit = async (e) => {
        e.preventDefault();
        window.location.reload();

        try {
            await axios.patch(`http://localhost:4000/api/sale/updateSale/${sale.saleID}`, {
            saleName,
            saleQuantity,
            salePrice,
        }, {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });
        
        onClose();
        } catch (err) {
        console.log(err);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="fixed bottom-0 left-0 right-0 top-0 flex items-center justify-center">
            <div className="bg-white p-8 rounded shadow">
            <label className="px-3">Sale Name :</label>
            <input type="text" className="" value={saleName} onChange={(e) => setSaleName(e.target.value)}/>
            <label className="px-3">Sale Quantity :</label>
            <input type="number" value={saleQuantity} onChange={(e) => setSaleQuantity(e.target.value)}/>
            <label className="px-3">Sale Price :</label>
            <input type="number" value={salePrice} onChange={(e) => setSalePrice(e.target.value)}/>
            <button type="submit" className="bg-gray-100 hover:bg-gray-300 p-2 px-6 mx-3 rounded">Save Changes</button>
            </div>
        </form>
    );
};

export default EditSale;