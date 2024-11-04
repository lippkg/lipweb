"use client";
import type { GetPackageResponse } from "@/lib/api";
import { motion } from "framer-motion";
import { Card } from "@nextui-org/card";

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
        <Card className="shadow-lg rounded-lg p-6 hover:shadow-xl transition-shadow duration-300">
          preset1
        </Card>
      </motion.div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.4 }}
      >
        <Card className="shadow-lg rounded-lg p-6 hover:shadow-xl transition-shadow duration-300">
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
    </>
  );
}
