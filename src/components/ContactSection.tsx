"use client";

import { useState } from "react";

export function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus("idle");

    try {
      const response = await fetch("/api/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const responseData = await response.json();

      if (response.ok) {
        setSubmitStatus("success");
        setFormData({ name: "", email: "", subject: "", message: "" });
      } else {
        console.error("API Error:", responseData.error);
        setSubmitStatus("error");
      }
    } catch (error) {
      console.error("Fetch Error:", error);
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="flex flex-col gap-8 text-sm text-slate-200 md:flex-row">
      <form onSubmit={handleSubmit} className="flex-1 space-y-4">
        <div className="grid gap-4 md:grid-cols-2">
          {[
            { id: "name", label: "Name", type: "text", placeholder: "Your name" },
            { id: "email", label: "Email", type: "email", placeholder: "your.email@example.com" },
          ].map((field) => (
            <div key={field.id}>
              <label className="text-xs font-medium text-slate-400" htmlFor={field.id}>
                {field.label}
              </label>
              <input
                id={field.id}
                name={field.id}
                type={field.type}
                required
                value={formData[field.id as keyof typeof formData]}
                onChange={handleChange}
                placeholder={field.placeholder}
                className="mt-2 w-full rounded-lg border border-white/10 bg-slate-900/60 px-4 py-2.5 text-sm text-white placeholder:text-slate-500 focus:border-purple-500/50 focus:outline-none transition-colors"
              />
            </div>
          ))}
        </div>
        <div>
          <label className="text-xs font-medium text-slate-400" htmlFor="subject">
            Subject
          </label>
          <input
            id="subject"
            name="subject"
            type="text"
            required
            value={formData.subject}
            onChange={handleChange}
            placeholder="What is this about?"
            className="mt-2 w-full rounded-lg border border-white/10 bg-slate-900/60 px-4 py-2.5 text-sm text-white placeholder:text-slate-500 focus:border-purple-500/50 focus:outline-none transition-colors"
          />
        </div>
        <div>
          <label className="text-xs font-medium text-slate-400" htmlFor="message">
            Message
          </label>
          <textarea
            id="message"
            name="message"
            rows={5}
            required
            value={formData.message}
            onChange={handleChange}
            placeholder="Tell me about your project or just say hello!"
            className="mt-2 w-full rounded-lg border border-white/10 bg-slate-900/60 px-4 py-2.5 text-sm text-white placeholder:text-slate-500 focus:border-purple-500/50 focus:outline-none transition-colors"
          />
        </div>
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full rounded-lg bg-purple-500/20 border border-purple-500/30 px-6 py-2.5 text-sm font-medium text-purple-300 transition-all hover:bg-purple-500/30 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isSubmitting ? "Sending..." : "Send Message"}
        </button>
        {submitStatus === "success" && (
          <p className="text-sm text-emerald-400">Message sent successfully.</p>
        )}
        {submitStatus === "error" && (
          <p className="text-sm text-rose-400">Failed to send message. Please try again.</p>
        )}
      </form>
      <div className="flex-1 space-y-4 rounded-2xl border border-white/5 bg-slate-900/60 p-6 text-sm text-slate-200">
        <p className="text-xs font-medium text-slate-500">Contact Information</p>
        <div className="flex items-center gap-3 rounded-xl border border-white/5 p-4">
          <div className="rounded-lg bg-slate-900/60 px-3 py-1.5 text-xs font-medium text-slate-400">
            Email
          </div>
          <a href="mailto:ryan@rjb.rip" className="text-sm font-medium text-white">
            ryan@rjb.rip
          </a>
        </div>
        <div className="flex items-center gap-3 rounded-xl border border-white/5 p-4">
          <div className="rounded-lg bg-slate-900/60 px-3 py-1.5 text-xs font-medium text-slate-400">
            Location
          </div>
          <p className="text-sm font-medium text-white">Tampa, FL</p>
        </div>
        <div className="rounded-xl border border-white/5 bg-slate-900/60 p-4 text-sm text-slate-300">
          <p className="text-xs font-medium text-slate-500 mb-3">Connect</p>
          <div className="flex gap-3">
            <a
              href="https://github.com/ryanburkii"
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-center text-sm font-medium text-slate-300 transition-all hover:border-purple-500/30 hover:bg-purple-500/10 hover:text-purple-300"
            >
              GitHub
            </a>
            <a
              href="https://www.linkedin.com/in/ryan-berke-b093152a7/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-center text-sm font-medium text-slate-300 transition-all hover:border-purple-500/30 hover:bg-purple-500/10 hover:text-purple-300"
            >
              LinkedIn
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
