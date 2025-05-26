'use client';
import { useState, useEffect } from 'react';
import { format } from 'date-fns';
import Image from 'next/image';
import axios from 'axios';
import { toast } from 'react-hot-toast';

interface Prescription {
  _id: string;
  user: {
    username: string;
    email: string;
  };
  image: string;
  status: 'pending' | 'approved' | 'rejected';
  doctorName: string;
  doctorContact: string;
  issueDate: string;
  expiryDate: string;
  products: any[];
  verificationNotes?: string;
  verifiedBy?: {
    username: string;
  };
  verificationDate?: string;
  createdAt: string;
}

export default function AdminPrescriptions() {
  const [prescriptions, setPrescriptions] = useState<Prescription[]>([]);
  const [filteredPrescriptions, setFilteredPrescriptions] = useState<Prescription[]>([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    userSearch: '',
    status: ''
  });

  useEffect(() => {
    fetchPrescriptions();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [filters, prescriptions]);

  const fetchPrescriptions = async () => {
    const token = localStorage.getItem('token');
    if (!token){
      console.error('No token found');
    }
    try {
      const response = await axios.get('/api/prescriptions/admin/all', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      setPrescriptions(response.data);
      setFilteredPrescriptions(response.data);
    } catch (error: any) {
      console.error('Error fetching prescriptions:', error);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const applyFilters = () => {
    let filtered = Array.isArray(prescriptions) ? [...prescriptions] : [];

    // Filter by user search (email or username)
    if (filters.userSearch) {
      const searchTerm = filters.userSearch.toLowerCase();
      filtered = filtered.filter(p => 
        p.user && (
          p.user.email.toLowerCase().includes(searchTerm) ||
          p.user.username.toLowerCase().includes(searchTerm)
        )
      );
    }

    // Filter by status
    if (filters.status) {
      filtered = filtered.filter(p => p.status === filters.status);
    }

    setFilteredPrescriptions(filtered);
  };

  const handleVerification = async (prescriptionId: string, status: 'approved' | 'rejected' | 'pending', action: 'Approved' | 'Rejected' | 'Pending') => {
    const token = localStorage.getItem('token');
    try {
      await axios.put(`/api/prescriptions/${prescriptionId}/verify`, {
        status,
        verificationNotes: `${action} by admin`
      }, {
        headers: {
          'Authorization': `Bearer ${token}`
        },
      });
      
      // Update the prescription in the local state
      setPrescriptions(prevPrescriptions => {
        return prevPrescriptions.map(p => 
          p._id === prescriptionId ? { ...p, status, verificationDate: new Date().toISOString() } : p
        );
      });
      
      toast.success(`${action} successfully`);
    } catch (error: any) {
      console.error('Error verifying prescription:', error);
      toast.error(error.message);
    }
  }

  if (loading) return <div>Loading...</div>;

  return (
    <div className="container mx-auto p-4 bg-blue-100">
      <h1 className="text-xl font-bold mb-4 text-gray-800">Prescription Management</h1>
      
      {/* Filters Section */}
      <div className="bg-white p-3 rounded-lg shadow-sm mb-4">
        <div className="grid grid-cols-2 gap-3">
          <div>
            <input
              type="text"
              className="text-black w-full border rounded-md p-2 text-sm"
              placeholder="Search by email or username"
              value={filters.userSearch}
              onChange={(e) => setFilters(prev => ({ ...prev, userSearch: e.target.value }))}
            />
          </div>
          <div>
            <select
              className="text-black w-full border rounded-md p-2 text-sm"
              value={filters.status}
              onChange={(e) => setFilters(prev => ({ ...prev, status: e.target.value }))}
            >
              <option value="">All Status</option>
              <option value="pending">Pending</option>
              <option value="approved">Approved</option>
              <option value="rejected">Rejected</option>
            </select>
          </div>
        </div>
      </div>

      {/* Prescriptions Grid */}
      <div className="grid gap-4">
        {!loading && filteredPrescriptions.length === 0 ? (
          <div className="text-center py-8 bg-gray-50 rounded-lg border border-gray-200">
            <p className="text-gray-600 text-base">
              {filters.userSearch || filters.status ? 
                "No prescriptions found matching your filters" : 
                "No prescriptions available"}
            </p>
          </div>
        ) : (
          filteredPrescriptions.map((prescription) => (
            <div key={prescription._id} className="border rounded-lg p-4 bg-white shadow-sm">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="text-sm">
                  {prescription.user ? (
                    <div className="mb-2">
                      <p className="text-gray-600 font-medium">{prescription.user.username}</p>
                      <p className="text-gray-600">{prescription.user.email}</p>
                    </div>
                  ) : (
                    <p className="text-yellow-600 text-sm">User not available</p>
                  )}
                  <p className='text-black'>Doctor: {prescription.doctorName}</p>
                  <p className='text-black'>Contact: {prescription.doctorContact}</p>
                  <p className="text-gray-600 text-xs mt-1">
                    Created: {format(new Date(prescription.createdAt), 'PP')}
                  </p>
                </div>
                
                <div className="relative aspect-[4/3] w-full max-w-[200px] ml-auto">
                  <Image 
                    src={prescription.image.trim()}
                    alt="Prescription"
                    fill
                    className="object-cover rounded-lg cursor-pointer"
                    onClick={() => window.open(prescription.image.trim(), '_blank')}
                  />
                </div>
              </div>

              <div className="mt-3 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${{pending: 'bg-yellow-100 text-yellow-800',approved: 'bg-green-100 text-green-800',rejected: 'bg-red-100 text-red-800'}[prescription.status]}`}>
                    {prescription.status.toUpperCase()}
                  </span>
                </div>

                <div className="flex gap-2">
                  {prescription.status !== 'approved' && (
                    <button
                      onClick={() => handleVerification(prescription._id, 'approved', 'Approved')}
                      className="px-3 py-1 text-sm bg-green-600 text-white rounded hover:bg-green-700"
                    >
                      Approve
                    </button>
                  )}
                  {prescription.status !== 'rejected' && (
                    <button
                      onClick={() => handleVerification(prescription._id, 'rejected', 'Rejected')}
                      className="px-3 py-1 text-sm bg-red-600 text-white rounded hover:bg-red-700"
                    >
                      Reject
                    </button>
                  )}
                  {prescription.status !== 'pending' && (
                    <button
                      onClick={() => handleVerification(prescription._id, 'pending', 'Pending')}
                      className="px-3 py-1 text-sm bg-yellow-600 text-white rounded hover:bg-yellow-700"
                    >
                      Mark Pending
                    </button>
                  )}
                </div>
              </div>

              {prescription.verificationNotes && (
                <div className="mt-2 text-xs text-gray-600">
                  <p>{prescription.verificationNotes}</p>
                  {prescription.verificationDate && (
                    <p className="mt-1">
                      Verified on {format(new Date(prescription.verificationDate), 'PP')}
                    </p>
                  )}
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}