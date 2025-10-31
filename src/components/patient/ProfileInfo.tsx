export default function ProfileInfo() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="md:col-span-2 space-y-4">
        <div className="bg-white p-6 rounded-xl shadow-sm border">
          <h2 className="text-lg font-semibold mb-4">Personal Information</h2>
          <div className="space-y-2 text-sm">
            <p><span className="font-medium">Gender:</span> Male</p>
            <p><span className="font-medium">Phone:</span> +91 98765 43210</p>
            <p><span className="font-medium">Email:</span> john.doe@email.com</p>
            <p><span className="font-medium">Emergency Contact:</span> +91 98765 43211</p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border">
          <h2 className="text-lg font-semibold mb-4">Address</h2>
          <p className="text-sm">123 HealthCare Street, Mumbai, Maharashtra 400001</p>
          <button className="mt-2 text-blue-500 hover:underline text-sm">Update Address</button>
        </div>
      </div>
      <div className="space-y-4">
        <div className="bg-white p-4 rounded-xl shadow-sm border flex items-center justify-between">
          <span>Full Name</span>
          <div className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full">John Doe</div>
        </div>
        <div className="bg-white p-4 rounded-xl shadow-sm border flex items-center justify-between">
          <span>Blood Group</span>
          <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full flex items-center">
            <span className="text-lg">♥</span> O+
          </div>
        </div>
        <div className="bg-white p-4 rounded-xl shadow-sm border flex items-center justify-between">
          <span>Age</span>
          <div className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full">32 years</div>
        </div>
      </div>
      <button className="md:col-span-3 bg-blue-500 text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-600 transition w-full md:w-auto">
        Edit Profile
      </button>
    </div>
  );
}