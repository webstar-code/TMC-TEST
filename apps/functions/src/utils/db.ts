import { v4 as uuidv4 } from "uuid";
const unquieId = () => uuidv4();

export const generateId = (prefix: string): string => {
  const id = unquieId() as string;
  return prefix + "_" + id.replace(/-/g, "");
};

export const dbCollections = {
  subscriptionPlans: "subscription-plans",
};
