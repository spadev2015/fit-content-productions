import React, { useState, useEffect } from "react";
import { X, ArrowRight, CheckCircle } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import Button from "./Button";

type SubmitStatus = "idle" | "submitting" | "success" | "error";

interface PromoFormData {
  firstName: string;
  lastName: string;
  email: string;
  igProfile: string;
  phoneNumber: string;
}

const initialFormData: PromoFormData = {
  firstName: "",
  lastName: "",
  email: "",
  igProfile: "",
  phoneNumber: "",
};

export default function PromoModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState<PromoFormData>(initialFormData);
  const [status, setStatus] = useState<SubmitStatus>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => setIsOpen(true), 1500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!isOpen) return;

    const previousOverflow = document.body.style.overflow;
    const previousPaddingRight = document.body.style.paddingRight;
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;

    document.body.style.overflow = "hidden";
    if (scrollbarWidth > 0) {
      document.body.style.paddingRight = `${scrollbarWidth}px`;
    }

    return () => {
      document.body.style.overflow = previousOverflow;
      document.body.style.paddingRight = previousPaddingRight;
    };
  }, [isOpen]);

  function handleClose() {
    setIsOpen(false);
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("submitting");
    setErrorMessage("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          service: "Free Shooting Promo",
          message: "Submitted via free shooting promo popup.",
        }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.error || "Something went wrong");
      }

      setStatus("success");
      setFormData(initialFormData);
    } catch (err: unknown) {
      setStatus("error");
      setErrorMessage(err instanceof Error ? err.message : "Failed to submit. Please try again.");
    }
  }

  function handleBackdropClick(e: React.MouseEvent) {
    if (e.target === e.currentTarget) handleClose();
  }

  const inputClass =
    "w-full p-3 sm:p-3.5 rounded-2xl bg-neutral-950/50 border border-neutral-700 text-white text-sm sm:text-base placeholder:text-neutral-500 focus:outline-none focus:border-[var(--color-accent)] focus:ring-1 focus:ring-[var(--color-accent)]/50 transition-colors";

  const labelClass = "text-xs text-neutral-500 uppercase tracking-wider mb-1.5";

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-label="Free shooting promo"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={handleBackdropClick}
          className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/70 backdrop-blur-sm px-0 sm:px-6"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.2, delay: 0.05 }}
            className="relative bg-neutral-900 border border-neutral-800 rounded-t-3xl sm:rounded-3xl p-6 sm:p-12 max-w-md w-full max-h-[90dvh] overflow-y-auto shadow-[0_0_80px_rgba(185,28,28,0.15)]"
          >
            <button
              onClick={handleClose}
              aria-label="Close promotional offer"
              className="absolute top-4 right-4 text-neutral-500 hover:text-white transition-colors"
            >
              <X size={24} />
            </button>

            <p className="text-xs uppercase tracking-widest text-[var(--color-accent)] text-center mb-3 font-bold">
              Limited Offer
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-3 font-display text-center">
              Book a <span className="text-[var(--color-accent)]">Free</span> Shooting
            </h2>
            <p className="text-sm sm:text-base text-neutral-400 mb-4 sm:mb-6 text-center">
              Limited spots available. Claim your complimentary session and see what professional fitness content can do for your brand.
            </p>

            {status === "success" ? (
              <div className="flex items-center gap-3 p-6 rounded-2xl bg-green-950/50 border border-green-800">
                <CheckCircle className="text-green-400 shrink-0" size={24} />
                <div>
                  <p className="text-green-400 font-bold">You're Booked!</p>
                  <p className="text-neutral-400 text-sm mt-1">I'll reach out within 24 hours to schedule your free session.</p>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
                <div>
                  <p className={labelClass}>Name</p>
                  <div className="grid grid-cols-2 gap-3">
                    <input
                      type="text"
                      name="firstName"
                      placeholder="First Name"
                      required
                      value={formData.firstName}
                      onChange={handleChange}
                      className={inputClass}
                    />
                    <input
                      type="text"
                      name="lastName"
                      placeholder="Last Name"
                      value={formData.lastName}
                      onChange={handleChange}
                      className={inputClass}
                    />
                  </div>
                </div>
                <div>
                  <p className={labelClass}>Email</p>
                  <input
                    type="email"
                    name="email"
                    placeholder="Email Address"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className={inputClass}
                  />
                </div>
                <div>
                  <p className={labelClass}>Phone</p>
                  <input
                    type="tel"
                    name="phoneNumber"
                    placeholder="Phone Number"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                    className={inputClass}
                  />
                </div>
                <div>
                  <p className={labelClass}>Instagram</p>
                  <input
                    type="text"
                    name="igProfile"
                    placeholder="Instagram Handle"
                    value={formData.igProfile}
                    onChange={handleChange}
                    className={inputClass}
                  />
                </div>

                {status === "error" && (
                  <p className="text-red-400 text-sm">{errorMessage}</p>
                )}

                <Button type="submit" variant="primary" disabled={status === "submitting"} className="w-full flex items-center justify-center gap-2 py-4 text-lg font-bold mt-2 shadow-[0_0_20px_rgba(185,28,28,0.3)]">
                  {status === "submitting" ? "Submitting..." : "Claim Your Free Session"} <ArrowRight size={20} />
                </Button>
              </form>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
