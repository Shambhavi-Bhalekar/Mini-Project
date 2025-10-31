interface CalendarPickerProps {
  availableDates: string[];
  onSelect: (date: string) => void;
}

export default function CalendarPicker({ availableDates, onSelect }: CalendarPickerProps) {
  const today = new Date('2025-09-18').toISOString().split('T')[0]; // Current date

  return (
    <div className="space-y-4">
      <p className="text-gray-600">Choose an available date</p>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        {availableDates.map((date) => (
          <button
            key={date}
            onClick={() => onSelect(date)}
            disabled={date < today}
            className="p-3 rounded-lg border-2 border-gray-200 hover:border-blue-500 transition disabled:opacity-50 disabled:cursor-not-allowed flex flex-col items-center space-y-1 text-sm"
          >
            <span className="font-semibold">{new Date(date).toLocaleDateString('en-US', { weekday: 'short' })}</span>
            <span>{new Date(date).getDate()}</span>
          </button>
        ))}
      </div>
    </div>
  );
}