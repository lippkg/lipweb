"use client";
import { useEffect, useState } from "react";
import { remark } from "remark";
import remarkGfm from "remark-gfm";
import html from "remark-html";
import RemarkLinkRewrite from "remark-link-rewrite";
import type { GetPackageResponse } from "@/lib/api";

export default function Readme({
  readme,
  source,
  pkg,
}: Readonly<{
  readme: string;
  source: "github" | "pypi";
  pkg: GetPackageResponse;
}>) {
  const [contentHtml, setContentHtml] = useState("");

  useEffect(() => {
    async function processReadme() {
      const processedReadme = await remark()
        .use(html)
        .use(remarkGfm)
        .use(RemarkLinkRewrite, {
          replacer: (url: string) => {
            switch (source) {
              case "github":
                if (
                  url.startsWith("http://") ||
                  url.startsWith("https://") ||
                  url.startsWith("#")
                ) {
                  return url;
                } else {
                  return `https://github.com/${pkg.identifier}/blob/HEAD/${url}`;
                }
              case "pypi":
                return url;
            }
          },
        })
        .process(readme);
      setContentHtml(processedReadme.toString());
    }

    processReadme();
  }, [readme, pkg]);

  return (
    <div className="py-10 px-3 text-primary">
      <div
        className="lg:container mx-auto prose dark:prose-invert prose-img:inline"
        dangerouslySetInnerHTML={{ __html: contentHtml }}
      />
    </div>
  );
}
