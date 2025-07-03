import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

export default function EditCampaign() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    title: "",
    description: "",
    platforms: [],
    budget: "",
    targetAudience: "",
    deadline: "",
  });

  useEffect(() => {
    const fetchCampaign = async () => {
      const res = await axios.get(`http://localhost:5000/api/campaigns/${id}`);
      setForm(res.data);
    };
    fetchCampaign();
  }, [id]);

  const handleChange = e => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:5000/api/campaigns/${id}`, form);
      alert("Campaign updated!");
      navigate(`/campaigns/${id}`);
    } catch (err) {
      alert("Update failed.");
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-white p-8 rounded shadow space-y-6">
      <h2 className="text-xl font-bold">Edit Campaign</h2>
      <form className="space-y-4" onSubmit={handleSubmit}>
        <div>
          <label className="block font-semibold">Title</label>
          <input className="input input-bordered w-full" name="title" value={form.title} onChange={handleChange} required />
        </div>
        <div>
          <label className="block font-semibold">Description</label>
          <textarea className="input input-bordered w-full" name="description" value={form.description} onChange={handleChange} />
        </div>
        <div>
          <label className="block font-semibold">Platforms (comma separated)</label>
          <input className="input input-bordered w-full" name="platforms" value={form.platforms} onChange={e => setForm({ ...form, platforms: e.target.value.split(",") })} />
        </div>
        <div>
          <label className="block font-semibold">Budget</label>
          <input className="input input-bordered w-full" name="budget" value={form.budget} onChange={handleChange} type="number" />
        </div>
        <div>
          <label className="block font-semibold">Target Audience</label>
          <input className="input input-bordered w-full" name="targetAudience" value={form.targetAudience} onChange={handleChange} />
        </div>
        <div>
          <label className="block font-semibold">Deadline</label>
          <input type="date" className="input input-bordered w-full" name="deadline" value={form.deadline?.split("T")[0]} onChange={handleChange} />
        </div>
        <button className="btn btn-primary bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700">Update Campaign</button>
      </form>
    </div>
  );
}
