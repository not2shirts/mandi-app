





// src/pages/VendorProfilePage.jsx
import React, { useEffect, useState } from 'react';
import { vendorProfileService, handleApiError } from '../api/services';
import { FaUser, FaPhone, FaEnvelope, FaBuilding, FaMapMarkerAlt, FaSave, FaEdit } from 'react-icons/fa';

export default function VendorProfilePage() {
  const [profile, setProfile] = useState({
    name: '',
    email: '',
    phoneNumber: '',
    businessName: '',
    businessAddress: '',
    userId: '',
    dateJoined: null,
    userType: 'VENDOR',
    isVerified: false
  });
  const [loading, setLoading] = useState(true);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await vendorProfileService.getProfile();
        setProfile(res.data);
      } catch (err) {
        setError(handleApiError(err, 'Failed to fetch profile.'));
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdate = async () => {
    try {
      await vendorProfileService.updateProfile(profile);
      setSuccess('Profile updated successfully.');
      setError('');
    } catch (err) {
      setError(handleApiError(err, 'Failed to update profile.'));
      setSuccess('');
    }
  };

  return (
    <div className="p-8 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">My Profile</h1>

      {loading ? (
        <p>Loading profile...</p>
      ) : (
        <div className="space-y-6">
          <div>
            <h2 className="text-lg font-semibold">Account Information</h2>
            {error && <p className="text-red-600">{error}</p>}
            {success && <p className="text-green-600">{success}</p>}

            <div className="grid grid-cols-2 gap-4 mt-2">
              <input
                type="text"
                name="name"
                value={profile.name}
                onChange={handleChange}
                placeholder="Full Name"
                className="border p-2 rounded"
              />
              <input
                type="text"
                name="email"
                value={profile.email}
                onChange={handleChange}
                placeholder="Email"
                className="border p-2 rounded"
              />
              <input
                type="text"
                name="phoneNumber"
                value={profile.phoneNumber}
                onChange={handleChange}
                placeholder="Phone Number"
                className="border p-2 rounded"
              />
              <input
                type="text"
                name="businessName"
                value={profile.businessName}
                onChange={handleChange}
                placeholder="Business Name"
                className="border p-2 rounded"
              />
              <input
                type="text"
                name="businessAddress"
                value={profile.businessAddress}
                onChange={handleChange}
                placeholder="Business Address"
                className="border p-2 rounded col-span-2"
              />
            </div>

            <button
              onClick={handleUpdate}
              className="mt-4 bg-blue-600 text-white px-4 py-2 rounded"
            >
              Update Profile
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
