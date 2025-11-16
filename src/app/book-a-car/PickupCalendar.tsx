import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import TimePicker from "react-time-picker";
import "react-time-picker/dist/TimePicker.css";

const PickupCalendar = ({
  showPickupCalendar,
  setShowPickupCalendar,
  pickupDate,
  setPickupDate,
  pickupTime,
  setPickupTime,
  dropoffDate,
  setDropoffDate,
  tripType,
}: any) => {
  return (
    <>
      {showPickupCalendar && (
        <div className="absolute z-40 mt-2 bg-white border rounded-lg p-4 shadow-md w-[320px]">
          <div className="flex flex-col gap-4">
            {/* Date Picker */}
            <div>
              <label className="text-xs text-gray-600">Date</label>
              <DatePicker
                selected={pickupDate ? new Date(pickupDate) : null}
                onChange={(date: Date | null) => {
                  if (!date) return;
                  const formatted = date.toISOString().split("T")[0];
                  setPickupDate(formatted);
                  if (tripType === "Round" && !dropoffDate) {
                    setDropoffDate(formatted);
                  }
                }}
                className="w-full p-2 border rounded"
                dateFormat="yyyy-MM-dd"
              />
            </div>

            {/* Time Picker */}
            <div>
              <label className="text-xs text-gray-600">Time</label>
              <TimePicker
                value={pickupTime}
                onChange={(time: any) => setPickupTime(time)}
                className="w-full border rounded p-1"
                clockIcon={null}
                clearIcon={null}
              />
            </div>

            {/* Buttons */}
            <div className="flex justify-end gap-2 mt-2">
              <button
                type="button"
                onClick={() => setShowPickupCalendar(false)}
                className="px-3 py-1 rounded border"
              >
                Close
              </button>
              <button
                type="button"
                onClick={() => setShowPickupCalendar(false)}
                className="px-3 py-1 rounded bg-[#EE2552] text-white"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default PickupCalendar;
