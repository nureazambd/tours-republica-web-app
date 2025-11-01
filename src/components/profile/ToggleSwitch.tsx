import React, { FC } from 'react';

// Define the props interface
interface ToggleSwitchProps {
  checked: boolean;
  onChange: () => void; // Simple toggle handler
}

/**
 * A custom toggle switch component (TSX).
 */
const ToggleSwitch: FC<ToggleSwitchProps> = ({ checked, onChange }) => {
  return (
    <label className="relative inline-flex items-center cursor-pointer">
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange} // Pass the handler directly
        className="sr-only peer" // Hides the default checkbox
      />
      {/* This is the track (the background) */}
      <div
        className="w-11 h-6 bg-gray-300 rounded-full 
                   peer peer-checked:bg-orange-400 
                   transition-colors duration-200 ease-in-out"
      ></div>
      {/* This is the thumb (the circle) */}
      <div
        className="absolute top-[2px] left-[2px] bg-white 
                   border-gray-300 border rounded-full h-5 w-5 
                   transition-transform duration-200 ease-in-out 
                   peer-checked:translate-x-full"
      ></div>
    </label>
  );
};

export default ToggleSwitch;