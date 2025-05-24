import React from "react";

export default function ProfileForm({ form, isEditing, onChange, onEdit, onSave }) {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Profile Information</h2>
      <form className="space-y-4">
        <div>
          <label className="block mb-1">Full Name</label>
          <input
            type="text"
            name="fullName"
            value={form.fullName}
            onChange={onChange}
            readOnly={!isEditing}
            className="w-full px-3 py-2 rounded bg-white text-black"
          />
        </div>
        <div>
          <label className="block mb-1">Email</label>
          <input
            type="email"
            name="email"
            value={form.email}
            readOnly
            className="w-full px-3 py-2 rounded bg-gray-200 text-black"
          />
        </div>
        <div>
          <label className="block mb-1">Gender</label>
          <select
            name="gender"
            value={form.gender}
            onChange={onChange}
            disabled={!isEditing}
            className="w-full px-3 py-2 rounded bg-white text-black"
          >
            <option value="">Select</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </div>

        {isEditing ? (
          <button
            type="button"
            onClick={onSave}
            className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded"
          >
            Save Changes
          </button>
        ) : (
          <button
            type="button"
            onClick={onEdit}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded"
          >
            Edit Profile
          </button>
        )}
      </form>
    </div>
  );
}
