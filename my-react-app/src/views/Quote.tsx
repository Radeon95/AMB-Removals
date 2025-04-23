import React, { useState, useRef } from "react";
import "../style/Quote.css";

const propertyTypes = [
  "House",
  "Apartment",
  "Studio",
  "Maisonette",
  "Bungalow",
  "Storage",
  "Office",
  "Industrial",
];

const packageOptions = ["Move", "Move with packing", "Unsure"];

const Quote: React.FC = () => {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    fromPostcode: "",
    fromAddress: "",
    fromCity: "",
    fromPropertyType: "",
    toPostcode: "",
    toAddress: "",
    toCity: "",
    toPropertyType: "",
    moveDate: "",
    message: "",
    agreement: false,
    consent: false,
    package: "",
    details: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const formRef = useRef<HTMLFormElement>(null);

  const personalFields = [
    {
      model: "name",
      label: "Name",
      placeholder: "Enter your name",
      type: "text",
    },
    {
      model: "phone",
      label: "Phone",
      placeholder: "Enter your phone number",
      type: "tel",
    },
    {
      model: "email",
      label: "Email",
      placeholder: "Enter your email",
      type: "email",
    },
  ] as const;

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!form.name || form.name.length < 2)
      newErrors.name = "Name must be at least 2 characters";
    if (
      !form.phone ||
      !/^(\+44|0)[\s-]?\(?\d{3}\)?[\s-]?\d{3}[\s-]?\d{4}$/.test(form.phone)
    )
      newErrors.phone = "Please enter a valid phone number";
    if (!form.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      newErrors.email = "Please enter a valid email";
    if (!form.fromPostcode) newErrors.fromPostcode = "Postcode is required";
    if (!form.fromPropertyType)
      newErrors.fromPropertyType = "Property type is required";
    if (!form.toPostcode) newErrors.toPostcode = "Postcode is required";
    if (!form.toPropertyType)
      newErrors.toPropertyType = "Property type is required";
    if (!form.consent) newErrors.consent = "Consent is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value, type } = e.target as HTMLInputElement;
    const checked =
      type === "checkbox" ? (e.target as HTMLInputElement).checked : undefined;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return alert("Please fill all required fields.");
    console.log("Form Submitted", form);
    alert("Quote submitted!");
  };

  return (
    <>
      <div className="introImage">
        <h2>About Your Move...</h2>
      </div>
      <div className="quote-container">
        <form
          ref={formRef}
          onSubmit={handleSubmit}
          className="quote-form"
          noValidate
        >
          {/* Personal Details */}
          <div className="form-block">
            {personalFields.map((field) => (
              <div className="form-group" key={field.model}>
                <label>{field.label}</label>
                <span className="input">
                  <input
                    name={field.model}
                    value={form[field.model]}
                    onChange={handleChange}
                    placeholder={field.placeholder}
                    type={field.type}
                  />
                  <span></span>
                </span>
                {errors[field.model] && (
                  <span className="error">{errors[field.model]}</span>
                )}
              </div>
            ))}
          </div>

          {/* Moving From */}
          <div className="form-block">
            <h3>Moving From...</h3>
            <div className="form-group">
              <label>Postcode *</label>
              <span className="input">
                <input
                  name="fromPostcode"
                  value={form.fromPostcode}
                  onChange={handleChange}
                  placeholder="Search your postcode"
                />
                <span></span>
              </span>
              {errors.fromPostcode && (
                <span className="error">{errors.fromPostcode}</span>
              )}
            </div>

            <div className="form-group">
              <label>Street Address</label>
              <span className="input">
                <input
                  name="fromAddress"
                  value={form.fromAddress}
                  onChange={handleChange}
                  placeholder="Street Address"
                />
                <span></span>
              </span>
            </div>

            <div className="form-group">
              <label>City</label>
              <span className="input">
                <input
                  name="fromCity"
                  value={form.fromCity}
                  onChange={handleChange}
                  placeholder="City"
                />
                <span></span>
              </span>
            </div>

            <div className="form-group">
              <label>Property Type *</label>
              <span className="selection">
                <select
                  name="fromPropertyType"
                  value={form.fromPropertyType}
                  onChange={handleChange}
                >
                  <option value="">Select type</option>
                  {propertyTypes.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
                <span></span>
              </span>
              {errors.fromPropertyType && (
                <span className="error">{errors.fromPropertyType}</span>
              )}
            </div>
          </div>

          {/* Moving To */}
          <div className="form-block">
            <h3>Moving To...</h3>
            <div className="form-group">
              <label>Postcode *</label>
              <span className="input">
                <input
                  name="toPostcode"
                  value={form.toPostcode}
                  onChange={handleChange}
                  placeholder="Search your postcode"
                />
                <span></span>
              </span>
              {errors.toPostcode && (
                <span className="error">{errors.toPostcode}</span>
              )}
            </div>

            <div className="form-group">
              <label>Street Address</label>
              <span className="input">
                <input
                  name="toAddress"
                  value={form.toAddress}
                  onChange={handleChange}
                  placeholder="Street Address"
                />
                <span></span>
              </span>
            </div>

            <div className="form-group">
              <label>City</label>
              <span className="input">
                <input
                  name="toCity"
                  value={form.toCity}
                  onChange={handleChange}
                  placeholder="City"
                />
                <span></span>
              </span>
            </div>

            <div className="form-group">
              <label>Property Type *</label>
              <span className="selection">
                <select
                  name="toPropertyType"
                  value={form.toPropertyType}
                  onChange={handleChange}
                >
                  <option value="">Select type</option>
                  {propertyTypes.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
                <span></span>
              </span>
              {errors.toPropertyType && (
                <span className="error">{errors.toPropertyType}</span>
              )}
            </div>
          </div>

          {/* Package and Additional Details */}
          <div className="form-block">
            <div className="form-group">
              <label>Package</label>
              <span className="selection">
                <select
                  name="package"
                  value={form.package}
                  onChange={handleChange}
                >
                  <option value="">Select package</option>
                  {packageOptions.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
                <span></span>
              </span>
            </div>
            <div className="form-group">
              <label>Any other details</label>
              <span className="input1">
                <textarea
                  name="details"
                  value={form.details}
                  onChange={handleChange}
                  placeholder="Any other details"
                />
                <span></span>
              </span>
            </div>
          </div>

          {/* Consent */}
          <div className="form-group checkbox">
            <label>
              <input
                type="checkbox"
                name="consent"
                checked={form.consent}
                onChange={handleChange}
              />
              I agree to be contacted and my data processed.
            </label>
            {errors.consent && <span className="error">{errors.consent}</span>}
          </div>

          {/* Submit */}
          <div className="form-actions">
            <button type="submit">Submit</button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Quote;
