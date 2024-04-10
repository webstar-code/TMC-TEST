"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { ISubscriptionPlan, subscriptionsApi } from "api/subscription";
import { Container } from "components/Container";
import { format } from "date-fns";
import Image from "next/image";
import { Green_tick } from "public/assets/icons";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import {
  AlertDialog,
  AlertDialogContent,
  Button,
  Dialog,
  DialogContent,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
  Input,
} from "ui";
import { z } from "zod";

export default function SubscriptionPage() {
  const [subscriptionPlans, setSubscriptionsPlans] = useState<
    ISubscriptionPlan[]
  >([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    subscriptionsApi
      .getSubscriptionPlans()
      .then((data) => {
        setSubscriptionsPlans(data);
        setLoading(false);
      })
      .catch((err) => setLoading(false));
  }, []);

  const createSubscription = () => {
    subscriptionsApi
      .createSubscriptionPlan()
      .then((res) => {
        setSubscriptionsPlans([...res]);
      })
      .catch((err) => console.error(err));
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <Container title="Subscription">
      {subscriptionPlans.length === 0 ? (
        <div className="max-w-sm flex flex-col my-6 gap-4">
          <p className="text-sm">No Subscriptions created yet.</p>
          <Button onClick={() => createSubscription()}>
            Create Subscription
          </Button>
        </div>
      ) : (
        <>
          {subscriptionPlans.map((subscription) => (
            <SubscriptionPlan
              key={subscription.id}
              subscription={subscription}
            />
          ))}
        </>
      )}
    </Container>
  );
}

const formSchema = z.object({
  monthly: z
    .string()
    .min(1, { message: "Required" })
    .max(5, { message: "too many digits" }),
  annually: z
    .string()
    .min(1, { message: "Required" })
    .max(5, { message: "too many digits" }),
});

function SubscriptionPlan({
  subscription,
}: {
  subscription: ISubscriptionPlan;
}) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    values: {
      monthly: subscription.pricing.month.toString(),
      annually: subscription.pricing.year.toString(),
    },
  });
  const [processing, setProcessing] = useState(false);
  const [confirmModal, setConfirmModal] = useState(false);
  const [successModal, setSuccessModal] = useState(false);

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    setConfirmModal(true);
    // Below code should only be ran to create pricing the first time.
    // try {
    //   setProcessing(true);
    //   await subscriptionsApi.createPricing({ subscriptionId: subscription.id, price: Number(data.monthly), interval: "month" })
    //   await subscriptionsApi.createPricing({ subscriptionId: subscription.id, price: Number(data.annually), interval: "year" })
    //   setProcessing(false);
    //   toast.success("Pricing created for annual interval.")
    //   toast.success("Pricing created for monthly interval.")
    // } catch (err) {
    //   setProcessing(false);
    //   toast.error("Something went wrong.")
    // }
  };

  const confirmEdit = async () => {
    try {
      setConfirmModal(false);
      setProcessing(true);
      if (form.getFieldState("monthly").isDirty) {
        await subscriptionsApi.updatePricing({
          subscriptionId: subscription.id,
          price: Number(form.getValues("monthly")),
          interval: "month",
        });
      }
      if (form.getFieldState("annually").isDirty) {
        await subscriptionsApi.updatePricing({
          subscriptionId: subscription.id,
          price: Number(form.getValues("annually")),
          interval: "year",
        });
      }
      setProcessing(false);
      setSuccessModal(true);
    } catch (err) {
      setProcessing(false);
      setConfirmModal(false);
      toast.error("Something went wrong.");
    }
  };

  return (
    <div className="flex flex-col gap-4 mt-8 ">
      <div className="flex flex-col w-full md:w-[40%]">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-full space-y-6">
            <FormField
              control={form.control}
              name="monthly"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      label="Monthly($)"
                      placeholder="Monthly"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="annually"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      label="Annually($)"
                      placeholder="Annually"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              disabled={!form.formState.isDirty}
              type="submit"
              className="w-full">
              Save
            </Button>
            <p className="text-xs font-light italic">
              Last updated at{" "}
              {format(new Date(subscription.updatedAt), "d LLLL yyyy")}
            </p>
          </form>
        </Form>
      </div>
      <Dialog open={confirmModal} onOpenChange={() => setConfirmModal(false)}>
        <DialogContent>
          <div className="flex flex-col items-center px-4 py-4 md:py-0 gap-4 md:gap-6">
            <div className="font-bold text-xl w-[80%] md:text-2xl text-center px-2 mt-6">
              Are you sure you want to edit the subscription price?
            </div>
            <div className="text-sm font-normal text-center hidden md:block">
              The new price will only affect new users, not existing ones who
              have already purchased a plan on Track My Care.
            </div>
            <div className="w-full flex flex-row gap-4 mb-4 md:mb-10">
              <Button className={"w-full"} onClick={() => confirmEdit()}>
                Confirm
              </Button>
              <Button
                className={"w-full"}
                variant={"outline"}
                onClick={() => setConfirmModal(false)}>
                Cancel
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <AlertDialog open={processing}>
        <AlertDialogContent>
          <div className="flex flex-col justify-center items-center px-4 py-4 md:py-0">
            <p className="font-semibold">Please wait...</p>
          </div>
        </AlertDialogContent>
      </AlertDialog>

      <AlertDialog open={successModal}>
        <AlertDialogContent>
          <div className="flex flex-col items-center px-4 py-4 md:py-0 gap-4 md:gap-6">
            <div>
              <Image src={Green_tick} alt="" height={48} width={48} />
            </div>
            <div className="font-bold text-xl w-[80%] md:text-2xl text-center px-2 mt-2">
              Subscription price has been successfully changed!
            </div>
            <div className="text-sm font-normal text-center hidden md:block">
              The subscription price has been updated successfully, with the
              annual subscription model now priced at $
              {form.getValues("annually")}, and the monthly subscription model
              now set at ${form.getValues("monthly")}.
            </div>
            <div className="flex flex-row w-full gap-2 md:w-[60%] mb-4 md:mb-10">
              <Button onClick={() => setSuccessModal(false)} className="w-full">
                Go back
              </Button>
            </div>
          </div>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
