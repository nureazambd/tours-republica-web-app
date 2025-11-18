import { useState } from "react";
import { addMonths, subMonths, format, startOfMonth, endOfMonth, startOfWeek, endOfWeek, addDays, isSameMonth, isSameDay } from "date-fns";

const CalendarPicker: React.FC<{
  pickupDate: Date | null;
  setPickupDate: (date: Date) => void;
  pickupTime: string;
  setPickupTime: (time: string) => void;
  tripType: "OneWay" | "Round";
  dropoffDate: Date | null;
  setDropoffDate: (date: Date) => void;
  onClose: () => void;
}> = ({ pickupDate, setPickupDate, pickupTime, setPickupTime, tripType, dropoffDate, setDropoffDate, onClose }) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const renderHeader = () => (
    <div className="flex justify-between items-center mb-4">
      <button onClick={() => setCurrentMonth(subMonths(currentMonth, 1))} className="p-2 rounded-full hover:bg-gray-200">◀</button>
      <span className="text-lg font-medium">{format(currentMonth, "MMMM yyyy")}</span>
      <button onClick={() => setCurrentMonth(addMonths(currentMonth, 1))} className="p-2 rounded-full hover:bg-gray-200">▶</button>
    </div>
  );

  const renderDays = () => {
    const days = [];
    const start = startOfWeek(startOfMonth(currentMonth));
    const end = endOfWeek(endOfMonth(currentMonth));
    let day = start;

    while (day <= end) {
      days.push(day);
      day = addDays(day, 1);
    }

    return (
      <div className="grid grid-cols-7 gap-2 text-center text-gray-500 mb-2">
        {["Sun","Mon","Tue","Wed","Thu","Fri","Sat"].map((d) => <div key={d}>{d}</div>)}
        {days.map((d, idx) => {
          const selected = pickupDate && isSameDay(d, pickupDate);
          const inMonth = isSameMonth(d, currentMonth);
          return (
            <div
              key={idx}
              className={`cursor-pointer rounded-full w-10 h-10 flex items-center justify-center ${
                selected ? "bg-[#6FCCDC] text-white" : inMonth ? "bg-white text-black" : "text-gray-400"
              } hover:bg-gray-200`}
              onClick={() => {
                setPickupDate(d);
                if (tripType === "Round" && !dropoffDate) setDropoffDate(d);
              }}
            >
              {format(d, "d")}
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div className="absolute z-50 w-[420px] h-[545px] left-56 top-56 bg-white p-6 rounded-xl shadow-2xl flex flex-col gap-6">
      {renderHeader()}
      {renderDays()}

      <div className="flex flex-col gap-2">
        <label className="text-gray-600 text-sm">Time</label>
        <input
          type="time"
          value={pickupTime}
          onChange={(e) => setPickupTime(e.target.value)}
          className="w-full p-2 border rounded"
        />
      </div>

      <div className="flex justify-end gap-3 mt-auto">
        <button onClick={onClose} className="px-4 py-2 border rounded">Close</button>
        <button onClick={onClose} className="px-4 py-2 bg-[#EE2552] text-white rounded">Save</button>
      </div>
    </div>
  );
};

export default CalendarPicker;
