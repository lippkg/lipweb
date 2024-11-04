"use client";
import type { GetPackageResponse } from "@/lib/api";
import { Modal, ModalContent, ModalHeader, ModalBody } from "@nextui-org/modal";
import { Result } from "@/lib/result";
import { useState } from "react";
import CodeBlock from "./code-block";

function commandBuilder(
  pkg: GetPackageResponse,
  version?: string
): Result<string, string> {
  if (pkg.packageManager == "lip") {
    if (pkg.source == "github") {
      // lip--github
      return Result.Ok(
        `lip install github.com/${pkg.identifier}${
          version ? `@${version}` : ""
        }`
      );
    }
  } else if (pkg.packageManager == "pip") {
    if (pkg.source == "pypi") {
      // pip--pypi
      return Result.Ok(
        `pip install ${pkg.identifier}${version ? `==${version}` : ""}`
      );
    } else if (pkg.source == "github") {
      // pip--github
      return Result.Ok(
        `pip install git+https://github.com/${pkg.identifier}${
          version ? `@${version}` : ""
        }`
      );
    }
  } else if (pkg.packageManager == "none") {
    // none--github
    return Result.Err("Download and install manually");
  }
  return Result.Err("");
}

export default function InstallModal({
  pkg,
  versionStr,
  isVersionSelected,
  isOpen,
  onOpen,
  onOpenChange,
}: {
  pkg: GetPackageResponse;
  versionStr: string;
  isVersionSelected: boolean;
  isOpen: boolean;
  onOpen: () => void;
  onOpenChange: (isOpen: boolean) => void;
}) {
  const version = pkg?.versions.find((t) => t.version === versionStr);

  const releaseTimeString = new Date(
    version?.releasedAt || ""
  ).toLocaleString();

  const installCmd = commandBuilder(pkg, isVersionSelected ? versionStr : "");

  return (
    <>
      <Modal isOpen={isOpen} size="2xl" onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Install {pkg?.name}
              </ModalHeader>
              <ModalBody className="space-y-6">
                <div className="p-6 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg shadow-lg text-white flex justify-between items-center">
                  <h3 className="text-xl font-bold mb-2">Version</h3>
                  <p className="text-lg">{versionStr}</p>
                </div>
                <div className="p-6 bg-gradient-to-r from-green-500 to-teal-600 rounded-lg shadow-lg text-white flex justify-between items-center">
                  <h3 className="text-xl font-bold mb-2">Release Time</h3>
                  <p className="text-lg">{releaseTimeString}</p>
                </div>
                <div className="p-6 bg-gradient-to-r from-red-500 to-pink-600 rounded-lg shadow-lg text-white">
                  <h3 className="text-xl font-bold mb-2">Install Command</h3>
                  <CodeBlock code={installCmd.val} />
                </div>
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
