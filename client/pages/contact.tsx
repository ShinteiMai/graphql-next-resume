import Button from "../components/UI/Button";

const ContactPage = () => {
  return (
    <div>
      <h2 className="mt-0 md:mt-6 mb-2 text-2xl font-medium text-accents-2">
        Get in Touch
      </h2>
      <p className="w-full lg:w-9/12 text-accents-1 text-sm">
        Feel free to hit my inbox if you want to discuss about our next big
        project or maybe if you have any questions regarding my past projects.
        I’ll try my best to reply all of them!
      </p>
      <Button className="mt-8" link="mailto:shinteimai@protonmail.com">
        Mail me!
      </Button>
    </div>
  );
};

export default ContactPage;
