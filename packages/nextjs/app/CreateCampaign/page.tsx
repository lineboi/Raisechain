"use client";

import { useState } from "react";

interface CampaignForm {
  title: string;
  description: string;
  goal: number;
  deadline: number;
  beneficial: string;
}

export default function Campaign() {
  const [form, setForm] = useState<CampaignForm>({
    title: "",
    description: "",
    goal: 0,
    deadline: 0,
    beneficial: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;

    let newValue: string | number = value;

    if (type === "number") {
      newValue = value === "" ? 0 : Number(value);
    }

    setForm(
      prevForm =>
        ({
          ...prevForm,
          [name]: newValue,
        }) as any,
    );
  };

  const handleSubmit = () => {
    const submissionData = {
      ...form,
      goal: Number(form.goal),
      deadline: Number(form.deadline),
    };

    console.log("Submitting Campaign Data:", submissionData);
  };

  return (
    <main className="bg-gray-100 block min-h-screen flex justify-center py-12 px-4 md:px-8">
      <div className="w-full max-w-lg bg-white p-8 rounded-xl shadow-2xl space-y-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 border-b pb-3">Create New Campaign</h1>
        <div className="space-y-2">
          <label htmlFor="title" className="text-sm font-semibold text-gray-700 block">
            Title:
          </label>
          <input
            type="text"
            name="title"
            id="title"
            placeholder="Ex. Web3Mates Graduation Fund"
            value={form.title}
            onChange={handleInputChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition duration-150 placeholder-gray-400"
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="description" className="text-sm font-semibold text-gray-700 block">
            Description:
          </label>
          <textarea
            name="description"
            id="description"
            rows={4}
            placeholder="Briefly describe your campaign, goals, and beneficiaries."
            value={form.description}
            onChange={handleInputChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:focus:border-teal-500 transition duration-150 resize-none placeholder-gray-400"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label htmlFor="goal" className="text-sm font-semibold text-gray-700 block">
              Goal (ETH):
            </label>
            <input
              type="number"
              name="goal"
              id="goal"
              placeholder="e.g., 5.0"
              min="0.01"
              step="0.01"
              value={form.goal || ""}
              onChange={handleInputChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition duration-150 placeholder-gray-400"
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="deadline" className="text-sm font-semibold text-gray-700 block">
              Deadline (Days):
            </label>
            <input
              type="number"
              name="deadline"
              id="deadline"
              placeholder="e.g., 14 (days from now)"
              min="1"
              value={form.deadline || ""}
              onChange={handleInputChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition duration-150 placeholder-gray-400"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label htmlFor="beneficial" className="text-sm font-semibold text-gray-700 block">
            Beneficiary Wallet Addresses:
          </label>
          <input
            type="text"
            name="beneficial"
            id="beneficial"
            placeholder="0x... (Use commas for multiple addresses)"
            value={form.beneficial}
            onChange={handleInputChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition duration-150 placeholder-gray-400"
          />
        </div>

        <button
          className="w-full py-3 bg-teal-600 text-white font-bold rounded-lg shadow-md hover:bg-teal-700 transition duration-150 transform hover:scale-[1.01] focus:ring-4 focus:ring-teal-500/50"
          onClick={handleSubmit}
        >
          🚀 Create Campaign
        </button>
      </div>
    </main>
  );
}
