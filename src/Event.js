import React, { useState, useEffect } from 'react';
import './App.css'; // Import your CSS file

const JobApplicationForm = () => {
  const INITIAL_STATE = {
    fullName: '',
    email: '',
    phoneNumber: '',
    applyingForPosition: '',
    relevantExperience: '',
    portfolioURL: '',
    managementExperience: '',
    additionalSkills: {
      JavaScript: false,
      CSS: false,
      Python: false
    },
    preferredInterviewTime: ''
  };

  const [formData, setFormData] = useState(INITIAL_STATE);
  const [errors, setErrors] = useState({});
  const [submittedData, setSubmittedData] = useState(null);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === 'checkbox') {
      setFormData({
        ...formData,
        additionalSkills: {
          ...formData.additionalSkills,
          [name]: checked
        }
      });
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
    }
  };

  useEffect(() => {
    const validationErrors = validate();
    setErrors(validationErrors);
  }, [formData]);

  const validate = () => {
    const newErrors = {};
    if (!formData.fullName.trim()) newErrors.fullName = 'Full Name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid';
    if (!formData.phoneNumber.trim()) newErrors.phoneNumber = 'Phone Number is required';
    else if (isNaN(formData.phoneNumber)) newErrors.phoneNumber = 'Phone Number must be a valid number';
    if (!formData.applyingForPosition) newErrors.applyingForPosition = 'Applying for Position is required';
    if ((formData.applyingForPosition === 'Developer' || formData.applyingForPosition === 'Designer') && !formData.relevantExperience.trim()) {
      newErrors.relevantExperience = 'Relevant Experience is required for Developer or Designer';
    } else if ((formData.applyingForPosition === 'Developer' || formData.applyingForPosition === 'Designer') && (isNaN(formData.relevantExperience) || +formData.relevantExperience <= 0)) {
      newErrors.relevantExperience = 'Relevant Experience must be a number greater than 0';
    }
    if (formData.applyingForPosition === 'Designer' && !formData.portfolioURL.trim()) {
      newErrors.portfolioURL = 'Portfolio URL is required for Designer';
    } else if (formData.applyingForPosition === 'Designer' && !isURL(formData.portfolioURL)) {
      newErrors.portfolioURL = 'Portfolio URL must be a valid URL';
    }
    if (formData.applyingForPosition === 'Manager' && !formData.managementExperience.trim()) {
      newErrors.managementExperience = 'Management Experience is required for Manager';
    }
    if (!formData.additionalSkills.JavaScript && !formData.additionalSkills.CSS && !formData.additionalSkills.Python) {
      newErrors.additionalSkills = 'At least one Additional Skill must be selected';
    }
    if (!formData.preferredInterviewTime.trim()) newErrors.preferredInterviewTime = 'Preferred Interview Time is required';
    else if (isNaN(Date.parse(formData.preferredInterviewTime))) newErrors.preferredInterviewTime = 'Preferred Interview Time must be a valid date and time';
    return newErrors;
  };

  const isURL = (url) => {
    const pattern = /^(ftp|http|https):\/\/[^ "]+$/;
    return pattern.test(url);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      setErrors({});
      setSubmittedData(formData);
    }
  };

  const resetForm = () => {
    setFormData(INITIAL_STATE);
    setErrors({});
    setSubmittedData(null);
  };

  return (
    <div className="App">
      <h2>Job Application Form</h2>
      {!submittedData ? (
        <form onSubmit={handleSubmit} noValidate>
          <div>
            <label>Full Name:</label>
            <input type="text" name="fullName" value={formData.fullName} onChange={handleChange} />
            {errors.fullName && <p className="error">{errors.fullName}</p>}
          </div>
          <div>
            <label>Email:</label>
            <input type="email" name="email" value={formData.email} onChange={handleChange} />
            {errors.email && <p className="error">{errors.email}</p>}
          </div>
          <div>
            <label>Phone Number:</label>
            <input type="text" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} />
            {errors.phoneNumber && <p className="error">{errors.phoneNumber}</p>}
          </div>
          <div>
            <label>Applying for Position:</label>
            <select name="applyingForPosition" value={formData.applyingForPosition} onChange={handleChange}>
              <option value="">Select...</option>
              <option value="Developer">Developer</option>
              <option value="Designer">Designer</option>
              <option value="Manager">Manager</option>
            </select>
            {errors.applyingForPosition && <p className="error">{errors.applyingForPosition}</p>}
          </div>
          {(formData.applyingForPosition === 'Developer' || formData.applyingForPosition === 'Designer') && (
            <div>
              <label>Relevant Experience (years):</label>
              <input type="number" name="relevantExperience" value={formData.relevantExperience} onChange={handleChange} />
              {errors.relevantExperience && <p className="error">{errors.relevantExperience}</p>}
            </div>
          )}
          {formData.applyingForPosition === 'Designer' && (
            <div>
              <label>Portfolio URL:</label>
              <input type="text" name="portfolioURL" value={formData.portfolioURL} onChange={handleChange} />
              {errors.portfolioURL && <p className="error">{errors.portfolioURL}</p>}
            </div>
          )}
          {formData.applyingForPosition === 'Manager' && (
            <div>
              <label>Management Experience:</label>
              <input type="text" name="managementExperience" value={formData.managementExperience} onChange={handleChange} />
              {errors.managementExperience && <p className="error">{errors.managementExperience}</p>}
            </div>
          )}
          <div>
            <label>Additional Skills:</label>
            <div>
              <label>
                <input type="checkbox" name="JavaScript" checked={formData.additionalSkills.JavaScript} onChange={handleChange} />
                JavaScript
              </label>
              <label>
                <input type="checkbox" name="CSS" checked={formData.additionalSkills.CSS} onChange={handleChange} />
                CSS
              </label>
              <label>
                <input type="checkbox" name="Python" checked={formData.additionalSkills.Python} onChange={handleChange} />
                Python
              </label>
            </div>
            {errors.additionalSkills && <p className="error">{errors.additionalSkills}</p>}
          </div>
          <div>
            <label>Preferred Interview Time:</label>
            <input type="datetime-local" name="preferredInterviewTime" value={formData.preferredInterviewTime} onChange={handleChange} />
            {errors.preferredInterviewTime && <p className="error">{errors.preferredInterviewTime}</p>}
          </div>
          <button type="submit">Submit</button>
        </form>
      ) : (
        <div className="summary">
          <h2>Submission Summary</h2>
          <p><strong>Full Name:</strong> {submittedData.fullName}</p>
          <p><strong>Email:</strong> {submittedData.email}</p>
          <p><strong>Phone Number:</strong> {submittedData.phoneNumber}</p>
          <p><strong>Applying for Position:</strong> {submittedData.applyingForPosition}</p>
          {submittedData.applyingForPosition === 'Developer' || submittedData.applyingForPosition === 'Designer' ? (
            <p><strong>Relevant Experience:</strong> {submittedData.relevantExperience}</p>
          ) : null}
          {submittedData.applyingForPosition === 'Designer' ? (
            <p><strong>Portfolio URL:</strong> {submittedData.portfolioURL}</p>
          ) : null}
          {submittedData.applyingForPosition === 'Manager' ? (
            <p><strong>Management Experience:</strong> {submittedData.managementExperience}</p>
          ) : null}
          <p><strong>Additional Skills:</strong>
            {submittedData.additionalSkills.JavaScript && ' JavaScript,'}
            {submittedData.additionalSkills.CSS && ' CSS,'}
            {submittedData.additionalSkills.Python && ' Python'}
          </p>
          <p><strong>Preferred Interview Time:</strong> {new Date(submittedData.preferredInterviewTime).toLocaleString()}</p>
          <button onClick={resetForm}>Edit Application</button>
        </div>
      )}
    </div>
  );
};

export default JobApplicationForm;
