import { useContext, useEffect, useRef, useState } from "react";
import {
  registerUserOtpDetailApi,
  registerUserVerificationApi,
} from "../../app/api/userApi";
import toast from "react-hot-toast";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import RecentOtpButton from "../buttons/RecentOtpButton";
import PageLoader from "../Loader/PageLoader";
import { otpValidationSchema } from "../../validations/Authentication";
import AuthContext from "../../context/AuthUser";

const RegisterOtpComponent = () => {
  let length = 4;
  let { id } = useParams();
  const { refetch } = useContext(AuthContext);

  //ref
  const inputRefs = useRef([]);

  //states
  const [errors, setErrors] = useState({});
  const [otp, setOtp] = useState(new Array(length).fill(""));

  //react quires
  const {
    isError: detailIsError,
    data: otpData,
    error: detailError,
    isLoading: detailLoading,
  } = useQuery({
    queryKey: ["get-otp-detail", id],
    queryFn: () => registerUserOtpDetailApi(id),
    refetchOnWindowFocus: false,
  });

  const { mutate, isPending } = useMutation({
    mutationFn: registerUserVerificationApi,

    onError: (error) => {
      toast.error(error.response.data.message);
    },

    onSuccess: (data) => {
      toast.success(data.message);
      refetch();
    },
  });

  //fundtions
  const handleSubmit = async () => {
    try {
      console.log(otp.join(""));
      await otpValidationSchema.validate(
        { otp: otp.join("") },
        { abortEarly: false }
      );
      mutate({
        otp: otp.join(""),
        otpId: id,
      });
    } catch (error) {
      const newErrors = {};

      error.inner.forEach((err) => {
        newErrors[err.path] = err.message;
      });

      setErrors(newErrors);
    }
  };

  const handleChange = (index, e) => {
    const value = e.target.value;
    if (isNaN(value)) return;

    const newOtp = [...otp];
    // allow only one input
    newOtp[index] = value.substring(value.length - 1);
    setOtp(newOtp);

    // // submit trigger
    // const combinedOtp = newOtp.join("");
    // if (combinedOtp.length === length) handleSubmit(combinedOtp);

    // Move to next input if current field is filled
    if (value && index < length - 1 && inputRefs.current[index + 1]) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleClick = (index) => {
    inputRefs.current[index].setSelectionRange(1, 1);

    // optional
    if (index > 0 && !otp[index - 1]) {
      inputRefs.current[otp.indexOf("")].focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (
      e.key === "Backspace" &&
      !otp[index] &&
      index > 0 &&
      inputRefs.current[index - 1]
    ) {
      // Move focus to the previous input field on backspace
      inputRefs.current[index - 1].focus();
    }
  };

  //useEffect
  useEffect(() => {
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  }, []);

  useEffect(() => {
    if (detailIsError) {
      toast.error(detailError.response.data.message);
    }
  }, [detailIsError, detailError]);

  return detailLoading ? (
    <PageLoader />
  ) : (
    <div className="h-full w-full bg-ce rounded-lg p-5 flex flex-col gap-5">
      <div className="flex flex-col gap-2">
        <h1 className="text-4xl font-bold text-ca">OTP Verification</h1>
        <p className="font-semibold text-sm text-cc">
          Please enter the OTP (One-Time Password) sent to your registered email
          <span className="text-blue-600">
            {otpData &&
              `  ${otpData?.data?.email.replace(
                otpData?.data?.email.split("@")[0].slice(3),
                "****"
              )}`}
          </span>
          to complete your verification.
        </p>
      </div>
      <hr className="border border-cd" />
      <div className="flex flex-col gap-3">
        <div className="flex items-center justify-center gap-4 h-[10vh]">
          {otp.map((value, index) => {
            return (
              <input
                key={index}
                type="text"
                ref={(input) => (inputRefs.current[index] = input)}
                value={value}
                onChange={(e) => handleChange(index, e)}
                onClick={() => handleClick(index)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                className="p-2 h-10 w-10 bg-transparent border border-cc rounded-lg"
              />
            );
          })}
        </div>
        {errors.otp && (
          <span className="text-sm text-red-400 font-medium">{errors.otp}</span>
        )}

        <div className="text-sm flex gap-2 self-end">
          <RecentOtpButton />
        </div>

        <button
          onClick={handleSubmit}
          className="bg-cc text-white py-2 rounded-lg font-semibold transition-all ease-in-out duration-300 hover:bg-cb disabled:bg-gray-500"
          disabled={isPending}
        >
          {isPending ? "loading" : "Submit"}
        </button>
      </div>

      <hr className="border border-cd" />
    </div>
  );
};

export default RegisterOtpComponent;
