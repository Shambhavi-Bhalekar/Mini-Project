interface TimeSlotPickerProps {
  date: string;
  doctor: string;
  onSelect: (time: string) => void;
}

// Mock slots per date + doctor (varies for realism)
const mockSlotsByDateDoctor: Record<string, Record<string, string[]>> = {
  '2025-09-23': {
    'Dr. Smith - General Physician': ['09:00', '09:30', '10:00', '14:00', '15:00'],
    'Dr. Patel - Cardiologist': ['10:30', '11:30', '14:30'],
    'Dr. Lee - Neurologist': ['09:30', '13:00', '15:30', '16:30'],
  },
  '2025-09-24': {
    'Dr. Smith - General Physician': ['10:00', '11:00', '14:30', '16:00'],
    'Dr. Patel - Cardiologist': ['09:00', '10:00', '15:00'],
    'Dr. Lee - Neurologist': ['11:30', '14:00', '16:30'],
  },
  '2025-09-25': {
    'Dr. Smith - General Physician': ['09:30', '10:30', '13:00', '15:30', '16:30'],
    'Dr. Patel - Cardiologist': ['10:00', '12:00', '14:00'],
    'Dr. Lee - Neurologist': ['09:00', '11:00', '15:00'],
  },
};

export default function TimeSlotPicker({ date, doctor, onSelect }: TimeSlotPickerProps) {
  const availableSlots = mockSlotsByDateDoctor[date]?.[doctor] || [];

  return (
    <div className="space-y-4">
      <p className="text-gray-600">Available time slots for {doctor.split(' - ')[0]}</p>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        {availableSlots.map((time) => (
          <button
            key={time}
            onClick={() => onSelect(time)}
            className="p-3 rounded-lg bg-blue-50 border border-blue-200 hover:bg-blue-100 transition text-sm font-medium text-blue-700"
          >
            {time}
          </button>
        ))}
      </div>
      {availableSlots.length === 0 && (
        <p className="text-gray-500 text-sm text-center">No slots available for this doctor on this date.</p>
      )}
    </div>
  );
}