'use client'
import { Pill, Upload, FileText, AlertCircle } from 'lucide-react'

export default function PrescriptionsPage() {
  const prescriptions = [
    {
      id: 1,
      date: '2024-02-20',
      doctor: 'Dr. Smith',
      status: 'Active',
      expiryDate: '2024-03-20'
    },
    {
      id: 2,
      date: '2024-01-15',
      doctor: 'Dr. Johnson',
      status: 'Expired',
      expiryDate: '2024-02-15'
    }
  ]

  return (
    <div className="container mx-auto px-4 py-8 bg-cyan-100">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold mb-6 flex items-center gap-2 text-gray-800">
          <Pill className="text-blue-600" size={24} />
          My Prescriptions
        </h1>

        <div className="bg-white rounded-lg p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-medium text-gray-800">Upload New Prescription</h2>
            <button className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
              <Upload size={20} />
              Upload
            </button>
          </div>
          <p className="text-sm text-gray-500 flex items-center gap-2">
            <AlertCircle size={16} />
            Supported formats: JPG, PNG, PDF (Max size: 5MB)
          </p>
        </div>

        <div className="space-y-4">
          {prescriptions.map((prescription) => (
            <div key={prescription.id} className="bg-white rounded-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <FileText className="text-blue-600" size={20} />
                  <h3 className="font-medium text-gray-800">Prescription #{prescription.id}</h3>
                </div>
                <span className={`px-3 py-1 rounded-full text-sm ${
                  prescription.status === 'Active' 
                    ? 'bg-green-100 text-green-600' 
                    : 'bg-red-100 text-red-600'
                }`}>
                  {prescription.status}
                </span>
              </div>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-gray-500">Prescribed by</p>
                  <p className="font-medium text-gray-800">{prescription.doctor}</p>
                </div>
                <div>
                  <p className="text-gray-500">Date</p>
                  <p className="font-medium text-gray-800">{prescription.date}</p>
                </div>
                <div>
                  <p className="text-gray-500">Expiry Date</p>
                  <p className="font-medium text-gray-800">{prescription.expiryDate}</p>
                </div>
              </div>
              
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}