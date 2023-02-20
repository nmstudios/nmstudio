import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import Arrow from "@/components/Arrow";
import { fetchAPI } from "@/lib/api";
import { getStrapiMedia } from "@/lib/media";

import "photoswipe/dist/photoswipe.css";
import "photoswipe/dist/default-skin/default-skin.css";
import { Gallery, Item } from "react-photoswipe-gallery";

import styled from "styled-components";
import { useState } from "react";
import Image from "next/image";
import { H1 } from "@/components/Typography";

const Page = styled.div`
  background-color: black;
  height: 100%;
`;

const ProjectHero = styled.div`
  background-image: linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.8)),
    url(${({ imageUrl }) => imageUrl});
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  color: white;
  text-align: center;
`;

const ProjectTitle = styled.div`
  margin-top: 10%;
  color: white;
  font-size: 10rem;
  text-align: center;
`;

const ProjectSubtitle = styled.div`
  width: 100%;
  color: white;
  text-align: center;
`;

const ProjectDescription = styled.div`
  /* margin: 5% 0; */
  width: 100%;
  color: white;
  text-align: center;
`;

const ProjectDiv = styled.div`
  display: grid;
  grid-template-columns: repeat(1, minmax(0, 1fr));
  grid-auto-flow: row;
  justify-content: center;
  align-items: center;
  margin: 10% 0;
`;
const PicturesDiv = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  margin: 10%;
  row-gap: 1.75%;
  column-gap: 3%;
  grid-auto-flow: row;
  /* overflow-y: auto; */
  @media (max-width: 768px) {
    grid-template-columns: repeat(1, minmax(0, 1fr));
  }
`;

const Picture = styled.div`
  position: relative;
  grid-row: ${({ pictureIndex }) =>
    pictureIndex % 3 == 0 ? "span 2 /span 2" : 0};
  order: ${({ index, pictureIndex }) =>
    index == 0 && pictureIndex % 2 == 1 ? "9999" : "-9999"};
  min-height: 300px;
  @media (max-width: 768px) {
    grid-column: span 1 / span 1;
    grid-row: span 1 / span 1;
  }
`;

export default function ProjectPage({ project, categories }) {
  const HeroImage = getStrapiMedia(project.Thumbnail);
  let lastIndex = 0;

  return (
    <>
      <Page>
        <Navigation categories={categories} />
        <ProjectHero imageUrl={HeroImage}>
          <H1 defaultFontSize={"7.5rem"} tabletFontSize={"4.5rem"} fontWeight={"300"}>
            {project.Title}
          </H1>
          {/* <ProjectTitle>{project.Title}</ProjectTitle> */}
          <ProjectSubtitle>{project.SubTitle}</ProjectSubtitle>
          <Arrow marginTop={"10%"} />
        </ProjectHero>
        <ProjectDiv>
          <Gallery>
            {project.Gallery.map((_, index) => {
              // add edge cases for end of array here
              if (index % 3 === 0 || index === project.Gallery.length) {
                let images =
                  index % 3 === 0
                    ? project.Gallery.slice(index, index + 3)
                    : project.Gallery.slice(
                        lastIndex,
                        project.Gallery.length + 1
                      ); // check for out of bounds index here
                let text = project.TextRow[index / 3]?.Description;
                lastIndex = index;
                return (
                  <ProjectSection
                    images={images}
                    text={text}
                    tIndex={index / 3}
                  />
                );
              }
            })}
          </Gallery>
        </ProjectDiv>
        <Footer />
      </Page>
    </>
  );
}

const ProjectSection = ({ images, text, tIndex }) => {
  return (
    <>
      <ProjectDescription>{text}</ProjectDescription>
      <PicturesDiv>
        {images.map((picture, index) => {
          return (
            <Item
              original={getStrapiMedia(picture)}
              thumbnail={getStrapiMedia(picture.formats.thumbnail)}
              width={picture.width}
              height={picture.height}
              key={picture.name}
            >
              {({ ref, open }) => (
                <Picture
                  index={tIndex}
                  pictureIndex={index}
                  ref={ref}
                  onClick={open}
                >
                  <Image
                    src={getStrapiMedia(picture)}
                    layout="fill"
                    objectFit="cover"
                    objectPosition="50% 50%"
                    priority
                  />
                </Picture>
              )}
            </Item>
          );
        })}
      </PicturesDiv>
    </>
  );
};

export async function getStaticPaths() {
  const projects = await fetchAPI("/projects");

  return {
    paths: projects.map((project) => ({
      params: {
        slug: project.slug,
      },
    })),
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const project =[];
  return {
    props: {
      project,
    },
  };
}

{
  /* <Gallery>
  {project.TextRow.map((textfield, index) => (
    <>
      <ProjectDescription>{textfield.Description}</ProjectDescription>(
      <PicturesDiv>
        {project.Gallery &&
          project.Gallery.slice(
            index * 3,
            index * 3 + 3 > project.Gallery.length
              ? project.Gallery.length
              : index * 3 + 3
          ).map((picture, pictureIndex) => {
            tIndex = index;
            return (
              <Item
                original={getStrapiMedia(picture)}
                thumbnail={getStrapiMedia(picture.formats.thumbnail)}
                width={picture.width}
                height={picture.height}
                key={picture.name}
              >
                {({ ref, open }) => (
                  <Picture
                    index={index}
                    pictureIndex={pictureIndex}
                    image={getStrapiMedia(picture)}
                    ref={ref}
                    onClick={open}
                  ></Picture>
                )}
              </Item>
            );
          })}
      </PicturesDiv>
      )
    </>
  ))}
</Gallery>; */
}
// {
//    {project.Gallery.length > (tIndex + 1) * 3
//           ? project.Gallery &&
//             project.Gallery.map((item, index) => {
//               project.Gallery &&
//                 project.Gallery.map((item, index) => {
//               roi((index + 1) * 3, tIndex, project.Gallery.length);
//               return { restOfImages };
//               if (index < (project.Gallery.length - (tIndex + 1) * 3) / 3 + 1) {
//                 {
//                   project.Gallery.slice(
//                     (tIndex + 1) * 3,
//                     project.Gallery.length
//                   ).map((picture, pictureIndex) => {
//                     return (
//                       <>
//                         <Gallery>
//                           <PicturesDiv>
//                             <Item
//                               original={getStrapiMedia(picture)}
//                               thumbnail={getStrapiMedia(
//                                 picture.formats.thumbnail
//                               )}
//                               width={picture.width}
//                               height={picture.height}
//                             >
//                               {({ ref, open }) => (
//                                 <Picture
//                                   ref={ref}
//                                   onClick={open}
//                                   index={tIndex + 1}
//                                   pictureIndex={pictureIndex}
//                                   image={getStrapiMedia(picture)}
//                                 ></Picture>
//                               )}
//                             </Item>
//                           </PicturesDiv>
//                         </Gallery>
//                       </>
//                     );
//                   });
//                 }
//               }
//             })
//           : null}
// }

// var restOfImages = [];
// function roi(index, tIndex, length) {
//   if (index < (length - (tIndex + 1) * 3) / 3 + 1) {
//     <>
//       {project.Gallery.slice((tIndex + 1) * 3, length).map(
//         (picture, pictureIndex) => {
//           restOfImages.push(
//             <>
//               <Gallery>
//                 <PicturesDiv>
//                   <Item
//                     original={getStrapiMedia(picture)}
//                     thumbnail={getStrapiMedia(picture.formats.thumbnail)}
//                     width={picture.width}
//                     height={picture.height}
//                   >
//                     {({ ref, open }) => (
//                       <Picture
//                         ref={ref}
//                         onClick={open}
//                         index={tIndex + 1}
//                         pictureIndex={pictureIndex}
//                         image={getStrapiMedia(picture)}
//                       />
//                     )}
//                   </Item>
//                 </PicturesDiv>
//               </Gallery>
//             </>
//           );
//         }
//       )}
//     </>;
//   }
// }

//  <PicturesDiv>
//           {project.Gallery.map((picture, index) => {
//             return (
//               <>
//                 <Item
//                   original={getStrapiMedia(picture)}
//                   thumbnail={getStrapiMedia(picture.formats.thumbnail)}
//                   width={picture.width}
//                   height={picture.height}
//                 >
//                   {({ ref, open }) => (
//                     <Picture
//                       ref={ref}
//                       onClick={open}
//                       index={index / 3}
//                       pictureIndex={index}
//                       image={getStrapiMedia(picture)}
//                     >
//                       {index}
//                     </Picture>
//                   )}
//                 </Item>
//                 {(index == 0 || (index + 1) % 3 == 0) &&
//                 tempIndex < project.TextRow.length
//                   ? descriptions[tempIndex++]
//                   : null}
//               </>
//             );
//           })}
//         </PicturesDiv>
