"use client";
import type { GetPackageResponse } from "@/lib/api";
import { motion } from "framer-motion";
import { Card } from "@nextui-org/card";
import { User } from "@nextui-org/user";
import { Link } from "@nextui-org/link";

export default function SideBar({
  pkg,
}: Readonly<{
  pkg: GetPackageResponse;
}>) {
  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.2 }}
      >
        <Card className="shadow-lg rounded-lg p-6 hover:shadow-xl transition-shadow duration-300 ">
          <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-gray-100">
            Contributors
          </h2>
          <div className="flex flex-wrap gap-4">
            {pkg.contributors.map((contributor) => (
              <Link
                key={contributor.username}
                href={`https://github.com/${contributor.username}`}
                size="sm"
                isExternal
                className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
              >
                <User
                  name={contributor.username}
                  avatarProps={{
                    src: `https://avatars.githubusercontent.com/${contributor.username}`,
                    className: "w-10 h-10 rounded-full",
                  }}
                />
              </Link>
            ))}
          </div>
        </Card>
      </motion.div>
      {/*
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.4 }}
      >
        <Card className="shadow-lg rounded-lg p-6 hover:shadow-xl transition-shadow duration-300">
          NULL
        </Card>
      </motion.div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.6 }}
      >
        <Card className="shadow-lg rounded-lg p-6 hover:shadow-xl transition-shadow duration-300">
          NULL
        </Card>
      </motion.div>
      */}
    </>
  );
}
