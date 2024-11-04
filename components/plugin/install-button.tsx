"use client";
import type { GetPackageResponse } from "@/lib/api";
import { useDisclosure } from "@nextui-org/modal";
import { Button } from "@nextui-org/button";
import { motion } from "framer-motion";
import { GrInstall, GrDownload } from "react-icons/gr";
import InstallModal from "./install-modal";
import { Link } from "@nextui-org/link";

export default function InstallButton({
  pkg,
}: Readonly<{
  pkg: GetPackageResponse;
}>) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  return (
    <>
      <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
        {pkg.source == "github" && pkg.packageManager == "none" ? (
          <Link
            isExternal
            href={`https://github.com/${pkg.identifier}/releases/tag/${
              pkg.versions[0].version
            }`}
            size="sm"
          >
            <Button
              href={`https://github.com/${pkg.identifier}/releases/tag/${
                pkg.versions[0].version
              }`}
              className="text-lg font-bold text-white bg-blue-500 dark:bg-blue-800 dark:text-gray-200 px-4 py-2 rounded-lg flex items-center"
            >
              <GrDownload size={20} className="mr-2" />
              Download
            </Button>
          </Link>
        ) : (
          <Button
            onPress={onOpen}
            className="text-lg font-bold text-white bg-blue-500 dark:bg-blue-800 dark:text-gray-200 px-4 py-2 rounded-lg flex items-center"
          >
            <GrInstall size={28} className="mr-2" /> Install
          </Button>
        )}
      </motion.div>

      <InstallModal
        pkg={pkg}
        versionStr={pkg.versions[0].version}
        isVersionSelected={false}
        isOpen={isOpen}
        onOpen={onOpen}
        onOpenChange={onOpenChange}
      />
    </>
  );
}
