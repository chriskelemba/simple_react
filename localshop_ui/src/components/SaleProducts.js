import { useState } from "react";
import axios from "axios";

const SaleProduct = ({ product, onClose }) => {
    const [saleQuantity, setSaleQuantity] = useState(0);
    const token = sessionStorage.getItem("accessToken");

    const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
        const response = await axios.post("http://localhost:4000/api/product/recordSale", {
            productId: product._id,
            saleQuantity,
        },
            {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
            }
        );
        if (response.status === 200) {
            setSaleQuantity(0);
            onClose();
            // update the product quantity in the parent component
            const updatedData = data.map((d) =>
            d._id === product._id ? { ...d, productQuantity: d.productQuantity - saleQuantity } : d
            );
            setData(updatedData);
        }
        } catch (error) {
        console.error(error);
        }
    };

    return (
        <div>
        <form onSubmit={handleSubmit}>
            <label htmlFor="saleQuantity">Quantity:</label>
            <input
            type="number"
            id="saleQuantity"
            value={saleQuantity}
            onChange={(e) => setSaleQuantity(parseInt(e.target.value))}
            required
            />
            <button type="submit">Record Sale</button>
        </form>
        </div>
    );
};

export default SaleProduct;

{/* <td className="px-6 py-4">
  <button className="bg-gray-100 hover:bg-gray-300 p-2 px-6 rounded" onClick={() => handleEdit(d)}>
    Edit
  </button>
  <button className="bg-gray-100 hover:bg-gray-300 p-2 px-6 rounded ml-2" onClick={() => setSaleProduct(d)}>
    Sale
  </button>
</td>

{saleProduct && (
  <SaleProduct product={saleProduct} onClose={handleClose} />
)} */}