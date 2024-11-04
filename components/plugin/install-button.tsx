"use client";
import type { GetPackageResponse } from "@/lib/api";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@nextui-org/modal";
import { Button } from "@nextui-org/button";
import { Result } from "@/lib/result";
import { useState } from "react";
import { Snippet } from "@nextui-org/snippet";
import CodeBlock from "./code-block";
import { motion } from "framer-motion";
import { GrInstall } from "react-icons/gr";
import InstallModal from "./install-modal";

export default function InstallButton({
  pkg,
}: Readonly<{
  pkg: GetPackageResponse;
}>) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <>
      <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
        <Button
          onPress={onOpen}
          className="text-lg font-bold text-white bg-blue-500 dark:bg-blue-800 dark:text-gray-200 px-4 py-2 rounded-lg flex items-center"
        >
          <GrInstall size={28} className="mr-2" /> Install
        </Button>
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
