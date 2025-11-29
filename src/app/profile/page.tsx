"use client";

import { useEffect, useState, Suspense } from "react";
import Layout from "@/components/layout/Layout";
import ProfileSettings from "@/components/profile/ProfileSettings";
import BookingHistory from "@/components/profile/BookingHistory";
import NotificationSettings from "@/components/profile/NotificationSettings";
import LanguageSelector from "@/components/profile/LanguageSelector";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { User, LogOut } from "lucide-react";

// ✅ Disable static prerendering (so it's built dynamically)
export const dynamic = "force-dynamic";

interface UserData {
  firstName: string;
  lastName: string;
  email: string;
  verified?: boolean;
}

/**
 * Wrapper component to use useSearchParams() safely inside Suspense.
 */
function ProfilePageContent() {
  const [activeSection, setActiveSection] = useState("Profile Settings");
  const [user, setUser] = useState<UserData | null>(null);
  const searchParams = useSearchParams();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        try {
          const parsedUser = JSON.parse(storedUser);
          setUser({
            firstName: parsedUser.firstName || "User",
            lastName: parsedUser.lastName || "Name",
            email: parsedUser.email || "No email",
            verified: true,
          });
        } catch (error) {
          console.error("Error parsing user data:", error);
        }
      }

      const section = searchParams.get("section");
      if (section === "booking-history") {
        setActiveSection("Booking History");
      } else if (section === "notifications") {
        setActiveSection("Notifications");
      } else if (section === "language") {
        setActiveSection("Language");
      }
    }
  }, [searchParams]);

  const handleLogout = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("authToken");
      localStorage.removeItem("user");
      window.location.href = "/login";
    }
  };

  const menuItems = [
    {
      icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M6 22H19C19.5304 22 20.0391 21.7893 20.4142 21.4142C20.7893 21.0391 21 20.5304 21 20V4C21 3.46957 20.7893 2.96086 20.4142 2.58579C20.0391 2.21071 19.5304 2 19 2H5C4.46957 2 3.96086 2.21071 3.58579 2.58579C3.21071 2.96086 3 3.46957 3 4V20C3 20.5304 3.21071 21.0391 3.58579 21.4142C3.96086 21.7893 4.46957 22 5 22H6ZM12 4.999C13.647 4.999 15 6.35 15 7.999C15 9.647 13.647 11 12 11C10.353 11 9 9.647 9 7.999C9 6.35 10.353 4.999 12 4.999ZM6 17.25C6 15.031 8.705 12.75 12 12.75C15.295 12.75 18 15.031 18 17.25V18H6V17.25Z" fill="currentColor"/>
</svg>
,
      label: "Profile Settings",
      title: "View & Edit profile",
    },
    {
      icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M8.66683 4.33333V6H15.3335V4.33333C15.3335 4.15 15.1835 4 15.0002 4H9.00016C8.81683 4 8.66683 4.15 8.66683 4.33333ZM6.66683 6V4.33333C6.66683 3.04583 7.71266 2 9.00016 2H15.0002C16.2877 2 17.3335 3.04583 17.3335 4.33333V6V7.33333V22H6.66683V7.33333V6ZM4.00016 6H5.3335V22H4.00016C2.52933 22 1.3335 20.8042 1.3335 19.3333V8.66667C1.3335 7.19583 2.52933 6 4.00016 6ZM20.0002 22H18.6668V6H20.0002C21.471 6 22.6668 7.19583 22.6668 8.66667V19.3333C22.6668 20.8042 21.471 22 20.0002 22Z" fill="currentColor"/>
</svg>
,
      label: "Booking History",
      title: "Booking History",
    },
    {
      icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M12 22C12.6193 22.0008 13.2235 21.8086 13.7285 21.4502C14.2335 21.0917 14.6143 20.5849 14.818 20H9.182C9.38566 20.5849 9.76648 21.0917 10.2715 21.4502C10.7765 21.8086 11.3807 22.0008 12 22ZM19 14.586V10C19 6.783 16.815 4.073 13.855 3.258C13.562 2.52 12.846 2 12 2C11.154 2 10.438 2.52 10.145 3.258C7.185 4.074 5 6.783 5 10V14.586L3.293 16.293C3.19996 16.3857 3.12617 16.4959 3.07589 16.6172C3.0256 16.7386 2.99981 16.8687 3 17V18C3 18.2652 3.10536 18.5196 3.29289 18.7071C3.48043 18.8946 3.73478 19 4 19H20C20.2652 19 20.5196 18.8946 20.7071 18.7071C20.8946 18.5196 21 18.2652 21 18V17C21.0002 16.8687 20.9744 16.7386 20.9241 16.6172C20.8738 16.4959 20.8 16.3857 20.707 16.293L19 14.586Z" fill="currentColor"/>
</svg>
,
      label: "Notifications",
      title: "Notifications",
    },
    {
      icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M6.96177 6.88672H6.68591L6.17041 9.46484H7.47726L6.96177 6.88672ZM17.3887 12.043C17.667 12.7906 18.0372 13.3958 18.4469 13.9107C18.8565 13.3958 19.2697 12.7905 19.548 12.043H17.3887Z" fill="#4B5563"/>
<path d="M21.0667 4.91016H13.0624L14.7314 18.3026C14.7609 18.8504 14.6111 19.3661 14.2536 19.7698L11.4272 23H21.0667C22.133 23 23.0003 22.1326 23.0003 21.0664V6.88672C23.0003 5.82049 22.133 4.91016 21.0667 4.91016ZM21.0667 12.043H20.8946C20.5279 13.2196 19.9463 14.1403 19.3419 14.8661C19.8153 15.299 20.3216 15.6541 20.825 16.0518C21.1026 16.274 21.1479 16.6793 20.9251 16.9575C20.7033 17.2353 20.2964 17.2803 20.0194 17.0576C19.4724 16.6259 18.959 16.2645 18.4456 15.7934C17.9322 16.2645 17.4618 16.6259 16.9149 17.0576C16.6379 17.2803 16.2309 17.2353 16.0091 16.9575C15.7863 16.6793 15.8316 16.274 16.1092 16.0518C16.6126 15.6541 17.0759 15.299 17.5494 14.8661C16.945 14.1403 16.4063 13.2196 16.0396 12.043H15.8675C15.5113 12.043 15.223 11.7547 15.223 11.3984C15.223 11.0422 15.5113 10.7539 15.8675 10.7539H17.8011V10.1094C17.8011 9.75312 18.0894 9.46484 18.4456 9.46484C18.8019 9.46484 19.0902 9.75312 19.0902 10.1094V10.7539H21.0667C21.423 10.7539 21.7113 11.0422 21.7113 11.3984C21.7113 11.7547 21.423 12.043 21.0667 12.043Z" fill="currentColor"/>
<path d="M11.4914 2.69379C11.3712 1.72823 10.546 1 9.57295 1H2.93359C1.86737 1 1 1.86737 1 2.93359V17.1992C1 18.2654 1.86737 19.1328 2.93359 19.1328H13.0979C13.2859 18.9179 13.4435 18.7833 13.4502 18.5028C13.4518 18.4324 11.5001 2.76357 11.4914 2.69379ZM8.90384 13.3194C8.56207 13.3898 8.21587 13.1679 8.1454 12.814L7.73346 10.7539H5.91111L5.49917 12.814C5.42995 13.1627 5.0938 13.3918 4.74073 13.3194C4.39204 13.2496 4.16542 12.9103 4.23529 12.561L5.52431 6.11569C5.58472 5.81482 5.84911 5.59766 6.15625 5.59766H7.48828C7.79542 5.59766 8.05981 5.81482 8.12022 6.11569L9.40929 12.561C9.47915 12.9103 9.25258 13.2496 8.90384 13.3194ZM8.53075 20.4219L8.64135 21.3062C8.71508 21.8985 9.10859 22.5024 9.75587 22.8039L11.9197 20.4219H8.53075Z" fill="currentColor"/>
</svg>
,
      label: "Language",
      title: "Language",
    },
    {
      icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M16.5759 8.86523C16.5701 9.87404 16.3708 10.8377 16.0133 11.7212C16.7403 11.8963 17.3937 12.2958 17.8808 12.8631C18.1128 13.133 18.0821 13.54 17.8122 13.772C17.5423 14.004 17.1354 13.9734 16.9033 13.7034C16.5218 13.2589 15.9832 12.9791 15.4002 12.9224C15.0269 13.519 14.5748 14.0625 14.0561 14.5381H15.5077C15.8636 14.5381 16.1522 14.8267 16.1522 15.1826C16.1522 15.5386 15.8636 15.8271 15.5077 15.8271H13.003C13.2815 16.7665 14.1521 17.454 15.1807 17.454C15.8426 17.454 16.4705 17.1652 16.9033 16.6618C17.1354 16.3919 17.5423 16.3612 17.8122 16.5932C18.0821 16.8252 18.1129 17.2322 17.8808 17.5021C17.2029 18.2907 16.2187 18.743 15.1807 18.743C13.5041 18.743 12.0955 17.5779 11.7195 16.0151C10.8359 16.3727 9.87217 16.5721 8.86328 16.5779C9.50303 19.4766 12.0924 21.652 15.1807 21.652C18.7479 21.652 21.65 18.7498 21.65 15.1826C21.65 12.0944 19.4747 9.50503 16.5759 8.86523Z" fill="currentColor"/>
<path d="M15.2881 8.81965C15.2881 5.25239 12.386 2.35028 8.81877 2.35028C5.25156 2.35028 2.34936 5.25244 2.34936 8.81965C2.34936 12.3869 5.25151 15.2891 8.81873 15.2891C12.3859 15.2891 15.2881 12.3869 15.2881 8.81965ZM8.1742 12.181V12.053H7.52431C7.16836 12.053 6.87979 11.7645 6.87979 11.4085C6.87979 11.0526 7.16836 10.764 7.52431 10.764H8.81873C9.17708 10.764 9.46862 10.4725 9.46862 10.1141C9.46862 9.75575 9.17708 9.46421 8.81873 9.46421C7.74959 9.46421 6.87979 8.59441 6.87979 7.52528C6.87979 6.68207 7.42102 5.96321 8.1742 5.6969V5.45834C8.1742 5.10239 8.46278 4.81382 8.81873 4.81382C9.17467 4.81382 9.46325 5.10239 9.46325 5.45834V5.58634H10.1131C10.4691 5.58634 10.7577 5.87492 10.7577 6.23086C10.7577 6.58681 10.4691 6.87538 10.1131 6.87538H8.81873C8.46037 6.87538 8.16883 7.16692 8.16883 7.52528C8.16883 7.88363 8.46037 8.17517 8.81873 8.17517C9.88786 8.17517 10.7577 9.04497 10.7577 10.1141C10.7577 10.9573 10.2164 11.6762 9.46325 11.9425V12.1811C9.46325 12.537 9.17467 12.8256 8.81873 12.8256C8.46278 12.8256 8.1742 12.537 8.1742 12.181ZM9.21077 21.2129C6.88847 20.5104 4.77921 18.7566 3.50516 16.5212L3.92535 16.6625C4.26277 16.7762 4.62822 16.5946 4.74174 16.2571C4.85522 15.9197 4.67372 15.5543 4.33634 15.4408L2.47594 14.815C2.13852 14.7017 1.77307 14.8831 1.65955 15.2205L1.03381 17.0808C0.920327 17.4183 1.10182 17.7837 1.43921 17.8972C1.50736 17.9201 1.57662 17.931 1.64477 17.931C1.91392 17.931 2.16503 17.761 2.25556 17.4918L2.37411 17.1394C2.97274 18.194 3.74428 19.1688 4.64455 20.0016C5.881 21.1454 7.33091 21.9909 8.8375 22.4467C8.89972 22.4655 8.96254 22.4744 9.02437 22.4744C9.30104 22.4744 9.55683 22.2948 9.64105 22.0164C9.74413 21.6758 9.55146 21.316 9.21077 21.2129ZM22.5608 6.10467C22.2235 5.99127 21.858 6.17273 21.7444 6.51011L21.6258 6.86292C21.0238 5.80243 20.2473 4.8225 19.341 3.9869C18.1079 2.84996 16.663 2.00912 15.1625 1.55516C14.8217 1.45199 14.462 1.64475 14.3589 1.98544C14.2559 2.32618 14.4485 2.68595 14.7892 2.78899C17.1091 3.49079 19.2199 5.24573 20.4942 7.48046L20.0747 7.33935C19.7373 7.22579 19.3718 7.40737 19.2583 7.74476C19.1448 8.08214 19.3263 8.44763 19.6637 8.56111L21.5241 9.1869C21.5922 9.2098 21.6615 9.22067 21.7297 9.22067C21.9988 9.22067 22.2499 9.05069 22.3405 8.78145L22.9662 6.92106C23.0797 6.58363 22.8982 6.21814 22.5608 6.10467Z" fill="currentColor"/>
</svg>
,
      label: "Currency",
      title: "Currency",
    },
  ];

  const renderSection = () => {
    switch (activeSection) {
      case "Profile Settings":
        return <ProfileSettings />;
      case "Booking History":
        return <BookingHistory />;
      case "Notifications":
        return (
          <div className="bg-[#EFF2F880] rounded-2xl ">
            <NotificationSettings />
          </div>
        );
      case "Language":
        return (
          <div className="bg-[#EFF2F880] rounded-2xl">
            <LanguageSelector />
          </div>
        );
      case "Currency":
        return (
          // <div className="bg-[#EFF2F880] rounded-2xl shadow p-8">
          //   <h2 className="text-2xl font-bold text-gray-800 mb-4">Currency</h2>
          //   <select className="border border-gray-300 rounded-lg p-3">
          //     <option>USD (Dollar)</option>
          //     <option>EUR (Euro)</option>
          //     <option>GBP (Pound)</option>
          //     <option>SAR (Riyal)</option>
          //     <option>AED (Dirham)</option>
          //     <option>INR (Rupee)</option>
          //   </select>
          // </div>

         <div className="flex flex-col bg-[#EFF2F8]/50 rounded-xl px-11 py-8 gap-14 w-[876px]">

  {/* Header & Options */}
  <div className="flex flex-col gap-8 w-full">
    <div className="flex justify-between items-center w-full">
      <h2 className="text-[24px] font-medium text-[#191919]">
        Currency Preference
      </h2>
    </div>

    <div className="flex flex-col gap-6 w-full">

      {/* USD */}
      <label className="flex items-center gap-3 cursor-pointer">
        <input type="radio" name="currency" className="hidden" />
        <div className="w-6 h-6 rounded-full border-[1.5px] border-[#FAA523] flex items-center justify-center">
          <div className="w-3.5 h-3.5 rounded-full bg-[#FAA523]"></div>
        </div>

        <div className="flex items-center gap-3">
          <img src="/icons/profile-menu/usd.png" className="w-5 h-5" />
          <div className="flex items-end gap-2">
            <p className="text-[18px] font-medium text-[#191919]">USD</p>
            <span className="text-[14px] text-[#747D8F]">Dollar</span>
          </div>
        </div>
      </label>

      {/* EUR */}
      <label className="flex items-center gap-3 cursor-pointer">
        <input type="radio" name="currency" className="hidden" />
        <div className="w-6 h-6 rounded-full border-[1.5px] border-[#C4CAD4]"></div>

        <div className="flex items-center gap-3">
          <img src="/icons/profile-menu/eur.png" className="w-5 h-5" />
          <div className="flex items-end gap-2">
            <p className="text-[18px] font-medium text-[#747D8F]">EUR</p>
            <span className="text-[14px] text-[#747D8F]">Euro</span>
          </div>
        </div>
      </label>

      {/* GBP */}
      <label className="flex items-center gap-3 cursor-pointer">
        <input type="radio" name="currency" className="hidden" />
        <div className="w-6 h-6 rounded-full border-[1.5px] border-[#C4CAD4]"></div>

        <div className="flex items-center gap-3">
          <img src="/icons/profile-menu/gbp.png" className="w-5 h-5" />
          <div className="flex items-end gap-2">
            <p className="text-[18px] font-medium text-[#747D8F]">GBP</p>
            <span className="text-[14px] text-[#747D8F]">Pound</span>
          </div>
        </div>
      </label>

      {/* SAR */}
      <label className="flex items-center gap-3 cursor-pointer">
        <input type="radio" name="currency" className="hidden" />
        <div className="w-6 h-6 rounded-full border-[1.5px] border-[#C4CAD4]"></div>

        <div className="flex items-center gap-3">
          <img src="/icons/profile-menu/sar.png" className="w-5 h-5" />
          <div className="flex items-end gap-2">
            <p className="text-[18px] font-medium text-[#747D8F]">SAR</p>
            <span className="text-[14px] text-[#747D8F]">Riyal</span>
          </div>
        </div>
      </label>

      {/* AED */}
      <label className="flex items-center gap-3 cursor-pointer">
        <input type="radio" name="currency" className="hidden" />
        <div className="w-6 h-6 rounded-full border-[1.5px] border-[#C4CAD4]"></div>

        <div className="flex items-center gap-3">
          <img src="/icons/profile-menu/aed.png" className="w-5 h-5" />
          <div className="flex items-end gap-2">
            <p className="text-[18px] font-medium text-[#747D8F]">AED</p>
            <span className="text-[14px] text-[#747D8F]">Dirham</span>
          </div>
        </div>
      </label>

      <label className="flex items-center gap-3 cursor-pointer">
        <input type="radio" name="currency" className="hidden" />
        <div className="w-6 h-6 rounded-full border-[1.5px] border-[#C4CAD4]"></div>

        <div className="flex items-center gap-3">
          <img src="/icons/profile-menu/inr.png" className="w-5 h-5" />
          <div className="flex items-end gap-2">
            <p className="text-[18px] font-medium text-[#747D8F]">INR</p>
            <span className="text-[14px] text-[#747D8F]">Rupee</span>
          </div>
        </div>
      </label>

    </div>
  </div>

  {/* Save Changes Button */}
  <div className="flex justify-end w-full mt-4">
  <button className="w-[788px] h-[40px] bg-[#EE2552] rounded-lg text-white text-[14px] font-normal leading-[24px] flex items-center justify-center">
    Save changes
  </button>
</div>


</div>


        );
      default:
        return null;
    }
  };

  return (
    <Layout>
      <div className="min-h-screen bg-gray-50">
        {/* === HEADER === */}
        <section className="bg-gradient-to-r from-secondary-800 to-secondary-700 text-white py-12">
          <div className="container-custom">
            <div className="flex items-center space-x-4">
              <div className="bg-white/20 backdrop-blur-sm p-4 rounded-full">
                <User className="w-8 h-8" />
              </div>
              <div>
                <h1 className="text-3xl font-bold">My Settings</h1>
                <p className="text-white/90">
                  Manage your account and view your booking history
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* === MAIN CONTENT === */}
        <section className="py-12">
          <div className="container-custom">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
              {/* === SIDEBAR === */}
              <div className="lg:col-span-1">
                <div className="bg-[#EFF2F8] rounded-2xl shadow p-6 sticky top-24">
                  {/* <div className="text-center mb-6">
                    <div className="bg-gradient-to-br from-primary-500 to-secondary-500 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                      <User className="w-10 h-10 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-800">
                      {user ? `${user.firstName} ${user.lastName}` : "Guest User"}
                    </h3>
                    <p className="text-gray-600">{user?.email || "No email available"}</p>
                  </div> */}

                  {/* <nav className="space-y-2">
                    {menuItems.map((item, index) => {
                      const active = activeSection === item.label;
                      return (
                        <button
                          key={index}
                          onClick={() => setActiveSection(item.label)}
                          className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-colors duration-200 ${
                            active
                              ? "bg-[#EE2552] text-white border border-primary-200"
                              : "text-gray-600 hover:bg-gray-50"
                          }`}
                        >
                          <span className="w-5 h-5 flex items-center justify-center">{item.icon}</span>
                          <span className="font-medium">{item.title}</span>
                        </button>
                      );
                    })}
                  </nav> */}

                  <nav className="space-y-2">
  {menuItems.map((item, index) => {
    const active = activeSection === item.label;
    return (
      <button
        key={index}
        onClick={() => setActiveSection(item.label)}
        className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-colors duration-200 ${
          active
            ? "bg-[#EE2552] text-white border border-primary-200"
            : "text-gray-600 hover:bg-gray-50"
        }`}
      >
        <span
          className={`w-5 h-5 flex items-center justify-center ${
            active ? "text-white" : "text-gray-600"
          }`}
        >
          {item.icon}
        </span>

        <span className="font-medium">{item.title}</span>
      </button>
    );
  })}
</nav>


                  <div className="mt-8 pt-6 border-t">
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center justify-center gap-2 text-red-600 hover:text-red-700 font-medium py-2 transition-colors duration-200"
                    >
                      <LogOut className="w-5 h-5" />
                      Sign Out
                    </button>
                  </div>
                </div>
              </div>

              {/* === MAIN SECTION === */}
              <div className="lg:col-span-3 space-y-8">{renderSection()}</div>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
}

/**
 * ✅ Page Component wrapped in Suspense for safe useSearchParams()
 */
export default function ProfilePage() {
  return (
    <Suspense fallback={<div className="p-10 text-center text-gray-500">Loading profile...</div>}>
      <ProfilePageContent />
    </Suspense>
  );
}
