import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export const useTabs = (key: string, defaultValue = "") => {
  const [activeTab, setActiveTab] = useState<string>(defaultValue);
  const searchParams = useSearchParams();
  const router = useRouter();

  const onTabChange = (newValue: string) => {
    const params = new URLSearchParams();
    params.set(key, newValue);
    window.history.replaceState(
      {},
      "",
      `${window.location.pathname}?${params.toString()}`
    );
    setActiveTab(newValue);
  };

  useEffect(() => {
    let activeTab = searchParams.get(key);
    if (activeTab !== null) {
      // Check if the key is present in searchParams
      setActiveTab(activeTab);
    }
  }, [searchParams, key]);

  return {
    activeTab,
    onTabChange,
  };
};
