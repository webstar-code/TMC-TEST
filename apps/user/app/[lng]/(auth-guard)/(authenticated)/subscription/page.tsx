"use client";

import { ISubscriptionPlan, subscriptionsApi } from "api/subscription";
import { Icons } from "components/Icons";
import { format } from "date-fns";
import { collection, getDocs } from "firebase/firestore";
import { db } from "lib/firebase";
import { useActiveSusbcription } from "lib/store";
import { MoreHorizontal } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
  Button,
  Checkbox,
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
import { DEFAULT_CURRENCY } from "utils";

// TODO: move to packages/types
interface ISubscriptionInvoice {
  id: string;
  subscriptionId: string;
  stripeInvoiceId: string;
  amountPaid: number;
  currency: string;
  customerEmail: string;
  customerName: string;
  customerPhoneNumber: string;
  customerAddress: string;
  description: string;
  dueDate: number;
  effectiveDate: number;
  paid: number;
  number: string;
  periodStart: number;
  periodEnd: number;
  receiptNumber: string;
  status: string;
  subTotal: number;
  tax: number;
  total: number;
  items: {
    amount: number;
    description: string;
    currency: string;
  }[];
  invoicePdf: string;
  created: number;
}

export default function SubscriptionPage() {
  const { activeSubscription } = useActiveSusbcription();
  const [invoices, setInvoices] = useState<ISubscriptionInvoice[]>([]);
  const [showPlans, setShowPlans] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setLoading(true);
    getDocs(collection(db, "invoices")).then((querySnapshot) => {
      const data = querySnapshot.docs.map((d) => d.data());
      setInvoices(data as ISubscriptionInvoice[]);
      setLoading(false);
    });
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
          <ViewPricing />
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
                <Button variant={"outline"}>Cancel Membership</Button>
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
                <div className="w-full bg-secondary p-6 flex items-start justify-between rounded-lg border">
                  <div className="flex flex-col gap-2">
                    <h3 className="text-sm font-semibold">Membership plan</h3>
                    <p>
                      <span>
                        {DEFAULT_CURRENCY.symbol}
                        {activeSubscription.plan.amount}/
                        {activeSubscription.plan.interval}
                      </span>
                    </p>
                  </div>
                  <div className="flex flex-col gap-2">
                    <h3 className="text-sm font-semibold">Start Date</h3>
                    {format(
                      new Date(activeSubscription.currentPeriodStart * 1000),
                      "do, MMMM, yyyy"
                    )}
                  </div>
                  <div className="flex flex-col gap-2">
                    <h3 className="text-sm font-semibold">End Date</h3>
                    {format(
                      new Date(activeSubscription.currentPeriodEnd * 1000),
                      "do, MMMM, yyyy"
                    )}
                  </div>
                  <div className="flex flex-col gap-2">
                    <h3 className="text-sm font-semibold">Payment Method</h3>
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
                              {format(
                                new Date(invoice.created * 1000),
                                "dd/M/yyyy"
                              )}
                            </TableCell>
                            <TableCell>{invoice.number}</TableCell>
                            <TableCell>
                              {DEFAULT_CURRENCY.symbol}
                              {invoice.total}
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
    </div>
  );
}

function ViewPricing() {
  const [subscriptionPlan, setSubscriptionPlan] = useState<ISubscriptionPlan>();
  const [loading, setLoading] = useState(true);
  const router = useRouter();

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
            Monthly ${subscriptionPlan?.pricing.month}
          </TabsTrigger>
          <TabsTrigger
            className="w-1/2 h-full rounded-full font-semibold"
            value="annually">
            Annually ${subscriptionPlan?.pricing.year}
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
              onClick={() =>
                router.push(
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
              onClick={() =>
                router.push(
                  `subscription/checkout?subscriptionPlan=${subscriptionPlan.id}&recurring=year`
                )
              }
              className="w-full mt-4">
              Buy Now
            </Button>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
