import React, { useState } from "react";
import Button from "./Button";
import { ArrowRight, CheckCircle } from "lucide-react";
import athleteLaughing from "../assets/images/athlete-laughing-gym-hoodie-portrait.jpg";

type SubmitStatus = "idle" | "submitting" | "success" | "error";

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  igProfile: string;
  phoneNumber: string;
  service: string;
  message: string;
}

const initialFormData: FormData = {
  firstName: "",
  lastName: "",
  email: "",
  igProfile: "",
  phoneNumber: "",
  service: "",
  message: "",
};

export default function Contact() {
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [status, setStatus] = useState<SubmitStatus>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) {
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
        body: JSON.stringify(formData),
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

  const inputClass =
    "w-full p-4 rounded-2xl bg-neutral-950 border border-neutral-800 text-white placeholder:text-neutral-500 focus:outline-none focus:border-accent transition-colors";

  return (
    <section id="contact" className="py-24 px-6 max-w-7xl mx-auto">
      <div className="bg-neutral-900 border border-neutral-800 rounded-[3rem] p-8 lg:p-16 grid lg:grid-cols-2 gap-12 items-center relative overflow-hidden">
        <div className="relative z-10">
          <h2 className="text-4xl lg:text-6xl font-bold text-white mb-6 leading-tight">Book a Shoot</h2>
          <p className="text-neutral-400 text-lg mb-8 max-w-md">
            Ready to elevate your fitness brand? Fill out the form below and I'll get back to you within 24 hours to discuss your project.
          </p>
          <p className="text-neutral-500 text-sm mb-8 max-w-md -mt-4">
            Pricing will be discussed on the intro call, based on your needs.
          </p>

          {status === "success" ? (
            <div className="flex items-center gap-3 p-6 rounded-2xl bg-green-950/50 border border-green-800 max-w-md">
              <CheckCircle className="text-green-400 shrink-0" size={24} />
              <div>
                <p className="text-green-400 font-bold">Request Submitted!</p>
                <p className="text-neutral-400 text-sm mt-1">I'll be in touch within 24 hours.</p>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 max-w-md">
              <input
                type="text"
                name="firstName"
                placeholder="Full Name"
                required
                value={formData.firstName}
                onChange={handleChange}
                className={inputClass}
              />
              <input
                type="email"
                name="email"
                placeholder="Email Address"
                required
                value={formData.email}
                onChange={handleChange}
                className={inputClass}
              />
              <input
                type="text"
                name="igProfile"
                placeholder="Instagram Handle"
                value={formData.igProfile}
                onChange={handleChange}
                className={inputClass}
              />
              <input
                type="tel"
                name="phoneNumber"
                placeholder="Phone Number"
                value={formData.phoneNumber}
                onChange={handleChange}
                className={inputClass}
              />
              <select
                name="service"
                required
                value={formData.service}
                onChange={handleChange}
                className={`${inputClass} ${formData.service === "" ? "text-neutral-500" : ""} appearance-none`}
              >
                <option value="" disabled>Select Service</option>
                <option value="Video Production">Video Production</option>
                <option value="Custom Video Editing">Custom Video Editing</option>
                <option value="Social Content Creation">Social Content Creation</option>
                <option value="AI Thumbnail & Cover Design">AI Thumbnail & Cover Design</option>
                <option value="Fitness Media Shoots">Fitness Media Shoots</option>
                <option value="Content Strategy">Content Strategy</option>
                <option value="Other">Other</option>
              </select>
              <textarea
                name="message"
                placeholder="Tell me about your brand and goals..."
                value={formData.message}
                onChange={handleChange}
                className={`${inputClass} h-32 resize-none`}
              />

              {status === "error" && (
                <p className="text-red-400 text-sm">{errorMessage}</p>
              )}

              <Button type="submit" variant="primary" disabled={status === "submitting"} className="w-full flex items-center justify-center gap-2 py-4 text-lg mt-2">
                {status === "submitting" ? "Submitting..." : "Submit Request"} <ArrowRight size={20} />
              </Button>
            </form>
          )}
        </div>

        <div className="relative z-10 hidden lg:flex items-center justify-center">
          <div className="relative w-3/4">
            <img src={athleteLaughing} alt="Athlete laughing in gym hoodie" className="rounded-3xl w-full shadow-2xl" />
            <div className="absolute inset-0 rounded-3xl ring-1 ring-inset ring-white/10"></div>
          </div>
        </div>

        {/* Decorative elements */}
        <div className="absolute top-1/2 right-0 -translate-y-1/2 w-[600px] h-[600px] bg-accent/10 rounded-full blur-[100px] pointer-events-none"></div>
      </div>
    </section>
  );
}
