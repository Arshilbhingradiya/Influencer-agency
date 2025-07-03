export default function Messages() {
  return (
    <div className="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow space-y-6">
      <h2 className="text-2xl font-bold mb-4">Messages / Chat</h2>
      <div className="bg-gray-100 rounded p-6 h-64 flex flex-col">
        <div className="flex-1 overflow-y-auto">Chat messages will appear here.</div>
        <form className="flex gap-2 mt-4">
          <input className="input input-bordered flex-1" placeholder="Type a message..." />
          <button className="btn btn-primary bg-blue-600 text-white px-4 py-2 rounded">Send</button>
        </form>
      </div>
    </div>
  );
} 