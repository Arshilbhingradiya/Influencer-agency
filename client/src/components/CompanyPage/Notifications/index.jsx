export default function Notifications() {
  return (
    <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow space-y-6">
      <h2 className="text-2xl font-bold mb-4">Notifications</h2>
      <ul className="space-y-4">
        <li className="bg-blue-50 p-4 rounded">New influencer application: <span className="font-semibold">@influencer1</span> for <span className="font-semibold">Spring Launch</span></li>
        <li className="bg-green-50 p-4 rounded">Content submitted for <span className="font-semibold">Spring Launch</span></li>
        <li className="bg-yellow-50 p-4 rounded">Payment update: <span className="font-semibold">Invoice #1234</span> paid</li>
      </ul>
    </div>
  );
} 