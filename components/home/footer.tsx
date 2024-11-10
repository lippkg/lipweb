"use client";

import type { IconProps } from "@iconify/react";

import React from "react";
import { Link, Spacer } from "@nextui-org/react";
import { Icon } from "@iconify/react";

import { BedrinthLogo } from "@/components/icons";

type SocialIconProps = Omit<IconProps, "icon">;

const navLinks = [
  {
    name: "Home",
    href: "/",
  },
  {
    name: "About",
    href: "#",
  },
];

const socialItems = [
  {
    name: "Twitter",
    href: "#",
    icon: (props: SocialIconProps) => (
      <Icon {...props} icon="fontisto:twitter" />
    ),
  },
  {
    name: "GitHub",
    href: "https://github.com/LiteLDev/",
    icon: (props: SocialIconProps) => (
      <Icon {...props} icon="fontisto:github" />
    ),
  },
  {
    name: "YouTube",
    href: "#",
    icon: (props: SocialIconProps) => (
      <Icon {...props} icon="fontisto:youtube" />
    ),
  },
];

export function FooterComponent() {
  return (
    <footer className="flex w-full flex-col">
      <div className="mx-auto flex w-full max-w-7xl flex-col items-center justify-center px-6 py-12 lg:px-8">
        <div className="flex items-center justify-center">
          <Link href="/">
            <BedrinthLogo height={32} width={32} />
            <span className="text-medium font-medium text-default-500 uppercase">
              &nbsp;&nbsp; Bedrinth
            </span>
          </Link>
        </div>

        <Spacer y={4} />
        <div className="flex flex-wrap justify-center gap-x-4 gap-y-1">
          {navLinks.map((item) => (
            <Link
              key={item.name}
              isExternal
              className="text-default-500"
              href={item.href}
              size="sm"
            >
              {item.name}
            </Link>
          ))}
        </div>
        <Spacer y={6} />
        <div className="flex justify-center gap-x-4">
          {socialItems.map((item) => (
            <Link
              key={item.name}
              isExternal
              className="text-default-400"
              href={item.href}
            >
              <span className="sr-only">{item.name}</span>
              <item.icon aria-hidden="true" className="w-5" />
            </Link>
          ))}
        </div>
        <Spacer y={4} />
        <p className="mt-1 text-center text-small text-default-400">
          &copy; 2024 LiteLDev Inc. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
