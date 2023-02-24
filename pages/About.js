import Navigation from "@/components/Navigation";
import Link from "next/link";
import styled from "styled-components";
import { fetchAPI } from "@/lib/api";
import Footer from "@/components/Footer";
import { getStrapiMedia } from "@/lib/media";
import Arrow from "@/components/Arrow";
import { H1, H2, H3, Paragraph } from "@/components/Typography";
import Head from "next/head";

import {
  FaceBookIcon,
  InstagramIcon,
  TwitterIcon,
  WebIcon,
} from "../public/Icons";
import Image from "next/image";

const Page = styled.div`
  background-color: black;
  background-image: url("/Layer-0.png");
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
`;

const Hero = styled.div`
  height: 100vh;
  width: 100vw;
  color: white;
  text-align: center;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
`;

const TopSubTitle = styled.div`
  font-size: 3.5rem;
  margin-top: 5%;
  @media (max-width: 768px) {
    font-size: 1.5rem;
  }
`;

const Title = styled.div`
  color: white;
  text-align: center;
  font-size: 8rem;
  margin-bottom: ${({ marginBottom }) => marginBottom};
  @media (max-width: 768px) {
    font-size: 4.5rem;
    margin-bottom: 0%;
  }
`;

const SubTitle = styled.div`
  font-size: 1rem;
  text-align: center;
  width: 70%;
  @media (max-width: 768px) {
    font-size: 0.8rem;
  }
`;

const TeamDiv = styled.div`
  /* display: flex; */
  text-align: center;
  /* justify-content: center; */
  /* flex-direction: column; */
  /* width: 100%; */
`;

const CardsDiv = styled.div`
  display: grid;
  position: relative;
  justify-content: center;
  align-items: center;
  /* width: 80%; */
  margin-inline: 10%;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  @media (max-width: 1024px) {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
  @media (max-width: 768px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
  @media (max-width: 480px) {
    grid-template-columns: repeat(1, minmax(0, 1fr));
  }

  /* gap: 1.5%; */
  margin: 5% 5%;
  overflow-y: scroll;
`;

const Card = styled.div`
  margin: 2.5%;
  background-color: #f1f9ff;
  /* width: 20vw; */
  height: 70vh;
  position: relative;
`;

const ProfilePicture = styled.div`
  position: absolute;
  bottom: 0;
  left: 10%;
  right: 10%;
  top: 5%;
  height: 350px;
`;
const Name = styled.div`
  position: absolute;
  font-size: 1.3rem;
  bottom: 24%;
  left: 0;
  right: 0;
  color: black;
`;

const Role = styled.div`
  position: absolute;
  font-size: 0.8rem;
  bottom: 20%;
  left: 0;
  right: 0;
  color: black;
  text-transform: uppercase;
`;

const Links = styled.div`
  position: absolute;
  bottom: 10%;
  left: 20%;
  right: 20%;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
`;

export default function About({ employees, categories }) {
  return (
    <>
      <Head>
        <title>About Us - NM Studio</title>
      </Head>
      <Navigation categories={categories} />
      <Page>
        <Hero>
          <H2 defaultFontSize={"3rem"} tabletFontSize={"1.5rem"}>
            A little more about
          </H2>
          <Title marginBottom={"0%"}>NM Studio</Title>
          <SubTitle>
            Design Is Everything”. Architecture is the art and science of
            designing buildings and other physical structures. A wider deﬁnition
            often includes the design of the total built environment from the
            macro level of town planning, urban design, and landscape
            architecture to the micro level of construction details and, luxury
            residence to furniture.
          </SubTitle>
          <Arrow marginTop={"10%"} />
        </Hero>
        {/* <TeamDiv>
          <H1
            defaultFontSize={"7rem"}
            tabletFontSize={"5.5rem"}
            mobileFontSize={"4.5rem"}
          >
            Meet the Team
          </H1>
          <CardsDiv>
            {employees &&
              employees.map((employee) => (
                <Card>
                  <ProfilePicture>
                    <Image
                      src={getStrapiMedia(employee.ProfilePicture)}
                      layout="fill"
                      objectFit="cover"
                      objectPosition="50% 50%"
                      priority
                    />
                  </ProfilePicture>
                  <Name>{employee.Name}</Name>
                  <Role>{employee.Role}</Role>
                  {employee.SocialLinks &&
                    employee.SocialLinks.map((SocialLink) => (
                      <Links>
                        <Link
                          href={`https://${SocialLink.InstagramLink}`}
                          passHref
                        >
                          <a>
                            <InstagramIcon />
                          </a>
                        </Link>
                        <Link
                          href={`https://${SocialLink.FacebookLink}`}
                          passHref
                        >
                          <a>
                            <FaceBookIcon />
                          </a>
                        </Link>
                        <Link
                          href={`https://${SocialLink.TwitterLink}`}
                          passHref
                        >
                          <a>
                            <TwitterIcon />
                          </a>
                        </Link>
                        <Link
                          href={`https://${SocialLink.WebsiteLink}`}
                          passHref
                        >
                          <a>
                            <WebIcon />
                          </a>
                        </Link>
                      </Links>
                    ))}
                </Card>
              ))}
          </CardsDiv>
        </TeamDiv> */}
        <Footer />
      </Page>
    </>
  );
}

export async function getStaticProps() {
  // const employees = await fetchAPI("/employees");
  const employees = [];
  return {
    props: {
      employees,
    },
  };
}
