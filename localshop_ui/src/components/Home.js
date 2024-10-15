import { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Home = () => {
  const [data, setData] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const [showQuantityMenu, setShowQuantityMenu] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

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

  const handleBuy = (productID) => {
    setSelectedProduct(productID);
    setShowQuantityMenu(true);
  };

  const handleQuantityChange = (e) => {
    setQuantity(e.target.value);
  };

  const handlePurchase = () => {
    axios
      .put(`http://localhost:4000/api/product/buyProduct/${selectedProduct}`, {
        productID: selectedProduct,
        quantity: quantity,
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        console.log(res.data);
        setShowQuantityMenu(false);
        toast.success("Product Purchased!", {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 3000,
        });
      })
      .catch((err) => {
        console.log(err);
        setShowQuantityMenu(false);
      });
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-4xl font-extrabold text-pink-600 mb-8 text-center">
        Featured Flowers
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {data.map((d, i) => (
          <div key={i} className="bg-white border border-pink-300 shadow-lg rounded-lg overflow-hidden relative">
            <div className="p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-2">{d.productName}</h2>
              <p className={`text-gray-600 mb-2 ${d.productQuantity === 0 ? 'text-red-600 font-bold' : ''}`}>
                {d.productQuantity === 0 ? "Out of Stock" : `Total number of flowers: ${d.productQuantity}`}
              </p>
              <p className="text-lg font-bold text-pink-600 mb-4">${d.productPrice}</p>
              <button
                className="w-full px-4 py-2 font-semibold text-white bg-pink-500 hover:bg-pink-600 rounded transition-colors duration-300"
                onClick={() => handleBuy(d.productID)}
                disabled={d.productQuantity === 0}
              >
                Buy
              </button>
            </div>
            {showQuantityMenu && selectedProduct === d.productID && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-md relative">
                  <h3 className="text-2xl font-semibold text-gray-900 mb-4">How many do you want to buy?</h3>
                  <select
                    value={quantity}
                    onChange={handleQuantityChange}
                    className="block w-full bg-gray-200 border border-gray-300 rounded-lg p-3 mb-6 focus:outline-none focus:ring-2 focus:ring-pink-500"
                  >
                    {[...Array(d.productQuantity).keys()].map((i) => (
                      <option key={i + 1} value={i + 1}>{i + 1}</option>
                    ))}
                  </select>
                  <button
                    className="w-full px-4 py-2 font-semibold text-white bg-pink-600 hover:bg-pink-700 rounded transition-colors duration-300 mb-2"
                    onClick={handlePurchase}
                  >
                    Purchase
                  </button>
                  <button
                    className="absolute top-4 right-4 text-gray-500 hover:text-gray-800"
                    onClick={() => setShowQuantityMenu(false)}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 18L18 6M6 6l12 12" /></svg>
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
      <ToastContainer />
    </div>
  );
};

export default Home;
