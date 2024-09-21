import React, { useState } from 'react';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    message: '',
    ip: ''
  });

  const [errors, setErrors] = useState({
    fullName: '',
    email: '',
    phone: '',
    message: ''
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === 'phone') {
      let formattedPhone = value.replace(/\D/g, ''); // Remove all non-digit characters

      if (formattedPhone.length > 3 && formattedPhone.length <= 6) {
        formattedPhone = `${formattedPhone.slice(0, 3)}-${formattedPhone.slice(3)}`;
      } else if (formattedPhone.length > 6) {
        formattedPhone = `${formattedPhone.slice(0, 3)}-${formattedPhone.slice(3, 6)}-${formattedPhone.slice(6, 10)}`;
      }

      setFormData({ ...formData, phone: formattedPhone });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Fetch the user's IP address
    let ip = '';
    try {
      const response = await fetch('https://api.ipify.org?format=json');
      const data = await response.json();
      ip = data.ip;
    } catch (error) {
      console.error('Error fetching IP address:', error);
    }

    // Validate form
    let newErrors = {};
    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full name is required';
    }
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      newErrors.email = 'Invalid email address';
    }
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^\d{3}-\d{3}-\d{4}$/.test(formData.phone.trim())) {
      newErrors.phone = 'Invalid phone number format. Use XXX-XXX-XXXX.';
    }
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    }
    setErrors(newErrors);

    // Submit form if no errors
    if (Object.keys(newErrors).length === 0) {
      // Include IP address in formData
      const formDataWithIp = { ...formData, ip };

      // Handle form submission
      await fetch(process.env.REACT_APP_BASE_URL + '/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formDataWithIp),
      });

      // Reset form
      setFormData({
        fullName: '',
        email: '',
        phone: '',
        message: '',
        ip: ''
      });

      // Show success modal
      setIsSubmitted(true);
    }
  };

  return (
    <section className="resume-section" id="contactus">
      <div className="resume-section-content">
        <h2 className="mb-5 text-center">Get In touch</h2>
        {isSubmitted ? (
          <div className="text-center">
            <p>Thank you for reaching out. Your message has been successfully sent.</p>
          </div>
        ) : (
          <div className="row">
            <div className="col-lg-6 offset-lg-3">
              <form onSubmit={handleSubmit} className="contact-form">
                <div className="form-group">
                  <input
                    type="text"
                    id="fullName"
                    name="fullName"
                    className={`form-control ${errors.fullName ? 'is-invalid' : ''}`}
                    value={formData.fullName}
                    onChange={handleChange}
                    placeholder="Enter Your Name"
                  />
                  {errors.fullName && <div className="invalid-feedback">{errors.fullName}</div>}
                </div>
                <div className="form-group">
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter Your Email"
                  />
                  {errors.email && <div className="invalid-feedback">{errors.email}</div>}
                </div>
                <div className="form-group">
                  <input
                    type="text"
                    id="phone"
                    name="phone"
                    className={`form-control ${errors.phone ? 'is-invalid' : ''}`}
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="Enter Your Phone Number (xxx-xxx-xxxx)"
                  />
                  {errors.phone && <div className="invalid-feedback">{errors.phone}</div>}
                </div>
                <div className="form-group">
                  <textarea
                    id="message"
                    name="message"
                    className={`form-control ${errors.message ? 'is-invalid' : ''}`}
                    value={formData.message}
                    onChange={handleChange}
                    rows="5"
                    placeholder="Type your message here."
                  ></textarea>
                  {errors.message && <div className="invalid-feedback">{errors.message}</div>}
                </div>
                <button type="submit" className="btn btn-primary w-100">Send Message</button>
              </form>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default ContactForm;
