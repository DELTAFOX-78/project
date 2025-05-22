import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { getProducts, saveProducts } from "../utils/storage";

export default function AddProduct() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    type: "",
    percentInStock: "",
    currentStock: "",
    salesPercent: "",
    expiryDate: "",
    mfgDate: "",
    stacks: "",
    roomTemp: "",
    batchNo: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // basic validation
    if (!form.name || !form.type) {
      return toast.error("Name and Type are required");
    }
    const newProd = {
      ...form,
      id: Date.now().toString(),
      percentInStock: Number(form.percentInStock),
      currentStock: Number(form.currentStock),
      salesPercent: Number(form.salesPercent),
      stacks: Number(form.stacks),
      roomTemp: Number(form.roomTemp),
      trend: [
        // sample initial trend
        { date: form.mfgDate, purchased: 0, sold: 0 },
      ],
    };
    const all = getProducts();
    all.push(newProd);
    saveProducts(all);
    toast.success("Product added");
    navigate("/blocks");
  };

  return (
    <div className="min-h-screen bg-base-200 flex items-center justify-center p-6">
      <div className="card w-full max-w-lg bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="text-2xl font-bold mb-4">Add New Product</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            {[
              ["name", "Product Name"],
              ["type", "Type"],
              ["percentInStock", "% In Stock"],
              ["currentStock", "Current Stock"],
              ["salesPercent", "Sales %"],
              ["expiryDate", "Expiry Date"],
              ["mfgDate", "Manufactured Date"],
              ["stacks", "Stacks"],
              ["roomTemp", "Room Temp (°C)"],
              ["batchNo", "Batch No"],
            ].map(([field, label]) => (
              <div key={field} className="form-control">
                <label className="label">
                  <span className="label-text">{label}</span>
                </label>
                <input
                  name={field}
                  value={form[field]}
                  onChange={handleChange}
                  type={field.includes("Date") ? "date" : "text"}
                  className="input input-bordered"
                  required={["name", "type", "percentInStock"].includes(field)}
                />
              </div>
            ))}
            <button type="submit" className="btn btn-primary btn-block">
              Add Product
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
