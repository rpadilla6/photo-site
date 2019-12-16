import React, { useEffect, useRef, useState } from "react"
import Layout from "../components/boilerplate/layout"
import SEO from "../components/boilerplate/seo"
import { useStaticQuery, graphql } from "gatsby"
import GatsbyImage from "gatsby-image"
import { ParallaxProvider, Parallax } from "react-scroll-parallax"
import BackgroundSlider from "gatsby-image-background-slider"
import styled from "styled-components"

function useInterval(callback: CallableFunction, delay: number) {
  const savedCallback = useRef<any>()

  // Remember the latest callback.
  useEffect(() => {
    savedCallback.current = callback
  }, [callback])

  // Set up the interval.
  useEffect(() => {
    function tick() {
      savedCallback.current()
    }
    if (delay !== null) {
      let id = setInterval(tick, delay)
      return () => clearInterval(id)
    }
  }, [delay])
}

const Slide = styled.div<{ visible: boolean }>`
  height: 100vh;
  max-height: 100%;
  background: white;
  overflow: hidden;
  width: 100%;
  transition: opacity 300ms ease-in;
  opacity: ${visible => (visible ? `1` : `0`)};
`
const SlideContainer = styled.div`
  overflow: hidden;
  width: 100vw;
  display: flex;
`
const Carousel = (props: any) => {
  const { photos } = props
  const [index, setIndex] = useState(0)

  useInterval(() => {
    setIndex((index + 1) % photos.length)
  }, 5000)

  const GeneratedSlide = (props: { image: any }) => {
    const { image } = props
    const [fade, setFade] = useState(true)

    useEffect(() => {
      setTimeout(() => {
        setFade(false)
      }, 300)
    }, [props])

    return (
      <Slide visible={fade}>
        <GatsbyImage fluid={image} imgStyle={{ objectFit: "contain" }} />
      </Slide>
    )
  }
  return (
    <SlideContainer>
      <GeneratedSlide image={photos[index].node.childImageSharp.fluid} />
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
        <Parallax y={[-20, 20]}>
          <Carousel photos={portfolio.allS3ImageAsset.edges} />
        </Parallax>
      </Layout>
    </ParallaxProvider>
  )
}

export default IndexPage
