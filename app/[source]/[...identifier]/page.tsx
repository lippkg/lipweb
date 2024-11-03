"use client";

import { type JSX } from "react";
import { Metadata } from "next";
import { tryGetPackage } from "@/lib/api";
import { fetchReadme } from "@/lib/readme-fetcher";
import { redirect } from "next/navigation";
import { Card, CardHeader, CardBody, CardFooter } from "@nextui-org/card";
import { Image } from "@nextui-org/image";
import { useEffect, useState, useCallback } from "react";
import { GetPackageResponse } from "@/lib/api";
import { FaStar, FaTag } from "react-icons/fa6";
import { Chip } from "@nextui-org/chip";
import { Tabs, Tab } from "@nextui-org/react";
import { FaLink } from "react-icons/fa";
import Readme from "@/components/plugin/readme";
import { Spinner } from "@nextui-org/react";
import { motion } from "framer-motion";

export default function Page({
  params,
}: Readonly<{
  params: { source: string; identifier: string[] };
}>) {
  const [data, setData] = useState<{
    pkg?: GetPackageResponse;
    readme?: any;
    error?: boolean;
    tab: string;
    loading: boolean;
  }>({
    tab:
      params.identifier.length === 3 && params.identifier[2] === "versions"
        ? "versions"
        : "description",
    loading: true,
  });

  const fetchData = useCallback(async () => {
    if (params.identifier.length >= 2) {
      const identifier = params.identifier.slice(0, 2).join("/");
      const response = await tryGetPackage(params.source, identifier);
      if (response.err) {
        setData((prev) => ({ ...prev, error: true, loading: false }));
        redirect("/404");
      } else {
        const readmeData = await fetchReadme(
          params.source as "github" | "pypi",
          identifier
        );
        setData((prev) => ({
          ...prev,
          pkg: response.val,
          readme: readmeData,
          loading: false,
        }));
      }
    }
  }, [params]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const filteredTags = data.pkg?.tags.filter(
    (item) => !item.startsWith("type:") && !item.startsWith("platform:")
  );

  const handleTabChange = (key: string) => {
    setData((prev) => ({ ...prev, tab: key }));
    const basePath = `/github/${params.identifier[0]}/${params.identifier[1]}`;
    const newUrl = key === "description" ? basePath : `${basePath}/${key}`;
    window.history.pushState(null, "", newUrl);
  };

  return (
    <div className="container mx-auto max-w-7xl px-6 flex-grow">
      {data.loading ? (
        <div className="flex items-center justify-center h-screen">
          <Spinner label="Loading" size="lg" color="default" />
        </div>
      ) : (
        <div>
          <div className="flex flex-col space-y-4">
            <motion.div
              className="flex"
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 1 }}
            >
              <div className="flex-shrink-0 p-4">
                <Image
                  src={
                    data.pkg?.avatarUrl ||
                    "https://stickerly.pstatic.net/sticker_pack/8cP1NeB69qFawu3Cn0vA/SL4DEZ/20/5e094b29-a0b9-4c95-8359-71af47910afb.png"
                  }
                  className="rounded-3xl"
                  width={80}
                  height={80}
                  alt="avatar"
                />
              </div>
              <div className="flex-grow p-4 min-w-0">
                <div className="flex flex-col h-full">
                  <div className="mb-2">
                    <h3 className="font-semibold text-foreground/90">
                      <span className="text-large"> {data.pkg?.name}</span>
                    </h3>
                    <p className="text-medium text-foreground/80">
                      {data.pkg?.description}
                    </p>
                  </div>
                  <div className="mt-2 flex text-gray-500 items-center">
                    <div className="flex items-center gap-2  pr-4 font-semibold dark:border-gray-600 dark:text-gray-400">
                      <FaStar />
                      <span>{data.pkg?.hotness}</span>
                    </div>

                    {(filteredTags?.length || -1) > 0 && (
                      <div className="flex items-center gap-2 md:pl-4 hidden md:flex">
                        <FaTag className="text-gray-500" />
                        {filteredTags?.map((item) => (
                          <Chip
                            key={item}
                            size="sm"
                            variant="shadow"
                            className="text-gray-500"
                          >
                            <span className="font-bold">{item}</span>
                          </Chip>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <div className="flex-shrink-0  p-4 min-w-[150px]"></div>
            </motion.div>

            <hr className="border-foreground/20" />

            <div className="flex flex-col lg:flex-row lg:space-x-4">
              <div className="flex-1 min-w-0">
                <Tabs
                  key="underlined"
                  variant="underlined"
                  aria-label="Tabs variants"
                  selectedKey={data.tab}
                  onSelectionChange={(key) => handleTabChange(key as string)}
                >
                  <Tab key="description" title="Description">
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 1 }}
                    >
                      <Card className="shadow-lg rounded-lg p-6 hover:shadow-xl transition-shadow duration-300">
                        <div className="tab-content">
                          <Readme
                            readme={data.readme}
                            pkg={data.pkg || ({} as GetPackageResponse)}
                          />
                        </div>
                      </Card>
                    </motion.div>
                  </Tab>
                  <Tab key="versions" title="Versions">
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 1 }}
                    >
                      {/* Versions content */}
                    </motion.div>
                  </Tab>
                  <Tab
                    key="issues"
                    title={
                      <span className="flex items-center gap-1">
                        Issues <FaLink size={12} />
                      </span>
                    }
                    href={
                      "https://" +
                      params.source +
                      ".com/" +
                      data.pkg?.identifier +
                      "/issues"
                    }
                  />
                  <Tab
                    key="source"
                    title={
                      <span className="flex items-center gap-1">
                        Source <FaLink size={12} />
                      </span>
                    }
                    href={
                      "https://" +
                      params.source +
                      ".com/" +
                      data.pkg?.identifier
                    }
                  />
                </Tabs>
              </div>
              <div className="flex flex-col space-y-4 lg:w-1/4 lg:flex-shrink-0">
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 1, delay: 0.2 }}
                >
                  <Card className=" shadow-lg rounded-lg p-6 hover:shadow-xl transition-shadow duration-300">
                    preset1
                  </Card>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 1, delay: 0.4 }}
                >
                  <Card className=" shadow-lg rounded-lg p-6 hover:shadow-xl transition-shadow duration-300">
                    preset2
                  </Card>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 1, delay: 0.6 }}
                >
                  <Card className="shadow-lg rounded-lg p-6 hover:shadow-xl transition-shadow duration-300">
                    preset3
                  </Card>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
