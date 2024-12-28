import React, { useState } from 'react';
import { Shield, Car, Home, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';

function Insurance() {
  // Manage form state
  const [claimData, setClaimData] = useState({
    policyType: '',
    description: '',
  });

  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const insuranceTypes = [
    { icon: Car, type: 'Auto Insurance', description: 'Protect your vehicle with comprehensive coverage' },
    { icon: Home, type: 'Home Insurance', description: 'Secure your home and belongings' },
    { icon: Heart, type: 'Life Insurance', description: 'Ensure your family\'s financial security' },
    { icon: Shield, type: 'Health Insurance', description: 'Get coverage for medical expenses' },
  ];

  // Handle form changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setClaimData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccessMessage('');
    setErrorMessage('');

    try {
      const response = await fetch('http://localhost:5008/claims', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(claimData),
      });

      const result = await response.json();

      if (response.ok) {
        setSuccessMessage(result.message);
      } else {
        setErrorMessage(result.error);
      }
    } catch (error) {
      setErrorMessage('An error occurred while submitting your claim.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-screen mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Insurance Services</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {insuranceTypes.map((insurance, index) => (
          <div key={index} className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex items-center mb-4">
              <insurance.icon className="h-8 w-8 text-indigo-600" />
              <h3 className="ml-3 text-lg font-medium">{insurance.type}</h3>
            </div>
            <p className="text-gray-500 mb-4">{insurance.description}</p>
            <Link to="/plan">
              <button className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700">
                Get Quote
              </button>
            </Link>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Your Active Policies Section */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Your Active Policies</h2>
          <div className="space-y-4">
            {/* Replace with dynamic data */}
            <div className="p-4 border rounded-lg">
              <div className="flex justify-between items-center mb-2">
                <span className="font-medium">Auto Insurance</span>
                <span className="text-green-600">Active</span>
              </div>
              <div className="text-sm text-gray-500">
                <p>Policy Number: AUT-2024-123456</p>
                <p>Coverage: Comprehensive</p>
                <p>Renewal Date: Dec 31, 2024</p>
              </div>
            </div>
          </div>
        </div>

        {/* File a Claim Section */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">File a Claim</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Policy Type</label>
              <select
                name="policyType"
                value={claimData.policyType}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              >
                <option value="">Select Policy</option>
                <option value="Auto Insurance">Auto Insurance</option>
                <option value="Home Insurance">Home Insurance</option>
                <option value="Life Insurance">Life Insurance</option>
                <option value="Health Insurance">Health Insurance</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Claim Description</label>
              <textarea
                name="description"
                value={claimData.description}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                rows="4"
                required
              ></textarea>
            </div>

            {loading ? (
              <button
                type="submit"
                disabled
                className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 opacity-50 cursor-not-allowed"
              >
                Submitting...
              </button>
            ) : (
              <button type="submit" className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700">
                Submit Claim
              </button>
            )}

            {successMessage && (
              <div className="mt-4 text-green-600 font-semibold">{successMessage}</div>
            )}
            {errorMessage && (
              <div className="mt-4 text-red-600 font-semibold">{errorMessage}</div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}

export default Insurance;
