"use client";

import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Modal } from "@/components/ui/modal";
import { Tabs, TabPanel } from "@/components/ui/tabs";
import { CheckCircle, X, Shield, Zap, Crown, Star, Mail, Send } from "lucide-react";

const tiers = [
  {
    name: "Trial",
    tagline: "Try VEDIK risk-free",
    halfYearly: "Free (14d)",
    yearly: "—",
    lifetime: "—",
    modules: 8,
    students: "50",
    icon: <Shield className="h-6 w-6" />,
    color: "bg-gray-500",
    features: ["Dashboard", "Students", "Teachers", "Attendance", "Fees", "Staff", "Academics", "Settings"],
  },
  {
    name: "Lite",
    tagline: "For small schools",
    halfYearly: "₹2,999",
    yearly: "₹4,999",
    lifetime: "₹19,999",
    modules: 11,
    students: "200",
    icon: <Shield className="h-6 w-6" />,
    color: "bg-green-600",
    features: ["Everything in Trial", "Exams", "Homework", "Reports", "Users", "License"],
  },
  {
    name: "Essential",
    tagline: "For growing schools",
    halfYearly: "₹7,999",
    yearly: "₹12,999",
    lifetime: "₹49,999",
    modules: 13,
    students: "1,000",
    icon: <Zap className="h-6 w-6" />,
    color: "bg-blue-600",
    features: ["Everything in Lite", "Communication", "Certificates", "Leave", "Timetable"],
  },
  {
    name: "Pro",
    tagline: "Most popular choice",
    halfYearly: "₹14,999",
    yearly: "₹24,999",
    lifetime: "₹99,999",
    modules: 18,
    students: "5,000",
    icon: <Star className="h-6 w-6" />,
    color: "bg-purple-600",
    features: ["Everything in Essential", "Finance", "Library", "Transport", "Marks", "Sections", "Subjects"],
  },
  {
    name: "Enterprise",
    tagline: "For large institutions",
    halfYearly: "₹29,999",
    yearly: "₹49,999",
    lifetime: "₹199,999",
    modules: 18,
    students: "Unlimited",
    icon: <Crown className="h-6 w-6" />,
    color: "bg-gradient-to-r from-amber-500 to-orange-600",
    features: ["Everything in Pro", "Hostel", "Inventory", "Multi-School", "Priority Support", "Custom Branding"],
  },
];

const moduleMatrix = [
  { module: "Dashboard, Students, Teachers", trial: true, lite: true, essential: true, pro: true, enterprise: true },
  { module: "Attendance, Fees, Staff, Academics", trial: true, lite: true, essential: true, pro: true, enterprise: true },
  { module: "Exams, Homework, Reports", trial: false, lite: true, essential: true, pro: true, enterprise: true },
  { module: "Communication, Certificates", trial: false, lite: false, essential: true, pro: true, enterprise: true },
  { module: "Finance, Library, Transport", trial: false, lite: false, essential: false, pro: true, enterprise: true },
  { module: "Hostel, Inventory", trial: false, lite: false, essential: false, pro: false, enterprise: true },
];

const builtInFeatures = [
  { feature: "Glassmorphism UI", description: "Apple-inspired frosted glass design with CSS custom properties" },
  { feature: "Dark / Light / System", description: "Theme auto-detection with manual override" },
  { feature: "Fee Receipts", description: "Print, download, WhatsApp sharing with school branding" },
  { feature: "Payslips", description: "Full salary breakdown with print/download/WhatsApp" },
  { feature: "Certificate Generation", description: "9 types: Bonafide, Study, Character, Transfer, ID Cards..." },
  { feature: "Reports Export", description: "PDF, Excel, CSV for all report types" },
  { feature: "Smart Homework", description: "Auto-filtered teacher selection by subject+class+section" },
  { feature: "Pay-First Admissions", description: "Students enrolled only after fee payment" },
  { feature: "Promotion Tracking", description: "Skip-class support with full history audit trail" },
  { feature: "Role-Based Access", description: "10+ roles: Super Admin, Principal, Teacher, Accountant..." },
  { feature: "Multi-School Ready", description: "Every table scoped by school for future multi-tenancy" },
  { feature: "One-Click Launch", description: "Windows batch files — install, sync, run, open browser" },
];

export default function LicensePage() {
  const [activeTab, setActiveTab] = useState("plans");
  const [billingPeriod, setBillingPeriod] = useState<"halfYearly" | "yearly" | "lifetime">("yearly");
  const [showContactModal, setShowContactModal] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState("");
  const [contactForm, setContactForm] = useState({ name: "", school: "", email: "", phone: "", message: "" });

  const CONTACT_EMAIL = "digi.tracks@outlook.com";

  const openEmailClient = (plan: string, name: string, school: string, email: string, phone: string, message: string) => {
    const subject = encodeURIComponent(`VEDIK School ERP - ${plan} Plan Inquiry`);
    const body = encodeURIComponent(
      `Hi VEDIK Team,\n\n` +
      `I'm interested in the ${plan} plan.\n\n` +
      (name ? `Name: ${name}\n` : "") +
      (school ? `School: ${school}\n` : "") +
      (email ? `Email: ${email}\n` : "") +
      (phone ? `Phone: ${phone}\n` : "") +
      (message ? `\nMessage: ${message}\n` : "") +
      `\nPlease share the pricing details and next steps.\n\n` +
      `Thank you.`
    );
    window.open(`mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`, "_blank");
  };

  const handleChoosePlan = (planName: string) => {
    setSelectedPlan(planName);
    setContactForm({
      name: "", school: "", email: "", phone: "",
      message: `I'm interested in the ${planName} plan. Please share pricing details and next steps.`
    });
    setShowContactModal(true);
  };

  const handleSubmitContact = (e: React.FormEvent) => {
    e.preventDefault();
    openEmailClient(selectedPlan, contactForm.name, contactForm.school, contactForm.email, contactForm.phone, contactForm.message);
    setShowContactModal(false);
    setContactForm({ name: "", school: "", email: "", phone: "", message: "" });
  };

  const tabs = [
    { id: "plans", label: "Plans & Pricing" },
    { id: "modules", label: "Module Matrix" },
    { id: "features", label: "Built-in Features" },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">License Manager</h1>
          <p className="text-gray-500 dark:text-gray-400">VEDIK uses a modular licensing system. Schools activate only what they need.</p>
        </div>
      </div>

      {/* Current Plan Banner */}
      <Card className="border-blue-200 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20">
        <CardContent className="p-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-600 text-white">
                <Star className="h-7 w-7" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">Current Plan: Pro</h2>
                <p className="text-gray-600 dark:text-gray-400">Valid until 31 March 2027 | 5,000 students | 18 modules</p>
              </div>
            </div>
            <div className="flex gap-2">
              <Badge variant="success">Active</Badge>
              <Button variant="outline" size="sm">Upgrade Plan</Button>
            </div>
          </div>
          <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
            {[
              { label: "Students Used", value: "430 / 5,000" },
              { label: "Modules Active", value: "18 / 18" },
              { label: "Storage Used", value: "2.4 GB / 10 GB" },
              { label: "Days Remaining", value: "248 days" },
            ].map((stat) => (
              <div key={stat.label} className="rounded-xl bg-white/60 p-3 text-center dark:bg-gray-800/60">
                <p className="text-sm text-gray-500">{stat.label}</p>
                <p className="font-semibold text-gray-900 dark:text-white">{stat.value}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Tabs tabs={tabs} activeTab={activeTab} onTabChange={setActiveTab}>
        {/* ===== PLANS TAB ===== */}
        <TabPanel active={activeTab} id="plans">
          {/* Billing Period Toggle */}
          <div className="mb-6 flex items-center justify-center gap-2">
            <span className="text-sm text-gray-500">Billing:</span>
            {(["halfYearly", "yearly", "lifetime"] as const).map((period) => (
              <button
                key={period}
                onClick={() => setBillingPeriod(period)}
                className={`rounded-lg px-4 py-2 text-sm font-medium transition-all ${
                  billingPeriod === period
                    ? "bg-blue-600 text-white shadow-md"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700"
                }`}
              >
                {period === "halfYearly" ? "Half-Yearly" : period === "yearly" ? "Yearly" : "Lifetime"}
              </button>
            ))}
          </div>

          {/* Tier Cards */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {tiers.map((tier) => (
              <Card key={tier.name} className={`relative hover:shadow-lg transition-all ${
                tier.name === "Pro" ? "border-2 border-purple-500 ring-2 ring-purple-200 dark:ring-purple-800" : ""
              }`}>
                {tier.name === "Pro" && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-purple-600 px-3 py-1 text-xs font-bold text-white shadow-md">
                    MOST POPULAR
                  </div>
                )}
                <CardContent className="p-5">
                  <div className={`mb-3 inline-flex rounded-xl p-2.5 text-white ${tier.color}`}>
                    {tier.icon}
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white">{tier.name}</h3>
                  <p className="text-xs text-gray-500">{tier.tagline}</p>

                  <div className="mt-4">
                    <span className="text-2xl font-bold text-gray-900 dark:text-white">
                      {tier[billingPeriod]}
                    </span>
                  </div>

                  <div className="mt-3 flex gap-2 text-xs text-gray-500">
                    <span>{tier.modules} modules</span>
                    <span>|</span>
                    <span>{tier.students} students</span>
                  </div>

                  <ul className="mt-4 space-y-2">
                    {tier.features.map((f) => (
                      <li key={f} className="flex items-start gap-1.5 text-xs">
                        <CheckCircle className="mt-0.5 h-3.5 w-3.5 flex-shrink-0 text-green-500" />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>

                  <Button
                    variant={tier.name === "Pro" ? "default" : "outline"}
                    className={`mt-4 w-full ${tier.name === "Enterprise" ? "bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white border-0" : ""}`}
                    onClick={() => handleChoosePlan(tier.name)}
                  >
                    {tier.name === "Trial" ? "Try Free" : tier.name === "Pro" ? "Choose Pro" : "Choose Plan"}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabPanel>

        {/* ===== MODULE MATRIX TAB ===== */}
        <TabPanel active={activeTab} id="modules">
          <Card>
            <CardContent className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b-2 border-gray-200 dark:border-gray-700">
                    <th className="p-4 text-left font-semibold">Module</th>
                    {tiers.map((t) => (
                      <th key={t.name} className={`p-4 text-center font-semibold ${t.name === "Pro" ? "text-purple-600" : ""}`}>
                        {t.name}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {moduleMatrix.map((row, i) => (
                    <tr key={i} className="border-b border-gray-100 dark:border-gray-800">
                      <td className="p-4 font-medium">{row.module}</td>
                      {[row.trial, row.lite, row.essential, row.pro, row.enterprise].map((included, j) => (
                        <td key={j} className="p-4 text-center">
                          {included ? (
                            <CheckCircle className="mx-auto h-5 w-5 text-green-500" />
                          ) : (
                            <X className="mx-auto h-5 w-5 text-gray-300 dark:text-gray-600" />
                          )}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </CardContent>
          </Card>
        </TabPanel>

        {/* ===== BUILT-IN FEATURES TAB ===== */}
        <TabPanel active={activeTab} id="features">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {builtInFeatures.map((f) => (
              <Card key={f.feature} className="hover:shadow-md transition-shadow">
                <CardContent className="p-5">
                  <div className="flex items-start gap-3">
                    <div className="mt-0.5 flex h-8 w-8 items-center justify-center rounded-lg bg-blue-100 dark:bg-blue-900/30">
                      <CheckCircle className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-white">{f.feature}</h3>
                      <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">{f.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabPanel>
      </Tabs>

      {/* Contact Us Section */}
      <Card className="border-blue-200 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20">
        <CardContent className="p-8 text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-600 text-white">
            <Mail className="h-7 w-7" />
          </div>
          <h3 className="text-xl font-bold text-gray-900 dark:text-white">Need Help Choosing?</h3>
          <p className="mt-2 text-gray-500 dark:text-gray-400">Contact us for a personalized demo, custom pricing, or any questions about VEDIK School ERP.</p>
          <div className="mt-4 flex items-center justify-center gap-2 text-blue-600 font-semibold">
            <Mail className="h-5 w-5" />
            <a href="mailto:digi.tracks@outlook.com" className="hover:underline">digi.tracks@outlook.com</a>
          </div>
          <Button className="mt-6" onClick={() => handleChoosePlan("Custom")}>
            <Send className="h-4 w-4 mr-2" /> Contact Sales
          </Button>
        </CardContent>
      </Card>

      {/* ===== CONTACT FORM MODAL ===== */}
      <Modal open={showContactModal} onClose={() => setShowContactModal(false)} title={`Get ${selectedPlan} Plan`}>
          <form onSubmit={handleSubmitContact} className="space-y-4">
            <div className="rounded-xl bg-blue-50 p-4 dark:bg-blue-900/20">
              <p className="text-sm text-blue-800 dark:text-blue-300">
                <strong>Selected Plan:</strong> {selectedPlan} ({billingPeriod === "halfYearly" ? "Half-Yearly" : billingPeriod === "yearly" ? "Yearly" : "Lifetime"})
              </p>
              <p className="mt-1 text-xs text-blue-600 dark:text-blue-400">
                Email will be sent to: <strong>{CONTACT_EMAIL}</strong>
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="mb-1 block text-sm font-medium">Your Name *</label>
                <input
                  required
                  className="w-full rounded-lg border border-gray-300 p-2.5 text-sm dark:border-gray-600 dark:bg-gray-800 dark:text-white"
                  placeholder="Full name"
                  value={contactForm.name}
                  onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium">School Name *</label>
                <input
                  required
                  className="w-full rounded-lg border border-gray-300 p-2.5 text-sm dark:border-gray-600 dark:bg-gray-800 dark:text-white"
                  placeholder="School name"
                  value={contactForm.school}
                  onChange={(e) => setContactForm({ ...contactForm, school: e.target.value })}
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="mb-1 block text-sm font-medium">Email *</label>
                <input
                  required
                  type="email"
                  className="w-full rounded-lg border border-gray-300 p-2.5 text-sm dark:border-gray-600 dark:bg-gray-800 dark:text-white"
                  placeholder="your@email.com"
                  value={contactForm.email}
                  onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium">Phone</label>
                <input
                  className="w-full rounded-lg border border-gray-300 p-2.5 text-sm dark:border-gray-600 dark:bg-gray-800 dark:text-white"
                  placeholder="+91 98765 43210"
                  value={contactForm.phone}
                  onChange={(e) => setContactForm({ ...contactForm, phone: e.target.value })}
                />
              </div>
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium">Message</label>
              <textarea
                className="w-full rounded-lg border border-gray-300 p-2.5 text-sm dark:border-gray-600 dark:bg-gray-800 dark:text-white"
                rows={4}
                placeholder="Tell us about your requirements..."
                value={contactForm.message}
                onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
              />
            </div>
            <div className="rounded-lg bg-gray-50 p-3 text-xs text-gray-500 dark:bg-gray-800 dark:text-gray-400">
              <Mail className="inline h-3.5 w-3.5 mr-1" />
              Clicking &quot;Send&quot; will open your email app with a pre-filled message to <strong>{CONTACT_EMAIL}</strong>
            </div>
            <div className="flex justify-end gap-2 pt-1">
              <Button variant="outline" type="button" onClick={() => setShowContactModal(false)}>Cancel</Button>
              <Button type="submit"><Send className="h-4 w-4 mr-1" /> Open Email</Button>
            </div>
          </form>
      </Modal>
    </div>
  );
}
