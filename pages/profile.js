"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';

const states = [
  { code: 'AL', name: 'Alabama' },
  { code: 'AK', name: 'Alaska' },
  { code: 'AZ', name: 'Arizona' },
  { code: 'AR', name: 'Arkansas' },
  { code: 'CA', name: 'California' },
  { code: 'CO', name: 'Colorado' },
  { code: 'CT', name: 'Connecticut' },
  { code: 'DE', name: 'Delaware' },
  { code: 'FL', name: 'Florida' },
  { code: 'GA', name: 'Georgia' },
  { code: 'HI', name: 'Hawaii' },
  { code: 'ID', name: 'Idaho' },
  { code: 'IL', name: 'Illinois' },
  { code: 'IN', name: 'Indiana' },
  { code: 'IA', name: 'Iowa' },
  { code: 'KS', name: 'Kansas' },
  { code: 'KY', name: 'Kentucky' },
  { code: 'LA', name: 'Louisiana' },
  { code: 'ME', name: 'Maine' },
  { code: 'MD', name: 'Maryland' },
  { code: 'MA', name: 'Massachusetts' },
  { code: 'MI', name: 'Michigan' },
  { code: 'MN', name: 'Minnesota' },
  { code: 'MS', name: 'Mississippi' },
  { code: 'MO', name: 'Missouri' },
  { code: 'MT', name: 'Montana' },
  { code: 'NE', name: 'Nebraska' },
  { code: 'NV', name: 'Nevada' },
  { code: 'NH', name: 'New Hampshire' },
  { code: 'NJ', name: 'New Jersey' },
  { code: 'NM', name: 'New Mexico' },
  { code: 'NY', name: 'New York' },
  { code: 'NC', name: 'North Carolina' },
  { code: 'ND', name: 'North Dakota' },
  { code: 'OH', name: 'Ohio' },
  { code: 'OK', name: 'Oklahoma' },
  { code: 'OR', name: 'Oregon' },
  { code: 'PA', name: 'Pennsylvania' },
  { code: 'RI', name: 'Rhode Island' },
  { code: 'SC', name: 'South Carolina' },
  { code: 'SD', name: 'South Dakota' },
  { code: 'TN', name: 'Tennessee' },
  { code: 'TX', name: 'Texas' },
  { code: 'UT', name: 'Utah' },
  { code: 'VT', name: 'Vermont' },
  { code: 'VA', name: 'Virginia' },
  { code: 'WA', name: 'Washington' },
  { code: 'WV', name: 'West Virginia' },
  { code: 'WI', name: 'Wisconsin' },
  { code: 'WY', name: 'Wyoming' },
];

const skillsOptionsList = [
  'Cooking',
  'Cleaning',
  'Tutoring',
  'Driving',
  'Event Planning',
  'Fundraising',
  'Mentoring',
  'Administrative Tasks',
  'Technical Support',
  'Public Speaking',
  'Marketing',
  'Graphic Design',
  'Writing/Editing',
  'Photography',
  'Video Production',
  'Social Media Management',
  // Add other skills here...
];

const ProfilePage = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [updateStatus, setUpdateStatus] = useState(null);
  const [formData, setFormData] = useState({
    fullName: '',
    address1: '',
    address2: '',
    city: '',
    state: '',
    zipCode: '',
    skills: [],
    customSkill: '',
    preferences: '',
    availability: [],
  });
  const [skillsOptions, setSkillsOptions] = useState(skillsOptionsList);
  const [selectedSkill, setSelectedSkill] = useState('');
  const router = useRouter();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          throw new Error('No token found');
        }

        const response = await fetch('/api/users', {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || 'Failed to fetch profile');
        }

        const data = await response.json();
        setProfile(data);
        setFormData({
          fullName: data.fullName,
          address1: data.address1,
          address2: data.address2,
          city: data.city,
          state: data.state,
          zipCode: data.zipCode,
          skills: Array.isArray(data.skills) ? data.skills : [],
          customSkill: '',
          preferences: data.preferences,
          availability: data.availability,
        });
        setSkillsOptions(skillsOptionsList.filter((skill) => !data.skills.includes(skill)));
        setLoading(false);
      } catch (error) {
        console.error('Error fetching user data:', error);
        setError(error.message);
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleAddSkill = () => {
    if (selectedSkill && !formData.skills.includes(selectedSkill)) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        skills: [...prevFormData.skills, selectedSkill],
      }));
      setSkillsOptions(skillsOptions.filter((skill) => skill !== selectedSkill));
      setSelectedSkill('');
    }
  };

  const handleCustomSkillChange = (e) => {
    setFormData({
      ...formData,
      customSkill: e.target.value,
    });
  };

  const handleCustomSkillAdd = () => {
    if (formData.customSkill && !formData.skills.includes(formData.customSkill)) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        skills: [...prevFormData.skills, formData.customSkill],
        customSkill: '',
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No token found');
      }

      const response = await fetch('/api/users/update', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to update profile');
      }

      const data = await response.json();
      setProfile(data);
      setUpdateStatus('Profile updated successfully!');
    } catch (error) {
      console.error('Error updating profile:', error);
      setError(error.message);
      setUpdateStatus('Failed to update profile.');
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div style={styles.container}>
      <div style={styles.linksContainer}>
        <Link href="/events" legacyBehavior>
          <a style={styles.link}>View Events</a>
        </Link>
        <Link href="/event-management" legacyBehavior>
          <a style={styles.link}>Event Management</a>
        </Link>
        <Link href="/history" legacyBehavior>
          <a style={styles.link}>View History</a>
        </Link>
        <Link href="/volunteer-matching" legacyBehavior>
          <a style={styles.link}>Volunteer Matching</a>
        </Link>
      </div>
      <h1 style={styles.header}>User Profile</h1>
      <form onSubmit={handleSubmit} style={styles.form}>
        <div>
          <label>Full Name:</label>
          <input type="text" name="fullName" value={formData.fullName} onChange={handleChange} required />
        </div>
        <div>
          <label>Address 1:</label>
          <input type="text" name="address1" value={formData.address1} onChange={handleChange} required />
        </div>
        <div>
          <label>Address 2:</label>
          <input type="text" name="address2" value={formData.address2} onChange={handleChange} />
        </div>
        <div>
          <label>City:</label>
          <input type="text" name="city" value={formData.city} onChange={handleChange} required />
        </div>
        <div>
          <label>State:</label>
          <select name="state" value={formData.state} onChange={handleChange} required>
            {states.map((state) => (
              <option key={state.code} value={state.code}>
                {state.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label>Zip Code:</label>
          <input type="text" name="zipCode" value={formData.zipCode} onChange={handleChange} required />
        </div>
        <div>
          <label>Skills:</label>
          <div style={styles.dropdown}>
            <select value={selectedSkill} onChange={(e) => setSelectedSkill(e.target.value)} style={styles.select}>
              <option value="">Select a skill</option>
              {skillsOptions.map((skill) => (
                <option key={skill} value={skill}>
                  {skill}
                </option>
              ))}
            </select>
            <button type="button" onClick={handleAddSkill} style={styles.addButton}>
              Add Skill
            </button>
            <div style={styles.customSkillContainer}>
              <input
                type="text"
                name="customSkill"
                value={formData.customSkill}
                onChange={handleCustomSkillChange}
                placeholder="Add a custom skill"
              />
              <button type="button" onClick={handleCustomSkillAdd} style={styles.addButton}>
                Add Skill
              </button>
            </div>
            <div style={styles.selectedSkills}>
              {formData.skills.map((skill) => (
                <div key={skill} style={styles.skill}>
                  {skill}
                </div>
              ))}
            </div>
          </div>
        </div>
        <div>
          <label>Preferences:</label>
          <textarea name="preferences" value={formData.preferences} onChange={handleChange} />
        </div>
        <div>
          <label>Availability:</label>
          <input type="date" name="availability" value={formData.availability} onChange={handleChange} multiple required />
        </div>
        <button type="submit">Update Profile</button>
        {updateStatus && <p>{updateStatus}</p>}
      </form>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '600px',
    margin: '0 auto',
    padding: '20px',
    textAlign: 'center',
  },
  linksContainer: {
    display: 'flex',
    justifyContent: 'flex-end',
    gap: '10px',
  },
  link: {
    padding: '10px 20px',
    textDecoration: 'none',
    backgroundColor: '#f0f0f0',
    borderRadius: '5px',
    color: 'black',
    transition: 'background-color 0.3s',
  },
  header: {
    marginBottom: '20px',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
  },
  dropdown: {
    position: 'relative',
  },
  select: {
    width: '100%',
    height: '40px',
  },
  customSkillContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: '10px',
  },
  selectedSkills: {
    marginTop: '10px',
  },
  skill: {
    padding: '5px',
    border: '1px solid #ccc',
    borderRadius: '3px',
    margin: '2px 0',
  },
  addButton: {
    padding: '10px 20px',
    marginTop: '10px',
    textDecoration: 'none',
    backgroundColor: '#f0f0f0',
    borderRadius: '5px',
    color: 'black',
    transition: 'background-color 0.3s',
  },
};

export default ProfilePage;
