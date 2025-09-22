"use client";
import React, { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Input from "@/components/ui/input";
import Button from "@/components/ui/button";
import { verifyOtp, resendOtp } from "@/api/api";

const VerifyOTP = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const email = searchParams.get("email") || "";

  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [timer, setTimer] = useState(300);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  // Countdown
  useEffect(() => {
    if (timer <= 0) return;
    const interval = setInterval(() => setTimer((prev) => prev - 1), 1000);
    return () => clearInterval(interval);
  }, [timer]);

  const formatTime = (seconds: number) => {
    const min = Math.floor(seconds / 60);
    const sec = seconds % 60;
    return `${min}:${sec < 10 ? "0" + sec : sec}`;
  };

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!otp || !email) return;

    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      await verifyOtp({ email, otp });
      setSuccess("OTP verified! Redirecting...");
      setTimeout(() => {
        router.push(
          `/update-password?email=${encodeURIComponent(
            email
          )}&token=${encodeURIComponent(otp)}`
        );
      }, 1500);
    } catch (err: any) {
      setError(err?.response?.data?.message || "Invalid or expired OTP");
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    if (!email) return;
    setLoading(true);
    setError(null);
    setSuccess(null);
    try {
      await resendOtp({ email });
      setSuccess("OTP resent successfully!");
      setTimer(300);
    } catch (err: any) {
      setError(err?.response?.data?.message || "Failed to resend OTP");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen flex items-center justify-center">
      <div className="w-full max-w-md p-6 bg-white shadow rounded-md">
        <h2 className="text-xl font-semibold text-center mb-4">
          Verify Your Account
        </h2>
        <p className="text-center text-sm text-gray-600 mb-4">
          Enter the 6-digit OTP sent to <b>{email}</b>
        </p>
        {error && <p className="text-red-500 text-center">{error}</p>}
        {success && <p className="text-green-500 text-center">{success}</p>}

        <form onSubmit={handleVerify} className="flex flex-col gap-3">
          <Input
            label="OTP"
            placeholder="Enter OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            maxLength={6}
          />
          {timer > 0 ? (
            <p className="text-center text-sm text-gray-600">
              OTP expires in{" "}
              <span className="font-semibold">{formatTime(timer)}</span>
            </p>
          ) : (
            <p className="text-center text-sm text-red-500 font-medium">
              OTP expired
            </p>
          )}
          <Button type="submit" loading={loading} disabled={timer <= 0}>
            Verify
          </Button>
        </form>

        <div className="text-center mt-2">
          <p className="text-sm text-gray-600">
            Didn’t get the OTP?{" "}
            <button
              onClick={handleResend}
              disabled={loading}
              className="text-blue-600 hover:underline"
            >
              Resend OTP
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default VerifyOTP;
