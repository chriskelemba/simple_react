import { Link } from "react-router-dom";

const Navbar = () => {
  const logout = () => {
    sessionStorage.clear();
    window.location.reload();
  };

  const roleID = sessionStorage.getItem('roleID');

  return (
    <nav className="bg-pink-700 border-b border-pink-600 p-4 shadow-lg w-full">
      <div className="flex justify-between items-center w-full max-w-screen-xl mx-auto">
        <div className="flex-1 flex items-center justify-center space-x-5">
          <Link to="/" className="text-white hover:text-pink-300 transition-colors duration-300 text-lg font-medium">
            Shop
          </Link>
          {roleID === "2" && (
            <>
              <Link to="/ProductForm" className="text-white hover:text-pink-300 transition-colors duration-300 text-lg font-medium">
                Add Flowers
              </Link>
              <Link to="/DisplayProducts" className="text-white hover:text-pink-300 transition-colors duration-300 text-lg font-medium">
                Manage Flowers
              </Link>
              {/* <Link to="/DisplaySales" className="text-white hover:text-pink-300 transition-colors duration-300 text-lg font-medium">
                Manage Sales
              </Link> */}
            </>
          )}
          <Link to="/ContactUs" className="text-white hover:text-pink-300 transition-colors duration-300 text-lg font-medium">
            Contact Us
          </Link>
        </div>
        <div className="flex items-center">
          <button 
            onClick={logout} 
            className="bg-purple-500 hover:bg-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-500 text-white font-bold py-2 px-4 rounded-lg transition-colors duration-300"
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
