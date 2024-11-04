"use client";
import type { GetPackageResponse } from "@/lib/api";
import { useDisclosure } from "@nextui-org/modal";
import { Tabs, Tab, Button } from "@nextui-org/react";
import { FaLink } from "react-icons/fa";
import Readme from "@/components/plugin/readme";
import { motion } from "framer-motion";
import VersionCard from "@/components/plugin/versions-table";
import { useEffect, useState, useCallback, useMemo } from "react";
import { Card } from "@nextui-org/card";

export default function PluginTabs({
  pkg,
  source,
  identifier,
  readme,
}: Readonly<{
  pkg: GetPackageResponse;
  identifier: string[];
  source: string;
  readme: string;
}>) {
  const [tab, setTab] = useState<string>(
    source === "pypi" && identifier[1] === "versions"
      ? "versions"
      : source === "github" && identifier[2] === "versions"
        ? "versions"
        : "description"
  );

  const handleTabChange = useCallback(
    (key: string) => {
      setTab(key);
      if (pkg?.packageManager == "lip" || pkg?.packageManager == "none") {
        if (pkg.source == "github") {
          const basePath = `/${pkg?.source}/${identifier[0]}/${identifier[1]}`;
          const newUrl =
            key === "description" ? basePath : `${basePath}/${key}`;
          window.history.pushState(null, "", newUrl);
        }
      } else if (pkg?.packageManager == "pip") {
        if (pkg.source == "pypi") {
          const basePath = `/${pkg?.source}/${identifier[0]}`;
          const newUrl =
            key === "description" ? basePath : `${basePath}/${key}`;
          window.history.pushState(null, "", newUrl);
        }
      }
    },
    [pkg, identifier]
  );

  function reamMeLinkBuilder(pkg: GetPackageResponse): string {
    if (pkg.packageManager == "lip" || pkg.packageManager == "none") {
      if (pkg.source == "github") {
        return `https://github.com/${pkg.identifier}`;
      }
    } else if (pkg.packageManager == "pip") {
      if (pkg.source == "pypi") {
        return `https://pypi.org/project/${pkg.identifier}`;
      }
    }
    return "";
  }

  return (
    <Tabs
      variant="underlined"
      aria-label="Tabs variants"
      selectedKey={tab}
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
              <Readme readme={readme} pkg={pkg || ({} as GetPackageResponse)} />
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
          {pkg ? (
            <VersionCard pkg={pkg} />
          ) : (
            <div>No version data available</div>
          )}
        </motion.div>
      </Tab>
      {pkg?.source != "pypi" && (
        <Tab
          key="issues"
          title={
            <span className="flex items-center gap-1">
              Issues <FaLink size={12} />
            </span>
          }
          href={`https://${source}.com/${pkg?.identifier}/issues`}
        />
      )}
      <Tab
        key="source"
        title={
          <span className="flex items-center gap-1">
            Source <FaLink size={12} />
          </span>
        }
        href={reamMeLinkBuilder(pkg || ({} as GetPackageResponse))}
      />
    </Tabs>
  );
}
