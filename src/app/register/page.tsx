"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { kycFormSchema, type KYCFormValues } from "@/lib/validations";

/* ─────────────────────────────────────────────
   Botanical SVG decorations
───────────────────────────────────────────── */
function BotanicalTopLeft({ color = "#34421E" }: { color?: string }) {
  return (
    <svg
      viewBox="0 0 320 280"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: 320,
        height: 280,
        opacity: 0.18,
        pointerEvents: "none",
      }}
      aria-hidden="true"
    >
      <path
        d="M60 0 Q80 60 50 120 Q30 180 60 260"
        stroke={color}
        strokeWidth="2"
        fill="none"
      />
      <path
        d="M58 40 Q20 55 0 90"
        stroke={color}
        strokeWidth="1.5"
        fill="none"
      />
      <path
        d="M55 90 Q100 100 120 130"
        stroke={color}
        strokeWidth="1.5"
        fill="none"
      />
      <path
        d="M52 150 Q10 165 0 200"
        stroke={color}
        strokeWidth="1.5"
        fill="none"
      />
      <ellipse
        cx="0"
        cy="90"
        rx="20"
        ry="11"
        transform="rotate(-30 0 90)"
        fill={color}
        opacity="0.8"
      />
      <ellipse
        cx="122"
        cy="130"
        rx="20"
        ry="11"
        transform="rotate(20 122 130)"
        fill={color}
        opacity="0.8"
      />
      <ellipse
        cx="0"
        cy="200"
        rx="20"
        ry="11"
        transform="rotate(-25 0 200)"
        fill={color}
        opacity="0.8"
      />
      <ellipse cx="58" cy="40" rx="15" ry="8" fill={color} opacity="0.5" />
      <ellipse cx="52" cy="150" rx="14" ry="8" fill={color} opacity="0.5" />
      <path
        d="M120 0 Q160 20 180 60"
        stroke={color}
        strokeWidth="1.5"
        fill="none"
      />
      <ellipse
        cx="180"
        cy="60"
        rx="22"
        ry="12"
        transform="rotate(15 180 60)"
        fill={color}
        opacity="0.6"
      />
      <ellipse
        cx="140"
        cy="20"
        rx="16"
        ry="9"
        transform="rotate(-10 140 20)"
        fill={color}
        opacity="0.5"
      />
    </svg>
  );
}

function BotanicalBottomRight({ color = "#34421E" }: { color?: string }) {
  return (
    <svg
      viewBox="0 0 280 260"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{
        position: "absolute",
        bottom: 0,
        right: 0,
        width: 280,
        height: 260,
        opacity: 0.18,
        pointerEvents: "none",
      }}
      aria-hidden="true"
    >
      <path
        d="M220 260 Q200 200 230 140 Q250 80 220 0"
        stroke={color}
        strokeWidth="2"
        fill="none"
      />
      <path
        d="M222 220 Q260 205 280 170"
        stroke={color}
        strokeWidth="1.5"
        fill="none"
      />
      <path
        d="M224 160 Q180 150 160 110"
        stroke={color}
        strokeWidth="1.5"
        fill="none"
      />
      <path
        d="M226 80 Q265 70 280 40"
        stroke={color}
        strokeWidth="1.5"
        fill="none"
      />
      <ellipse
        cx="280"
        cy="170"
        rx="20"
        ry="11"
        transform="rotate(30 280 170)"
        fill={color}
        opacity="0.8"
      />
      <ellipse
        cx="158"
        cy="110"
        rx="20"
        ry="11"
        transform="rotate(-20 158 110)"
        fill={color}
        opacity="0.8"
      />
      <ellipse
        cx="280"
        cy="40"
        rx="20"
        ry="11"
        transform="rotate(25 280 40)"
        fill={color}
        opacity="0.8"
      />
      <ellipse cx="222" cy="220" rx="14" ry="8" fill={color} opacity="0.5" />
      <ellipse cx="226" cy="80" rx="14" ry="8" fill={color} opacity="0.5" />
    </svg>
  );
}

/* ─────────────────────────────────────────────
   Shared styles (module-level constants)
───────────────────────────────────────────── */
const labelStyle: React.CSSProperties = {
  display: "block",
  fontSize: "0.8rem",
  fontVariant: "small-caps",
  letterSpacing: "0.1em",
  color: "#34421E",
  marginBottom: "8px",
  fontWeight: 500,
};

const baseInputStyle: React.CSSProperties = {
  width: "100%",
  padding: "12px 14px",
  border: "1px solid rgba(52,66,30,0.25)",
  borderRadius: "6px",
  background: "#FFF7D4",
  color: "#34421E",
  fontSize: "0.78rem",
  letterSpacing: "0.12em",
  outline: "none",
  boxSizing: "border-box",
};

const errorInputStyle: React.CSSProperties = {
  ...baseInputStyle,
  border: "1px solid #c0392b",
};

/* ─────────────────────────────────────────────
   Field wrapper – MODULE LEVEL (critical fix)
   Defining this inside the parent component
   causes remount on every render → focus lost.
───────────────────────────────────────────── */
interface FieldProps {
  id: string;
  label: string;
  error?: string;
  children: React.ReactNode;
}

function Field({ id, label, error, children }: FieldProps) {
  return (
    <div style={{ marginBottom: "24px" }}>
      <label htmlFor={id} style={labelStyle}>
        {label}
      </label>
      {children}
      {error && (
        <p style={{ color: "#c0392b", fontSize: "0.75rem", marginTop: "4px" }}>
          {error}
        </p>
      )}
    </div>
  );
}

/* ─────────────────────────────────────────────
   FileBox – MODULE LEVEL (same reason)
───────────────────────────────────────────── */
interface FileBoxProps {
  id: string;
  label: string;
  accept: string;
  required?: boolean;
  file?: File | null;
  error?: string;
  onUpload: (id: string, file: File) => void;
}

function FileBox({
  id,
  label,
  accept,
  required,
  file,
  error,
  onUpload,
}: FileBoxProps) {
  return (
    <div style={{ marginBottom: "24px" }}>
      <label style={labelStyle}>
        {label}
        {required ? "*" : ""}
      </label>
      <div
        style={{
          border: `1.5px dashed ${error ? "#c0392b" : "rgba(52,66,30,0.3)"}`,
          borderRadius: "6px",
          padding: "20px",
          textAlign: "center",
          background: "rgba(255,247,212,0.5)",
        }}
      >
        <input
          type="file"
          accept={accept}
          id={id}
          style={{ display: "none" }}
          onChange={(e) =>
            e.target.files?.[0] && onUpload(id, e.target.files[0])
          }
        />
        <label htmlFor={id} style={{ cursor: "pointer", display: "block" }}>
          {file ? (
            <span
              style={{
                color: "#4a5d2e",
                fontSize: "0.82rem",
                letterSpacing: "0.08em",
              }}
            >
              ✓ {file.name}
            </span>
          ) : (
            <>
              <p
                style={{
                  color: "#34421E",
                  opacity: 0.55,
                  fontSize: "0.78rem",
                  letterSpacing: "0.1em",
                  marginBottom: 4,
                }}
              >
                CLICK TO UPLOAD OR DRAG & DROP
              </p>
              <p
                style={{
                  color: "#34421E",
                  opacity: 0.4,
                  fontSize: "0.72rem",
                  letterSpacing: "0.08em",
                }}
              >
                {accept.replace(/\./g, "").replace(/,/g, " · ").toUpperCase()}{" "}
                UP TO 1MB
              </p>
            </>
          )}
        </label>
      </div>
      {error && (
        <p style={{ color: "#c0392b", fontSize: "0.75rem", marginTop: "4px" }}>
          {error}
        </p>
      )}
    </div>
  );
}

/* ─────────────────────────────────────────────
   Form data type
───────────────────────────────────────────── */
type FormData = Partial<KYCFormValues> & {
  businessLicense?: File | null;
  taxIdDocument?: File | null;
  governmentId?: File | null;
  logo?: File | null;
  firstProductImage?: File | null;
};

/* ─────────────────────────────────────────────
   Step components – all MODULE LEVEL
───────────────────────────────────────────── */
interface StepProps {
  formData: FormData;
  errors: Record<string, string>;
  onChange: (field: string, value: any) => void;
  onFileUpload: (field: string, file: File) => void;
}

function Step1({ formData, errors, onChange }: StepProps) {
  const inp = (id: string) => (errors[id] ? errorInputStyle : baseInputStyle);
  return (
    <>
      <Field id="email" label="Email*" error={errors.email}>
        <input
          id="email"
          type="email"
          value={formData.email ?? ""}
          onChange={(e) => onChange("email", e.target.value)}
          style={inp("email")}
          placeholder="you@company.com"
        />
      </Field>
      <Field
        id="businessName"
        label="Business Name*"
        error={errors.businessName}
      >
        <input
          id="businessName"
          type="text"
          value={formData.businessName ?? ""}
          onChange={(e) => onChange("businessName", e.target.value)}
          style={inp("businessName")}
          placeholder="ENTER YOUR LEGAL BUSINESS NAME"
        />
      </Field>
      <Field id="taxIdNumber" label="Tax ID Number*" error={errors.taxIdNumber}>
        <input
          id="taxIdNumber"
          type="text"
          value={formData.taxIdNumber ?? ""}
          onChange={(e) => onChange("taxIdNumber", e.target.value)}
          style={inp("taxIdNumber")}
          placeholder="EIN, GST, VAT, ETC."
        />
      </Field>
      <Field
        id="businessAddress"
        label="Business Address*"
        error={errors.businessAddress}
      >
        <textarea
          id="businessAddress"
          value={formData.businessAddress ?? ""}
          onChange={(e) => onChange("businessAddress", e.target.value)}
          style={{
            ...inp("businessAddress"),
            resize: "vertical",
            minHeight: 90,
          }}
          placeholder="ENTER YOUR COMPLETE BUSINESS ADDRESS"
          rows={3}
        />
      </Field>
    </>
  );
}

function Step2({ formData, errors, onFileUpload }: StepProps) {
  return (
    <>
      <p
        style={{
          color: "#34421E",
          opacity: 0.65,
          fontSize: "0.82rem",
          letterSpacing: "0.08em",
          marginBottom: "28px",
        }}
      >
        Please upload clear, readable copies of your business documents.
      </p>
      <FileBox
        id="businessLicense"
        label="Business License"
        accept=".pdf,.jpg,.jpeg,.png"
        required
        file={formData.businessLicense}
        error={errors.businessLicense}
        onUpload={onFileUpload}
      />
      <FileBox
        id="taxIdDocument"
        label="Tax ID Document"
        accept=".pdf,.jpg,.jpeg,.png"
        required
        file={formData.taxIdDocument}
        error={errors.taxIdDocument}
        onUpload={onFileUpload}
      />
      <FileBox
        id="governmentId"
        label="Government ID"
        accept=".pdf,.jpg,.jpeg,.png"
        required
        file={formData.governmentId}
        error={errors.governmentId}
        onUpload={onFileUpload}
      />
    </>
  );
}

function Step3({ formData, errors, onChange }: StepProps) {
  const inp = (id: string) => (errors[id] ? errorInputStyle : baseInputStyle);
  return (
    <>
      <p
        style={{
          color: "#34421E",
          opacity: 0.65,
          fontSize: "0.82rem",
          letterSpacing: "0.08em",
          marginBottom: "28px",
        }}
      >
        Set up how you'll receive payments from sales.
      </p>
      <Field
        id="bankAccountName"
        label="Bank Account Name*"
        error={errors.bankAccountName}
      >
        <input
          id="bankAccountName"
          type="text"
          value={formData.bankAccountName ?? ""}
          onChange={(e) => onChange("bankAccountName", e.target.value)}
          style={inp("bankAccountName")}
          placeholder="NAME ON BANK ACCOUNT"
        />
      </Field>
      <Field
        id="bankAccountNumber"
        label="Bank Account Number*"
        error={errors.bankAccountNumber}
      >
        <input
          id="bankAccountNumber"
          type="text"
          value={formData.bankAccountNumber ?? ""}
          onChange={(e) => onChange("bankAccountNumber", e.target.value)}
          style={inp("bankAccountNumber")}
          placeholder="YOUR BANK ACCOUNT NUMBER"
        />
      </Field>
      <Field
        id="bankRoutingNumber"
        label="Routing Number*"
        error={errors.bankRoutingNumber}
      >
        <input
          id="bankRoutingNumber"
          type="text"
          value={formData.bankRoutingNumber ?? ""}
          onChange={(e) => onChange("bankRoutingNumber", e.target.value)}
          style={inp("bankRoutingNumber")}
          placeholder="BANK ROUTING NUMBER"
        />
      </Field>
      <div
        style={{
          background: "rgba(52,66,30,0.07)",
          borderRadius: 8,
          padding: "16px 20px",
          marginTop: 8,
        }}
      >
        <p
          style={{
            fontVariant: "small-caps",
            letterSpacing: "0.1em",
            color: "#34421E",
            fontSize: "0.82rem",
            marginBottom: 6,
          }}
        >
          Commission Structure
        </p>
        <p
          style={{
            color: "#34421E",
            opacity: 0.7,
            fontSize: "0.78rem",
            letterSpacing: "0.05em",
          }}
        >
          Keep 85% of every sale — $15 commission on $100. No listing fees, no
          hidden costs.
        </p>
      </div>
    </>
  );
}

function Step4({ formData, onChange }: StepProps) {
  return (
    <>
      <p
        style={{
          color: "#34421E",
          opacity: 0.65,
          fontSize: "0.82rem",
          letterSpacing: "0.08em",
          marginBottom: "28px",
        }}
      >
        Configure your shipping preferences.
      </p>
      <Field id="shippingMethod" label="Shipping Method*">
        <select
          id="shippingMethod"
          value={formData.shippingMethod ?? "flat_rate"}
          onChange={(e) => onChange("shippingMethod", e.target.value)}
          style={baseInputStyle}
        >
          <option value="flat_rate">Flat Rate</option>
          <option value="free_shipping">Free Shipping</option>
          <option value="calculated">Calculated (by location)</option>
        </select>
      </Field>
      <Field id="leadTime" label="Order Lead Time*">
        <select
          id="leadTime"
          value={formData.leadTime ?? "1-2_days"}
          onChange={(e) => onChange("leadTime", e.target.value)}
          style={baseInputStyle}
        >
          <option value="1-2_days">1-2 days</option>
          <option value="3-5_days">3-5 days</option>
          <option value="1-2_weeks">1-2 weeks</option>
          <option value="2-3_weeks">2-3 weeks</option>
        </select>
      </Field>
      <div
        style={{
          background: "rgba(52,66,30,0.07)",
          borderRadius: 8,
          padding: "16px 20px",
        }}
      >
        <p
          style={{
            fontVariant: "small-caps",
            letterSpacing: "0.1em",
            color: "#34421E",
            fontSize: "0.82rem",
            marginBottom: 6,
          }}
        >
          Shipping Templates
        </p>
        <p
          style={{
            color: "#34421E",
            opacity: 0.7,
            fontSize: "0.78rem",
            letterSpacing: "0.05em",
          }}
        >
          Zone-based shipping templates will be available to customise in your
          dashboard after setup.
        </p>
      </div>
    </>
  );
}

function Step5({ formData, errors, onChange, onFileUpload }: StepProps) {
  const inp = (id: string) => (errors[id] ? errorInputStyle : baseInputStyle);
  return (
    <>
      <p
        style={{
          color: "#34421E",
          opacity: 0.65,
          fontSize: "0.82rem",
          letterSpacing: "0.08em",
          marginBottom: "28px",
        }}
      >
        Let's get your first product live. You can expand your catalog later.
      </p>
      <FileBox
        id="logo"
        label="Brand Logo"
        accept=".jpg,.jpeg,.png,.svg"
        file={formData.logo}
        onUpload={onFileUpload}
      />
      <Field id="aboutUs" label="About Us">
        <textarea
          id="aboutUs"
          value={formData.aboutUs ?? ""}
          onChange={(e) => onChange("aboutUs", e.target.value)}
          style={{ ...baseInputStyle, resize: "vertical", minHeight: 70 }}
          placeholder="TELL CUSTOMERS ABOUT YOUR BRAND IN 1-2 SENTENCES"
          rows={2}
        />
      </Field>
      <div
        style={{
          borderTop: "1px solid rgba(52,66,30,0.15)",
          paddingTop: "24px",
          marginTop: "8px",
        }}
      >
        <p
          style={{
            fontVariant: "small-caps",
            letterSpacing: "0.12em",
            color: "#34421E",
            fontSize: "0.85rem",
            marginBottom: "20px",
          }}
        >
          Your First Product
        </p>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "16px",
          }}
        >
          <Field
            id="firstProductTitle"
            label="Product Title*"
            error={errors.firstProductTitle}
          >
            <input
              id="firstProductTitle"
              type="text"
              value={formData.firstProductTitle ?? ""}
              onChange={(e) => onChange("firstProductTitle", e.target.value)}
              style={inp("firstProductTitle")}
              placeholder="PRODUCT NAME"
            />
          </Field>
          <Field
            id="firstProductPrice"
            label="Price*"
            error={errors.firstProductPrice}
          >
            <input
              id="firstProductPrice"
              type="text"
              value={formData.firstProductPrice ?? ""}
              onChange={(e) => onChange("firstProductPrice", e.target.value)}
              style={inp("firstProductPrice")}
              placeholder="25.00"
            />
          </Field>
        </div>
        <Field
          id="firstProductCategory"
          label="Category*"
          error={errors.firstProductCategory}
        >
          <select
            id="firstProductCategory"
            value={formData.firstProductCategory ?? ""}
            onChange={(e) => onChange("firstProductCategory", e.target.value)}
            style={inp("firstProductCategory")}
          >
            <option value="">SELECT CATEGORY</option>
            <option value="handmade">Handmade Goods</option>
            <option value="art">Art & Collectibles</option>
            <option value="clothing">Clothing & Accessories</option>
            <option value="home">Home & Living</option>
            <option value="jewelry">Jewelry</option>
            <option value="crafts">Craft Supplies</option>
          </select>
        </Field>
        <FileBox
          id="firstProductImage"
          label="Product Photo"
          accept=".jpg,.jpeg,.png"
          file={formData.firstProductImage}
          onUpload={onFileUpload}
        />
      </div>
    </>
  );
}

/* ─────────────────────────────────────────────
   Main page component
───────────────────────────────────────────── */
const STEP_TITLES = [
  "Business Information",
  "Document Upload",
  "Financial Setup",
  "Shipping & Logistics",
  "Quick Store Setup",
];

const TOTAL_STEPS = 5;

export default function RegisterPage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const [formData, setFormData] = useState<FormData>({
    email: "",
    businessName: "",
    taxIdNumber: "",
    businessAddress: "",
    bankAccountName: "",
    bankAccountNumber: "",
    bankRoutingNumber: "",
    shippingMethod: "flat_rate",
    leadTime: "1-2_days",
    aboutUs: "",
    firstProductTitle: "",
    firstProductPrice: "",
    firstProductCategory: "",
  });

  // Odd steps → light bg, even steps → green bg
  const isGreenTheme = currentStep % 2 === 0;
  const bgColor = isGreenTheme ? "#748956" : "#f5f5f0";
  const botanicalColor = isGreenTheme ? "#e8f0dc" : "#34421E";

  const updateFormData = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => {
        const n = { ...prev };
        delete n[field];
        return n;
      });
    }
  };

  const handleFileUpload = (field: string, file: File) => {
    updateFormData(field, file);
  };

  const validateStep = (step: number): boolean => {
    const newErrors: Record<string, string> = {};
    if (step === 1) {
      if (!formData.email) newErrors.email = "Required";
      else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
        newErrors.email = "Valid email required";
      if (!formData.businessName) newErrors.businessName = "Required";
      if (!formData.taxIdNumber) newErrors.taxIdNumber = "Required";
      if (!formData.businessAddress) newErrors.businessAddress = "Required";
    }
    if (step === 2) {
      if (!formData.businessLicense) newErrors.businessLicense = "Required";
      if (!formData.taxIdDocument) newErrors.taxIdDocument = "Required";
      if (!formData.governmentId) newErrors.governmentId = "Required";
    }
    if (step === 3) {
      if (!formData.bankAccountName) newErrors.bankAccountName = "Required";
      if (!formData.bankAccountNumber) newErrors.bankAccountNumber = "Required";
      if (!formData.bankRoutingNumber) newErrors.bankRoutingNumber = "Required";
    }
    if (step === 5) {
      if (!formData.firstProductTitle) newErrors.firstProductTitle = "Required";
      if (!formData.firstProductPrice) newErrors.firstProductPrice = "Required";
      if (!formData.firstProductCategory)
        newErrors.firstProductCategory = "Required";
    }
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return false;
    }
    return true;
  };

  const nextStep = () => {
    if (validateStep(currentStep) && currentStep < TOTAL_STEPS)
      setCurrentStep((s) => s + 1);
  };
  const prevStep = () => {
    if (currentStep > 1) setCurrentStep((s) => s - 1);
  };

  const uploadFile = async (file: File): Promise<string> => {
    const res = await fetch("/api/kyc/upload/request", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        fileName: file.name,
        fileType: file.type,
        email: formData.email,
      }),
    });
    if (!res.ok) throw new Error("Failed to get upload URL");
    const { uploadUrl, fileKey } = await res.json();
    const uploadRes = await fetch(uploadUrl, {
      method: "PUT",
      body: file,
      headers: { "Content-Type": file.type },
    });
    if (!uploadRes.ok) throw new Error("Failed to upload file");
    return fileKey;
  };

  const handleSubmit = async () => {
    if (!validateStep(currentStep)) return;
    setIsSubmitting(true);
    try {
      const keys: Partial<KYCFormValues> = {};
      const fileFields = [
        { key: "businessLicense", schemaKey: "businessLicenseKey" },
        { key: "taxIdDocument", schemaKey: "taxIdDocumentKey" },
        { key: "governmentId", schemaKey: "governmentIdKey" },
        { key: "logo", schemaKey: "logoKey" },
        { key: "firstProductImage", schemaKey: "firstProductImageKey" },
      ] as const;

      for (const field of fileFields) {
        const file = formData[field.key as keyof FormData] as
          | File
          | null
          | undefined;
        if (file) {
          try {
            keys[field.schemaKey] = await uploadFile(file);
          } catch {
            alert(`Failed to upload ${field.key}. Please try again.`);
            setIsSubmitting(false);
            return;
          }
        }
      }

      const response = await fetch("/api/kyc/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          ...keys,
          businessLicense: undefined,
          taxIdDocument: undefined,
          governmentId: undefined,
          logo: undefined,
          firstProductImage: undefined,
        }),
      });

      if (response.ok) {
        router.push("/thank-you");
      } else {
        const errorData = await response.json();
        alert(`Submission failed: ${errorData.error}`);
      }
    } catch {
      alert("An unexpected error occurred.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const stepProps: StepProps = {
    formData,
    errors,
    onChange: updateFormData,
    onFileUpload: handleFileUpload,
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <Step1 {...stepProps} />;
      case 2:
        return <Step2 {...stepProps} />;
      case 3:
        return <Step3 {...stepProps} />;
      case 4:
        return <Step4 {...stepProps} />;
      case 5:
        return <Step5 {...stepProps} />;
      default:
        return null;
    }
  };

  return (
    <>
      <style>{`
        input::placeholder, textarea::placeholder {
          color: rgba(52,66,30,0.42);
          letter-spacing: 0.1em;
          font-size: 0.76rem;
        }
        input:focus, textarea:focus, select:focus {
          outline: none;
          border-color: rgba(52,66,30,0.55) !important;
          box-shadow: 0 0 0 2px rgba(52,66,30,0.08);
        }
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
      `}</style>

      <div
        style={{
          minHeight: "100vh",
          background: bgColor,
          position: "relative",
          overflow: "hidden",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "40px 20px",
          transition: "background-color 0.6s ease",
        }}
      >
        <BotanicalTopLeft color={botanicalColor} />
        <BotanicalBottomRight color={botanicalColor} />

        {/* Card */}
        <div
          style={{
            background: "#FFF7D4",
            borderRadius: "20px",
            padding: "48px 52px",
            width: "100%",
            maxWidth: "660px",
            boxShadow: isGreenTheme
              ? "0 8px 48px rgba(0,0,0,0.18)"
              : "0 8px 40px rgba(52,66,30,0.10)",
            position: "relative",
            zIndex: 2,
          }}
        >
          {/* Title */}
          <h2
            style={{
              fontFamily: "Georgia, 'Times New Roman', serif",
              fontWeight: 400,
              fontSize: "2rem",
              color: "#34421E",
              letterSpacing: "0.04em",
              fontVariant: "small-caps",
              marginBottom: "36px",
              lineHeight: 1.2,
            }}
          >
            {STEP_TITLES[currentStep - 1]}
          </h2>

          {/* Step content */}
          {renderStep()}

          {/* Navigation */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginTop: "36px",
              paddingTop: "24px",
              borderTop: "1px solid rgba(52,66,30,0.12)",
            }}
          >
            {/* Progress dots */}
            <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
              {Array.from({ length: TOTAL_STEPS }).map((_, i) => (
                <div
                  key={i}
                  style={{
                    width: i + 1 === currentStep ? 24 : 8,
                    height: 8,
                    borderRadius: 9999,
                    background:
                      i + 1 <= currentStep ? "#34421E" : "rgba(52,66,30,0.2)",
                    transition: "all 0.3s ease",
                  }}
                />
              ))}
            </div>

            <div style={{ display: "flex", gap: "12px" }}>
              {currentStep > 1 && (
                <button
                  onClick={prevStep}
                  disabled={isSubmitting}
                  style={{
                    padding: "10px 24px",
                    borderRadius: 9999,
                    border: "1.5px solid rgba(52,66,30,0.35)",
                    background: "transparent",
                    color: "#34421E",
                    fontSize: "0.82rem",
                    letterSpacing: "0.1em",
                    fontVariant: "small-caps",
                    cursor: "pointer",
                    opacity: isSubmitting ? 0.5 : 1,
                  }}
                >
                  Previous
                </button>
              )}

              {currentStep === TOTAL_STEPS ? (
                <button
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  style={{
                    padding: "10px 28px",
                    borderRadius: 9999,
                    border: "none",
                    background: "#34421E",
                    color: "#FFF7D4",
                    fontSize: "0.82rem",
                    letterSpacing: "0.12em",
                    fontVariant: "small-caps",
                    cursor: isSubmitting ? "not-allowed" : "pointer",
                    opacity: isSubmitting ? 0.6 : 1,
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                  }}
                >
                  {isSubmitting ? (
                    <>
                      <svg
                        style={{
                          width: 16,
                          height: 16,
                          animation: "spin 1s linear infinite",
                        }}
                        viewBox="0 0 24 24"
                        fill="none"
                      >
                        <circle
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="3"
                          opacity="0.3"
                        />
                        <path
                          d="M12 2a10 10 0 0 1 10 10"
                          stroke="currentColor"
                          strokeWidth="3"
                          strokeLinecap="round"
                        />
                      </svg>
                      Submitting…
                    </>
                  ) : (
                    "Submit Application"
                  )}
                </button>
              ) : (
                <button
                  onClick={nextStep}
                  style={{
                    padding: "10px 28px",
                    borderRadius: 9999,
                    border: "none",
                    background: "#34421E",
                    color: "#FFF7D4",
                    fontSize: "0.82rem",
                    letterSpacing: "0.12em",
                    fontVariant: "small-caps",
                    cursor: "pointer",
                  }}
                >
                  Next Step
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
