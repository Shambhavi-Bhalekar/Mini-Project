import { CheckCircleIcon } from '@heroicons/react/24/outline';

interface BookingConfirmationProps {
  doctor: string;
  date: string;
  time: string;
  onConfirm: () => void;
  onBack: () => void;
}

export default function BookingConfirmation({ doctor, date, time, onConfirm, onBack }: BookingConfirmationProps) {
  return (
    <div className="text-center space-y-4">
      <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
        <CheckCircleIcon className="w-8 h-8 text-green-500" />
      </div>
      <h3 className="text-lg font-bold text-gray-900">Booking Confirmed!</h3>
      <div className="bg-gray-50 p-4 rounded-lg space-y-2 text-sm">
        <p><span className="font-medium">Doctor:</span> {doctor}</p>
        <p><span className="font-medium">Date:</span> {new Date(date).toLocaleDateString()}</p>
        <p><span className="font-medium">Time:</span> {time}</p>
        <p className="text-blue-600 font-semibold">Token: APT001 (Your queue number)</p>
      </div>
      <div className="flex space-x-3 pt-4">
        <button
          onClick={onBack}
          className="flex-1 px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition"
        >
          Back
        </button>
        <button
          onClick={onConfirm}
          className="flex-1 bg-gradient-to-r from-blue-500 to-purple-500 text-white px-4 py-2 rounded-lg font-semibold hover:from-blue-600 hover:to-purple-600 transition"
        >
          Done
        </button>
      </div>
    </div>
  );
}