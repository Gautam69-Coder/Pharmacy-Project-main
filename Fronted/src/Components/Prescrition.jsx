import { useRef } from 'react';
import { Upload } from 'lucide-react';

export default function PrescriptionOrder() {
  const fileInputRef = useRef(null);

  const handleUploadClick = () => {
    fileInputRef.current.click(); // Trigger file input
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      alert(`Selected file: ${file.name}`);
      // You can now upload this file to your backend or store it
    }
  };

  return (
    <div className="flex flex-col md:flex-row bg-white rounded-lg p-6 shadow-md w-[93%] mb-2">
      {/* Left Section */}
      <div className="flex-1 flex items-center justify-center bg-blue-100 rounded-lg p-6 mb-4 md:mb-0 md:mr-4">
        <div className="text-center">
          <div className="text-blue-900 font-semibold text-lg mb-2">Order with Prescription</div>
          <p className="text-sm text-gray-700 mb-4">Upload prescription and we will deliver your medicines</p>

          {/* Hidden file input */}
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept="image/*,application/pdf"
            className="hidden"
          />

          {/* Visible Upload Button */}
          <button
            onClick={handleUploadClick}
            className="flex items-center gap-2 bg-teal-700 hover:bg-teal-800 text-white px-4 py-2 rounded-md transition"
          >
            <Upload size={18} />
            Upload
          </button>
        </div>
      </div>

      {/* Right Section */}
      <div className="flex-1 bg-white rounded-lg p-6">
        <h2 className="font-semibold mb-4 text-gray-800">How does this work?</h2>
        <ul className="text-sm text-gray-700 space-y-2">
          <li><span className="font-bold text-blue-600">1.</span> Upload a photo of your prescription</li>
          <li><span className="font-bold text-blue-600">2.</span> Add delivery address and place the order</li>
          <li><span className="font-bold text-blue-600">3.</span> We will call you to confirm the medicines</li>
          <li><span className="font-bold text-blue-600">4.</span> Now, sit back! Your medicines will get delivered at your doorstep</li>
        </ul>
      </div>
    </div>
  );
}
