'use client'
import { useState, useEffect } from 'react'
import { Pill, Upload, FileText, AlertCircle } from 'lucide-react'
import axios from 'axios'
import toast from 'react-hot-toast'

interface Prescription {
  _id: string
  doctorName: string
  doctorContact: string
  issueDate: string
  expiryDate: string
  status: string
  image: string
  verificationNotes?: string
}

export default function PrescriptionsPage() {
  const [prescriptions, setPrescriptions] = useState<Prescription[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [uploadLoading, setUploadLoading] = useState(false)
  const [image, setImage] = useState('')
  const [activeTab, setActiveTab] = useState('view') // Add this state
  const [formData, setFormData] = useState({
    doctorName: '',
    doctorContact: '',
    issueDate: '',
    expiryDate: ''
  })


  useEffect(() => {
    fetchPrescriptions()
  }, [])

  const fetchPrescriptions = async () => {
    try {
      const token = localStorage.getItem('token')
      if (!token) {
        toast.error('Please login to view prescriptions')
        return
      }

      const response = await axios.get('http://localhost:5000/api/prescriptions/user', {
        headers: { Authorization: `Bearer ${token}` }
      })
      setPrescriptions(response.data)
    } catch (error) {
      toast.error('Failed to fetch prescriptions')
      console.error('Error fetching prescriptions:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]
      if (file.size > 5 * 1024 * 1024) {
        toast.error('File size should not exceed 5MB')
        return
      }
      setSelectedFile(file)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleUpload = async () => {
    if (!selectedFile) {
      toast.error('Please select a file')
      return
    }

    try {
      setUploadLoading(true)
      const token = localStorage.getItem('token')
      if (!token) {
        toast.error('Please login to upload prescription')
        return
      }

      // Convert file to base64
      const reader = new FileReader()
      reader.readAsDataURL(selectedFile)
      reader.onload = async () =>{
        const base64Image = reader.result as string;
        setImage(base64Image);
      }

      await axios.post('http://localhost:5000/api/prescriptions/upload',
        {
          doctorName: formData.doctorName,
          doctorContact: formData.doctorContact,
          issueDate: formData.issueDate,
          expiryDate: formData.expiryDate,
          image: image
        },
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      )


      toast.success('Prescription uploaded successfully')
      fetchPrescriptions()
      setSelectedFile(null)
      setFormData({
        doctorName: '',
        doctorContact: '',
        issueDate: '',
        expiryDate: ''
      })

    } catch (error) {
      toast.error('Failed to upload prescription')
      console.error('Error uploading prescription:', error)
    } finally {
      setUploadLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-cyan-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading prescriptions...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8 bg-cyan-100">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold mb-6 flex items-center gap-2 text-gray-800">
          <Pill className="text-blue-600" size={24} />
          My Prescriptions
        </h1>

        <div className="flex gap-4 mb-6">
          <label className="flex items-center space-x-2 cursor-pointer">
            <input
              type="radio"
              name="prescriptionTab"
              value="view"
              checked={activeTab === 'view'}
              onChange={(e) => setActiveTab(e.target.value)}
              className="form-radio text-blue-600"
            />
            <span className="text-gray-700">View Prescriptions</span>
          </label>
          <label className="flex items-center space-x-2 cursor-pointer">
            <input
              type="radio"
              name="prescriptionTab"
              value="upload"
              checked={activeTab === 'upload'}
              onChange={(e) => setActiveTab(e.target.value)}
              className="form-radio text-blue-600"
            />
            <span className="text-gray-700">Upload Prescription</span>
          </label>
        </div>

        {activeTab === 'upload' && (
          <div className="bg-white rounded-lg p-6 mb-6">
            <h2 className="text-lg font-medium text-gray-800 mb-4">Upload New Prescription</h2>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Doctor&apos;s Name</label>
              <input
                type="text"
                name="doctorName"
                onChange={handleInputChange}
                value={formData.doctorName}
                className="text-black w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Doctor&apos;s Contact</label>
              <input
                type="text"
                name="doctorContact"
                onChange={handleInputChange}
                value={formData.doctorContact}
                className="text-black w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Issue Date</label>
                <input
                  type="date"
                  name="issueDate"
                  onChange={handleInputChange}
                  value={formData.issueDate}
                  className="text-black w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Expiry Date</label>
                <input
                  type="date"
                  name="expiryDate"
                  onChange={handleInputChange}
                  value={formData.expiryDate}
                  className="text-red-800 w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Upload Prescription</label>
              <input
                type="file"
                onChange={handleFileChange}
                accept="image/*, application/pdf"
                className="w-full border rounded-lg focus:ring-2 focus:ring-blue-500 text-gray-700 px-3 py-2 text-sm"
              />
              <p className="text-sm text-gray-500 flex items-center gap-2 mt-1">
                <AlertCircle size={16} />
                Supported formats: JPG, PNG, PDF (Max size: 5MB)
              </p>
            </div>
            <button
              onClick={handleUpload}
              disabled={uploadLoading || !selectedFile}
              className="w-full flex items-center justify-center gap-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
            >
              <Upload size={20} />
              {uploadLoading ? 'Uploading...' : 'Upload Prescription'}
            </button>
          </div>
        )}

        {activeTab === 'view' && (
          <div className="space-y-4">
            {prescriptions.map((prescription) => (
              <div key={prescription._id} className="bg-white rounded-lg p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <FileText className="text-blue-600" size={20} />
                    <h3 className="font-medium text-gray-800">Prescription #{prescription._id.substring(0, 6)}</h3>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-sm ${
                    prescription.status === 'approved' 
                      ? 'bg-green-100 text-green-600' 
                      : prescription.status === 'rejected'
                      ? 'bg-red-100 text-red-600'
                      : 'bg-yellow-100 text-yellow-600'
                  }`}>
                    {prescription.status.charAt(0).toUpperCase() + prescription.status.slice(1)}
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-gray-500">Prescribed by</p>
                    <p className="font-medium text-gray-800">{prescription.doctorName}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Doctor&apos;s Contact</p>
                    <p className="font-medium text-gray-800">{prescription.doctorContact}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Issue Date</p>
                    <p className="font-medium text-gray-800">
                      {new Date(prescription.issueDate).toLocaleDateString()}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-500">Expiry Date</p>
                    <p className="font-medium text-gray-800">
                      {new Date(prescription.expiryDate).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                {prescription.verificationNotes && (
                  <div className="mt-4 pt-4 border-t">
                    <p className="text-gray-500">Verification Notes:</p>
                    <p className="text-sm text-gray-700">{prescription.verificationNotes}</p>
                  </div>
                )}
              </div>
            ))}
            {prescriptions.length === 0 && (
              <div className="text-center py-8 bg-white rounded-lg">
                <p className="text-gray-500">No prescriptions found</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}