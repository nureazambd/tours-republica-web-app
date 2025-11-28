import React, { useState, FC } from 'react';
import ToggleSwitch from './ToggleSwitch'; // Adjust path as needed

// --- Helper Component: SettingRow ---
interface SettingRowProps {
  label: string;
  checked: boolean;
  onToggle: () => void;
}

const SettingRow: FC<SettingRowProps> = ({ label, checked, onToggle }) => (
  <div className="flex justify-between items-center py-2">
    <span className="text-gray-700">{label}</span>
    <ToggleSwitch checked={checked} onChange={onToggle} />
  </div>
);

// --- State Interface ---
// Define the shape of the settings state object
interface SettingsState {
  generalNotification: boolean;
  sound: boolean;
  vibrate: boolean;
  bookingReminder: boolean;
  promotion: boolean;
  duePayment: boolean;
  newServiceAvailable: boolean;
  newTipsAvailable: boolean;
}

// --- Main Component: NotificationSettings ---
const NotificationSettings: FC = () => {
  // State to manage all toggle settings, typed with SettingsState
  const [settings, setSettings] = useState<SettingsState>({
    generalNotification: true,
    sound: false,
    vibrate: true,
    bookingReminder: true,
    promotion: true,
    duePayment: false,
    newServiceAvailable: false,
    newTipsAvailable: true,
  });

  // Handler to update a specific setting
  // 'key' is typed as a key of the SettingsState interface
  const handleToggle = (key: keyof SettingsState) => {
    setSettings(prevSettings => ({
      ...prevSettings,
      [key]: !prevSettings[key],
    }));
  };

  // Handler for the save button
  const handleSave = () => {
    console.log("Settings Saved:", settings);
    // You would typically send this 'settings' object to your API
    alert("Settings saved!");
  };

  return (
    // Container for layout
    <div className="bg-[#EFF2F880] flex items-center justify-center">
      
      {/* Main card matching the image */}
      <div className="w-full px-[44px] py-8">
        
        {/* Header */}
        <h1 className="text-2xl font-bold text-gray-900 mb-8">
          Notification Settings
        </h1>

        {/* General Section */}
        <section>
          <h2 className="text-lg font-bold text-gray-800 mb-2">General</h2>
          <div className="space-y-2">
            <SettingRow
              label="General Notification"
              checked={settings.generalNotification}
              onToggle={() => handleToggle('generalNotification')}
            />
            <SettingRow
              label="Sound"
              checked={settings.sound}
              onToggle={() => handleToggle('sound')}
            />
            <SettingRow
              label="Vibrate"
              checked={settings.vibrate}
              onToggle={() => handleToggle('vibrate')}
            />
          </div>
        </section>

        {/* System & services update Section */}
        <section className="mt-8">
          <h2 className="text-lg font-bold text-gray-800 mb-2">System & services update</h2>
          <div className="space-y-2">
            <SettingRow
              label="Booking Reminder"
              checked={settings.bookingReminder}
              onToggle={() => handleToggle('bookingReminder')}
            />
            <SettingRow
              label="Promotion"
              checked={settings.promotion}
              onToggle={() => handleToggle('promotion')}
            />
            <SettingRow
              label="Due payment"
              checked={settings.duePayment}
              onToggle={() => handleToggle('duePayment')}
            />
          </div>
        </section>

        {/* Others Section */}
        <section className="mt-8">
          <h2 className="text-lg font-bold text-gray-800 mb-2">Others</h2>
          <div className="space-y-2">
            <SettingRow
              label="New Service Available"
              checked={settings.newServiceAvailable}
              onToggle={() => handleToggle('newServiceAvailable')}
            />
            <SettingRow
              label="New Tips Available"
              checked={settings.newTipsAvailable}
              onToggle={() => handleToggle('newTipsAvailable')}
            />
          </div>
        </section>

        {/* Save Button */}
        <div className="mt-10">
          <button
            onClick={handleSave}
            className="w-full bg-[#EE2552] text-white font-semibold py-3 rounded-lg 
                       hover:bg-[#EE2552] transition-colors duration-200
                       focus:outline-none focus:ring-2 focus:ring-pink-400 focus:ring-opacity-75"
          >
            Save changes
          </button>
        </div>

      </div>
    </div>
  );
};

export default NotificationSettings;