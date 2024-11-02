import type { SearchPackagesResponse } from "../lib/api";
import { Card, CardBody, CardFooter } from "@nextui-org/card";
import { Chip } from "@nextui-org/chip";
import { Image } from "@nextui-org/image";
import { IoMdStarOutline } from "react-icons/io";
import { MdUpdate } from "react-icons/md";
import { Tooltip } from "@nextui-org/tooltip";
import { Link } from "@nextui-org/link";
import { Avatar } from "@nextui-org/avatar";
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
  let colorIndex = 0;

  const getNextColor = (): Color => {
    const color = colors[colorIndex];
    colorIndex = (colorIndex + 1) % colors.length;
    return color;
  };

  return (
    <Card
      fullWidth
      isHoverable
      isPressable
      className="border-none bg-background/60 dark:bg-default-100/50 plugin-card w-full"
      shadow="sm"
    >
      <CardBody>
        <div className="grid grid-cols-6 md:grid-cols-12 gap-6 md:gap-2 items-center justify-center">
          <div className="relative col-span-2 md:col-span-1">
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

          <div className="flex flex-col col-span-4 md:col-span-8">
            <div className="flex justify-between items-start">
              <div className="flex flex-col gap-0">
                <h3 className="font-semibold text-foreground/90">
                  <span className="text-large"> {result.name}</span>
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
            <div className="flex flex-col mt-3 gap-1">
              <div className="flex gap-4 flex-wrap md:flex-nowrap">
                {result.tags.map((item) => (
                  <Chip
                    key={item}
                    size="sm"
                    color={getNextColor()}
                    variant="shadow"
                  >
                    {item}
                  </Chip>
                ))}
              </div>
            </div>
          </div>
          <div className="col-span-4 md:col-span-3 flex flex-col items-end text-right">
            <div className="hidden md:flex flex-col items-end">
              <span className="flex items-center gap-1 align-middle">
                <IoMdStarOutline size={24} /> {result.hotness} Stars
              </span>
              <span className="flex items-center gap-1 align-middle">
                <MdUpdate size={24} />
                {new Date(result.updated).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </span>
            </div>
          </div>
        </div>
      </CardBody>
      <CardFooter className="flex md:hidden">
        <div className="flex md:hidden flex-row items-center gap-4 justify-start">
          <IoMdStarOutline size={24} />
          {result.hotness}
          <MdUpdate size={24} />{" "}
          {new Date(result.updated).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </div>
      </CardFooter>
    </Card>
  );
}
