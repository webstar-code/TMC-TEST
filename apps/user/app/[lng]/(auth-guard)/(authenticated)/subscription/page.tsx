"use client";

import {
  Elements,
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { apiMiddleware } from "api/middlware";
import {
  IRecurringInterval,
  ISubscriptionPlan,
  subscriptionsApi,
} from "api/subscription";
import { Icons } from "components/Icons";
import { format } from "date-fns";
import { collection, getDocs } from "firebase/firestore";
import { db } from "lib/firebase";
import {
  ActiveSubscription,
  useActiveSusbcription,
  useUserStore,
} from "lib/store";
import { Loader2, MoreHorizontal } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { DialogClose } from "ui";
import { Alert } from "ui";
import {
  AlertDialog,
  AlertDialogContent,
  Badge,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
  Button,
  Checkbox,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTrigger,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  Skeleton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "ui";
import { DEFAULT_CURRENCY, convertFromCents } from "utils";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_TEST_KEY!
);
// TODO: move to packages/types
interface ISubscriptionInvoice {
  id: string;
  subscriptionId: string;
  amountPaid: number;
  currency: string;
  customerEmail: string;
  customerName: string;
  customerPhoneNumber: string;
  customerAddress: string;
  number: string;
  periodStart: number;
  periodEnd: number;
  receiptNumber: string;
  status: string;
  subTotal: number;
  tax: number;
  total: number;
  invoicePdf: string;
  createdAt: number;
}

export default function SubscriptionPage() {
  const { activeSubscription } = useActiveSusbcription();
  const [invoices, setInvoices] = useState<ISubscriptionInvoice[]>([]);
  const [showPlans, setShowPlans] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [paymentMethod, setPaymentMethod] = useState<any>(null);
  const { user } = useUserStore();
  const [processingCancelation, setProcessingCancelation] = useState(false);

  useEffect(() => {
    setLoading(true);
    getDocs(collection(db, "invoices")).then((querySnapshot) => {
      const data = querySnapshot.docs.map((d) => d.data());
      setInvoices(apiMiddleware.fromJson(data) as ISubscriptionInvoice[]);
      setLoading(false);
    });
    if (user?.customerId) {
      subscriptionsApi
        .getPaymentMethod({ customerId: user.customerId })
        .then((res) => setPaymentMethod(res.data));
    }
  }, []);

  if (showPlans) {
    return (
      <div className="flex flex-col">
        <div className="w-full flex items-center gap-2 h-16 border p-6">
          <Icons.arrowLeft
            className="cursor-pointer"
            onClick={() => router.back()}
          />
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/subscription">
                  Subscription
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator>/</BreadcrumbSeparator>
              <BreadcrumbItem>
                <BreadcrumbPage>Buy Plan</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
        <div className="container py-8 flex flex-col gap-6">
          <div className="flex items-center gap-4">
            <h1 className="text-2xl font-semibold">Subscription</h1>
          </div>
          <ViewPricing activeSubscription={activeSubscription} />
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col">
      <div className="w-full h-16 border"></div>
      <div className="container py-8 flex flex-col gap-10">
        <div className="flex items-start justify-between">
          <h1 className="text-2xl font-semibold">Subscription</h1>
          <div className="flex items-center gap-4">
            {activeSubscription ? (
              <>
                {activeSubscription.cancelAtPeriodEnd && (
                  <Dialog modal>
                    <DialogTrigger>
                      <Button variant={"outline"}>Cancel Membership</Button>
                    </DialogTrigger>
                    {processingCancelation ? (
                      <DialogContent>
                        <h1>Processing...</h1>
                      </DialogContent>
                    ) : (
                      <DialogContent>
                        <DialogHeader>
                          <h1 className="text-lg font-semibold">
                            Cancel Subscription
                          </h1>
                        </DialogHeader>
                        <DialogDescription>
                          <p>
                            Are you sure you want to cancel the subscription.
                            This subscription is set to cancel at the end of the
                            current period.
                          </p>
                        </DialogDescription>
                        <DialogFooter>
                          <div className="w-full flex justify-end gap-4 ">
                            <DialogClose asChild>
                              <Button
                                className={"min-w-[96px]"}
                                variant={"outline"}>
                                No
                              </Button>
                            </DialogClose>
                            <DialogClose asChild>
                              <Button
                                className={"min-w-[96px]"}
                                onClick={async () => {
                                  setProcessingCancelation(true);
                                  await subscriptionsApi.cancelSubscription({
                                    subscriptionId: activeSubscription.id,
                                  });
                                  toast.success(
                                    "Subscription Cancelled. Payment has been stopped and the subscription will be terminated at the end date"
                                  );
                                  setProcessingCancelation(false);
                                }}
                                variant={"destructive"}>
                                Yes
                              </Button>
                            </DialogClose>
                          </div>
                        </DialogFooter>
                      </DialogContent>
                    )}
                  </Dialog>
                )}
                <Button onClick={() => setShowPlans(true)}>
                  Update Membership
                </Button>
              </>
            ) : (
              <>
                {!loading && !activeSubscription && (
                  <Button onClick={() => setShowPlans(true)}>View Plans</Button>
                )}
              </>
            )}
          </div>
        </div>
        <div className="flex flex-col gap-10">
          {loading ? (
            <Skeleton className="w-full min-h-[96px] bg-accent" />
          ) : (
            <>
              {activeSubscription ? (
                <div className="w-full flex flex-col gap-4">
                  <div className="w-full flex gap-4">
                    <h1 className="text-2xl font-bold">
                      {activeSubscription.plan.name}
                    </h1>
                    <Badge>{activeSubscription.status}</Badge>
                    {activeSubscription.cancelAtPeriodEnd &&
                      activeSubscription.cancelAt && (
                        <Badge variant="outline">
                          Cancels{" "}
                          {format(
                            new Date(activeSubscription.cancelAt),
                            "MMMM do, yyyy"
                          )}
                        </Badge>
                      )}
                  </div>
                  <div className="w-full bg-secondary p-6 flex flex-col items-start gap-4 rounded-lg border">
                    <div className="w-full flex items-start justify-between gap-4">
                      <div className="flex flex-col gap-2">
                        <h3 className="text-sm font-semibold">
                          Membership plan
                        </h3>
                        <p>
                          <span>
                            {DEFAULT_CURRENCY.symbol}
                            {convertFromCents(activeSubscription.plan.amount)}/
                            {activeSubscription.plan.interval}
                          </span>
                        </p>
                      </div>
                      <div className="flex flex-col gap-2">
                        <h3 className="text-sm font-semibold">Start Date</h3>
                        {format(
                          new Date(activeSubscription.currentPeriodStart),
                          "do, MMMM, yyyy"
                        )}
                      </div>
                      <div className="flex flex-col gap-2">
                        <h3 className="text-sm font-semibold">End Date</h3>
                        {format(
                          new Date(activeSubscription.currentPeriodEnd),
                          "do, MMMM, yyyy"
                        )}
                      </div>
                      <div className="flex flex-col gap-2">
                        <h3 className="text-sm font-semibold">
                          Payment Method
                        </h3>
                        {activeSubscription.cancelAtPeriodEnd ? (
                          <p className="text-sm italic">Paymemt paused</p>
                        ) : (
                          <>
                            {paymentMethod && paymentMethod.type === "card" && (
                              <div className="flex">
                                <p className="text-sm">
                                  •••• {paymentMethod.card.last4}{" "}
                                  {paymentMethod.card.brand}
                                </p>
                              </div>
                            )}
                            <Dialog>
                              <DialogTrigger>
                                <p className="text-xs text-primary underline cursor-pointer">
                                  Change Payment method
                                </p>
                              </DialogTrigger>
                              <DialogContent>
                                <Elements
                                  stripe={stripePromise}
                                  options={{
                                    mode: "payment",
                                    currency: DEFAULT_CURRENCY.code,
                                    amount: 1000,
                                    paymentMethodCreation: "manual",
                                    appearance: {
                                      theme: "flat",
                                      labels: "floating",
                                    },
                                  }}>
                                  <CollectPaymentMethod />
                                </Elements>
                              </DialogContent>
                            </Dialog>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ) : null}
            </>
          )}
          {loading ? (
            <Skeleton className="w-full min-h-[96px] bg-accent" />
          ) : (
            <>
              {activeSubscription ? (
                <div className="w-full flex flex-col gap-4">
                  <h1 className="text-lg font-bold">Billing Details</h1>
                  <div className="w-full">
                    <Table>
                      <TableHeader>
                        <TableRow className="bg-muted">
                          <TableHead>S.No</TableHead>
                          <TableHead className="hidden sm:table-cell">
                            Date
                          </TableHead>
                          <TableHead className="hidden sm:table-cell">
                            Invoice Number
                          </TableHead>
                          <TableHead className="">Amount</TableHead>
                          <TableHead className="">Status</TableHead>
                          <TableHead className=""></TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {invoices.map((invoice, index) => (
                          <TableRow key={invoice.id} className="">
                            <TableCell>{index + 1}</TableCell>
                            <TableCell>
                              {format(new Date(invoice.createdAt), "dd/M/yyyy")}
                            </TableCell>
                            <TableCell>{invoice.number}</TableCell>
                            <TableCell>
                              {DEFAULT_CURRENCY.symbol}
                              {convertFromCents(invoice.total)}
                            </TableCell>
                            <TableCell>{invoice.status}</TableCell>
                            <TableCell>
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button
                                    aria-haspopup="true"
                                    size="icon"
                                    variant="ghost">
                                    <MoreHorizontal className="h-4 w-4" />
                                    <span className="sr-only">Toggle menu</span>
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                  <DropdownMenuItem>View</DropdownMenuItem>
                                  <a href={invoice.invoicePdf} download>
                                    <DropdownMenuItem>
                                      Download
                                    </DropdownMenuItem>
                                  </a>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </div>
              ) : null}{" "}
            </>
          )}
        </div>
      </div>
      <AlertDialog open={processingCancelation}>
        <AlertDialogContent>
          <div className="flex flex-col justify-center items-center px-4 py-4 md:py-0">
            <p className="font-semibold">processing cancelation</p>
          </div>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

function ViewPricing({
  activeSubscription,
}: {
  activeSubscription?: ActiveSubscription | null;
}) {
  const [subscriptionPlan, setSubscriptionPlan] = useState<ISubscriptionPlan>();
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const [processing, setProcessing] = useState(false);

  useEffect(() => {
    setLoading(true);
    subscriptionsApi
      .getSubscriptionPlans()
      .then((data) => {
        setSubscriptionPlan(data[0]);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  async function updateSubscription(interval: IRecurringInterval) {
    if (activeSubscription) {
      setProcessing(true);
      const res = await subscriptionsApi.updateSubscription({
        recurring: interval,
        subscriptionId: activeSubscription.id,
      });
      if (res.status === "ok") {
        setProcessing(false);
        toast.success("Subscription updated");
        window.location.reload();
      } else {
        toast.error("something went wrong");
        setProcessing(false);
      }
    }
  }

  if (loading || !subscriptionPlan) {
    return (
      <div className="w-full max-w-[450px] mt-10 flex flex-col gap-6">
        <Skeleton className="w-full h-12" />
        <Skeleton className="w-full h-4" />
        <Skeleton className="w-full h-4" />
        <Skeleton className="w-full h-4" />
        <Skeleton className="w-full h-4" />
        <Skeleton className="w-full h-12" />
      </div>
    );
  }

  return (
    <div className="w-full max-w-[450px] mt-10 flex flex-col gap-6">
      <Tabs defaultValue="monthly" className="w-full">
        <TabsList className="w-full h-12 p-0.5 rounded-full">
          <TabsTrigger
            className="w-1/2 h-full rounded-full font-semibold"
            value="monthly">
            Monthly ${convertFromCents(subscriptionPlan?.pricing.month)}
          </TabsTrigger>
          <TabsTrigger
            className="w-1/2 h-full rounded-full font-semibold"
            value="annually">
            Annually ${convertFromCents(subscriptionPlan?.pricing.year)}
          </TabsTrigger>
        </TabsList>
        <TabsContent value="monthly">
          <div className="flex flex-col gap-8 mt-10">
            <div className="flex flex-row items-center gap-4">
              <Checkbox className="w-6 h-6" checked />
              <h1 className="text-[#868686]">
                Storage and categorization of health records
              </h1>
            </div>
            <div className="flex flex-row items-center gap-4">
              <Checkbox className="w-6 h-6" checked />
              <h1 className="text-[#868686]">
                Easily accessible on multiple devices
              </h1>
            </div>
            <div className="flex flex-row items-center gap-4">
              <Checkbox className="w-6 h-6" checked />
              <h1 className="text-[#868686]">
                Unlimited report sharing and self record uploads
              </h1>
            </div>
            <div className="flex flex-row items-center gap-4">
              <Checkbox className="w-6 h-6" checked />
              <h1 className="text-[#868686]">
                Lifetime storage - we keep it safe for you
              </h1>
            </div>
            <Button
              disabled={activeSubscription?.plan.interval === "month"}
              onClick={() =>
                activeSubscription
                  ? updateSubscription("month")
                  : router.push(
                      `subscription/checkout?subscriptionPlan=${subscriptionPlan.id}&recurring=month`
                    )
              }
              className="w-full mt-4">
              Buy Now
            </Button>
          </div>
        </TabsContent>
        <TabsContent value="annually">
          <div className="flex flex-col gap-8 mt-10">
            <div className="flex flex-row items-center gap-4">
              <Checkbox className="w-6 h-6" checked />
              <h1 className="text-[#868686]">
                Storage and categorization of health records
              </h1>
            </div>
            <div className="flex flex-row items-center gap-4">
              <Checkbox className="w-6 h-6" checked />
              <h1 className="text-[#868686]">
                Easily accessible on multiple devices
              </h1>
            </div>
            <div className="flex flex-row items-center gap-4">
              <Checkbox className="w-6 h-6" checked />
              <h1 className="text-[#868686]">
                Unlimited report sharing and self record uploads
              </h1>
            </div>
            <div className="flex flex-row items-center gap-4">
              <Checkbox className="w-6 h-6" checked />
              <h1 className="text-[#868686]">
                Lifetime storage - we keep it safe for you
              </h1>
            </div>
            <Button
              disabled={activeSubscription?.plan.interval === "year"}
              onClick={() =>
                activeSubscription
                  ? updateSubscription("year")
                  : router.push(
                      `subscription/checkout?subscriptionPlan=${subscriptionPlan.id}&recurring=year`
                    )
              }
              className="w-full mt-4">
              Buy Now
            </Button>
          </div>
        </TabsContent>
      </Tabs>

      <AlertDialog open={processing}>
        <AlertDialogContent>
          <div className="flex flex-col justify-center items-center px-4 py-4 md:py-0">
            <p className="font-semibold">Please wait...</p>
          </div>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

function CollectPaymentMethod() {
  const [errorMessage, setErrorMessage] = useState();
  const [loading, setLoading] = useState(false);
  const { user } = useUserStore();

  const handleError = (error: any) => {
    setLoading(false);
    setErrorMessage(error.message);
  };
  const handleSubmit = async (event: { preventDefault: () => void }) => {
    event.preventDefault();
    if (!stripe || !elements) {
      return;
    }

    setLoading(true);
    const { error: submitError } = await elements.submit();
    if (submitError) {
      handleError(submitError);
      return;
    }
    if (!user) {
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
      email: "01flexxitedtest@gmail.com",
      phoneNumber: "+911234567899",
      paymentMethodId: paymentMethod.id,
      userId: user.id,
    };
    if (user.customerId) {
      x["customerId"] = user.customerId;
    }
    await subscriptionsApi
      .attachPaymentMethod({
        ...x,
      })
      .then((res) => {
        if (res.status === "ok") {
          window.location.reload();
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
  const stripe = useStripe();
  const elements = useElements();
  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <PaymentElement options={{}} />
      <Button className="w-full" disabled={!stripe || loading}>
        {loading ? <Loader2 /> : "Change"}
      </Button>
      {errorMessage && <Alert>{errorMessage}</Alert>}
    </form>
  );
}
