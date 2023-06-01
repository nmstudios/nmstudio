import styled from "styled-components";
import Link from "next/link";
import Arrow from "./Arrow";
import { motion } from "framer-motion";
import Footer from "./Footer";
import Navigation from "./Navigation";

const Page = styled.div`
  background-color: black;
  background-image: url("/Layer-0.png");
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  height: 200vh;
`;

const HeroImage = styled(motion.div)`
  height: 100vh;
  z-index: 500;
  width: 100vw;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const HeroTitle = styled(motion.div)`
  margin-top: 5%;
  color: white;
  font-size: 9rem;
  @media (max-width: 768px) {
    font-size: 5.5rem;
    padding-bottom: 1.5rem;
  }
  @media (max-width: 480px) {
    font-size: 4.5rem;
  }
  text-align: center;
  font-weight: lighter;
  overflow-wrap: break-word;
  line-height: 1;
  padding-bottom: 2vh;
`;

const HeroSubTitle = styled(motion.div)`
  color: white;
  font-size: 1rem;
  /* margin-bottom: 5%; */
  @media (max-width: 768px) {
    margin-bottom: 15%;
  }
  text-align: center;
  font-weight: lighter;
  width: 60%;
`;

const variants = {
  visible: { opacity: 1, y: 0 },
  hidden: { opacity: 0, y: "100%" },
};

function Hero() {
  return (
    <>
      <HeroImage>
        <HeroTitle
          initial="hidden"
          variants={variants}
          animate={"visible"}
          transition={{ duration: 0.7, fade: [0.6, 0.05, -0.01, 0.9] }}
        >
          We Are
          <br />
          <b>NM Studio</b>
        </HeroTitle>
        <HeroSubTitle
          initial="hidden"
          variants={variants}
          animate={"visible"}
          transition={{
            duration: 0.7,
            delay: 0.5,
            fade: [0.6, 0.05, -0.01, 0.9],
          }}
        >
          Design embodies mind, body and soul of creation. Design entails a syn-
          ergy of tangible and intangible, attainable and ephemeral. Design has
          the ability to transform and translate, incite and induce. At NM
          studio, Design is meant to do all this and more. Envisioned as a
          creative envi- ronment rather than a physical space, the NM studio is
          infused with cre- ative energy that resonates with philosophy and
          thought. At NM Studio, Design comes alive....
        </HeroSubTitle>
        <Arrow marginTop={"10%"} />
      </HeroImage>
    </>
  );
}

const SecondHalf = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  font-size: 1.25rem;
`;

const LeftBox = styled.div`
  padding-right: 2vw;
  margin-right: 1vw;
  display: flex;
  justify-content: center;
  align-items: flex-end;
  flex-direction: column;
  width: 50%;
  height: 30rem;
  @media (max-width: 768px) {
    height: 15rem;
  }
  /* @media (max-width: 480px) {
    font-size: 3.5rem;
  } */
  border-right-style: solid;
  border-color: white;
  text-align: right;
  font-size: 2.25rem;
  @media (max-width: 768px) {
    font-size: 1.5rem;
  }
`;

const Categories = styled(motion.a)`
  margin: auto 0;
  margin-right: 5%;
  color: white;
  text-decoration: none;
`;

const RightBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  flex-direction: column;
  text-align: left;
  height: 40rem;
  padding-left: 5%;
  margin-left: 1%;
  width: 50%;
  border-left-style: solid;
  border-color: red;
  font-size: 2.25rem;
  @media (max-width: 768px) {
    font-size: 1.5rem;
    width: 40%;
    height: 22.5rem;
  }
`;

export default function HomePage({ categories }) {
  return (
    <>
      <Page>
        <Navigation categories={categories} />
        <Hero />
        <SecondHalf>
          <LeftBox>
            {categories &&
              categories.map((category) => (
                <Link
                  key={category.Name}
                  href={`/Category/${category.Name}`}
                  passHref
                >
                  <Categories
                    whileHover={{ textDecoration: "underline" }}
                    whileFocus={{ textDecoration: "underline" }}
                  >
                    {category.Name}
                  </Categories>
                </Link>
              ))}
          </LeftBox>
          <RightBox>Design is Everything</RightBox>
        </SecondHalf>
      </Page>
      <Footer />
    </>
  );
}
