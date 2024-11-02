"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { siteConfig } from "@/config/site";
import { title, subtitle } from "@/components/primitives";
import { GithubIcon } from "@/components/icons";

import { PaginationComponent } from "../components/pagination";
import { searchPackages } from "@/lib/api";
import PluginCard from "../components/plugincard";
import { TabsContent } from "@/components/tabs";
import { SearchPackagesResponse } from "../lib/api";
import { PlatformSort } from "@/components/platformsort";
import { InputSort } from "@/components/input";
import { Spinner } from "@nextui-org/react";

const words = ["levilamina mods", "endstone plugins"];
type Color = "violet" | "yellow" | "blue" | "cyan" | "green" | "pink";

const colors: Color[] = ["violet", "yellow", "blue", "cyan", "green", "pink"];

export default function Page({
  searchParams,
}: Readonly<{
  searchParams?: {
    q?: string;
    page?: number;
    sort?: "hotness" | "updated";
    platform?: string;
  };
}>) {
  const [index, setIndex] = useState(0);
  const [colorIndex, setColorIndex] = useState(0);
  const [packages, setPackages] = useState<SearchPackagesResponse | null>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % words.length);
      setColorIndex((prevIndex) => (prevIndex + 1) % colors.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    async function fetchPackages() {
      let q: string = "";
      if (searchParams?.platform) {
        const platformArr = searchParams?.platform.split(",");
        if (platformArr.length > 0) {
          if (platformArr.length != 2) {
            q += "platform:" + platformArr.join(" platform:");
          }
        }
      }
      if (searchParams?.q) {
        q += ` ${searchParams.q}`;
      }
      const result = await searchPackages(
        q,
        undefined,
        searchParams?.page,
        searchParams?.sort
      );
      setPackages(result);
    }

    fetchPackages();
  }, [searchParams]);

  if (!packages) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Spinner label="Warning" size="lg" color="default" />
      </div>
    );
  }

  return (
    <div className="container mx-auto max-w-7xl px-6 flex-grow">
      <div>
        <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
          <motion.div
            className="inline-block text-center justify-center"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className={title()}>Find your favorite</span>
            <br />

            <motion.span
              className={`${title({ color: colors[colorIndex] })} fade-in-out`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1 }}
            >
              {words[index]} 
            </motion.span>

            <span className={subtitle()}>
              Bedrinth is our dedicated mod repository! You can explore various
              mods specifically for LeviLamina or Endstone, or list your own
              mods through a streamlined creation process.
            </span>
            <br />
          </motion.div>

          <motion.div
            className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <InputSort q={searchParams?.q || ""} />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <TabsContent tab={searchParams?.sort || "hotness"} />
          </motion.div>
        </section>
      </div>

      <div className="flex items-center space-x-4">
        <h2 className="font-bold text-2xl">Projects</h2>
        <PlatformSort platform={searchParams?.platform || "all"} />
      </div>
      <br />
      <motion.div
        initial="hidden"
        animate="visible"
        variants={{
          hidden: { opacity: 1 },
          visible: {
            opacity: 1,
            transition: {
              staggerChildren: 0.3,
            },
          },
        }}
      >
        {packages.items.map((item) => (
          <motion.div
            key={item.updated}
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 },
            }}
            transition={{ duration: 0.5 }}
          >
            <PluginCard result={item} />
          </motion.div>
        ))}
      </motion.div>
      <PaginationComponent
        pageIndex={packages.pageIndex}
        totalPages={packages.totalPages}
      />
    </div>
  );
}
