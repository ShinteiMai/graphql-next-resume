import React, { useEffect, useState } from "react";
import clsx from "clsx";
import { TComponent } from "..";
import Container from "../UI/Container";
import Tab from "../UI/Tab";
import TextLink from "../UI/TextLink";
import { useRouter } from "next/router";

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

  console.log(router.pathname.slice(1));

  return (
    <Container
      data-testid="navigation"
      className={clsx(
        "w-full flex justify-evenly items-start lg:block",
        className
      )}
    >
      <Tab isActive={activeTab === "about"} className="mb-3">
        <TextLink className="inline-block" href="/">
          About
        </TextLink>
      </Tab>
      <Tab isActive={activeTab === "projects"} className="mb-3">
        <TextLink className="inline-block" href="/projects">
          Projects
        </TextLink>
      </Tab>
      <Tab isActive={activeTab === "contact"}>
        <TextLink className="inline-block" href="/contact">
          Contact
        </TextLink>
      </Tab>
    </Container>
  );
};

export default Navigation;
