import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AdminRequests = () => {
  const [loanApplications, setLoanApplications] = useState([]);
  const [insuranceApplications, setInsuranceApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch loan and insurance applications
  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const [loanResponse, insuranceResponse] = await Promise.all([
          axios.get('http://localhost:5000/api/loan-applications'), // Adjust to your endpoint
          axios.get('http://localhost:5000/api/insurance-applications') // Adjust to your endpoint
        ]);
        setLoanApplications(loanResponse.data);
        setInsuranceApplications(insuranceResponse.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching applications:', error);
        setLoading(false);
      }
    };

    fetchApplications();
  }, []);

  // Update application status
  const updateStatus = async (id, status, type) => {
    try {
      const url =
        type === 'loan'
          ? `http://localhost:5000/api/loan-applications/${id}`
          : `http://localhost:5000/api/insurance-applications/${id}`;
      await axios.put(url, { status });

      if (type === 'loan') {
        const updatedLoanApplications = loanApplications.map((app) =>
          app._id === id ? { ...app, status } : app
        );
        setLoanApplications(updatedLoanApplications);
      } else {
        const updatedInsuranceApplications = insuranceApplications.map((app) =>
          app._id === id ? { ...app, status } : app
        );
        setInsuranceApplications(updatedInsuranceApplications);
      }
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  // Delete user record from the database
  const deleteUser = async (userId) => {
    try {
      // Send the delete request to the server
      await axios.delete(`http://localhost:5000/api/delete-user/${userId}`);

      // Remove the user from the local state
      const updatedLoanApplications = loanApplications.filter(
        (app) => app.user_id !== userId
      );
      setLoanApplications(updatedLoanApplications);

      const updatedInsuranceApplications = insuranceApplications.filter(
        (app) => app.user_id !== userId
      );
      setInsuranceApplications(updatedInsuranceApplications);

      alert('User deleted successfully');
    } catch (error) {
      console.error('Error deleting user:', error);
      alert('Error deleting user');
    }
  };

  return (
    <div className="p-6 w-screen">
      <h1 className="text-3xl font-semibold mb-6">Admin - Loan and Insurance Applications</h1>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          <h2 className="text-2xl font-semibold mb-4">Loan Applications</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-300 rounded-md shadow-sm">
              <thead>
                <tr className="text-left bg-gray-100">
                  <th className="px-4 py-2 border-b">ID</th>
                  <th className="px-4 py-2 border-b">Name</th>
                  <th className="px-4 py-2 border-b">Loan Amount</th>
                  <th className="px-4 py-2 border-b">Purpose</th>
                  <th className="px-4 py-2 border-b">Status</th>
                  <th className="px-4 py-2 border-b">Actions</th>
                </tr>
              </thead>
              <tbody>
                {loanApplications.map((application) => (
                  <tr key={application._id} className="hover:bg-gray-50">
                    <td className="px-4 py-2 border-b">{application._id}</td>
                    <td className="px-4 py-2 border-b">{application.name}</td>
                    <td className="px-4 py-2 border-b">{application.loanAmount}</td>
                    <td className="px-4 py-2 border-b">{application.purpose}</td>
                    <td className="px-4 py-2 border-b">{application.status}</td>
                    <td className="px-4 py-2 border-b">
                      <button
                        onClick={() => updateStatus(application._id, 'approved', 'loan')}
                        className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-300 mr-2"
                      >
                        Approve
                      </button>
                      <button
                        onClick={() => updateStatus(application._id, 'rejected', 'loan')}
                        className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-300 mr-2"
                      >
                        Reject
                      </button>
                      <button
                        onClick={() => deleteUser(application.user_id)}
                        className="px-4 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-300"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <h2 className="text-2xl font-semibold mt-6 mb-4">Insurance Applications</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-300 rounded-md shadow-sm">
              <thead>
                <tr className="text-left bg-gray-100">
                  <th className="px-4 py-2 border-b">ID</th>
                  <th className="px-4 py-2 border-b">Type</th>
                  <th className="px-4 py-2 border-b">Recipient Address</th>
                  <th className="px-4 py-2 border-b">Status</th>
                  <th className="px-4 py-2 border-b">Actions</th>
                </tr>
              </thead>
              <tbody>
                {insuranceApplications.map((application) => (
                  <tr key={application._id} className="hover:bg-gray-50">
                    <td className="px-4 py-2 border-b">{application._id}</td>
                    <td className="px-4 py-2 border-b">{application.type}</td>
                    <td className="px-4 py-2 border-b">{application.recipientAddress}</td>
                    <td className="px-4 py-2 border-b">{application.status}</td>
                    <td className="px-4 py-2 border-b">
                      <button
                        onClick={() => updateStatus(application._id, 'approved', 'insurance')}
                        className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-300 mr-2"
                      >
                        Approve
                      </button>
                      <button
                        onClick={() => updateStatus(application._id, 'rejected', 'insurance')}
                        className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-300 mr-2"
                      >
                        Reject
                      </button>
                      <button
                        onClick={() => deleteUser(application.user_id)}
                        className="px-4 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-300"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
};

export default AdminRequests;
