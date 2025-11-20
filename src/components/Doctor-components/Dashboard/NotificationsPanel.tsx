//@ts-nocheck
'use client';

export default function NotificationsPanel({ notifications }) {
  if (!notifications.length) return null;

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Recent Notifications</h3>

      <div className="space-y-3">
        {notifications.slice(0, 5).map((n) => (
          <div
            key={n.id}
            className={`p-3 rounded-lg ${
              n.type === "alert"
                ? "bg-red-50"
                : n.type === "success"
                ? "bg-green-50"
                : "bg-blue-50"
            }`}
          >
            <p className="text-sm text-gray-800">{n.message}</p>
            <p className="text-xs text-gray-500 mt-1">
              {new Date(n.timestamp?.toDate()).toLocaleString()}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
