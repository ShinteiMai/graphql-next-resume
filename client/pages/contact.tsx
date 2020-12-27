import Button from "../components/UI/Button/Button";

const ContactPage = () => {
  return (
    <div className="w-full lg:w-8/12">
      <h1 className="mt-0 md:mt-6 mb-2 text-2xl font-medium">Get in Touch</h1>
      <p className="w-full lg:w-9/12">
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
