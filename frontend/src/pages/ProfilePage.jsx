import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

export default function ProfilePage() {
  // Try to get userId from URL or fallback to localStorage
  const params = useParams();
  const storedUserId = localStorage.getItem("userId");
  const userId = params.userId || storedUserId;

  const [user, setUser] = useState({
    full_name: "",
    email: "",
    phone: "",
    address: "",
    profile_picture: "",
  });

  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState(user);

  useEffect(() => {
    if (!userId) {
      console.error("No user ID available.");
      return;
    }
    // Updated endpoint to match backend route
    axios
      .get(`http://localhost:5000/profile/${userId}`)
      .then((response) => {
        setUser(response.data);
        setEditData(response.data);
      })
      .catch((err) => {
        console.error("Error fetching user data:", err);
      });
  }, [userId]);

  const handleChange = (e) => {
    setEditData({ ...editData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setEditData({ ...editData, profile_picture: e.target.files[0] });
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    const formData = new FormData();
    for (const key in editData) {
      formData.append(key, editData[key]);
    }

    axios
      .put(`http://localhost:5000/profile/${userId}`, formData)
      .then((response) => {
        // If your backend returns the updated user data,
        // update the user state accordingly.
        setUser(response.data);
        setIsEditing(false);
      })
      .catch((err) => {
        console.error("Error saving user data:", err);
      });
  };

  const handleCancel = () => {
    setEditData({ ...user });
    setIsEditing(false);
  };

  return (
    <div className="profile-page">
      <h1>My Profile</h1>
      <div className="profile-info">
        {isEditing ? (
          <>
            <div>
              <label>Full Name:</label>
              <input
                type="text"
                name="full_name"
                value={editData.full_name}
                onChange={handleChange}
              />
            </div>
            <div>
              <label>Email:</label>
              <input
                type="email"
                name="email"
                value={editData.email}
                onChange={handleChange}
              />
            </div>
            <div>
              <label>Phone:</label>
              <input
                type="text"
                name="phone"
                value={editData.phone}
                onChange={handleChange}
              />
            </div>
            <div>
              <label>Address:</label>
              <input
                type="text"
                name="address"
                value={editData.address}
                onChange={handleChange}
              />
            </div>
            <div>
              <label>Profile Picture:</label>
              <input
                type="file"
                name="profile_picture"
                onChange={handleFileChange}
              />
            </div>
            <div className="buttons">
              <button onClick={handleSave}>Save</button>
              <button onClick={handleCancel}>Cancel</button>
            </div>
          </>
        ) : (
          <>
            <div>
              <strong>Full Name:</strong> {user.full_name}
            </div>
            <div>
              <strong>Email:</strong> {user.email}
            </div>
            <div>
              <strong>Phone:</strong> {user.phone}
            </div>
            <div>
              <strong>Address:</strong> {user.address}
            </div>
            <div>
              <strong>Profile Picture:</strong>{" "}
              <img src={user.profile_picture} alt="Profile" width="100" />
            </div>
            <button onClick={handleEdit}>Edit Profile</button>
          </>
        )}
      </div>
    </div>
  );
}
