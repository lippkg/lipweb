"use client";
import type { GetPackageResponse } from "@/lib/api";
import { Tabs, Tab } from "@nextui-org/react";
import { FaLink } from "react-icons/fa";
import Readme from "@/components/plugin/readme";
import { motion } from "framer-motion";
import VersionCard from "@/components/plugin/versions-table";
import { useState, useCallback } from "react";
import { Card } from "@nextui-org/card";

export default function PluginTabs({
  pkg,
  identifier,
  readme,
}: Readonly<{
  pkg: GetPackageResponse;
  identifier: string[];
  readme: string;
}>) {
  const [tab, setTab] = useState<string>(
    identifier[3] === "versions" ? "versions" : "description"
  );

  const handleTabChange = useCallback(
    (key: string) => {
      setTab(key);
      const basePath = identifier.slice(0, 3).join("/");
      const newUrl =
        key === "description" ? `${basePath}` : `${basePath}/${key}`;
      window.history.pushState(null, "", "/plugin/" + newUrl);
    },
    [identifier]
  );

  function reamMeLinkBuilder(pkg: GetPackageResponse): string {
    return `https://${pkg.identifier}`;
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
              <Readme
                readme={readme}
                source="github"
                pkg={pkg || ({} as GetPackageResponse)}
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
          {pkg ? (
            <VersionCard pkg={pkg} />
          ) : (
            <div>No version data available</div>
          )}
        </motion.div>
      </Tab>

      <Tab
        key="issues"
        title={
          <span className="flex items-center gap-1">
            Issues <FaLink size={12} />
          </span>
        }
        href={`https://${pkg?.identifier}/issues`}
      />

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
