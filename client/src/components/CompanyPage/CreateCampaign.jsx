import { useState } from "react";
import axios from "axios";

export default function CreateCampaign() {
  const [form, setForm] = useState({
    title: "",
    description: "",
    platforms: [],
    budget: "",
    targetAudience: "",
    deadline: "",
    status: "active",
  });
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handlePlatformChange = (e) => {
    const selected = Array.from(e.target.selectedOptions, (option) => option.value);
    setForm({ ...form, platforms: selected });
  };

  const handleFileChange = (e) => {
    setForm({ ...form, brandFiles: Array.from(e.target.files) });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const data = new FormData();
    Object.entries(form).forEach(([key, value]) => {
      if (key === "brandFiles") {
        value.forEach((file) => data.append("brandFiles", file));
      } else if (key === "platforms") {
        value.forEach((p) => data.append("platforms", p));
      } else {
        data.append(key, value);
      }
    });

    try {
      await axios.post("http://localhost:3000/api/campaigns", data, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setSuccess(true);
      setForm({
        title: "",
        description: "",
        platforms: [],
        budget: "",
        targetAudience: "",
        deadline: "",
        status: "active",
      });
    } catch (err) {
      alert("Error creating campaign");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto mt-10 p-8 bg-gray-800 rounded-2xl shadow-md border border-gray-700 text-black">
      <h2 className="text-3xl font-bold mb-6 text-blue-400 text-black">Create Campaign</h2>

      {success && (
        <div className="mb-4 p-3 bg-green-700 text-white rounded-lg font-medium">
          ✅ Campaign created successfully!
        </div>
      )}

      <form className="space-y-6" onSubmit={handleSubmit}>
        <div>
          <label className="block mb-1 font-medium text-black">Title</label>
          <input
            className="w-full p-2 rounded border border-gray-500 bg-gray-900 text-black"
            name="title"
            value={form.title}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label className="block mb-1 font-medium text-black">Description</label>
          <textarea
            className="w-full p-2 rounded border border-gray-500 bg-gray-900 text-black"
            name="description"
            value={form.description}
            onChange={handleChange}
            rows="3"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium text-black">Platforms</label>
          <select
            className="w-full p-2 rounded border border-gray-500 bg-gray-900 text-black"
            name="platforms"
            multiple
            value={form.platforms}
            onChange={handlePlatformChange}
          >
            <option value="Instagram">Instagram</option>
            <option value="TikTok">TikTok</option>
            <option value="YouTube">YouTube</option>
          </select>
          <p className="text-sm text-gray-400 mt-1 text-black">Hold Ctrl/Cmd to select multiple platforms.</p>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block mb-1 font-medium text-black">Budget ($)</label>
            <input
              className="w-full p-2 rounded border border-gray-500 bg-gray-900 text-black"
              type="number"
              name="budget"
              value={form.budget}
              onChange={handleChange}
            />
          </div>
          <div>
            <label className="block mb-1 font-medium text-black">Deadline</label>
            <input
              className="w-full p-2 rounded border border-gray-500 bg-gray-900 text-black"
              type="date"
              name="deadline"
              value={form.deadline}
              onChange={handleChange}
            />
          </div>
        </div>

        <div>
          <label className="block mb-1 font-medium text-black">Target Audience</label>
          <input
            className="w-full p-2 rounded border border-gray-500 bg-gray-900 text-black"
            name="targetAudience"
            value={form.targetAudience}
            onChange={handleChange}
          />
        </div>

        <div>
          <label className="block mb-1 font-medium text-black">Campaign Status</label>
          <select
            className="w-full p-2 rounded border border-gray-500 bg-gray-900 text-black"
            name="status"
            value={form.status}
            onChange={handleChange}
          >
            <option value="active">Active (Visible to influencers)</option>
            <option value="draft">Draft (Not visible to influencers)</option>
          </select>
          <p className="text-sm text-gray-400 mt-1 text-black">
            Active campaigns will be visible to influencers. Draft campaigns are saved but not published.
          </p>
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`w-full py-2 px-6 rounded-lg font-semibold transition ${
            loading
              ? "bg-gray-500 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700 text-black"
          }`}
        >
          {loading ? "Creating..." : "Create Campaign"}
        </button>
      </form>
    </div>
  );
}
