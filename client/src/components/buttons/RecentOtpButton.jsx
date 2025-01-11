import { memo, useEffect } from "react";
import { useState } from "react";
import { useRef } from "react";
import { registerUserVerificationResendOtpApi } from "../../app/api/userApi";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";

const RecentOtpButton = () => {
  const { id } = useParams();
  const [num, setNum] = useState(30);

  //react-queries
  const { isSuccess, isError, data, error, isLoading, refetch } = useQuery({
    queryKey: ["get-otp-resend", id],
    queryFn: () => registerUserVerificationResendOtpApi(id),
    refetchOnWindowFocus: false,
    enabled: false,
  });

  //ref
  let intervalRef = useRef();

  //functions
  const decreaseNum = () => setNum((prev) => prev - 1);

  const handleResend = () => {
    refetch();
    setNum(30);
  };

  //useEffect
  useEffect(() => {
    num === 0
      ? clearInterval(intervalRef.current)
      : (intervalRef.current = setInterval(decreaseNum, 1000));
    return () => clearInterval(intervalRef.current);
  }, [num]);

  useEffect(() => {
    if (isError) {
      toast.error(error.response.data.message);
    }
    if (isSuccess) {
      toast.success(data.message);
    }
  }, [isError, error, isSuccess, data]);

  return (
    <div className="flex gap-2">
      {"Didn't got the code?"}

      {isLoading ? (
        <span className="font-semibold text-cc">loading...</span>
      ) : num > 0 ? (
        <span className="font-semibold text-cc">
          {`${num < 10 ? `0${num}` : num}s`}
        </span>
      ) : (
        <button
          className="font-semibold text-cc hover:underline"
          onClick={handleResend}
        >
          Resend OTP
        </button>
      )}
    </div>
  );
};

export default memo(RecentOtpButton);
