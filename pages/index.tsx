import Counter from "../components/Counter";
import Layout from "../components/Layout";

const IndexPage = () => (
  <Layout title="Home | next-tailwind-boilerplate">
    <h1 className="text-5xl">next-tailwind-boilerplate</h1>
    <p>
      Tailwind CSS + Next.js + TypeScript boilerplate for initializing
      production quality sites
    </p>
    <Counter />
  </Layout>
);

export default IndexPage;
