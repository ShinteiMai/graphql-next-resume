import classes from "./index.module.css";
import data from "../data/profile.json";
import { technologies } from "../data/technologies.json";
import { TextLink } from "@components/UI";
import { Experience, Technology } from "@components/Common";

const IndexPage = () => {
  return (
    <div className={classes.container}>
      <h1 className={classes.header}>Biography</h1>
      <p className={classes.paragraph}>
        Hi! I’m Steven Hansel. A software engineer based in Jakarta, Indonesia.
      </p>
      <p className={classes.paragraph}>
        I enjoy building software such as web & mobile applications with the
        most modern & latest technology available. My purpose is to create
        robust software following software engineering principles & best
        practices.
      </p>
      <p className={classes.paragraph}>
        I’m currently studying Computer Engineering in{" "}
        <TextLink newTab href={data.links.binus} className={classes.link}>
          BINUS University
        </TextLink>{" "}
        as a sophomore. I started my development journey by getting into an
        internship in an Indonesian startup,{" "}
        <TextLink newTab href={data.links.kotakode} className={classes.link}>
          Kotakode
        </TextLink>
        .
      </p>
      <div className={classes.subContainer}>
        <h1 className={classes.header}>Experience</h1>
        <Experience />
      </div>
      <div className={classes.subContainer}>
        <h1 className={classes.header}>Stacks</h1>
        <div className={classes.technologyContainer}>
          {technologies.map(({ id, thumbnail, title, link }) => (
            <Technology
              src={thumbnail}
              title={title}
              link={link}
              key={id}
              className="mr-3"
              width={50}
              height={50}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default IndexPage;
