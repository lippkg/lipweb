import type { SearchPackagesResponse } from "../../lib/api";
import { Card, CardBody, CardFooter } from "@nextui-org/card";
import { Chip } from "@nextui-org/chip";
import { Image } from "@nextui-org/image";
import { IoMdStarOutline } from "react-icons/io";
import { MdUpdate } from "react-icons/md";
import { Tooltip } from "@nextui-org/tooltip";
import { Link } from "@nextui-org/link";
import { Avatar } from "@nextui-org/avatar";
import { useRouter } from "next/navigation";
import { useCallback } from "react";

type Color = "primary" | "secondary" | "success" | "warning" | "danger";

const colors: Color[] = [
  "primary",
  "secondary",
  "success",
  "warning",
  "danger",
];

type ResultItem = SearchPackagesResponse["items"][number];

export default function PluginCard({ result }: { result: ResultItem }) {
  const router = useRouter();
  let colorIndex = 0;

  const getNextColor = (): Color => {
    const color = colors[colorIndex];
    colorIndex = (colorIndex + 1) % colors.length;
    return color;
  };

  const handlePress = useCallback(() => {
    router.push(`/${result.source}/${result.identifier}`);
  }, [router, result.source, result.identifier]);

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <Card
      fullWidth
      isHoverable
      isPressable
      className="border-none bg-background/60 dark:bg-default-100/50 plugin-card w-full"
      shadow="sm"
      onClick={handlePress}
    >
      <CardBody>
        <div className="flex">
          <div className="flex-shrink-0 p-4">
            <Image
              src={
                result?.avatarUrl ||
                "https://stickerly.pstatic.net/sticker_pack/8cP1NeB69qFawu3Cn0vA/SL4DEZ/20/5e094b29-a0b9-4c95-8359-71af47910afb.png"
              }
              className="rounded-3xl"
              width={80}
              height={80}
              alt="avatar"
            />
          </div>

          <div className="flex-grow p-4 min-w-0">
            <div className="flex flex-col h-full">
              <div className="mb-2">
                <h3 className="font-semibold text-foreground/90">
                  <span className="text-large">{result.name}</span>
                  <span className="text-small"> by</span>
                  <span className="text-small text-pink-600">
                    <Tooltip
                      delay={0}
                      closeDelay={0}
                      placement="right"
                      content={
                        <Avatar
                          src={`https://avatars.githubusercontent.com/${result.author}`}
                        />
                      }
                    >
                      <Link
                        isBlock
                        size="sm"
                        href={`https://github.com/${result.author}`}
                      >
                        {result.author}
                      </Link>
                    </Tooltip>
                  </span>
                </h3>
                <p className="text-medium text-foreground/80">
                  {result.description}
                </p>
              </div>
            </div>

            <div className="mt-[-10px] flex gap-4 items-center">
              {result.tags.map((item) => (
                <Chip
                  key={item}
                  size="sm"
                  color={getNextColor()}
                  variant="flat"
                >
                  {item}
                </Chip>
              ))}
            </div>
          </div>

          <div className="flex-shrink-0 p-4 min-w-[150px] md:pl-4 hidden md:flex">
            <div className="hidden md:flex flex-col items-end">
              <span className="flex items-center gap-1 align-middle">
                <IoMdStarOutline size={24} /> {result.hotness} Stars
              </span>
              <span className="flex items-center gap-1 align-middle">
                <MdUpdate size={24} />
                {formatDate(result.updated)}
              </span>
            </div>
          </div>
        </div>
      </CardBody>
      <CardFooter className="flex md:hidden">
        <div className="flex md:hidden flex-row items-center gap-4 justify-start">
          <IoMdStarOutline size={24} />
          {result.hotness}
          <MdUpdate size={24} /> {formatDate(result.updated)}
        </div>
      </CardFooter>
    </Card>
  );
}
