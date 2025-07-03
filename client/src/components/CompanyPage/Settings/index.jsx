export default function Settings() {
  return (
    <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow space-y-6">
      <h2 className="text-2xl font-bold mb-4">Settings</h2>
      <form className="space-y-4">
        <div>
          <label className="block font-semibold">Change Password</label>
          <input className="input input-bordered w-full" type="password" placeholder="New password" />
        </div>
        <div>
          <label className="block font-semibold">Notification Preferences</label>
          <select className="input input-bordered w-full">
            <option>Email</option>
            <option>SMS</option>
            <option>Push Notification</option>
          </select>
        </div>
        <div>
          <label className="block font-semibold">Delete Account</label>
          <button className="btn btn-danger bg-red-600 text-white px-6 py-2 rounded shadow hover:bg-red-700 mt-2">Delete Account</button>
        </div>
        <button className="btn btn-primary bg-blue-600 text-white px-6 py-2 rounded shadow hover:bg-blue-700">Save Settings</button>
      </form>
    </div>
  );
} 