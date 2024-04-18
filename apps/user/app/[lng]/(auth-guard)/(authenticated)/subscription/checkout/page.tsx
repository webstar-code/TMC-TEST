"use client";

import {
  Elements,
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import {
  IRecurringInterval,
  ISubscriptionPlan,
  subscriptionsApi,
} from "api/subscription";
import { useUserStore } from "lib/store";
import { Loader2 } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import {
  Alert,
  Button,
  Dialog,
  DialogContent,
  DialogTrigger,
  Drawer,
  DrawerContent,
  DrawerTrigger,
  Skeleton,
} from "ui";
import { DEFAULT_CURRENCY, convertFromCents } from "utils";
import { ROUTES } from "utils/routes";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_TEST_KEY!
);

export default function Checkout() {
  const searchParams = useSearchParams();
  const [plan, setPlan] = useState<ISubscriptionPlan>();
  const [price, setPrice] = useState(0);
  const [showPaymentGate, setShowPaymentGate] = useState(false);

  useEffect(() => {
    subscriptionsApi
      .getSubscriptionPlans()
      .then((data) => {
        setPlan(data[0]);
        setShowPaymentGate(true);
      })
      .catch(() => {});
  }, []);

  useEffect(() => {
    if (!plan) return;
    const recurring = searchParams.get("recurring");
    if (recurring === "month") {
      setPrice(plan.pricing.month);
      return;
    }
    if (recurring === "year") {
      setPrice(plan.pricing.year);
      return;
    }
  }, [searchParams, plan]);

  return (
    <div className="flex flex-col">
      <div className="w-full h-16 border"></div>
      <div className="container py-8">
        <div className="flex flex-col gap-10 items-start justify-between">
          <h1 className="text-2xl font-semibold">Checkout</h1>
          <div className="w-full flex space-x-20">
            <div className="w-full md:max-w-md shrink-0 flex flex-col gap-4">
              <div className="w-full flex items-start justify-between">
                <h3 className="text-sm font-medium">
                  TMC {searchParams.get("recurring")} Plan
                </h3>
                <h3 className="text-sm font-medium">
                  {DEFAULT_CURRENCY.symbol} {convertFromCents(price)}
                </h3>
              </div>
              <div className="w-full flex items-start justify-between py-2 border-b border-accent">
                <h3 className="text-primary font-semibold">Total</h3>
                <h3 className="font-semibold">
                  {DEFAULT_CURRENCY.symbol} {convertFromCents(price)}
                </h3>
              </div>
              <div className="w-full hidden md:block">
                <Dialog>
                  <DialogTrigger className="w-full">
                    <Button className="w-full">Buy</Button>
                  </DialogTrigger>
                  <DialogContent className="p-6">
                    {plan && showPaymentGate ? (
                      <Elements
                        stripe={stripePromise}
                        options={{
                          mode: "payment",
                          currency: DEFAULT_CURRENCY.code,
                          amount: price,
                          paymentMethodCreation: "manual",
                          appearance: {
                            theme: "flat",
                            labels: "floating",
                          },
                        }}>
                        <PaymentGateway
                          subscriptionId={plan?.id}
                          recurring={
                            searchParams.get("recurring") as IRecurringInterval
                          }
                        />
                      </Elements>
                    ) : (
                      <Skeleton className="w-full min-h-[200px]" />
                    )}
                  </DialogContent>
                </Dialog>
              </div>
              <div className="w-full block md:hidden">
                <Drawer>
                  <DrawerTrigger className="w-full">
                    <Button className="w-full">Buy</Button>
                  </DrawerTrigger>
                  <DrawerContent className="">
                    {plan && showPaymentGate ? (
                      <Elements
                        stripe={stripePromise}
                        options={{
                          mode: "payment",
                          currency: DEFAULT_CURRENCY.code,
                          amount: price,
                          paymentMethodCreation: "manual",
                          appearance: {
                            theme: "flat",
                            labels: "floating",
                          },
                        }}>
                        <PaymentGateway
                          subscriptionId={plan?.id}
                          recurring={
                            searchParams.get("recurring") as IRecurringInterval
                          }
                        />
                      </Elements>
                    ) : (
                      <Skeleton className="w-full min-h-[200px]" />
                    )}
                  </DrawerContent>
                </Drawer>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function PaymentGateway({
  recurring,
  subscriptionId,
}: {
  subscriptionId: string;
  recurring: IRecurringInterval;
}) {
  const { user } = useUserStore();
  const router = useRouter();
  const stripe = useStripe();
  const elements = useElements();

  const [errorMessage, setErrorMessage] = useState();
  const [loading, setLoading] = useState(false);

  const handleError = (error: any) => {
    setLoading(false);
    setErrorMessage(error.message);
  };

  const handleSubmit = async (event: { preventDefault: () => void }) => {
    event.preventDefault();
    if (!stripe || !elements) {
      return;
    }
    if (!user) {
      return;
    }
    setLoading(true);
    const { error: submitError } = await elements.submit();
    if (submitError) {
      handleError(submitError);
      return;
    }
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      elements,
      params: {
        billing_details: {
          name: "", // TODO: add user name
          email: user?.email,
          phone: "", // TODO: add user phone number
        },
      },
    });
    if (error) {
      handleError(error);
      return;
    }
    const x: any = {
      name: "flexxited",
      email: user.email,
      phoneNumber: "+911234567899",
      paymentMethodId: paymentMethod.id,
      userId: user.id,
    };
    if (user.customerId) {
      x["customerId"] = user.customerId;
    }
    await subscriptionsApi.attachPaymentMethod({
      ...x,
    });
    subscriptionsApi
      .purchaseSubscription({
        subscriptionPlanId: subscriptionId,
        interval: recurring,
        userId: user.id,
      })
      .then((res) => {
        if (res.status === "ok") {
          router.replace(ROUTES.subscription);
        } else {
          if (res.status === "failed") {
            toast.error(res.message.description, {
              position: "top-center",
            });
          }
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
      });
  };
  return (
    <div className="p-6">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <PaymentElement />
        <Button className="w-full" disabled={!stripe || loading}>
          {loading ? <Loader2 /> : "Pay"}
        </Button>
        {errorMessage && <Alert>{errorMessage}</Alert>}
      </form>
    </div>
  );
}
