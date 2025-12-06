"use client";


import RescheduleRideForm from "@/app/book-a-car/RescheduleRideForm";
import { useModal } from "@/context/ModalContext";
import { X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function SuccessModal() {
    const { isSuccessOpen, closeSuccess } = useModal();
    const [isCancelOpen, setIsCancelOpen] = useState(false);
    const [isDownloadOpen, setIsDownloadOpen] = useState(false);
    const [isRescheduleRideOpen, setIsRescheduleRideOpen] = useState(false);


    if (!isSuccessOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
            <div className="w-[712px] h-[546px] bg-white rounded-2xl shadow-[0_1px_2px_rgba(0,0,0,0.1)] p-8 overflow-auto flex flex-col gap-6">

                {/* ---------------- HEADER ---------------- */}
                <div className="flex flex-col gap-3 w-[648px]">
                    <div className="flex justify-between items-center w-full">
                        <h2 className="text-[24px] font-medium text-[#33A853] leading-[30px]">
                            Success! ID #114555 located
                        </h2>

                        <button
                            onClick={closeSuccess}
                            className="w-8 h-8 flex items-center justify-center rounded-full border border-[#1A202C]"
                        >
                            <X className="w-4 h-4 text-[#1A202C]" />
                        </button>
                    </div>
                </div>

                {/* ---------------- TOP INFO ROW ---------------- */}
                <div className="w-[648px] flex flex-col gap-5">
                    <div className="flex justify-between items-center w-full">
                        <p className="text-[13px] text-[#4B5563]">Booking info</p>
                        <p className="text-[13px] text-[#4B5563]">Status</p>
                    </div>

                    <div className="border-t border-[#DADFE6] w-full" />
                </div>

                {/* ---------------- BOOKING CARD ---------------- */}
                <div className="w-[648px] flex flex-col gap-7">
                    <div className="flex justify-between items-center gap-4 w-full h-[56px]">

                        {/* Car icon box */}
                        <div className="flex items-center gap-4 w-[472px] h-[56px]">
                            <div className="w-14 h-14 bg-[#6FCCDC26] border border-[#6FCCDC] rounded-lg flex items-center justify-center">
                                {/* Replace this with your car SVG */}
                                <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M23.9 25.752C23.711 25.752 23.617 25.752 23.559 25.81C23.501 25.868 23.5 25.963 23.5 26.152V26.634C23.5 27.012 23.74 27.359 24.122 27.528L24.167 27.548C24.398 27.651 24.623 27.752 24.891 27.752H26.609C26.877 27.752 27.102 27.652 27.333 27.548L27.378 27.528C27.759 27.358 28 27.012 28 26.634V25.744C28 25.489 28 25.361 27.93 25.302C27.859 25.242 27.717 25.265 27.432 25.312L27.347 25.324L24.23 25.736C24.154 25.7467 24.0773 25.752 24 25.752H23.9ZM12.1 25.752C12.289 25.752 12.383 25.752 12.441 25.811C12.499 25.87 12.5 25.963 12.5 26.151V26.634C12.5 27.013 12.26 27.359 11.878 27.528L11.833 27.548C11.602 27.652 11.377 27.752 11.109 27.752H9.391C9.123 27.752 8.898 27.652 8.667 27.548L8.622 27.528C8.241 27.358 8 27.013 8 26.634V25.745C8 25.489 8 25.362 8.07 25.302C8.14 25.242 8.283 25.265 8.568 25.312L8.654 25.324L11.77 25.737C11.8467 25.747 11.9233 25.752 12 25.752H12.1Z" fill="#6FCCDC" />
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M8.10576 13.553C8.22441 13.316 8.4323 13.1358 8.68375 13.052C8.93519 12.9681 9.20963 12.9876 9.44676 13.106L10.4468 13.606C10.5653 13.6641 10.6711 13.745 10.7582 13.8442C10.8453 13.9434 10.9119 14.0588 10.9541 14.1838C10.9964 14.3089 11.0134 14.441 11.0044 14.5727C10.9953 14.7044 10.9603 14.8329 10.9013 14.951C10.8423 15.0691 10.7605 15.1743 10.6606 15.2606C10.5608 15.3469 10.4448 15.4125 10.3195 15.4538C10.1941 15.4951 10.0618 15.5111 9.93024 15.501C9.79864 15.491 9.67035 15.4549 9.55276 15.395L8.55276 14.895C8.43527 14.8362 8.33051 14.7549 8.24446 14.6557C8.15841 14.5564 8.09276 14.4412 8.05125 14.3166C8.00974 14.192 7.99319 14.0604 8.00254 13.9294C8.01189 13.7984 8.04697 13.6705 8.10576 13.553ZM27.8948 13.553C27.9535 13.6705 27.9885 13.7985 27.9978 13.9295C28.0071 14.0606 27.9905 14.1922 27.9489 14.3168C27.9073 14.4415 27.8415 14.5567 27.7553 14.6559C27.6692 14.7551 27.5643 14.8363 27.4468 14.895L26.4468 15.395C26.2094 15.5135 25.9347 15.5329 25.683 15.4489C25.4313 15.3649 25.2233 15.1844 25.1048 14.947C24.9862 14.7096 24.9668 14.4349 25.0508 14.1832C25.1348 13.9315 25.3154 13.7235 25.5528 13.605L26.5528 13.105C26.6703 13.0462 26.7982 13.0112 26.9293 13.0019C27.0604 12.9927 27.192 13.0093 27.3166 13.0509C27.4412 13.0925 27.5564 13.1583 27.6556 13.2444C27.7548 13.3306 27.8361 13.4354 27.8948 13.553Z" fill="#6FCCDC" />
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M26.343 14.796C26.763 15.229 27.28 15.765 27.71 16.341C28.25 17.064 28.75 17.971 28.75 19V22.47C28.75 23.348 28.157 24.206 27.215 24.331L24.098 24.744C24.0655 24.7476 24.0327 24.7496 24 24.75H12C11.9673 24.7496 11.9345 24.7476 11.902 24.744L8.785 24.331C7.843 24.206 7.25 23.348 7.25 22.471V19C7.25 17.971 7.75 17.064 8.29 16.34C8.72 15.765 9.238 15.23 9.657 14.796C9.742 14.708 9.76 14.631 9.8 14.516L10.872 11.408C11.072 10.83 11.247 10.322 11.442 9.92C11.651 9.485 11.921 9.086 12.359 8.78C12.796 8.476 13.274 8.355 13.767 8.3C14.224 8.25 14.777 8.25 15.409 8.25H20.591C21.223 8.25 21.776 8.25 22.233 8.3C22.727 8.355 23.203 8.476 23.642 8.78C24.079 9.086 24.349 9.485 24.559 9.92C24.753 10.322 24.928 10.83 25.128 11.408L26.2 14.516C26.237 14.624 26.263 14.713 26.343 14.796ZM12.78 14.25C12.396 14.25 12.204 14.25 12.115 14.124C12.026 13.998 12.087 13.817 12.213 13.454L12.698 12.048C12.918 11.408 13.059 11.004 13.201 10.711C13.381 10.337 13.577 10.208 13.987 10.163C14.321 10.126 14.762 10.125 15.46 10.125H20.54C21.238 10.125 21.68 10.126 22.013 10.163C22.423 10.208 22.619 10.337 22.799 10.711C22.941 11.004 23.082 11.409 23.302 12.048L23.788 13.454C23.913 13.817 23.975 13.998 23.886 14.124C23.796 14.25 23.604 14.25 23.22 14.25H12.78ZM9.336 17.58C9.15891 17.497 8.95639 17.4864 8.77163 17.5506C8.58687 17.6148 8.43449 17.7486 8.34697 17.9235C8.25945 18.0984 8.24372 18.3006 8.30313 18.4869C8.36254 18.6733 8.49239 18.829 8.665 18.921L10.165 19.671C10.2532 19.7159 10.3494 19.7429 10.4481 19.7504C10.5468 19.758 10.646 19.7459 10.74 19.7149C10.8341 19.6839 10.921 19.6346 10.9959 19.5699C11.0707 19.5051 11.132 19.4262 11.1762 19.3376C11.2205 19.2491 11.2467 19.1526 11.2535 19.0539C11.2602 18.9551 11.2474 18.856 11.2157 18.7622C11.1839 18.6685 11.134 18.5819 11.0686 18.5076C11.0033 18.4332 10.9239 18.3725 10.835 18.329L9.336 17.58ZM27.336 18.921C27.514 18.832 27.6493 18.676 27.7122 18.4872C27.7751 18.2985 27.7605 18.0925 27.6715 17.9145C27.5825 17.7365 27.4265 17.6012 27.2377 17.5383C27.049 17.4754 26.843 17.49 26.665 17.579L25.165 18.329C24.9886 18.4188 24.8549 18.5746 24.7929 18.7626C24.731 18.9505 24.7458 19.1553 24.8342 19.3324C24.9226 19.5095 25.0774 19.6444 25.2649 19.7078C25.4523 19.7713 25.6573 19.758 25.835 19.671L27.336 18.921ZM18.969 21H17.031C16.048 21 15.556 21 15.175 21.274C14.879 21.486 14.703 21.825 14.468 22.419C14.365 22.68 14.313 22.811 14.373 22.905C14.433 23 14.567 23 14.837 23H21.164C21.434 23 21.569 23 21.628 22.905C21.688 22.811 21.636 22.68 21.533 22.419C21.298 21.825 21.121 21.486 20.826 21.273C20.445 21 19.953 21 18.969 21Z" fill="#6FCCDC" />
                                </svg>

                            </div>

                            {/* Travel summary */}
                            <div className="flex flex-col w-[400px] gap-1">
                                <div className="flex items-center justify-between w-full">
                                    <div className="flex flex-col gap-1 w-[164px]">
                                        <p className="text-[12px] text-[#4B5563]">Jan 24, 23:35</p>
                                        <p className="text-[14px] text-[#191919]">
                                            Hotel king, Punta cana
                                        </p>
                                    </div>

                                    <div className="flex items-center justify-center">
                                        {/* Arrow icon */}
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M18 8L22 12L18 16" stroke="#191919" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                            <path d="M2 12H22" stroke="#191919" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                        </svg>

                                    </div>

                                    <div className="flex flex-col gap-1 w-[164px] text-right">
                                        <p className="text-[12px] text-[#4B5563]">Jan 25, 05:15</p>
                                        <p className="text-[14px] text-[#191919]">
                                            Royal Hotel, Punta cana
                                        </p>
                                    </div>
                                </div>

                                <p className="text-[12px] text-[#747D8F]">
                                    Type: Rent, Time: 3Days 6H
                                </p>
                            </div>
                        </div>

                        {/* Upcoming status */}
                        <div className="flex items-center gap-2 w-[100px]">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M12 22C17.5 22 22 17.5 22 12C22 6.5 17.5 2 12 2C6.5 2 2 6.5 2 12C2 17.5 6.5 22 12 22Z" fill="#33A853" />
                                <path d="M7.75 12L10.58 14.83L16.25 9.17004" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                            </svg>

                            <p className="text-[14px] text-[#33A853]">Upcoming</p>
                        </div>
                    </div>

                    {/* ---------------- INFO BOX ---------------- */}
                    <div className="w-[648px] bg-[#EFF2F880] border border-[#EDF2F9] rounded-xl p-6 flex flex-col gap-12">

                        {/* Travel details */}
                        <div className="flex flex-col gap-3 w-[596px]">
                            <div className="flex items-center gap-4">
                                <h3 className="text-[16px] font-medium text-[#191919]">
                                    Travel details
                                </h3>
                            </div>

                            {/* Fields grid */}
                            <div className="flex flex-wrap gap-x-8 gap-y-4 w-full">

                                {/* Passenger Name */}
                                <div className="flex flex-col w-[120px]">
                                    <p className="text-[13px] text-[#878D97]">Passenger Name</p>
                                    <p className="text-[15px] text-[#191919]">Cynthia Fleming</p>
                                </div>

                                {/* Email */}
                                <div className="flex flex-col w-[202px]">
                                    <p className="text-[13px] text-[#878D97]">Email</p>
                                    <p className="text-[14px] text-[#191919]">
                                        melvinvillavicencio@gmail.com
                                    </p>
                                </div>

                                {/* Phone */}
                                <div className="flex flex-col w-[98px]">
                                    <p className="text-[13px] text-[#878D97]">Phone</p>
                                    <p className="text-[14px] text-[#191919]">+1 8296185692</p>
                                </div>

                                {/* Supplier */}
                                <div className="flex flex-col w-[184px]">
                                    <p className="text-[13px] text-[#878D97]">Supplier data</p>
                                    <p className="text-[14px] text-[#191919]">
                                        OTIUM INTERNATIONAL DMC
                                    </p>
                                </div>

                            </div>
                        </div>


                        {/* ---------------- ACTION BUTTONS ---------------- */}
                        <div className="flex gap-5 w-[600px]">



                            {/* Cancel Ride */}
                            <button className="flex-1 flex justify-center items-center gap-2 px-8 py-3 h-12 bg-[#FFEFF3] border border-[#EE255280] rounded-lg text-[#EE2552] text-[14px]"
                                onClick={() => setIsCancelOpen(true)}
                            >
                                {/* <div className="w-6 h-6 border-2 border-[#EE2552]" /> */}
                                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M14.75 0.75L0.75 14.75M0.75 0.75L14.75 14.75" stroke="#EE2552" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                </svg>

                                Cancel Ride
                            </button>

                            {/* Download Ticket */}
                            <button className="flex-1 flex justify-center items-center gap-2 px-8 py-3 h-12 bg-[#FFEFF3] border border-[#EE255280] rounded-lg text-[#EE2552] text-[14px]" onClick={() => setIsDownloadOpen(true)}>
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M3.99936 14.899C3.2564 14.1399 2.69593 13.2217 2.3604 12.2139C2.02486 11.2062 1.92307 10.1352 2.06272 9.0823C2.20238 8.02935 2.57982 7.022 3.16646 6.13653C3.7531 5.25107 4.53355 4.51071 5.44869 3.97155C6.36384 3.43238 7.38969 3.10855 8.44853 3.02458C9.50737 2.9406 10.5714 3.09868 11.5601 3.48686C12.5488 3.87503 13.4362 4.48311 14.1551 5.26503C14.874 6.04696 15.4055 6.98223 15.7094 8H17.4994C18.4649 7.99989 19.4048 8.31032 20.1804 8.88544C20.9559 9.46056 21.5259 10.2699 21.8061 11.1938C22.0864 12.1177 22.062 13.1073 21.7367 14.0164C21.4113 14.9254 20.8022 15.7057 19.9994 16.242" stroke="#EE2552" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                    <path d="M12 12V21" stroke="#EE2552" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                    <path d="M8 17L12 21L16 17" stroke="#EE2552" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                </svg>

                                Download Ticket
                            </button>
                            {/* setIsRescheduleRideOpen */}
                            {/* Reschedule Ride */}
                            <button className="flex-1 flex justify-center items-center gap-2 px-8 py-3 h-12 bg-[#FFEFF3] border border-[#EE255280] rounded-lg text-[#EE2552] text-[14px]" onClick={() => setIsRescheduleRideOpen(true)}>
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M11.1 3H9.3C4.8 3 3 4.8 3 9.3V14.7C3 19.2 4.8 21 9.3 21H14.7C19.2 21 21 19.2 21 14.7V12.9" stroke="#EE2552" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                    <path d="M15.6886 4.08723L8.9501 10.8266C8.69356 11.0832 8.43702 11.5878 8.38571 11.9556L8.018 14.5299C7.88118 15.4621 8.53963 16.1121 9.47173 15.9839L12.0457 15.6161C12.4048 15.5648 12.9094 15.3082 13.1745 15.0516L19.9129 8.3122C21.0759 7.14905 21.6232 5.79774 19.9129 4.08723C18.2027 2.37671 16.8515 2.92408 15.6886 4.08723Z" stroke="#EE2552" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
                                    <path d="M15 5C15.5425 6.93522 17.0567 8.44939 19 9" stroke="#EE2552" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
                                </svg>

                                Reschedule Ride
                            </button>

                        </div>


                    </div>

                </div>




                {/* ---------------- CANCEL CONFIRMATION MODAL ---------------- */}
                {isCancelOpen && (
                    <div className="fixed inset-0 z-60 flex items-center justify-center bg-black/40">
                        <div className="absolute w-[580px] h-[298px] bg-white rounded-2xl p-8 flex flex-col gap-8">

                            {/* Header */}
                            <div className="flex justify-between items-center">
                                <h3 className="text-[24px] font-medium text-[#1A202C]">Cancel Ride</h3>
                                <button
                                    onClick={() => setIsCancelOpen(false)}
                                    className="w-8 h-8 flex items-center justify-center rounded-full border border-[#1A202C]"
                                >
                                    <X className="w-4 h-4 text-[#1A202C]" />
                                </button>
                            </div>

                            {/* Message */}
                            <p className="text-[16px] text-[#747D8F]">
                                If you cancel your reservation before 12:10 p.m. on July 22, 2025 (Punta Cana time), you will receive a full refund.
                            </p>

                            {/* Buttons */}
                            <div className="flex flex-col gap-4">
                                <button className="w-full h-14 bg-[#EE2552] text-white rounded-lg text-[16px] flex justify-center items-center">
                                    Yes, cancel
                                </button>
                                <button
                                    onClick={() => setIsCancelOpen(false)}
                                    className="w-full h-10 text-[#747D8F] text-[13px] flex justify-center items-center"
                                >
                                    No, go back
                                </button>
                            </div>
                        </div>
                    </div>
                )}


                {/* ---------------- DOWNLOAD TICKET MODAL ---------------- */}
                {isDownloadOpen && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
                        <div className="relative bg-white w-[648px] rounded-2xl shadow-lg overflow-hidden">
                            {/* Close Button */}
                            <button
                                onClick={() => setIsDownloadOpen(false)}
                                className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full border border-gray-300 hover:bg-gray-100"
                            >
                                ✕
                            </button>

                            {/* Main Content */}
                            <section className="flex flex-col items-center text-center px-8 py-12 gap-6">
                                {/* Illustration */}
                                <Image
                                    src="/images/Congratulations/Congratulations.png"
                                    alt="Booking Confirmed"
                                    width={300}
                                    height={300}
                                />

                                {/* Headings */}
                                <h1 className="text-3xl font-medium text-gray-900">Congratulations!</h1>
                                <h2 className="text-2xl text-gray-700">Your rescheduling is Confirmed!</h2>

                                {/* Message */}
                                <div className="text-gray-600 text-sm md:text-base space-y-2 max-w-[550px]">
                                    <p>
                                        Thank you for choosing <span className="font-medium text-gray-900">ToursRepublica!</span>
                                    </p>
                                    <p>Your itinerary will be sent to your email shortly. Please review your journey details carefully.</p>
                                    <p>
                                        If you need assistance, contact us via our Contact Centre, live chat, or email at{" "}
                                        <a href="mailto:support@toursrepublica.com" className="text-red-500 hover:underline">
                                            support@toursrepublica.com
                                        </a>.
                                    </p>
                                    <p className="pt-2 text-gray-500 text-xs">
                                        Please note that ToursRepublica’s fare rules apply to this booking.
                                    </p>
                                </div>

                                <div className="flex flex-col items-center gap-6 mt-6 w-[404px] h-[124px]">
                                    <div className="flex gap-6">
                                        {/* Top Button: Print Ticket */}
                                        <button className="flex flex-row items-center justify-center gap-3 w-[196px] h-[48px] bg-[#EE2552]/10 border border-[#EE2552] rounded-lg px-3 py-3 hover:bg-[#EE2552]/20 transition">
                                            {/* Printer Icon */}
                                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M6 9V2H18V9" stroke="#EE2552" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                                <path d="M6 18H4C3.46957 18 2.96086 17.7893 2.58579 17.4142C2.21071 17.0391 2 16.5304 2 16V11C2 10.4696 2.21071 9.96086 2.58579 9.58579C2.96086 9.21071 3.46957 9 4 9H20C20.5304 9 21.0391 9.21071 21.4142 9.58579C21.7893 9.96086 22 10.4696 22 11V16C22 16.5304 21.7893 17.0391 21.4142 17.4142C21.0391 17.7893 20.5304 18 20 18H18" stroke="#EE2552" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                                <path d="M18 14H6V22H18V14Z" stroke="#EE2552" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                            </svg>

                                            <span className="text-sm font-normal text-[#EE2552]">Print Ticket</span>
                                        </button>

                                        {/* Bottom Button: Download Ticket */}
                                        <button className="flex flex-row items-center justify-center gap-3 w-[196px] h-[48px] bg-[#EE2552] rounded-lg px-3 py-3 hover:bg-[#d9244b] transition">
                                            {/* Cloud Download Icon */}
                                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M3.99936 14.899C3.2564 14.1399 2.69593 13.2217 2.3604 12.2139C2.02486 11.2062 1.92307 10.1352 2.06272 9.08231C2.20238 8.02936 2.57982 7.02201 3.16646 6.13654C3.7531 5.25107 4.53355 4.51072 5.44869 3.97156C6.36384 3.43239 7.38969 3.10856 8.44853 3.02458C9.50737 2.94061 10.5714 3.09869 11.5601 3.48686C12.5488 3.87504 13.4362 4.48312 14.1551 5.26504C14.874 6.04697 15.4055 6.98224 15.7094 8H17.4994C18.4649 7.99989 19.4048 8.31033 20.1804 8.88545C20.9559 9.46056 21.5259 10.2699 21.8061 11.1938C22.0864 12.1178 22.062 13.1073 21.7367 14.0164C21.4113 14.9254 20.8022 15.7057 19.9994 16.242" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                                <path d="M12 12V21" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                                <path d="M8 17L12 21L16 17" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                            </svg>

                                            <span className="text-sm font-normal text-white">Download Ticket</span>
                                        </button>
                                    </div>

                                    {/* Back to Homepage */}
                                    <Link
                                        href="/"
                                        className="flex flex-row items-center justify-center gap-3 w-[210px] mt-8 h-[28px]  rounded-lg px-3 py-1 hover:bg-gray-100 transition"
                                    >
                                        {/* Left Arrow Icon */}
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M6 8L2 12L6 16" stroke="#1A202C" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                            <path d="M2 12H22" stroke="#1A202C" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                        </svg>

                                        <span className="text-base font-normal text-[#1A202C]">Back to Homepage</span>
                                    </Link>
                                </div>


                            </section>
                        </div>
                    </div>
                )}


                {/* ---------------- Reschedule Ride MODAL ---------------- */}
                {isRescheduleRideOpen && (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
    <div className="bg-white rounded-[24px] p-8 w-[720px] h-[454px] max-w-full shadow relative">
      {/* Close Button */}
      <button
        onClick={() => setIsRescheduleRideOpen(false)}
        className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
      >
        ✕
      </button>

      <div className="flex flex-col gap-6 w-full">
        <RescheduleRideForm/>
      </div>
    </div>
  </div>

)}




            </div>
        </div>
    );
}
