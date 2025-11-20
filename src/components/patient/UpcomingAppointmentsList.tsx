//@ts-nocheck
import AppointmentItem from './AppointmentItem';

export default function UpcomingAppointmentsList({ appointments, onCancel, onReschedule }) {
  if (appointments.length === 0) {
    return (
      <div className="text-center py-12 text-gray-500">
        <p>No appointments scheduled yet.</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {appointments.map(appt => (
        <AppointmentItem
          key={appt.id}
          appt={appt}
          onCancel={onCancel}
          onReschedule={() => onReschedule(appt)}
        />
      ))}
    </div>
  );
}
