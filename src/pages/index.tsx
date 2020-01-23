import React, { useEffect, useRef, useState } from "react"
import Layout from "../components/boilerplate/layout"
import SEO from "../components/boilerplate/seo"
import { useStaticQuery, graphql } from "gatsby"
import GatsbyImage from "gatsby-image"
import { ParallaxProvider, Parallax } from "react-scroll-parallax"
import styled from "styled-components"

const Slide = styled(GatsbyImage)<{ visible: boolean }>`
  max-height: 100%;
  background: white;
  overflow: hidden;
  width: inherit;
  height: inherit;
  transition: opacity 750ms ease-in-out, transform 750ms ease-in-out;
  opacity: ${props => (props.visible ? `1` : `0`)};
  transform: ${props =>
    props.visible
      ? ``
      : `translate(${Math.floor(Math.random() * 50) *
          (Math.round(Math.random()) ? -1 : 1)}px, ${Math.floor(
          Math.random() * 50
        ) * (Math.round(Math.random()) ? -1 : 1)}px) scale(1.1)`};
`
const SlideContainer = styled.div`
  overflow: hidden;
  width: 100vw;
  height: 100vh;
  display: flex;
`
const Carousel = (props: any) => {
  const { photos } = props
  const [index, setIndex] = useState(0)
  const [fade, setFade] = useState(true)
  const photoDuration = 5000

  useEffect(() => {
    const introFadeId = setTimeout(() => setFade(true), 750)
    const id = setTimeout(
      () => setIndex((index + 1) % photos.length),
      photoDuration
    )
    const fadeId = setTimeout(() => setFade(false), photoDuration - 750)
    return () => {
      clearTimeout(id)
      clearTimeout(fadeId)
      clearTimeout(introFadeId)
    }
  }, [index])

  return (
    <SlideContainer>
      <Slide fluid={photos[index].node.childImageSharp.fluid} visible={fade} />
    </SlideContainer>
  )
}
const IndexPage = () => {
  const portfolio = useStaticQuery(graphql`
    query {
      allS3ImageAsset {
        edges {
          node {
            Key
            ETag
            EXIF {
              DateCreatedISO
            }
            childImageSharp {
              fluid(maxWidth: 4000, quality: 100) {
                ...GatsbyImageSharpFluid_tracedSVG
              }
            }
          }
        }
      }
    }
  `)

  return (
    <ParallaxProvider>
      <Layout>
        <SEO title="Home" />
        <Parallax y={[-50, 50]}>
          <Carousel photos={portfolio.allS3ImageAsset.edges} />
        </Parallax>
      </Layout>
    </ParallaxProvider>
  )
}

export default IndexPage
