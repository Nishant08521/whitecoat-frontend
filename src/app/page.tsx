'use client';

import { useState } from 'react';
import Image from 'next/image';

export default function Home() {
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    mobileNo: '',
    participationMode: '',
  });
  const [mobileError, setMobileError] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    // Allow only digits for mobile number, max 10
    if (name === 'mobileNo') {
      const digits = value.replace(/\D/g, '').slice(0, 10);
      setFormData({ ...formData, mobileNo: digits });

      if (digits.length > 0 && digits.length < 10) {
        setMobileError('Mobile number must be exactly 10 digits');
      } else {
        setMobileError('');
      }
      return;
    }

    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Final validation
    if (formData.mobileNo.length !== 10) {
      setMobileError('Mobile number must be exactly 10 digits');
      return;
    }

    setLoading(true);

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
      const res = await fetch(`${apiUrl}/api/enquiries`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setSuccess(true);
        setFormData({ name: '', mobileNo: '', participationMode: '' });
        setMobileError('');
        setTimeout(() => {
          setSuccess(false);
          setShowModal(false);
        }, 3000);
      } else {
        alert('Failed to submit form');
      }
    } catch (error) {
      console.error(error);
      alert('An error occurred');
    }

    setLoading(false);
  };

  return (
    <main className="page-root">

      {/* ── Poster image — responsive ── */}
      <div className="poster-wrap">
        {/* Desktop image (window.png from public/) */}
        <Image
          src="/window.png"
          alt="The White Coat Revolution – Desktop"
          fill
          className="poster-img desktop-img"
          priority
          sizes="100vw"
        />
        {/* Mobile image (whitecoat.jpeg from public/) */}
        <Image
          src="/whitecoat.jpeg"
          alt="The White Coat Revolution – Mobile"
          fill
          className="poster-img mobile-img"
          priority
          sizes="100vw"
        />
      </div>

      {/* ── Sticky bottom button ── */}
      <div className="sticky-bar">
        <button
          id="enquire-now-btn"
          className="enquire-btn"
          onClick={() => setShowModal(true)}
        >
          Join The Revolution
        </button>
      </div>

      {/* ── Modal ── */}
      {showModal && (
        <div className="modal-overlay" onClick={(e) => { if (e.target === e.currentTarget) setShowModal(false); }}>
          <div className="modal-content">
            <button
              className="close-btn"
              onClick={() => setShowModal(false)}
              aria-label="Close"
            >
              &times;
            </button>
            <h2 className="modal-title">Join The Revolution</h2>

            {success ? (
              <div className="success-msg">
                <div className="success-icon">✅</div>
                <h3>Thank you!</h3>
                <p>Your details have been submitted successfully.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} id="enquiry-form" noValidate>

                {/* Name */}
                <div className="form-group">
                  <label htmlFor="name">Full Name</label>
                  <input
                    id="name"
                    type="text"
                    name="name"
                    placeholder="Enter your full name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                  />
                </div>

                {/* Mobile */}
                <div className="form-group">
                  <label htmlFor="mobileNo">Mobile No.</label>
                  <div className="phone-row">
                    <span className="phone-prefix">🇮🇳 +91</span>
                    <input
                      id="mobileNo"
                      type="tel"
                      name="mobileNo"
                      placeholder="10-digit mobile number"
                      required
                      maxLength={10}
                      value={formData.mobileNo}
                      onChange={handleChange}
                      inputMode="numeric"
                      pattern="[0-9]{10}"
                      className={mobileError ? 'input-error' : ''}
                    />
                  </div>
                  {/* Live digit counter + error */}
                  <div className="phone-meta">
                    {mobileError ? (
                      <span className="field-error">⚠ {mobileError}</span>
                    ) : formData.mobileNo.length > 0 ? (
                      <span className="field-ok">
                        {formData.mobileNo.length === 10
                          ? '✓ Valid number'
                          : `${formData.mobileNo.length}/10 digits`}
                      </span>
                    ) : null}
                    <span className="digit-count">{formData.mobileNo.length}/10</span>
                  </div>
                </div>

                {/* Mode */}
                <div className="form-group">
                  <label htmlFor="participationMode">
                    How do you want to participate?
                  </label>
                  <select
                    id="participationMode"
                    name="participationMode"
                    required
                    value={formData.participationMode}
                    onChange={handleChange}
                  >
                    <option value="">Select an option</option>
                    <option value="Online">A. Online</option>
                    <option value="Offline">B. Offline</option>
                  </select>
                </div>

                <button
                  type="submit"
                  className="submit-btn"
                  id="submit-enquiry-btn"
                  disabled={loading || formData.mobileNo.length !== 10}
                >
                  {loading ? 'Submitting…' : 'Submit'}
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </main>
  );
}
