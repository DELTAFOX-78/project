import { useState } from "react";
import {
  X,
  Upload,
  Package,
  Calendar,
  Thermometer,
  Hash,
  MapPin,
  Archive,
} from "lucide-react";
import axios from "axios";
import { toast } from "react-toastify";

const formSections = {
  leftSection: [
    {
      name: "name",
      label: "Product Name",
      type: "text",
      required: true,
      icon: Package,
      placeholder: "Enter product name",
    },
    {
      name: "type",
      label: "Product Type",
      type: "text",
      required: true,
      icon: Archive,
      placeholder: "e.g., Electronics, Food, Medicine",
    },
    {
      name: "quantity",
      label: "Quantity",
      type: "number",
      required: true,
      icon: Hash,
      placeholder: "0-100",
      min: 0,
      max: 100,
    },
    {
      name: "price",
      label: "Price",
      type: "number",
      icon: Hash,
      placeholder: "Enter price",
      min: 0,
      required: true,
    },
    {
      name: "expiryDate",
      label: "Expiry Date",
      type: "date",
      icon: Calendar,
    },
  ],
  rightSection: [
    {
      name: "mfgDate",
      label: "Manufacturing Date",
      type: "date",
      icon: Calendar,
    },
    {
      name: "rackNo",
      label: "Rack Number",
      type: "text",
      icon: MapPin,
      placeholder: "e.g., A-12, B-05",
    },
    {
      name: "roomTemp",
      label: "Storage Temperature (°C)",
      type: "number",
      icon: Thermometer,
      placeholder: "Enter temperature",
    },
    {
      name: "batchNo",
      label: "Batch Number",
      type: "text",
      icon: Hash,
      placeholder: "Enter batch number",
    },
    {
      name: "productImage",
      label: "Product Image",
      type: "file",
      icon: Upload,
      placeholder: "Upload product image",
    },
  ],
};

const FormField = ({ field, value, onChange, error, onImageChange }: any) => {
  const Icon = field.icon;

  if (field.type === "file") {
    return (
      <div className="space-y-3">
        <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
          <Icon size={16} className="text-indigo-500" />
          {field.label}
          {field.required && <span className="text-red-500">*</span>}
        </label>
        <ImageUpload
          onImageChange={onImageChange}
          currentImage={value}
          error={error}
        />
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
        <Icon size={16} className="text-indigo-500" />
        {field.label}
        {field.required && <span className="text-red-500">*</span>}
      </label>
      <div className="relative">
        <input
          name={field.name}
          value={value}
          onChange={onChange}
          type={field.type}
          className={`w-full px-4 py-3 border-2 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 ${
            error
              ? "border-red-400 bg-red-50 focus:ring-red-200"
              : "border-gray-200 bg-white hover:border-gray-300"
          }`}
          placeholder={field.placeholder}
          required={field.required}
          min={field.min}
          max={field.max}
        />
        {error && (
          <p className="text-red-500 text-xs mt-2 flex items-center gap-1">
            <span className="w-1 h-1 bg-red-500 rounded-full"></span>
            {error}
          </p>
        )}
      </div>
    </div>
  );
};

const ImageUpload = ({ onImageChange, currentImage, error }) => {
  const [dragOver, setDragOver] = useState(false);

  const copyImageToPublic = (file) => {
    // Generate a unique filename using timestamp
    const timestamp = new Date().getTime();
    const fileName = `product_${timestamp}_${file.name}`;

    // Create a copy of the file in public/images folder
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.src = e.target.result as string;

      // Convert to blob and save
      fetch(img.src)
        .then((res) => res.blob())
        .then((blob) => {
          const formData = new FormData();
          formData.append("image", blob, fileName);

          // Copy file to public folder using fetch
          fetch("http://localhost:5000/api/upload-image", {
            method: "POST",
            body: formData,
          })
            .then((response) => response.json())
            .then((data) => {
              // Return the relative path to be stored in DB
              const imagePath = `/images/${fileName}`;
              onImageChange(imagePath);
            })
            .catch((err) => console.error("Error saving image:", err));
        });
    };
    reader.readAsDataURL(file);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith("image/")) {
      copyImageToPublic(file);
    }
  };

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      copyImageToPublic(file);
    }
  };

  // Update image preview to use public path
  const imagePreview = currentImage
    ? `http://localhost:5000${currentImage}`
    : null;

  return (
    <div
      className={`border-2 border-dashed rounded-xl p-6 text-center transition-all duration-200 ${
        dragOver
          ? "border-indigo-400 bg-indigo-50 scale-105"
          : error
          ? "border-red-400 bg-red-50"
          : "border-gray-300 hover:border-indigo-300 hover:bg-gray-50"
      }`}
      onDragOver={(e) => {
        e.preventDefault();
        setDragOver(true);
      }}
      onDragLeave={() => setDragOver(false)}
      onDrop={handleDrop}
    >
      {imagePreview ? (
        <div className="space-y-4">
          <img
            src={imagePreview}
            alt="Product preview"
            className="w-24 h-24 object-cover mx-auto rounded-xl border-2 border-gray-200 shadow-sm"
          />
          <button
            type="button"
            onClick={() => onImageChange(null)}
            className="text-red-500 text-sm hover:text-red-700 transition-colors font-medium"
          >
            Remove Image
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="w-16 h-16 mx-auto bg-indigo-100 rounded-full flex items-center justify-center">
            <Upload size={24} className="text-indigo-500" />
          </div>
          <div>
            <p className="text-gray-600 font-medium">
              Drop your image here, or
            </p>
            <label className="text-indigo-500 hover:text-indigo-700 cursor-pointer font-semibold transition-colors">
              browse files
              <input
                type="file"
                accept="image/*"
                onChange={handleFileSelect}
                className="hidden"
              />
            </label>
          </div>
          <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
        </div>
      )}
      {error && <p className="text-red-500 text-xs mt-2">{error}</p>}
    </div>
  );
};

export default function AddProduct({ setAddProduct, setProducts }) {
  const [form, setForm] = useState({
    name: "",
    type: "",
    quantity: "",
    price: "",
    expiryDate: "",
    mfgDate: "",
    rackNo: "",
    roomTemp: "",
    batchNo: "",
  });
  const [productImage, setProductImage] = useState(null);
  const [errors, setErrors] = useState({}) as any;
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    const processedValue =
      type === "number" ? (value === "" ? "" : Number(value)) : value;

    setForm((f) => ({ ...f, [name]: processedValue }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleImageChange = (file) => {
    setProductImage(file);
    if (errors.productImage) {
      setErrors((prev) => ({ ...prev, productImage: "" }));
    }
  };

  const validateForm = () => {
    const newErrors = {} as any;

    if (!form.name.trim()) newErrors.name = "Product name is required";
    if (!form.type.trim()) newErrors.type = "Product type is required";
    if (!form.quantity) {
      newErrors.quantity = "Stock percentage is required";
    }
    if (!form.price) newErrors.price = "Price is required";

    if (
      form.expiryDate &&
      form.mfgDate &&
      new Date(form.expiryDate) <= new Date(form.mfgDate)
    ) {
      newErrors.expiryDate = "Expiry date must be after manufacturing date";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      const productData = {
        ...form,
        productImage: productImage, // This is now the image URL
        createdAt: new Date().toISOString(),
      };

      const res = await axios.post(
        "http://localhost:5000/api/addProduct",
        productData
      );

      if (res.data) {
        setProducts((prev) => [...prev, res.data]);
        toast.success("Product added successfully!");
        setAddProduct(false);
      }
    } catch (error) {
      console.error("Error adding product:", error);
      toast.error("Error adding product. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0   bg-opacity-60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="w-full max-h-[90vh] max-w-6xl bg-white rounded-2xl shadow-2xl overflow-hidden">
        <div className="bg-white rounded-t-2xl shadow-2xl w-full max-w-6xl max-h-[90vh] overflow-hidden ">
          {/* Header */}
          <div className="relative bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-8 ">
            <button
              onClick={() => setAddProduct(false)}
              className="absolute top-6 right-6 p-2 hover:text-red-400 hover:bg-opacity-20 rounded-xl transition-all duration-200"
            >
              <X size={24} />
            </button>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gray-300 bg-opacity-20 rounded-xl flex items-center justify-center">
                <Package size={24} />
              </div>
              <div>
                <h2 className="text-3xl font-bold">Add New Product</h2>
                <p className="text-indigo-100 mt-2">
                  Create a new product entry for your inventory
                </p>
              </div>
            </div>
          </div>
        </div>
        {/* Form */}

        <div className="p-8 overflow-y-auto max-h-[70vh]">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Left Section */}
            <div className="space-y-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-8 bg-indigo-100 rounded-lg flex items-center justify-center">
                  <Package size={16} className="text-indigo-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900">
                  Product Information
                </h3>
              </div>
              <div className="space-y-6">
                {formSections.leftSection.map((field) => (
                  <FormField
                    key={field.name}
                    field={field}
                    value={form[field.name]}
                    onChange={handleChange}
                    onImageChange={handleImageChange}
                    error={errors[field.name]}
                  />
                ))}
              </div>
            </div>

            {/* Right Section */}
            <div className="space-y-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                  <Archive size={16} className="text-purple-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900">
                  Additional Details
                </h3>
              </div>
              <div className="space-y-6">
                {formSections.rightSection.map((field) => (
                  <FormField
                    key={field.name}
                    field={field}
                    value={form[field.name]}
                    onChange={handleChange}
                    onImageChange={handleImageChange}
                    error={errors[field.name]}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-end gap-4 mt-12 pt-8 border-t border-gray-200">
            <button
              type="button"
              onClick={() => setAddProduct(false)}
              className="px-8 py-3 border-2 border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 hover:border-gray-400 transition-all duration-200 font-medium"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="px-8 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl hover:from-indigo-700 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center gap-3 font-medium shadow-lg hover:shadow-xl"
            >
              {isSubmitting ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Adding Product...
                </>
              ) : (
                <>
                  <Package size={18} />
                  Add Product
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
