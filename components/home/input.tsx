"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { Input } from "@nextui-org/input";
import { Icon } from "@iconify/react";
import React from "react";

export function InputSort({ q }: { q: string }) {
  const searchParams = useSearchParams();
  const { replace } = useRouter();

  return (
    <Input
      aria-label="Search"
      classNames={{
        inputWrapper: "bg-content2 dark:bg-content1",
      }}
      labelPlacement="outside"
      placeholder="Search in Bedrinth..."
      radius="lg"
      onValueChange={(value) => {
        const params = new URLSearchParams(searchParams);
        params.set("q", value);
        replace(`/?${params.toString()}`);
      }}
      startContent={
        <Icon
          className="text-default-500"
          icon="solar:magnifer-linear"
          width={20}
        />
      }
    />
  );
}
