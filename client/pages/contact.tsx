import Button from "../components/UI/Button";
import Container from "../components/UI/Container";
import Heading from "../components/UI/Heading";
import Paragraph from "../components/UI/Paragraph";

const ContactPage = () => {
  return (
    <Container className="w-full lg:w-8/12">
      <Heading className="mt-0 md:mt-6 mb-2 text-2xl font-medium">
        Get in Touch
      </Heading>
      <Paragraph className="w-full lg:w-9/12">
        Feel free to hit my inbox if you want to discuss about our next big
        project or maybe if you have any questions regarding my past projects.
        I’ll try my best to reply all of them!
      </Paragraph>
      <Button className="mt-8" link="mailto:shinteimai@protonmail.com">
        Mail me!
      </Button>
    </Container>
  );
};

export default ContactPage;
