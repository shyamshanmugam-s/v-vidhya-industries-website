import React, { useState, useEffect, useRef } from "react";
import { Badge } from "../ui/Badge";
import { Button } from "../ui/Button";
import {
  AlertCircle,
  ArrowUpRight,
  CheckCircle2,
  FileText,
  HelpCircle,
  MapPin,
  Paperclip,
  RotateCcw,
  ShieldCheck,
  Trash2,
  UploadCloud,
} from "lucide-react";
import { gsap } from "../../lib/gsap";

interface FormData {
  fullName: string;
  company: string;
  phone: string;
  email: string;
  application: string;
  productFamily: string;
  quantity: string;
  requirement: string;
  message: string;
  file: File | null;
}

interface FormErrors {
  fullName?: string;
  phone?: string;
  email?: string;
  application?: string;
  requirement?: string;
  message?: string;
}

const getInitialFormData = (): FormData => {
  let initialProduct = "";
  let initialApp = "";
  if (typeof window !== "undefined") {
    try {
      const params = new URLSearchParams(window.location.search);
      initialProduct = params.get("product") || "";
      initialApp = params.get("application") || params.get("app") || "";
    } catch {
      // ignore
    }
  }
  return {
    fullName: "",
    company: "",
    phone: "",
    email: "",
    application: initialApp,
    productFamily: initialProduct,
    quantity: "",
    requirement: "",
    message: "",
    file: null,
  };
};

export const QuoteScaffold: React.FC = () => {
  const [formData, setFormData] = useState<FormData>(getInitialFormData);
  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submittedData, setSubmittedData] = useState<FormData | null>(null);
  const [demoRefId, setDemoRefId] = useState("");

  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const leftColRef = useRef<HTMLDivElement>(null);
  const formCardRef = useRef<HTMLDivElement>(null);
  const successCardRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // GSAP Animations
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      // Header reveal
      gsap.from(headerRef.current, {
        scrollTrigger: {
          trigger: headerRef.current,
          start: "top 85%",
        },
        opacity: 0,
        y: 28,
        duration: 0.8,
        ease: "power3.out",
      });

      // Left Column reveal
      gsap.from(leftColRef.current, {
        scrollTrigger: {
          trigger: leftColRef.current,
          start: "top 80%",
        },
        opacity: 0,
        y: 32,
        duration: 0.9,
        ease: "power3.out",
      });

      // Form Card reveal
      gsap.from(formCardRef.current, {
        scrollTrigger: {
          trigger: formCardRef.current,
          start: "top 80%",
        },
        opacity: 0,
        y: 36,
        duration: 0.9,
        ease: "power4.out",
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // In-page prefill event listener
  useEffect(() => {
    const handlePrefill = (e: Event) => {
      const customEvent = e as CustomEvent<{ product?: string; application?: string }>;
      if (customEvent.detail?.product) {
        setFormData((prev) => ({
          ...prev,
          productFamily: customEvent.detail.product || prev.productFamily,
        }));
      }
      if (customEvent.detail?.application) {
        setFormData((prev) => ({
          ...prev,
          application: customEvent.detail.application || prev.application,
        }));
      }
    };

    window.addEventListener("vidhya-prefill-quote", handlePrefill);
    return () => {
      window.removeEventListener("vidhya-prefill-quote", handlePrefill);
    };
  }, []);

  // Form Validation Logic
  const validateField = (name: keyof FormData, value: string): string | undefined => {
    switch (name) {
      case "fullName":
        if (!value.trim()) return "Please enter your name.";
        if (value.trim().length < 2) return "Please enter your full name.";
        return undefined;
      case "phone":
        if (!value.trim()) return "Please enter your phone number.";
        // Accept normal Indian and international phone formats
        if (!/^[+]?[\d\s\-().]{7,20}$/.test(value.trim())) {
          return "Please enter a valid contact phone number.";
        }
        return undefined;
      case "email":
        if (!value.trim()) return "Please enter a valid email address.";
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim())) {
          return "Please enter a valid email address.";
        }
        return undefined;
      case "application":
        if (!value || value === "") return "Please select an application.";
        return undefined;
      case "requirement":
        if (!value || value === "") return "Please select your requirement.";
        return undefined;
      case "message":
        if (!value.trim()) return "Please tell us about your requirement.";
        if (value.trim().length < 5) return "Please provide more details regarding your requirement.";
        return undefined;
      default:
        return undefined;
    }
  };

  const validateAll = (): boolean => {
    const newErrors: FormErrors = {};
    const nameErr = validateField("fullName", formData.fullName);
    const phoneErr = validateField("phone", formData.phone);
    const emailErr = validateField("email", formData.email);
    const appErr = validateField("application", formData.application);
    const reqErr = validateField("requirement", formData.requirement);
    const msgErr = validateField("message", formData.message);

    if (nameErr) newErrors.fullName = nameErr;
    if (phoneErr) newErrors.phone = phoneErr;
    if (emailErr) newErrors.email = emailErr;
    if (appErr) newErrors.application = appErr;
    if (reqErr) newErrors.requirement = reqErr;
    if (msgErr) newErrors.message = msgErr;

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (touched[name]) {
      const errorMsg = validateField(name as keyof FormData, value);
      setErrors((prev) => ({ ...prev, [name]: errorMsg }));
    }
  };

  const handleBlur = (
    e: React.FocusEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    const errorMsg = validateField(name as keyof FormData, value);
    setErrors((prev) => ({ ...prev, [name]: errorMsg }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      setFormData((prev) => ({ ...prev, file: selectedFile }));
    }
  };

  const removeFile = () => {
    setFormData((prev) => ({ ...prev, file: null }));
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Mark all required fields as touched
    setTouched({
      fullName: true,
      phone: true,
      email: true,
      application: true,
      requirement: true,
      message: true,
    });

    const isValid = validateAll();

    if (!isValid) {
      // Focus first error element
      const firstErrorField = document.querySelector('[aria-invalid="true"]') as HTMLElement;
      if (firstErrorField) {
        firstErrorField.focus();
      }
      return;
    }

    setIsSubmitting(true);

    // Simulate clean engineering processing
    setTimeout(() => {
      const randomRef = `RFQ-DEMO-${Math.floor(100000 + Math.random() * 900000)}`;
      setDemoRefId(randomRef);
      setSubmittedData({ ...formData });
      setIsSubmitting(false);
      setIsSubmitted(true);

      // Smooth scroll to top of quote section
      sectionRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 600);
  };

  const handleReset = () => {
    setFormData(getInitialFormData());
    setErrors({});
    setTouched({});
    setIsSubmitted(false);
    setSubmittedData(null);
    setDemoRefId("");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <section
      id="quote"
      ref={sectionRef}
      className="relative py-12 sm:py-16 border-b border-graphite-800 bg-graphite-950 technical-grid"
      aria-label="Request a Quote and Technical Inquiry"
    >
      {/* Background Ambience */}
      <div
        className="absolute top-1/3 right-0 w-[550px] h-[550px] bg-[radial-gradient(circle,rgba(14,165,233,0.035)_0%,transparent_70%)] pointer-events-none"
        aria-hidden="true"
      />

      <div className="container relative z-10 space-y-8 sm:space-y-12">
        
        {/* 1. Section Header */}
        <div
          ref={headerRef}
          className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-6 border-b border-graphite-850"
        >
          <div className="max-w-2xl">
            <div className="flex items-center gap-3 mb-4">
              <span className="font-mono text-xs font-bold text-precision-cyan tracking-widest uppercase">
                [ 07 ]
              </span>
              <span className="text-graphite-800">/</span>
              <span className="font-mono text-xs text-steel-500 tracking-widest uppercase">
                REQUEST A QUOTE
              </span>
            </div>

            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold font-display tracking-tight text-white uppercase leading-[1.02] mb-4">
              LET'S DISCUSS <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-steel-200 to-steel-400">
                YOUR REQUIREMENT.
              </span>
            </h2>

            <p className="text-base sm:text-lg text-steel-300 font-sans leading-relaxed">
              Share your application and requirements for a product enquiry.
            </p>
          </div>

          <div className="flex flex-col items-start lg:items-end gap-2 self-start lg:self-auto font-mono">
            <Badge variant="accent" indicator className="py-1 px-3 text-[11px]">
              TECHNICAL ENQUIRY
            </Badge>
            <span className="text-[10px] text-steel-500 tracking-wider">
              DIRECT INQUIRY // COIMBATORE
            </span>
          </div>
        </div>

        {/* 2. Asymmetric Two-Column Composition */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          
          {/* LEFT COLUMN: Editorial Statement & Verified Contact Dossier */}
          <div ref={leftColRef} className="lg:col-span-5 space-y-8">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 font-mono text-xs text-precision-cyan uppercase tracking-widest">
                <FileText className="w-4 h-4" />
                <span>COMMERCIAL & TECHNICAL RFQ</span>
              </div>

              <h3 className="text-3xl sm:text-4xl font-extrabold font-display text-white uppercase tracking-tight leading-[1.08]">
                FROM APPLICATION <br />
                <span className="text-steel-400">TO ENQUIRY.</span>
              </h3>

              <p className="text-base text-steel-300 font-sans leading-relaxed">
                Share your application and requirements for a product enquiry.
              </p>
            </div>

            {/* Verified Manufacturer Location Block */}
            <div className="p-6 rounded-sm bg-graphite-900 border border-steel-700/60 precision-corner space-y-4 shadow-xl">
              <div className="flex items-center justify-between font-mono text-xs text-steel-400 pb-3 border-b border-graphite-800">
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-precision-cyan" />
                  <span className="text-white font-semibold uppercase">V. VIDHYA INDUSTRIES</span>
                </div>
                <span className="text-steel-500 font-mono text-[11px]">COIMBATORE</span>
              </div>

              <div className="flex items-start gap-3 pt-1">
                <MapPin className="w-4 h-4 text-precision-cyan shrink-0 mt-1" />
                <div className="space-y-1">
                  <div className="font-mono text-xs text-steel-400 uppercase tracking-wide">
                    COIMBATORE, TAMIL NADU
                  </div>
                  <address className="not-italic font-mono text-xs sm:text-sm text-steel-200 leading-relaxed">
                    <p className="font-semibold text-white">V. Vidhya Industries</p>
                    <p>6-1 Nehru Street,</p>
                    <p>(opp. Tirupur Textiles),</p>
                    <p>Avinashi Road, Peelamedu,</p>
                    <p>Coimbatore — 641004,</p>
                    <p className="text-steel-400">Tamil Nadu, India</p>
                  </address>
                </div>
              </div>

              <div className="pt-3 border-t border-graphite-800 flex items-center justify-between text-[11px] font-mono text-steel-500">
                <span>MANUFACTURING FACILITY</span>
                <span className="text-precision-cyan">PEELAMEDU</span>
              </div>
            </div>

            {/* Engineering Technical Guidance Card */}
            <div className="p-5 rounded-sm bg-graphite-900/60 border border-graphite-850 space-y-2">
              <div className="flex items-center gap-2 font-mono text-xs text-precision-cyan uppercase tracking-wider">
                <HelpCircle className="w-4 h-4 text-precision-cyan shrink-0" />
                <span>TECHNICAL GUIDANCE</span>
              </div>
              <p className="text-xs sm:text-sm font-sans text-steel-300 leading-relaxed">
                Provide as much context on your source, installation depth, or operating conditions as possible. Technical datasheets and system drawings are provided upon requirement review.
              </p>
            </div>

            {/* Privacy & Communication Note */}
            <div className="p-4 rounded-sm bg-graphite-950 border border-graphite-850 flex items-start gap-2.5">
              <ShieldCheck className="w-4 h-4 text-precision-cyan shrink-0 mt-0.5" />
              <p className="font-mono text-[11px] text-steel-500 leading-relaxed">
                Details provided will be used exclusively to assess your requirement and respond to your enquiry.
              </p>
            </div>
          </div>

          {/* RIGHT COLUMN: RFQ Form / Success State */}
          <div className="lg:col-span-7">
            {isSubmitted && submittedData ? (
              /* Success / Demo State Confirmation Panel */
              <div
                ref={successCardRef}
                className="rounded-sm border border-precision-cyan/40 bg-graphite-900 p-6 sm:p-10 shadow-2xl precision-corner space-y-8"
              >
                {/* Header Badge */}
                <div className="flex items-center justify-between font-mono text-xs text-steel-400 pb-4 border-b border-graphite-800">
                  <span className="text-precision-cyan font-bold uppercase tracking-widest">
                    [ DEMO ENQUIRY RECORDED ]
                  </span>
                  <span className="text-steel-400">{demoRefId}</span>
                </div>

                <div className="space-y-4 text-center sm:text-left">
                  <div className="w-14 h-14 rounded-sm bg-precision-cyan/10 border border-precision-cyan/40 flex items-center justify-center text-precision-cyan mx-auto sm:mx-0">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>

                  <h3 className="text-2xl sm:text-3xl font-bold font-display text-white uppercase tracking-tight">
                    ENQUIRY READY
                  </h3>

                  <p className="text-base text-steel-200 font-sans leading-relaxed">
                    Your enquiry details have been captured in this demo.
                  </p>
                </div>

                {/* Client Integration Callout Notice */}
                <div className="p-4 rounded-sm bg-graphite-950 border border-precision-cyan/30 text-xs font-mono text-steel-300 space-y-1.5">
                  <div className="text-precision-cyan font-bold uppercase tracking-wider">
                    [ CLIENT INTEGRATION NOTICE ]
                  </div>
                  <p className="text-steel-400 leading-relaxed">
                    To connect this form to V. Vidhya Industries, configure the production enquiry endpoint/email workflow before launch.
                  </p>
                </div>

                {/* Summary Readout Dossier */}
                <div className="space-y-3 font-mono text-xs pt-2">
                  <div className="text-steel-400 uppercase tracking-wider text-[11px] pb-1 border-b border-graphite-800">
                    CAPTURED SPECIFICATION READOUT
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="p-3 bg-graphite-950 rounded-sm border border-graphite-850">
                      <span className="text-steel-500 block text-[10px] uppercase">CONTACT PERSON</span>
                      <span className="text-white font-bold">{submittedData.fullName}</span>
                    </div>

                    <div className="p-3 bg-graphite-950 rounded-sm border border-graphite-850">
                      <span className="text-steel-500 block text-[10px] uppercase">ORGANISATION</span>
                      <span className="text-white">{submittedData.company || "—"}</span>
                    </div>

                    <div className="p-3 bg-graphite-950 rounded-sm border border-graphite-850">
                      <span className="text-steel-500 block text-[10px] uppercase">PHONE</span>
                      <span className="text-white">{submittedData.phone}</span>
                    </div>

                    <div className="p-3 bg-graphite-950 rounded-sm border border-graphite-850">
                      <span className="text-steel-500 block text-[10px] uppercase">EMAIL</span>
                      <span className="text-white">{submittedData.email}</span>
                    </div>

                    <div className="p-3 bg-graphite-950 rounded-sm border border-graphite-850">
                      <span className="text-steel-500 block text-[10px] uppercase">APPLICATION</span>
                      <span className="text-precision-cyan font-bold">{submittedData.application}</span>
                    </div>

                    <div className="p-3 bg-graphite-950 rounded-sm border border-graphite-850">
                      <span className="text-steel-500 block text-[10px] uppercase">PRODUCT FAMILY</span>
                      <span className="text-white">{submittedData.productFamily || "General / Not Specified"}</span>
                    </div>

                    <div className="p-3 bg-graphite-950 rounded-sm border border-graphite-850">
                      <span className="text-steel-500 block text-[10px] uppercase">REQUIREMENT TYPE</span>
                      <span className="text-white font-bold">{submittedData.requirement}</span>
                    </div>

                    <div className="p-3 bg-graphite-950 rounded-sm border border-graphite-850">
                      <span className="text-steel-500 block text-[10px] uppercase">EST. QUANTITY</span>
                      <span className="text-white">{submittedData.quantity || "—"}</span>
                    </div>
                  </div>

                  <div className="p-3.5 bg-graphite-950 rounded-sm border border-graphite-850 space-y-1">
                    <span className="text-steel-500 block text-[10px] uppercase">MESSAGE / DETAILS</span>
                    <p className="text-steel-200 font-sans text-xs leading-relaxed whitespace-pre-wrap">
                      {submittedData.message}
                    </p>
                  </div>

                  {submittedData.file && (
                    <div className="p-3 bg-graphite-950 rounded-sm border border-graphite-850 flex items-center gap-2 text-steel-300">
                      <Paperclip className="w-3.5 h-3.5 text-precision-cyan" />
                      <span className="truncate">{submittedData.file.name}</span>
                      <span className="text-steel-500 text-[10px]">
                        ({(submittedData.file.size / 1024).toFixed(1)} KB)
                      </span>
                    </div>
                  )}
                </div>

                {/* Reset Button */}
                <div className="pt-4 border-t border-graphite-800">
                  <Button
                    variant="outline"
                    size="md"
                    onClick={handleReset}
                    icon={<RotateCcw className="w-4 h-4" />}
                    className="w-full sm:w-auto"
                    aria-label="Start another enquiry"
                  >
                    START ANOTHER ENQUIRY
                  </Button>
                </div>
              </div>
            ) : (
              /* Active Engineering RFQ Form */
              <div
                ref={formCardRef}
                className="rounded-sm border border-steel-700/80 bg-graphite-900 shadow-2xl precision-corner overflow-hidden"
              >
                {/* Form Top Title Bar */}
                <div className="flex items-center justify-between px-6 py-3.5 border-b border-graphite-800 bg-graphite-950/80 font-mono text-xs text-steel-400">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-precision-cyan animate-pulse" />
                    <span className="text-white font-bold uppercase tracking-widest">
                      RFQ / 07 — SPECIFICATION FORM
                    </span>
                  </div>
                  <span className="text-steel-500 text-[10px] hidden sm:inline">
                    V. VIDHYA INDUSTRIES
                  </span>
                </div>

                <form onSubmit={handleSubmit} noValidate className="p-6 sm:p-8 space-y-8">
                  
                  {/* GROUP 01: CONTACT INFORMATION */}
                  <div className="space-y-4">
                    <div className="flex items-center gap-2 font-mono text-xs text-precision-cyan pb-2 border-b border-graphite-800">
                      <span className="font-bold">01 /</span>
                      <span className="text-steel-300 uppercase tracking-wider">CONTACT INFORMATION</span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Full Name */}
                      <div className="space-y-1.5">
                        <label
                          htmlFor="fullName"
                          className="block font-mono text-xs uppercase tracking-wider text-steel-300 font-medium"
                        >
                          Full Name <span className="text-precision-cyan">*</span>
                        </label>
                        <input
                          id="fullName"
                          name="fullName"
                          type="text"
                          autoComplete="name"
                          required
                          value={formData.fullName}
                          onChange={handleInputChange}
                          onBlur={handleBlur}
                          placeholder="e.g. R. Sundaram"
                          aria-required="true"
                          aria-invalid={!!errors.fullName}
                          aria-describedby={errors.fullName ? "fullName-error" : undefined}
                          className={`w-full min-h-[44px] bg-graphite-950 rounded-sm px-3.5 py-2.5 text-sm font-mono text-white placeholder:text-steel-600 border transition-colors focus:outline-none ${
                            errors.fullName && touched.fullName
                              ? "border-red-500/80 focus:border-red-400"
                              : "border-graphite-800 focus:border-precision-cyan"
                          }`}
                        />
                        {errors.fullName && touched.fullName && (
                          <div
                            id="fullName-error"
                            className="flex items-center gap-1.5 text-xs font-mono text-red-400 mt-1"
                            role="alert"
                          >
                            <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                            <span>{errors.fullName}</span>
                          </div>
                        )}
                      </div>

                      {/* Company / Organisation */}
                      <div className="space-y-1.5">
                        <label
                          htmlFor="company"
                          className="block font-mono text-xs uppercase tracking-wider text-steel-400 font-medium"
                        >
                          Company / Organisation (Optional)
                        </label>
                        <input
                          id="company"
                          name="company"
                          type="text"
                          autoComplete="organization"
                          value={formData.company}
                          onChange={handleInputChange}
                          placeholder="e.g. Precision Engineering Works"
                          className="w-full min-h-[44px] bg-graphite-950 rounded-sm px-3.5 py-2.5 text-sm font-mono text-white placeholder:text-steel-600 border border-graphite-800 focus:border-precision-cyan focus:outline-none transition-colors"
                        />
                      </div>

                      {/* Phone Number */}
                      <div className="space-y-1.5">
                        <label
                          htmlFor="phone"
                          className="block font-mono text-xs uppercase tracking-wider text-steel-300 font-medium"
                        >
                          Phone Number <span className="text-precision-cyan">*</span>
                        </label>
                        <input
                          id="phone"
                          name="phone"
                          type="tel"
                          autoComplete="tel"
                          required
                          value={formData.phone}
                          onChange={handleInputChange}
                          onBlur={handleBlur}
                          placeholder="+91 98765 43210"
                          aria-required="true"
                          aria-invalid={!!errors.phone}
                          aria-describedby={errors.phone ? "phone-error" : undefined}
                          className={`w-full min-h-[44px] bg-graphite-950 rounded-sm px-3.5 py-2.5 text-sm font-mono text-white placeholder:text-steel-600 border transition-colors focus:outline-none ${
                            errors.phone && touched.phone
                              ? "border-red-500/80 focus:border-red-400"
                              : "border-graphite-800 focus:border-precision-cyan"
                          }`}
                        />
                        {errors.phone && touched.phone && (
                          <div
                            id="phone-error"
                            className="flex items-center gap-1.5 text-xs font-mono text-red-400 mt-1"
                            role="alert"
                          >
                            <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                            <span>{errors.phone}</span>
                          </div>
                        )}
                      </div>

                      {/* Email Address */}
                      <div className="space-y-1.5">
                        <label
                          htmlFor="email"
                          className="block font-mono text-xs uppercase tracking-wider text-steel-300 font-medium"
                        >
                          Email Address <span className="text-precision-cyan">*</span>
                        </label>
                        <input
                          id="email"
                          name="email"
                          type="email"
                          autoComplete="email"
                          required
                          value={formData.email}
                          onChange={handleInputChange}
                          onBlur={handleBlur}
                          placeholder="name@domain.com"
                          aria-required="true"
                          aria-invalid={!!errors.email}
                          aria-describedby={errors.email ? "email-error" : undefined}
                          className={`w-full min-h-[44px] bg-graphite-950 rounded-sm px-3.5 py-2.5 text-sm font-mono text-white placeholder:text-steel-600 border transition-colors focus:outline-none ${
                            errors.email && touched.email
                              ? "border-red-500/80 focus:border-red-400"
                              : "border-graphite-800 focus:border-precision-cyan"
                          }`}
                        />
                        {errors.email && touched.email && (
                          <div
                            id="email-error"
                            className="flex items-center gap-1.5 text-xs font-mono text-red-400 mt-1"
                            role="alert"
                          >
                            <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                            <span>{errors.email}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* GROUP 02: APPLICATION ENVIRONMENT */}
                  <div className="space-y-4">
                    <div className="flex items-center gap-2 font-mono text-xs text-precision-cyan pb-2 border-b border-graphite-800">
                      <span className="font-bold">02 /</span>
                      <span className="text-steel-300 uppercase tracking-wider">APPLICATION ENVIRONMENT</span>
                    </div>

                    <div className="space-y-1.5">
                      <label
                        htmlFor="application"
                        className="block font-mono text-xs uppercase tracking-wider text-steel-300 font-medium"
                      >
                        Application <span className="text-precision-cyan">*</span>
                      </label>
                      <select
                        id="application"
                        name="application"
                        required
                        value={formData.application}
                        onChange={handleInputChange}
                        onBlur={handleBlur}
                        aria-required="true"
                        aria-invalid={!!errors.application}
                        aria-describedby={errors.application ? "application-error" : undefined}
                        className={`w-full min-h-[44px] bg-graphite-950 rounded-sm px-3.5 py-2.5 text-sm font-mono text-white border transition-colors focus:outline-none cursor-pointer ${
                          errors.application && touched.application
                            ? "border-red-500/80 focus:border-red-400"
                            : "border-graphite-800 focus:border-precision-cyan"
                        }`}
                      >
                        <option value="" disabled>
                          Select Application...
                        </option>
                        <option value="Domestic water applications">Domestic water applications</option>
                        <option value="Agricultural water applications">Agricultural water applications</option>
                        <option value="Open well water applications">Open well water applications</option>
                        <option value="Submersible water applications">Submersible water applications</option>
                        <option value="Domestic pressure boosting applications">Domestic pressure boosting applications</option>
                        <option value="General water-handling applications">General water-handling applications</option>
                        <option value="Not sure">Not sure</option>
                      </select>
                      {errors.application && touched.application && (
                        <div
                          id="application-error"
                          className="flex items-center gap-1.5 text-xs font-mono text-red-400 mt-1"
                          role="alert"
                        >
                          <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                          <span>{errors.application}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* GROUP 03: PRODUCT SYSTEM & QUANTITY */}
                  <div className="space-y-4">
                    <div className="flex items-center gap-2 font-mono text-xs text-precision-cyan pb-2 border-b border-graphite-800">
                      <span className="font-bold">03 /</span>
                      <span className="text-steel-300 uppercase tracking-wider">PRODUCT SYSTEM</span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      {/* Product Family */}
                      <div className="sm:col-span-2 space-y-1.5">
                        <label
                          htmlFor="productFamily"
                          className="block font-mono text-xs uppercase tracking-wider text-steel-400 font-medium"
                        >
                          Product Family (Optional)
                        </label>
                        <select
                          id="productFamily"
                          name="productFamily"
                          value={formData.productFamily}
                          onChange={handleInputChange}
                          className="w-full min-h-[44px] bg-graphite-950 rounded-sm px-3.5 py-2.5 text-sm font-mono text-white border border-graphite-800 focus:border-precision-cyan focus:outline-none transition-colors cursor-pointer"
                        >
                          <option value="">Select Product Family (if known)...</option>
                          <option value="Self Priming Pumps">Self Priming Pumps</option>
                          <option value="Centrifugal Monoblock Pumps">Centrifugal Monoblock Pumps</option>
                          <option value="Horizontal Open Well Pumps">Horizontal Open Well Pumps</option>
                          <option value="Domestic Pressure Boosting Systems">Domestic Pressure Boosting Systems</option>
                          <option value="Stainless Steel Submersible Pumpsets">Stainless Steel Submersible Pumpsets</option>
                          <option value="Not Sure">Not Sure</option>
                        </select>
                      </div>

                      {/* Estimated Quantity */}
                      <div className="space-y-1.5">
                        <label
                          htmlFor="quantity"
                          className="block font-mono text-xs uppercase tracking-wider text-steel-400 font-medium"
                        >
                          Quantity (Optional)
                        </label>
                        <input
                          id="quantity"
                          name="quantity"
                          type="text"
                          value={formData.quantity}
                          onChange={handleInputChange}
                          placeholder="e.g. 1"
                          className="w-full min-h-[44px] bg-graphite-950 rounded-sm px-3.5 py-2.5 text-sm font-mono text-white placeholder:text-steel-600 border border-graphite-800 focus:border-precision-cyan focus:outline-none transition-colors"
                        />
                      </div>
                    </div>
                  </div>

                  {/* GROUP 04: REQUIREMENT TYPE */}
                  <div className="space-y-4">
                    <div className="flex items-center gap-2 font-mono text-xs text-precision-cyan pb-2 border-b border-graphite-800">
                      <span className="font-bold">04 /</span>
                      <span className="text-steel-300 uppercase tracking-wider">REQUIREMENT</span>
                    </div>

                    <div className="space-y-1.5">
                      <label
                        htmlFor="requirement"
                        className="block font-mono text-xs uppercase tracking-wider text-steel-300 font-medium"
                      >
                        Requirement <span className="text-precision-cyan">*</span>
                      </label>
                      <select
                        id="requirement"
                        name="requirement"
                        required
                        value={formData.requirement}
                        onChange={handleInputChange}
                        onBlur={handleBlur}
                        aria-required="true"
                        aria-invalid={!!errors.requirement}
                        aria-describedby={errors.requirement ? "requirement-error" : undefined}
                        className={`w-full min-h-[44px] bg-graphite-950 rounded-sm px-3.5 py-2.5 text-sm font-mono text-white border transition-colors focus:outline-none cursor-pointer ${
                          errors.requirement && touched.requirement
                            ? "border-red-500/80 focus:border-red-400"
                            : "border-graphite-800 focus:border-precision-cyan"
                        }`}
                      >
                        <option value="" disabled>
                          Select Requirement...
                        </option>
                        <option value="New Installation">New Installation</option>
                        <option value="Replacement">Replacement</option>
                        <option value="Choosing a Pump">Choosing a Pump</option>
                        <option value="Pressure Boosting">Pressure Boosting</option>
                        <option value="General Enquiry">General Enquiry</option>
                      </select>
                      {errors.requirement && touched.requirement && (
                        <div
                          id="requirement-error"
                          className="flex items-center gap-1.5 text-xs font-mono text-red-400 mt-1"
                          role="alert"
                        >
                          <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                          <span>{errors.requirement}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* GROUP 05: MESSAGE / REQUIREMENT DETAILS */}
                  <div className="space-y-4">
                    <div className="flex items-center gap-2 font-mono text-xs text-precision-cyan pb-2 border-b border-graphite-800">
                      <span className="font-bold">05 /</span>
                      <span className="text-steel-300 uppercase tracking-wider">REQUIREMENT DETAILS</span>
                    </div>

                    <div className="space-y-1.5">
                      <label
                        htmlFor="message"
                        className="block font-mono text-xs uppercase tracking-wider text-steel-300 font-medium"
                      >
                        Message <span className="text-precision-cyan">*</span>
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        rows={4}
                        required
                        value={formData.message}
                        onChange={handleInputChange}
                        onBlur={handleBlur}
                        placeholder="Tell us about your application, installation or requirement."
                        aria-required="true"
                        aria-invalid={!!errors.message}
                        aria-describedby={errors.message ? "message-error" : undefined}
                        className={`w-full bg-graphite-950 rounded-sm px-3.5 py-2.5 text-sm font-mono text-white placeholder:text-steel-600 border transition-colors focus:outline-none resize-none leading-relaxed ${
                          errors.message && touched.message
                            ? "border-red-500/80 focus:border-red-400"
                            : "border-graphite-800 focus:border-precision-cyan"
                        }`}
                      />
                      {errors.message && touched.message && (
                        <div
                          id="message-error"
                          className="flex items-center gap-1.5 text-xs font-mono text-red-400 mt-1"
                          role="alert"
                        >
                          <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                          <span>{errors.message}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* GROUP 06: OPTIONAL FILE UPLOAD */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between font-mono text-xs text-steel-400 pb-2 border-b border-graphite-800">
                      <span className="text-steel-400 uppercase tracking-wider">
                        TECHNICAL DOCUMENT / REFERENCE (OPTIONAL)
                      </span>
                      <span className="text-steel-600 text-[10px]">PDF, JPG, JPEG, PNG</span>
                    </div>

                    <input
                      ref={fileInputRef}
                      type="file"
                      id="technicalDoc"
                      name="technicalDoc"
                      accept=".pdf,.jpg,.jpeg,.png"
                      onChange={handleFileChange}
                      className="sr-only"
                    />

                    {formData.file ? (
                      <div className="flex items-center justify-between p-3.5 rounded-sm bg-graphite-950 border border-precision-cyan/40 font-mono text-xs">
                        <div className="flex items-center gap-2.5 truncate">
                          <Paperclip className="w-4 h-4 text-precision-cyan shrink-0" />
                          <span className="text-white truncate">{formData.file.name}</span>
                          <span className="text-steel-500 text-[10px] shrink-0">
                            ({(formData.file.size / 1024).toFixed(1)} KB)
                          </span>
                        </div>
                        <button
                          type="button"
                          onClick={removeFile}
                          className="text-steel-500 hover:text-red-400 p-1 transition-colors"
                          aria-label="Remove attached document"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ) : (
                      <label
                        htmlFor="technicalDoc"
                        className="flex flex-col sm:flex-row items-center justify-center gap-3 p-4 rounded-sm border border-dashed border-graphite-800 bg-graphite-950/60 hover:border-precision-cyan/50 hover:bg-graphite-950 transition-all cursor-pointer text-center sm:text-left min-h-[56px]"
                      >
                        <UploadCloud className="w-5 h-5 text-steel-500" />
                        <div className="font-mono text-xs text-steel-400">
                          <span className="text-precision-cyan font-bold">Attach document</span> or drag & drop reference file
                          <span className="block sm:inline sm:ml-1 text-steel-600 text-[10px]">
                            (Demo mode — local capture)
                          </span>
                        </div>
                      </label>
                    )}
                  </div>

                  {/* Form Submission Controls */}
                  <div className="pt-4 border-t border-graphite-800 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
                    <span className="font-mono text-[11px] text-steel-500 text-center sm:text-left">
                      * All required fields must be completed.
                    </span>

                    <Button
                      type="submit"
                      variant="primary"
                      size="lg"
                      disabled={isSubmitting}
                      icon={<ArrowUpRight className="w-4 h-4" />}
                      className="justify-center min-h-[48px]"
                      aria-label="Submit quotation request"
                    >
                      {isSubmitting ? "PROCESSING ENQUIRY..." : "REQUEST A QUOTE →"}
                    </Button>
                  </div>
                </form>
              </div>
            )}
          </div>

        </div>

      </div>
    </section>
  );
};
