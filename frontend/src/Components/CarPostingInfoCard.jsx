import { useState } from "react";

export default function PostingInfoForm() {
  const [formData, setFormData] = useState({
    name: "",
    image: null,
    rentalTerms: "",
    carDetails: "",
    phone: "",
    address: "",
    makeModel: "",
    yearOfManufacture: "",
    vin: "",
    mileage: "",
    transmission: "",
    color: "",
    fuelType: "",
    rentalPrice: "",
    securityDeposit: "",
    insuranceCoverage: "",
    paymentMethods: "",
    latefee: "",
    pickupLocation: "",
    fuelPolicy: "",
  });

  const [imagePreview, setImagePreview] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({ ...prev, image: file }));
      setImagePreview(URL.createObjectURL(file));
    }
  };
  

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Prepare FormData to send image and other fields
    const formDataToSend = new FormData();
  
    for (const key in formData) {
      formDataToSend.append(key, formData[key]);
    }
  
    try {
      const response = await fetch("http://localhost:5173/Post-car", {
        method: "POST",
        body: formDataToSend,
      });
  
      if (response.ok) {
        alert("Rental info posted successfully!");
        setFormData({
          name: "",
          image: null,
          rentalTerms: "",
          carDetails: "",
          phone: "",
          address: "",
          makeModel: "",
          yearOfManufacture: "",
          vin: "",
          mileage: "",
          transmission: "",
          color: "",
          fuelType: "",
          rentalPrice: "",
          securityDeposit: "",
          insuranceCoverage: "",
          paymentMethods: "",
          latefee: "",
          pickupLocation: "",
          fuelPolicy: "",
        });
        setImagePreview(null);
      } else {
        alert("Failed to post rental info.");
      }
    } catch (error) {
      console.error("Error posting rental info:", error);
      alert("An error occurred. Please try again.");
    }
  };
  

  return (
    <div className="max-w-lg mx-auto p-6 shadow-lg rounded-2xl border">
      <div className="postingcar">
        <h2 className="text-xl font-bold mb-4">Post Rental Info</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Personal Info */}
          <div className="personal-info">
            <h1>Personal Info</h1>
            <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Enter your full name" required />
            <input type="text" name="phone" value={formData.phone} onChange={handleChange} placeholder="Enter phone number" required />
            <input type="text" name="address" value={formData.address} onChange={handleChange} placeholder="Enter address" required />
          </div>

          {/* Image Upload */}
          <div className="image-section">
            <input type="file" accept="image/*" onChange={handleImageUpload} />
            {imagePreview && <img src={imagePreview} alt="Preview" className="mt-2 w-32 h-32 object-cover rounded-lg" />}
          </div>

          {/* Rental Terms */}
          <div className="rental-terms">
            <textarea name="rentalTerms" value={formData.rentalTerms} onChange={handleChange} placeholder="Enter rental terms" required />
            <input type="text" name="rentalPrice" value={formData.rentalPrice} onChange={handleChange} placeholder="Enter rental price" required />
            <input type="text" name="securityDeposit" value={formData.securityDeposit} onChange={handleChange} placeholder="Enter security deposit amount" required />
            <input type="text" name="insuranceCoverage" value={formData.insuranceCoverage} onChange={handleChange} placeholder="Enter insurance coverage" required />
            <input type="text" name="fuelPolicy" value={formData.fuelPolicy} onChange={handleChange} placeholder="Enter fuel policy" required />
          </div>

          {/* Car Details */}
          <div className="car-details">
            <textarea name="carDetails" value={formData.carDetails} onChange={handleChange} placeholder="Enter car details" required />
            <input type="text" name="makeModel" value={formData.makeModel} onChange={handleChange} placeholder="Enter Make & Model" required />
            <input type="text" name="yearOfManufacture" value={formData.yearOfManufacture} onChange={handleChange} placeholder="Enter Year of Manufacture" required />
            <input type="text" name="vin" value={formData.vin} onChange={handleChange} placeholder="Enter VIN" required />
            <input type="text" name="mileage" value={formData.mileage} onChange={handleChange} placeholder="Enter Mileage" required />
            <input type="text" name="transmission" value={formData.transmission} onChange={handleChange} placeholder="Enter Transmission" required />
            <input type="text" name="color" value={formData.color} onChange={handleChange} placeholder="Enter Color" required />
            <input type="text" name="fuelType" value={formData.fuelType} onChange={handleChange} placeholder="Enter Fuel Type" required />
          </div>

          {/* Payment Details */}
          <div className="payment-details">
            <input type="text" name="paymentMethods" value={formData.paymentMethods} onChange={handleChange} placeholder="Enter Payment Methods" required />
            <input type="text" name="latefee" value={formData.latefee} onChange={handleChange} placeholder="Enter Late Fee" required />
          </div>

          {/* Additional Requirements */}
          <div className="additional-requirements">
            <input type="text" name="pickupLocation" value={formData.pickupLocation} onChange={handleChange} placeholder="Enter Pickup Location" required />
          </div>

          {/* Submit Button */}
          <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded-lg">
            Post Info
          </button>
        </form>
      </div>
    </div>
  );
}
