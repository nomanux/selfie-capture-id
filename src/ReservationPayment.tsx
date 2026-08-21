import { useState } from "react";
import bpiLogo from "./assets/BPI.svg";
import bdoLogo from "./assets/BDO.svg";
import gcashLogo from "./assets/Gcash.svg";
import unionbankLogo from "./assets/Union Bank.svg";
import paymentMethodIcons from "./assets/Payment Method Icons.svg";
import dmciLogo from "./assets/dmci sales.svg";
import Button from "./Button";

interface PropertyInfo {
  holdingId: string;
  customerAccountNo: string;
  customerName: string;
  property: string;
  propertyUnit: string;
  description: string;
}

interface PaymentSummaryInfo {
  reservationFee: number;
  convenienceFee: number;
}

interface ReservationPaymentProps {
  propertyInfo?: PropertyInfo;
  paymentSummary?: PaymentSummaryInfo;
  onProceedPayment?: () => void;
}

const PAYMENT_METHODS = [
  { id: "visa", name: "VISA/MC/AMEX/JCB", logo: paymentMethodIcons },
  { id: "bpi", name: "BPI", logo: bpiLogo },
  { id: "gcash", name: "GCash", logo: gcashLogo },
  { id: "bdo", name: "BDO", logo: bdoLogo },
  { id: "unionbank", name: "UnionBank", logo: unionbankLogo },
];

export default function ReservationPayment({
  propertyInfo = {
    holdingId: "HLD0327518",
    customerAccountNo: "B000208311",
    customerName: "Jose B. Santos",
    property: "CAL",
    propertyUnit: "CAL-00A-C-12020",
    description: "Reservation fee for Unit CAL-00A-C-12020",
  },
  paymentSummary = {
    reservationFee: 30000,
    convenienceFee: 628,
  },
  onProceedPayment,
}: ReservationPaymentProps) {
  const [selectedMethod, setSelectedMethod] = useState<string>("visa");

  const totalAmount =
    paymentSummary.reservationFee + paymentSummary.convenienceFee;

  const handleProceedPayment = () => {
    if (selectedMethod) {
      onProceedPayment?.();
    }
  };

  return (
    <div className="min-h-screen w-full bg-gray-50 flex flex-col items-center">
      {/* Header Navigation */}
      <div className="bg-white border-b border-gray-200 w-full">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-5 flex items-center justify-between min-h-16 sm:h-20">
          <div className="flex items-center gap-2 sm:gap-4">
            <img
              src={dmciLogo}
              alt="DMCI Sales"
              className="h-6 sm:h-8 w-auto"
            />
          </div>
          <div className="flex items-center gap-4 opacity-0">
            <div className="w-10 h-10 rounded-full bg-brand-600 flex items-center justify-center text-white text-sm font-semibold">
              OR
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-900">Olivia Rhye</p>
              <p className="text-xs text-secondary-600">olivia@bjitgroup.com</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex items-start justify-center py-3 sm:py-6 px-0 sm:px-6 lg:px-8">
        <div className="max-w-7xl w-full bg-white sm:rounded-2xl flex flex-col gap-3 sm:gap-10 items-center p-3 sm:p-8">
          {/* Page Heading */}
          <div className="text-center w-full">
            <h1 className="text-lg sm:text-2xl font-bold text-brand-500 mb-1 sm:mb-3">
              Reservation Payment
            </h1>
            <p className="text-xs sm:text-base text-gray-700">
              Review your details and complete your reservation payment.
            </p>
          </div>

          {/* Two Column Layout Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-[1.10fr_0.90fr] gap-3 sm:gap-5 w-full">
            {/* Left Column - Payment (Shown Second on Mobile, First on Desktop) */}
            <div className="flex flex-col gap-3 sm:gap-5 order-2 sm:order-1 w-full">
              {/* Payment Method Selection Card */}
              <div className="border border-gray-200 rounded-xl sm:sm:rounded-2xl p-4 sm:p-6  my-2 sm:my-0 flex flex-col gap-8">
                <div className="flex flex-col gap-2">
                  <h2 className="text-base sm:text-lg font-semibold text-gray-900">
                    Select Payment Method
                  </h2>
                  <p className="text-xs sm:text-sm text-gray-600">
                    Choose how you'd like to pay
                  </p>
                </div>

                <div className="flex flex-col gap-3.75">
                  {/* Payment Method Grid */}
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-4 gap-y-3">
                    {PAYMENT_METHODS.map((method, index) => (
                      <button
                        key={method.id}
                        onClick={() => setSelectedMethod(method.id)}
                        className={`flex flex-col items-center justify-center h-12 rounded-lg border-2 transition-all relative ${
                          index === 0 ? "col-span-2" : ""
                        } ${
                          selectedMethod === method.id
                            ? "border-brand-500 bg-white"
                            : "border-gray-100 bg-white hover:border-gray-200"
                        }`}
                        title={method.name}
                      >
                        {method.logo && (
                          <img
                            src={method.logo}
                            alt={method.name}
                            className="h-6 w-auto object-contain max-w-full"
                          />
                        )}
                        {selectedMethod === method.id && (
                          <div className="absolute -top-4 -right-4 w-7 h-7 bg-brand-700 rounded-full flex items-center justify-center border-2 border-white shadow-md">
                            <svg
                              className="w-4 h-4 text-white"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path
                                fillRule="evenodd"
                                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                clipRule="evenodd"
                              />
                            </svg>
                          </div>
                        )}
                      </button>
                    ))}
                  </div>

                  {/* Payment Method Info Box */}
                  <div className="bg-gray-50 rounded-lg px-5 py-3 space-y-1.5 text-xs sm:text-sm">
                    <div className="flex justify-between">
                      <span className="font-semibold text-gray-500">Note</span>
                      <span className="text-gray-900 text-right">
                        To be paid in PHP
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-semibold text-gray-500">
                        Method
                      </span>
                      <span className="text-gray-900">Debit Card</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-semibold text-gray-500">
                        Gateway
                      </span>
                      <span className="text-gray-900">PAYMAYA</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-semibold text-gray-500">
                        Convenience Fee
                      </span>
                      <span className="text-gray-900">210.0</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Total Amount Section */}
              <div className="border border-brand-50 rounded-2xl p-6 flex flex-col gap-4 items-center bg-brand-25">
                <div className="text-center w-full">
                  <p className="text-sm uppercase text-gray-500 font-normal mb-2 tracking-widest">
                    Total Amount Due
                  </p>
                  <h3 className="text-xl font-bold text-brand-500 mb-2 leading-tight">
                    PHP
                    {totalAmount.toLocaleString("en-US", {
                      minimumFractionDigits: 2,
                    })}
                  </h3>
                  <p className="text-xs italic text-brand-600">
                    (Thirty thousand six hundred twenty eight)
                  </p>
                </div>

                <Button
                  variant="primary"
                  size="lg"
                  onClick={handleProceedPayment}
                  className="w-full flex items-center justify-center gap-2"
                >
                  <span>Proceed with Payment</span>
                  <svg
                    className="w-3.5 sm:w-4 h-3.5 sm:h-4 transition-transform group-hover:translate-x-0.5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 7l5 5m0 0l-5 5m5-5H6"
                    />
                  </svg>
                </Button>
              </div>
            </div>

            {/* Right Column - Property Info */}
            <div className="flex flex-col gap-3 sm:gap-5 w-full order-1 sm:order-2 h-full">
              {/* Property Information Card */}
              <div className="bg-gray-100 border border-gray-100 rounded-xl sm:sm:rounded-2xl p-3 sm:p-6">
                <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-2.5 sm:mb-8">
                  Property Information
                </h3>

                <div className="bg-white border border-gray-100 rounded-xl p-2.5 sm:p-4 mb-2.5 sm:mb-4">
                  <div className="flex gap-1 sm:gap-2 items-center justify-between">
                    <span className="text-gray-700 text-sm sm:text-lg">
                      Holding ID
                    </span>
                    <span className="font-bold text-gray-900 text-xs sm:text-base">
                      {propertyInfo.holdingId}
                    </span>
                  </div>
                </div>

                <div className="space-y-1.5 sm:space-y-2 px-1 sm:px-2 text-xs sm:text-sm">
                  <div className="flex gap-1 sm:gap-2 items-center">
                    <span className="font-semibold text-gray-500 w-28 sm:w-36 flex-shrink-0">
                      Customer Acc. No.
                    </span>
                    <span className="text-gray-500 flex-shrink-0">:</span>
                    <span className="text-gray-900 text-right flex-1">
                      {propertyInfo.customerAccountNo}
                    </span>
                  </div>
                  <div className="flex gap-1 sm:gap-2 items-center">
                    <span className="font-semibold text-gray-500 w-28 sm:w-36 flex-shrink-0">
                      Customer Name
                    </span>
                    <span className="text-gray-500 flex-shrink-0">:</span>
                    <span className="text-gray-900 text-right flex-1">
                      {propertyInfo.customerName}
                    </span>
                  </div>
                  <div className="flex gap-1 sm:gap-2 items-center">
                    <span className="font-semibold text-gray-500 w-28 sm:w-36 flex-shrink-0">
                      Property
                    </span>
                    <span className="text-gray-500 flex-shrink-0">:</span>
                    <span className="text-gray-900 text-right flex-1">
                      {propertyInfo.property}
                    </span>
                  </div>
                  <div className="flex gap-1 sm:gap-2 items-center">
                    <span className="font-semibold text-gray-500 w-28 sm:w-36 flex-shrink-0">
                      Property Unit
                    </span>
                    <span className="text-gray-500 flex-shrink-0">:</span>
                    <span className="text-gray-900 text-right flex-1">
                      {propertyInfo.propertyUnit}
                    </span>
                  </div>
                  <div className="flex gap-1 sm:gap-2 items-start">
                    <span className="font-semibold text-gray-500 w-28 sm:w-36 flex-shrink-0">
                      Description
                    </span>
                    <span className="text-gray-500 flex-shrink-0">:</span>
                    <span className="text-gray-900 text-right flex-1">
                      {propertyInfo.description}
                    </span>
                  </div>
                </div>
              </div>

              {/* Payment Summary Card */}
              <div className="bg-gray-50 border border-gray-100 rounded-xl sm:sm:rounded-2xl p-3 sm:p-6 grow flex flex-col">
                <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-2.5 sm:mb-8">
                  Payment Summary
                </h3>

                <div className="space-y-2 sm:space-y-4">
                  <div className="flex justify-between items-center text-xs sm:text-sm">
                    <span className="text-gray-500">Reservation Fee</span>
                    <span className="text-gray-900 font-normal">
                      PHP
                      {paymentSummary.reservationFee.toLocaleString("en-US", {
                        minimumFractionDigits: 2,
                      })}
                    </span>
                  </div>
                  <div className="flex justify-between items-center text-xs sm:text-sm">
                    <span className="text-gray-500">Convenience Fee</span>
                    <span className="text-gray-900 font-normal">
                      PHP
                      {paymentSummary.convenienceFee.toLocaleString("en-US", {
                        minimumFractionDigits: 2,
                      })}
                    </span>
                  </div>

                  <div className="border-t border-brand-50 pt-2 sm:pt-4">
                    <div className="flex justify-between items-center">
                      <span className="text-xs sm:text-base text-gray-900 font-normal">
                        Total
                      </span>
                      <span className="text-lg sm:text-xl font-bold text-brand-500">
                        PHP
                        {totalAmount.toLocaleString("en-US", {
                          minimumFractionDigits: 2,
                        })}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
