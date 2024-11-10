import React, { useState } from "react";
import { IoCopyOutline } from "react-icons/io5";
import { IoIosCheckmark } from "react-icons/io";
import { motion, AnimatePresence } from "framer-motion";

const CodeBlock = ({ code }: { code: string }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000); // Reset copy state after 2 seconds
  };

  return (
    <div className="inline-flex items-center justify-between h-fit gap-2 border-medium px-3 py-1.5 text-small rounded-medium bg-transparent border-white text-white">
      <pre className="overflow-x-auto whitespace-pre-wrap break-words">
        <code>{code}</code>
      </pre>
      <button
        className="group inline-flex items-center justify-center box-border appearance-none select-none whitespace-nowrap font-normal subpixel-antialiased overflow-hidden tap-highlight-transparent data-[pressed=true]:scale-[0.97] outline-none data-[focus-visible=true]:z-10 data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-focus data-[focus-visible=true]:outline-offset-2 gap-2 rounded-small px-0 !gap-0 transition-transform-colors-opacity motion-reduce:transition-none bg-transparent min-w-8 w-8 h-8 group relative z-10 text-large text-inherit data-[hover=true]:bg-transparent"
        onClick={handleCopy}
      >
        <AnimatePresence>
          {copied ? (
            <motion.div
              key="checkmark"
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
              initial={{ opacity: 0, scale: 0.5 }}
              transition={{ duration: 0.2 }}
            >
              <IoIosCheckmark size={48} />
            </motion.div>
          ) : (
            <motion.div
              key="copy"
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
              initial={{ opacity: 0, scale: 0.5 }}
              transition={{ duration: 0.2 }}
            >
              <IoCopyOutline />
            </motion.div>
          )}
        </AnimatePresence>
      </button>
    </div>
  );
};

export default CodeBlock;
