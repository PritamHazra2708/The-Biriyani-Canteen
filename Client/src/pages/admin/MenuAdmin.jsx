import { useEffect, useState } from "react";
import axios from "axios";
import { useDropzone } from "react-dropzone";
import { 
  FaPlus, 
  FaEdit, 
  FaTrash, 
  FaToggleOn, 
  FaToggleOff,
  FaUpload,
  FaSpinner,
  FaSearch,
  FaTimes
} from "react-icons/fa";
import { GiChickenOven, GiBroccoli } from "react-icons/gi";
import { MdCategory, MdPriceChange } from "react-icons/md";

function MenuAdmin() {
  const [menu, setMenu] = useState([]);
  const [filteredMenu, setFilteredMenu] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");
  const [editingItem, setEditingItem] = useState(null);
  const [uploading, setUploading] = useState(false);
  
  const [newItem, setNewItem] = useState({
    itemName: "",
    price: "",
    category: "",
    type: "Veg",
    available: true,
    image: "",
    description: "",
  });

  const onDrop = (acceptedFiles) => {
    const file = acceptedFiles[0];
    if (!file) return;
    setUploading(true);
    const imageUrl = URL.createObjectURL(file);
    setTimeout(() => {
      setNewItem((prev) => ({ ...prev, image: imageUrl }));
      setUploading(false);
    }, 500);
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: { "image/*": [] },
    multiple: false,
  });

  const fetchMenu = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/menu");
      setMenu(res.data);
      setFilteredMenu(res.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMenu();
    const interval = setInterval(() => fetchMenu(), 5000);
    return () => clearInterval(interval);
  }, []);

  // Filter menu items
  useEffect(() => {
    let filtered = menu;
    if (searchTerm) {
      filtered = filtered.filter(item =>
        item.itemName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.category?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    if (categoryFilter !== "all") {
      filtered = filtered.filter(item => item.category === categoryFilter);
    }
    if (typeFilter !== "all") {
      filtered = filtered.filter(item => item.type === typeFilter);
    }
    setFilteredMenu(filtered);
  }, [searchTerm, categoryFilter, typeFilter, menu]);

  const categories = ["all", ...new Set(menu.map(item => item.category).filter(Boolean))];

  const toggleAvailability = async (id, currentStatus) => {
    try {
      await axios.put(`http://localhost:5000/api/menu/${id}`, {
        available: !currentStatus,
      });
      fetchMenu();
    } catch (error) {
      console.log(error);
    }
  };

  const changePrice = async (id, currentPrice) => {
    const newPrice = prompt("Enter New Price:", currentPrice);
    if (!newPrice || isNaN(newPrice)) return;
    try {
      await axios.put(`http://localhost:5000/api/menu/${id}`, {
        price: Number(newPrice),
      });
      fetchMenu();
    } catch (error) {
      console.log(error);
    }
  };

  const saveMenuItem = async () => {
    if (!newItem.itemName || !newItem.price || !newItem.category) {
      alert("Please fill all required fields");
      return;
    }
    try {
      if (editingItem) {
        await axios.put(`http://localhost:5000/api/menu/${editingItem._id}`, newItem);
      } else {
        await axios.post("http://localhost:5000/api/menu", newItem);
      }
      setShowModal(false);
      setEditingItem(null);
      fetchMenu();
      setNewItem({
        itemName: "",
        price: "",
        category: "",
        type: "Veg",
        available: true,
        image: "",
        description: "",
      });
    } catch (error) {
      console.log(error);
      alert("Error saving item");
    }
  };

  const deleteItem = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this item?");
    if (!confirmDelete) return;
    try {
      await axios.delete(`http://localhost:5000/api/menu/${id}`);
      fetchMenu();
    } catch (error) {
      console.log(error);
    }
  };

  const editItem = (item) => {
    setEditingItem(item);
    setNewItem({
      itemName: item.itemName,
      price: item.price,
      category: item.category,
      type: item.type,
      available: item.available,
      image: item.image,
      description: item.description || "",
    });
    setShowModal(true);
  };

  const stats = {
    total: menu.length,
    veg: menu.filter(i => i.type === "Veg").length,
    nonVeg: menu.filter(i => i.type === "Non-Veg").length,
    available: menu.filter(i => i.available).length,
    outOfStock: menu.filter(i => !i.available).length,
  };

  return (
    <div className="w-full">
      {/* Header Section */}
      <div className="mb-8">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 mb-6">
          <div>
            <h1 className="text-3xl font-black bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
              Menu Management
            </h1>
            <p className="text-white/50 mt-1">Add, edit, and manage your canteen menu items</p>
          </div>
          
          <button
            onClick={() => {
              setEditingItem(null);
              setNewItem({
                itemName: "",
                price: "",
                category: "",
                type: "Veg",
                available: true,
                image: "",
                description: "",
              });
              setShowModal(true);
            }}
            className="group relative px-6 py-3 rounded-xl bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-black transition-all duration-300 hover:scale-105 shadow-lg flex items-center gap-2 overflow-hidden"
          >
            <FaPlus />
            <span>ADD ITEM</span>
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white/5 rounded-2xl p-4 border border-white/10">
            <p className="text-white/60 text-sm">Total Items</p>
            <p className="text-yellow-400 text-2xl font-bold">{stats.total}</p>
          </div>
          <div className="bg-white/5 rounded-2xl p-4 border border-white/10">
            <p className="text-white/60 text-sm">Veg Items</p>
            <p className="text-green-400 text-2xl font-bold">{stats.veg}</p>
          </div>
          <div className="bg-white/5 rounded-2xl p-4 border border-white/10">
            <p className="text-white/60 text-sm">Non-Veg Items</p>
            <p className="text-red-400 text-2xl font-bold">{stats.nonVeg}</p>
          </div>
          <div className="bg-white/5 rounded-2xl p-4 border border-white/10">
            <p className="text-white/60 text-sm">Available</p>
            <p className="text-emerald-400 text-2xl font-bold">{stats.available}</p>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="flex-1 relative">
            <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40" />
            <input
              type="text"
              placeholder="Search by name or category..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-11 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/30 focus:outline-none focus:border-yellow-400/50 transition-all"
            />
          </div>
          
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-yellow-400/50"
          >
            {categories.map(cat => (
              <option key={cat} value={cat} className="bg-gray-900">
                {cat === "all" ? "All Categories" : cat}
              </option>
            ))}
          </select>
          
          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-yellow-400/50"
          >
            <option value="all">All Types</option>
            <option value="Veg">Veg</option>
            <option value="Non-Veg">Non-Veg</option>
          </select>
        </div>
      </div>

      {/* Menu Grid */}
      <div>
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <FaSpinner className="text-4xl text-yellow-400 animate-spin" />
            <p className="text-white/60 mt-4">Loading menu items...</p>
          </div>
        ) : filteredMenu.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">🍽️</div>
            <p className="text-white/60 text-xl">No menu items found</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredMenu.map((item) => (
              <div
                key={item._id}
                className="group bg-white/5 backdrop-blur-sm rounded-3xl border border-white/10 overflow-hidden hover:border-yellow-400/30 transition-all duration-500 hover:scale-[1.02] hover:shadow-xl hover:shadow-yellow-500/10"
              >
                <div className="relative overflow-hidden h-48">
                  <img
                    src={item.image || "https://via.placeholder.com/400x300?text=No+Image"}
                    alt={item.itemName}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
                  
                  <div className="absolute top-3 left-3">
                    <div className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-bold ${
                      item.type === "Veg" ? "bg-green-500/90 text-white" : "bg-red-500/90 text-white"
                    }`}>
                      {item.type === "Veg" ? <GiBroccoli className="text-sm" /> : <GiChickenOven className="text-sm" />}
                      {item.type}
                    </div>
                  </div>
                  
                  <div className="absolute top-3 right-3">
                    <div className={`px-2 py-1 rounded-full text-xs font-bold ${
                      item.available ? "bg-emerald-500/90 text-white" : "bg-red-500/90 text-white"
                    }`}>
                      {item.available ? "In Stock" : "Out of Stock"}
                    </div>
                  </div>
                  
                  <div className="absolute bottom-3 left-3 bg-black/60 backdrop-blur-md px-2 py-1 rounded-full text-white/80 text-xs font-semibold">
                    <MdCategory className="inline mr-1 text-xs" />
                    {item.category}
                  </div>
                </div>

                <div className="p-4">
                  <div className="flex justify-between items-start gap-2">
                    <h2 className="text-xl font-black text-white group-hover:text-yellow-300 transition-colors">
                      {item.itemName}
                    </h2>
                    <span className="text-yellow-300 font-black text-lg whitespace-nowrap">
                      ₹{item.price}
                    </span>
                  </div>
                  
                  <div className="flex flex-wrap gap-2 mt-4">
                    <button
                      onClick={() => toggleAvailability(item._id, item.available)}
                      className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-blue-500/20 border border-blue-500/30 text-blue-400 font-semibold text-sm hover:bg-blue-500 hover:text-black transition-all duration-300"
                    >
                      {item.available ? <FaToggleOff className="text-xs" /> : <FaToggleOn className="text-xs" />}
                      {item.available ? "Mark Out" : "Mark In"}
                    </button>
                    
                    <button
                      onClick={() => changePrice(item._id, item.price)}
                      className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-yellow-500/20 border border-yellow-500/30 text-yellow-400 font-semibold text-sm hover:bg-yellow-500 hover:text-black transition-all duration-300"
                    >
                      <MdPriceChange className="text-xs" />
                      Edit Price
                    </button>
                    
                    <button
                      onClick={() => editItem(item)}
                      className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-purple-500/20 border border-purple-500/30 text-purple-400 font-semibold text-sm hover:bg-purple-500 hover:text-black transition-all duration-300"
                    >
                      <FaEdit className="text-xs" />
                      Edit
                    </button>
                    
                    <button
                      onClick={() => deleteItem(item._id)}
                      className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-red-500/20 border border-red-500/30 text-red-400 font-semibold text-sm hover:bg-red-500 hover:text-white transition-all duration-300"
                    >
                      <FaTrash className="text-xs" />
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* ADD/EDIT MODAL - SMALLER AND FITS SCREEN */}
      {showModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex justify-center items-center z-50 p-4">
          <div className="bg-gradient-to-br from-gray-900 to-black w-full max-w-lg rounded-2xl border border-yellow-400/20 shadow-2xl max-h-[90vh] flex flex-col">
            
            {/* Modal Header */}
            <div className="bg-gray-900/95 backdrop-blur-md px-5 py-4 border-b border-white/10 flex justify-between items-center rounded-t-2xl">
              <h1 className="text-xl font-black bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
                {editingItem ? "EDIT ITEM" : "ADD NEW ITEM"}
              </h1>
              <button 
                onClick={() => { setShowModal(false); setEditingItem(null); }} 
                className="text-white/60 hover:text-white transition-colors"
              >
                <FaTimes className="text-xl" />
              </button>
            </div>
            
            {/* Modal Body - Scrollable */}
            <div className="flex-1 overflow-y-auto p-5 space-y-4 custom-scrollbar">
              {/* Item Name */}
              <div>
                <label className="text-white/60 text-xs mb-1 block">Item Name *</label>
                <input
                  type="text"
                  placeholder="e.g., Chicken Biryani"
                  value={newItem.itemName}
                  onChange={(e) => setNewItem({ ...newItem, itemName: e.target.value })}
                  className="w-full p-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-yellow-400/50 transition-all text-sm"
                />
              </div>
              
              {/* Price and Category Row */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-white/60 text-xs mb-1 block">Price *</label>
                  <input
                    type="number"
                    placeholder="Price"
                    value={newItem.price}
                    onChange={(e) => setNewItem({ ...newItem, price: e.target.value })}
                    className="w-full p-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-yellow-400/50 text-sm"
                  />
                </div>
                <div>
                  <label className="text-white/60 text-xs mb-1 block">Category *</label>
                  <input
                    type="text"
                    placeholder="e.g., Biryani, Roll"
                    value={newItem.category}
                    onChange={(e) => setNewItem({ ...newItem, category: e.target.value })}
                    className="w-full p-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-yellow-400/50 text-sm"
                  />
                </div>
              </div>
              
              {/* Description */}
              <div>
                <label className="text-white/60 text-xs mb-1 block">Description (optional)</label>
                <textarea
                  placeholder="Brief description of the item..."
                  value={newItem.description}
                  onChange={(e) => setNewItem({ ...newItem, description: e.target.value })}
                  rows="2"
                  className="w-full p-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-yellow-400/50 resize-none text-sm"
                />
              </div>
              
              {/* Type and Available Row */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-white/60 text-xs mb-1 block">Type</label>
                  <select
                    value={newItem.type}
                    onChange={(e) => setNewItem({ ...newItem, type: e.target.value })}
                    className="w-full p-3 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-yellow-400/50 text-sm"
                  >
                    <option value="Veg">🥬 Veg</option>
                    <option value="Non-Veg">🍗 Non-Veg</option>
                  </select>
                </div>
                <div>
                  <label className="text-white/60 text-xs mb-1 block">Status</label>
                  <select
                    value={newItem.available}
                    onChange={(e) => setNewItem({ ...newItem, available: e.target.value === "true" })}
                    className="w-full p-3 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-yellow-400/50 text-sm"
                  >
                    <option value="true">✅ Available</option>
                    <option value="false">❌ Out of Stock</option>
                  </select>
                </div>
              </div>
              
              {/* Image URL */}
              <div>
                <label className="text-white/60 text-xs mb-1 block">Image URL</label>
                <input
                  type="text"
                  placeholder="https://example.com/image.jpg"
                  value={newItem.image}
                  onChange={(e) => setNewItem({ ...newItem, image: e.target.value })}
                  className="w-full p-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-yellow-400/50 text-sm"
                />
              </div>
              
              {/* Drag & Drop Zone */}
              <div
                {...getRootProps()}
                className="border-2 border-dashed border-yellow-400/40 rounded-xl p-4 text-center cursor-pointer hover:border-yellow-400 transition-colors bg-white/5"
              >
                <input {...getInputProps()} />
                {uploading ? (
                  <FaSpinner className="text-2xl text-yellow-400 animate-spin mx-auto" />
                ) : (
                  <>
                    <FaUpload className="text-2xl text-yellow-400 mx-auto mb-1" />
                    <p className="text-white/50 text-xs">Drag & drop or click to upload</p>
                  </>
                )}
              </div>
              
              {/* Image Preview */}
              {newItem.image && !uploading && (
                <div className="relative">
                  <img 
                    src={newItem.image} 
                    alt="preview" 
                    className="w-full h-40 object-cover rounded-xl" 
                  />
                  <button 
                    onClick={() => setNewItem({ ...newItem, image: "" })} 
                    className="absolute top-2 right-2 bg-red-500 rounded-full p-1.5 hover:scale-110 transition"
                  >
                    <FaTimes className="text-xs" />
                  </button>
                </div>
              )}
            </div>
            
            {/* Modal Footer */}
            <div className="bg-gray-900/95 backdrop-blur-md px-5 py-4 border-t border-white/10 flex gap-3 rounded-b-2xl">
              <button
                onClick={saveMenuItem}
                className="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold hover:scale-105 transition-all duration-300 text-sm"
              >
                {editingItem ? "UPDATE ITEM" : "ADD ITEM"}
              </button>
              <button
                onClick={() => { setShowModal(false); setEditingItem(null); }}
                className="flex-1 py-2.5 rounded-xl bg-red-500/80 text-white font-bold hover:bg-red-600 transition-all duration-300 text-sm"
              >
                CANCEL
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default MenuAdmin;