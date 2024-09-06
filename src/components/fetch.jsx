import React, { useState, useEffect } from "react";
import axios from "axios";
import "./profile.css"; 
const ProfilePage = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        // Directly make a request to the provided API
        const response = await axios.post(
          "api/user/profile/fetch",
          {
            email: "muhammad_4@mutare.group",
          }
        );
        // Set the profile data
        setProfile(response.data.data[0]);
        setLoading(false);
      } catch (error) {
        setError("Error fetching profile data");
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="profile-container">
      {profile && (
        <div className="profile-details">
          <div className="profile-header">
            <h1>{profile.username}'s Profile</h1>
            {profile.profile_picture ? (
              <img
                src={profile.profile_picture}
                alt="Profile"
                className="profile-picture"
              />
            ) : (
              <div className="no-profile-picture">
                No profile picture available
              </div>
            )}
          </div>
          <div className="profile-info">
            <p>
              <strong>Email:</strong> {profile.email}
            </p>
            <p>
              <strong>Date of Birth:</strong>{" "}
              {`${profile.dob.day}/${profile.dob.month}/${profile.dob.year}`}
            </p>
            <p>
              <strong>Country:</strong> {profile.country}
            </p>
            <p>
              <strong>Subscription Status:</strong> {profile.subscription}
            </p>
            <p>
              <strong>Device ID:</strong> {profile.device_id}
            </p>
          </div>
          <h2>Preference Groups</h2>
          {profile.preference_group.map((group, index) => (
            <div key={index} className="preference-group">
              <h3>
                {group.group} - {group.subgroup}
              </h3>
              <p>
                <strong>Choice:</strong> {group.choice}
              </p>
              <ul>
                {group.set.map((pref, idx) => (
                  <li key={idx}>
                    <strong>Like:</strong> {pref.like ? "Yes" : "No"},{" "}
                    <strong>Neutral:</strong> {pref.neutral ? "Yes" : "No"},{" "}
                    <strong>Dislike:</strong> {pref.dislike ? "Yes" : "No"}
                  </li>
                ))}
              </ul>
            </div>
          ))}
          <h2>Additional Information</h2>
          <div className="additional-info">
            <p>
              <strong>ID:</strong> {profile.id}
            </p>
            <p>
              <strong>Resource ID (_rid):</strong> {profile._rid}
            </p>
            <p>
              <strong>Self Link (_self):</strong> {profile._self}
            </p>
            <p>
              <strong>ETag (_etag):</strong> {profile._etag}
            </p>
            <p>
              <strong>Attachments (_attachments):</strong> {profile._attachments}
            </p>
            <p>
              <strong>Timestamp (_ts):</strong> {profile._ts}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfilePage;
