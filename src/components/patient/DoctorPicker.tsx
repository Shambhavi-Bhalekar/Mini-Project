interface Doctor {
  name: string;
  specialty: string;
  avatar?: string; // Optional for future
}

interface DoctorPickerProps {
  selectedDate: string;
  onSelect: (doctor: string) => void;
}

const mockDoctors: Doctor[] = [
  { name: 'Dr. Smith', specialty: 'General Physician' },
  { name: 'Dr. Patel', specialty: 'Cardiologist' },
  { name: 'Dr. Lee', specialty: 'Neurologist' },
];

export default function DoctorPicker({ selectedDate, onSelect }: DoctorPickerProps) {
  return (
    <div className="space-y-4">
      <p className="text-gray-600">Choose a doctor for {new Date(selectedDate).toLocaleDateString()}</p>
      <div className="space-y-3">
        {mockDoctors.map((doctor) => (
          <button
            key={doctor.name}
            onClick={() => onSelect(`${doctor.name} - ${doctor.specialty}`)}
            className="w-full p-4 rounded-lg border-2 border-gray-200 hover:border-blue-500 hover:bg-blue-50 transition flex items-center space-x-3 text-left"
          >
            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-semibold">
              {doctor.name.charAt(0)}
            </div>
            <div>
              <p className="font-semibold text-gray-900">{doctor.name}</p>
              <p className="text-sm text-gray-600">{doctor.specialty}</p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}