"use client";
/* eslint-disable @next/next/no-img-element */
import React from "react";
import Link from "next/link";

// @material-tailwind/react
import { Input, Button, Typography } from "@/components/MaterialTailwind";
import { SubmitHandler, useForm } from "react-hook-form";
import { TAuthREQ } from "@/redux/api/auth/auth.request";
import { useLoginMutation } from "@/redux/api/auth/auth.api";
import { useDispatch } from "react-redux";
import { updateInfo, updateToken } from "@/redux/slices/appSlices";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

export default function BasicPage() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<TAuthREQ>();
  const router = useRouter();
  const dispatch = useDispatch();
  const [login, { isLoading: isLoadingLogin }] = useLoginMutation();
  const onSubmit: SubmitHandler<TAuthREQ> = async (data) => {
    await login(data)
      .unwrap()
      .then((value) => {
        dispatch(updateToken(value.token));
        dispatch(updateInfo(value.username));
        localStorage.setItem("token", value.token);
        localStorage.setItem("roles", value.roles);
        toast.success("Đăng nhập thành công");
        router.push("/iqr/iqr-list");
      })
      .catch((e) => {
        toast.error(
          "Đăng nhập thất bại, vui lòng kiểm tra thông tin đăng nhập"
        );
      });
  };

  return (
    <section className=" tw-h-full">
      <div className="tw-w-full tw-min-h-screen tw-justify-center tw-items-center tw-flex">
        <div className="tw-w-1/2">
          <div className="tw-text-center">
            <Typography variant="h2" className="!tw-font-bold tw-mb-4">
              Đăng nhập
            </Typography>
            <Typography className="tw-text-lg !tw-font-normal !tw-text-blue-gray-500">
              Nhập tài khoản và mật khẩu của bạn
            </Typography>
          </div>
          <div className="tw-mt-8 tw-mb-2 tw-mx-auto tw-w-80 tw-max-w-screen-lg lg:tw-w-1/2">
            <div className="tw-mb-1 tw-flex tw-flex-col tw-gap-4">
              <Input
                size="lg"
                label="Tên tài khoản"
                {...register("username", { required: true })}
              />
              {errors.password && (
                <span className="tw-text-red-700 tw-text-sm">
                  {errors.password.type === "required"
                    ? "Trường thông tin bắt buộc"
                    : "Lỗi không xác định"}
                </span>
              )}

              <Input
                type="password"
                size="lg"
                label="Mật khẩu"
                {...register("password", { required: true })}
              />
              {errors.password && (
                <span className="tw-text-red-700 tw-text-sm">
                  {errors.password.type === "required"
                    ? "Trường thông tin bắt buộc"
                    : "Lỗi không xác định"}
                </span>
              )}
            </div>
            {/* <Checkbox
              label={
                <Typography
                  variant="small"
                  className="tw-flex !tw-text-blue-gray-500 tw-items-center tw-justify-start !tw-font-medium"
                >
                  I agree the&nbsp;
                  <a
                    href="#"
                    className="!tw-font-medium !tw-text-blue-gray-500 tw-transition-colors hover:tw-text-gray-900 tw-underline"
                  >
                    Terms and Conditions
                  </a>
                </Typography>
              }
              containerProps={{ className: "-tw-ml-2.5" }}
            /> */}
            {/* <Link href={"/dashboard/sales"}> */}
            <Button
              className="tw-mt-6 !tw-flex tw-gap-2 !tw-justify-center !tw-items-center"
              fullWidth
              loading={isLoadingLogin}
              onClick={() => handleSubmit(onSubmit)()}
              color="orange"
            >
              Đăng nhập
            </Button>
            {/* </Link> */}

            {/* <div className="tw-flex tw-items-center tw-justify-between tw-gap-2 tw-mt-6">
              <Checkbox
                label={
                  <Typography
                    variant="small"
                    color="gray"
                    className="tw-flex tw-items-center tw-justify-start !tw-font-medium"
                  >
                    Subscribe me to newsletter
                  </Typography>
                }
                containerProps={{ className: "-tw-ml-2.5" }}
              />
              <Typography
                variant="small"
                className="!tw-font-medium tw-text-gray-900"
              >
                <a href="#">Forgot Password</a>
              </Typography>
            </div>
            <div className="tw-space-y-4 tw-mt-8">
              <Button
                size="lg"
                color="white"
                className="tw-flex tw-items-center tw-gap-2 tw-justify-center tw-shadow-md"
                fullWidth
              >
                <svg
                  width="17"
                  height="16"
                  viewBox="0 0 17 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g clipPath="url(#clip0_1156_824)">
                    <path
                      d="M16.3442 8.18429C16.3442 7.64047 16.3001 7.09371 16.206 6.55872H8.66016V9.63937H12.9813C12.802 10.6329 12.2258 11.5119 11.3822 12.0704V14.0693H13.9602C15.4741 12.6759 16.3442 10.6182 16.3442 8.18429Z"
                      fill="#4285F4"
                    />
                    <path
                      d="M8.65974 16.0006C10.8174 16.0006 12.637 15.2922 13.9627 14.0693L11.3847 12.0704C10.6675 12.5584 9.7415 12.8347 8.66268 12.8347C6.5756 12.8347 4.80598 11.4266 4.17104 9.53357H1.51074V11.5942C2.86882 14.2956 5.63494 16.0006 8.65974 16.0006Z"
                      fill="#34A853"
                    />
                    <path
                      d="M4.16852 9.53356C3.83341 8.53999 3.83341 7.46411 4.16852 6.47054V4.40991H1.51116C0.376489 6.67043 0.376489 9.33367 1.51116 11.5942L4.16852 9.53356Z"
                      fill="#FBBC04"
                    />
                    <path
                      d="M8.65974 3.16644C9.80029 3.1488 10.9026 3.57798 11.7286 4.36578L14.0127 2.08174C12.5664 0.72367 10.6469 -0.0229773 8.65974 0.000539111C5.63494 0.000539111 2.86882 1.70548 1.51074 4.40987L4.1681 6.4705C4.8001 4.57449 6.57266 3.16644 8.65974 3.16644Z"
                      fill="#EA4335"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_1156_824">
                      <rect
                        width="16"
                        height="16"
                        fill="white"
                        transform="translate(0.5)"
                      />
                    </clipPath>
                  </defs>
                </svg>
                <span>Sign in With Google</span>
              </Button>
              <Button
                size="lg"
                color="white"
                className="tw-flex tw-items-center tw-gap-2 tw-justify-center tw-shadow-md"
                fullWidth
              >
                <img src="/img/twitter-logo.svg" alt="Twitter logo" />
                <span>Sign in With Twitter</span>
              </Button>
            </div>
            <Typography className="tw-text-center !tw-text-blue-gray-500 !tw-font-medium tw-mt-4">
              Not registered?
              <Link
                href="/auth/signup/basic-signup"
                className="tw-text-gray-900 tw-ml-1"
              >
                Create account
              </Link>
            </Typography> */}
          </div>
        </div>
      </div>
      {/* <div className="tw-p-8 tw-hidden xl:tw-block">
        <img
          src="/img/bayer.jpg"
          alt="image"
          className="tw-object-cover tw-object-center tw-max-h-[calc(100vh-4rem)] tw-w-full tw-rounded-2xl"
        />
      </div> */}
    </section>
  );
}
