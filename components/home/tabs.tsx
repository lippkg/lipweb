"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { Tabs, Tab } from "@nextui-org/tabs";
import React from "react";

export function TabsContent({ tab }: { tab: string }) {
  const searchParams = useSearchParams();
  const { replace } = useRouter();

  return (
    <Tabs
      variant="light"
      aria-label="Tabs variants"
      selectedKey={tab}
      onSelectionChange={(sort) => {
        const params = new URLSearchParams(searchParams);
        params.set("sort", sort.toString());
        replace(`/?${params.toString()}`);
      }}
    >
      <Tab key="hotness" title="Most Stars" />
      <Tab key="updated" title="Recently Newest" />
    </Tabs>
  );
}
