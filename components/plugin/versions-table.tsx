"use client";
import type { GetPackageResponse } from "@/lib/api";
import {
  Table,
  TableHeader,
  TableBody,
  TableColumn,
  TableRow,
  TableCell,
} from "@nextui-org/table";
import { Pagination } from "@nextui-org/pagination";
import { useState } from "react";
import { formatDistanceToNow } from "date-fns";
import { IoToday } from "react-icons/io5";
import { Chip } from "@nextui-org/chip";
import { Button } from "@nextui-org/react";
import { GrCube, GrInstall, GrDownload } from "react-icons/gr";
import { motion } from "framer-motion";
import { useDisclosure } from "@nextui-org/modal";
import InstallModal from "./install-modal";
import { Link } from "@nextui-org/link";
export default function VersionCard({
  pkg,
}: Readonly<{
  pkg: GetPackageResponse;
}>) {
  const [page, setPage] = useState(1);
  const itemsPerPage = 20;
  const totalPages = Math.ceil(pkg.versions.length / itemsPerPage);

  const currentItems = pkg.versions.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  return (
    <Table
      isStriped
      aria-label="VersionCard"
      shadow="none"
      bottomContent={
        pkg.versions.length > itemsPerPage && (
          <div className="flex w-full justify-end p-4">
            <Pagination
              isCompact
              showControls
              showShadow
              color="secondary"
              page={page}
              total={totalPages}
              onChange={(page) => setPage(page)}
            />
          </div>
        )
      }
    >
      <TableHeader className="bg-gray-100 dark:bg-gray-800 font-semibold">
        <TableColumn>Name</TableColumn>
        <TableColumn>Compatibility</TableColumn>
        <TableColumn>Stats</TableColumn>
        <TableColumn> </TableColumn>
      </TableHeader>
      <TableBody>
        {currentItems.map((version) => (
          <TableRow key={version.version}>
            <TableCell className="p-4">{version.version}</TableCell>
            <TableCell className="p-4">
              <Chip>incomplete</Chip>
            </TableCell>
            <TableCell className="p-4">
              <div className="flex items-center space-x-2">
                <IoToday className="text-xl" />
                <span className="text-base">
                  {formatDistanceToNow(new Date(version.releasedAt), {
                    addSuffix: true,
                  })}
                </span>
              </div>
            </TableCell>
            <TableCell className="p-4">
              <HoverButton pkg={pkg} version={version.version} />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

const HoverButton = ({
  pkg,
  version,
}: {
  pkg: GetPackageResponse;
  version: string;
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <>
      {pkg.source == "github" && pkg.packageManager == "none" ? (
        <>
          <Link
            isExternal
            href={`https://github.com/${pkg.identifier}/releases/tag/${
              version
            }`}
            size="sm"
          >
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
              <Button variant="light" isIconOnly>
                {<GrDownload size={24} />}
              </Button>
            </motion.div>
          </Link>
        </>
      ) : (
        <>
          <Button
            variant="light"
            isIconOnly
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onClick={() => {
              onOpen();
              setIsHovered(false);
            }}
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              {isHovered ? <GrInstall size={28} /> : <GrCube size={28} />}
            </motion.div>
          </Button>
          <InstallModal
            pkg={pkg}
            versionStr={version}
            isVersionSelected={true}
            isOpen={isOpen}
            onOpen={onOpen}
            onOpenChange={onOpenChange}
          />
        </>
      )}
    </>
  );
};
