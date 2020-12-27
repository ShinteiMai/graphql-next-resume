import React, { useEffect, useState } from "react";
import clsx from "clsx";
import { useRouter } from "next/router";
import { TComponent } from "@components/types";
import { Tab, TextLink } from "@components/UI";

type NavigationTabs = "about" | "projects" | "contact";

interface Props extends TComponent {}

const Navigation = ({ className }: Props) => {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<NavigationTabs>(
    router.pathname.slice(1) === ""
      ? "about"
      : (router.pathname.slice(1) as NavigationTabs)
  );

  useEffect(() => {
    setActiveTab(
      router.pathname.slice(1) === ""
        ? "about"
        : (router.pathname.slice(1) as NavigationTabs)
    );
  }, [router]);

  return (
    <div
      data-testid="navigation"
      className={clsx(
        "w-full flex justify-evenly items-start lg:block",
        className
      )}
    >
      <Tab divider={false} isActive={activeTab === "about"} className="mb-3">
        <TextLink className="inline-block" href="/">
          About
        </TextLink>
      </Tab>
      <Tab divider={false} isActive={activeTab === "projects"} className="mb-3">
        <TextLink className="inline-block" href="/projects">
          Projects
        </TextLink>
      </Tab>
      <Tab divider={false} isActive={activeTab === "contact"}>
        <TextLink className="inline-block" href="/contact">
          Contact
        </TextLink>
      </Tab>
    </div>
  );
};

export default Navigation;
