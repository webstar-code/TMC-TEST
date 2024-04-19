"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { authApi } from "api/auth";
import { Ellipse, Ellipse1 } from "assets/images";
import { Icons } from "components/Icons";
import {
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "lib/firebase";
import { useUserStore } from "lib/store";
import { Loader2 } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import router from "next/router";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import {
  Button,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
  Input,
} from "ui";
import { ROUTES } from "utils/routes";
import * as z from "zod";

const formSchema = z.object({
  email: z.string(),
  otp: z.string().optional(),
  password: z.string().optional(),
});

export default function Login() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });
  const [meta, setMeta] = useState({
    title: "Sign In",
    description: "Sign in to start your journey!",
  });
  const [loading, setLoading] = useState(false);
  const [showOtpInput, setShowOtpInput] = useState(false);
  const [showPasswordInput, setShowPasswordInput] = useState(false);
  const [showSetPassword, setShowSetPassword] = useState(false);
  const [showPasswordText, setShowPasswordText] = useState(false);
  const [resetPasswordMailSent, setResetPasswordMailSent] = useState(false);
  const [error, setError] = useState("");
  const [email, setEmail] = useState("");
  const { user } = useUserStore();

  const router = useRouter();

  useEffect(() => {
    setShowOtpInput(false);
    setShowPasswordInput(false);
    setShowSetPassword(false);
    form.resetField("otp");
    form.resetField("password");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [form.watch("email")]);

  const checkUserExists = async (data: z.infer<typeof formSchema>) => {
    setLoading(true);
    setEmail(data.email);
    setError("");
    authApi
      .getUserByEmail(data.email)
      .then(async (res) => {
        if (res.status === "ok" && res.data) {
          setShowPasswordInput(true);
        } else {
          await authApi.sendOTP(data.email);
          setShowOtpInput(true);
        }
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  };

  const login: SubmitHandler<{ email: string; password: string }> = async (
    data
  ) => {
    setLoading(true);
    setError("");
    try {
      const res = await authApi.getUserByEmail(email);
      if (res.data) {
        signInWithEmailAndPassword(auth, email, data.password).catch(
          (error) => {
            const errorCode = error.code;
            if (errorCode === "auth/invalid-login-credentials") {
              setError(errorCode);
            } else {
              setError(errorCode);
            }
            setLoading(false);
          }
        );
      }
    } catch (err) {
      setLoading(false);
    }
  };

  const confirmOTP: SubmitHandler<{ email: string; otp: string }> = async (
    data
  ) => {
    setLoading(true);
    authApi
      .verifyOTP(data.email, data.otp)
      .then((data) => {
        if (data.success) {
          setShowOtpInput(false);
          setShowSetPassword(true);
        } else {
          setError(data.message);
        }
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  };

  const resetPassword = async () => {
    if (!email) {
      return;
    }
    sendPasswordResetEmail(auth, email, {
      url: `${window.location.origin}`,
    }).then(() => {
      setResetPasswordMailSent(true);
    });
  };

  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (!showOtpInput && !showPasswordInput) checkUserExists(values);
    if (!showOtpInput && showPasswordInput && values.password)
      login({ email: values.email, password: values.password });
    if (showOtpInput && !showPasswordInput && values.otp) {
      confirmOTP({ email: values.email, otp: values.otp });
    }
  }

  if (showSetPassword) {
    return (
      <SetPassword email={email} setShowSetPassword={setShowSetPassword} />
    );
  }

  if (user) {
    router.replace(ROUTES.exams);
  }

  return (
    <div className="relative w-full min-h-screen bg-primary flex items-center justify-center">
      <div className="fixed top-0 right-0 z-10">
        <Image src={Ellipse} alt="logo" width={200} height={200} />
      </div>
      <div className="fixed left-0 bottom-0 z-10">
        <Image src={Ellipse1} alt="logo" width={210} height={210} />
      </div>

      <div className="container flex items-center justify-center z-20">
        <div className="relative w-full max-w-xl flex flex-col gap-6 px-6 py-20 items-center justify-center bg-background rounded-lg">
          <div
            className="absolute right-6 top-6 z-50 cursor-pointer"
            onClick={() => router.push("/")}>
            <Icons.close width={32} height={32} />
          </div>
          <h1 className="text-2xl font-bold">{meta.title}</h1>
          <p className="max-w-sm text-sm text-accent text-center">
            {meta.description}
          </p>
          <div className="w-full max-w-sm flex flex-col gap-6">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="w-full flex flex-col gap-y-6">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormControl>
                        <Input
                          label="Email"
                          type="email"
                          id="email"
                          placeholder="Enter your email Id"
                          onChange={(e) => field.onChange(e.target.value)}
                          value={field.value}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {showOtpInput && !showSetPassword && (
                  <FormField
                    control={form.control}
                    name="otp"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormControl>
                          <Input
                            label="OTP"
                            type="tel"
                            id="otp"
                            placeholder="Enter your 6 digit OTP"
                            onChange={(e) => field.onChange(e.target.value)}
                            value={field.value}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                )}
                {showPasswordInput && (
                  <div className="flex flex-col relative">
                    <FormField
                      control={form.control}
                      name="password"
                      render={({ field }) => (
                        <FormItem className="w-full">
                          <FormControl>
                            <Input
                              label="Password"
                              type={showPasswordText ? "text" : "password"}
                              id="password"
                              placeholder="Enter your password"
                              onChange={(e) => field.onChange(e.target.value)}
                              value={field.value}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <p
                      onClick={() => resetPassword()}
                      className="self-end text-xs text-black font-medium underline underline-offset-2 cursor-pointer mt-1">
                      Forget Password
                    </p>
                    <div
                      className="absolute right-3 top-4 cursor-pointer items-center z-20"
                      onClick={() => setShowPasswordText(!showPasswordText)}>
                      {showPasswordText ? (
                        <Icons.eye className="w-4 h-4" />
                      ) : (
                        <Icons.eyeSlash className="w-4 h-4" />
                      )}
                    </div>
                  </div>
                )}
                <Button type="submit" className="w-full mt-10">
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Please wait
                    </>
                  ) : (
                    "Continue"
                  )}
                </Button>
              </form>
            </Form>
            <p className="text-xs">
              By continuing, you agree to the &nbsp;
              <span className="font-medium underline cursor-pointer">
                Terms of service
              </span>
              &nbsp; and&nbsp;
              <span className="font-medium underline cursor-pointer">
                Privacy Policy
              </span>
              .
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function SetPassword({
  email,
  setShowSetPassword,
}: {
  email: string;
  setShowSetPassword: any;
}) {
  const formSchema = z.object({
    password: z.string(),
    confirmPassword: z.string(),
  });
  const [error, setError] = useState("");
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });
  const [loading, setLoading] = useState(false);
  const [showPasswordText, setShowPasswordText] = useState(false);

  const signin: SubmitHandler<{
    password: string;
    confirmPassword: string;
  }> = async (data) => {
    if (data.password != data.confirmPassword) {
      setError("Password does not match");
      return;
    }
    setError("");
    setLoading(true);
    try {
      createUserWithEmailAndPassword(auth, email, data.password)
        .then(async (userCredential) => {
          const user = userCredential.user;
          await authApi.createUser(user.uid, email);
          setLoading(false);
        })
        .catch((error) => {
          const errorCode = error.code;
          if (errorCode === "auth/weak-password") {
            setError(errorCode);
          }
          if (errorCode === "auth/email-already-in-use") {
            setError(errorCode);
            setShowSetPassword(false);
          }
          setLoading(false);
        });
    } catch (err) {
      setLoading(false);
    }
  };

  return (
    <div className="w-full min-h-screen bg-black flex items-center justify-center">
      <div className="container flex items-center justify-center">
        <div className="relative w-full max-w-xl flex flex-col gap-6 px-6 py-20 items-center justify-center bg-background rounded-lg">
          <div
            className="absolute right-6 top-6 z-50 cursor-pointer"
            onClick={() => router.back()}>
            <Icons.close width={32} height={32} />
          </div>
          <div
            className="absolute left-6 top-6 z-50 cursor-pointer"
            onClick={() => setShowSetPassword(false)}>
            <Icons.arrowLeft width={32} height={32} />
          </div>

          <h1 className="text-2xl font-bold">Set your password!</h1>
          <p className="max-w-sm text-sm text-accent text-center">
            Enter your password and continue
          </p>
          <div className="w-full max-w-sm flex flex-col gap-6">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(signin)}
                className="w-full flex flex-col gap-y-6">
                <div className="flex flex-col relative">
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormControl>
                          <Input
                            label="Password"
                            type={showPasswordText ? "text" : "password"}
                            id="password"
                            placeholder="Enter your password"
                            onChange={(e) => field.onChange(e.target.value)}
                            value={field.value}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div
                    className="absolute right-3 top-4 cursor-pointer items-center z-20"
                    onClick={() => setShowPasswordText(!showPasswordText)}>
                    {showPasswordText ? (
                      <Icons.eye className="w-4 h-4" />
                    ) : (
                      <Icons.eyeSlash className="w-4 h-4" />
                    )}
                  </div>
                </div>

                <div className="flex flex-col relative">
                  <FormField
                    control={form.control}
                    name="confirmPassword"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormControl>
                          <Input
                            label="Confirm Password"
                            type={showPasswordText ? "text" : "password"}
                            id="confirmPassword"
                            placeholder="Re-Enter your password"
                            onChange={(e) => field.onChange(e.target.value)}
                            value={field.value}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div
                    className="absolute right-3 top-4 cursor-pointer items-center z-20"
                    onClick={() => setShowPasswordText(!showPasswordText)}>
                    {showPasswordText ? (
                      <Icons.eye className="w-4 h-4" />
                    ) : (
                      <Icons.eyeSlash className="w-4 h-4" />
                    )}
                  </div>
                </div>
                <Button type="submit" className="w-full mt-10">
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Please wait
                    </>
                  ) : (
                    "Continue"
                  )}
                </Button>
              </form>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
}
