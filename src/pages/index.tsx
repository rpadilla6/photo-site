import React from "react"
import Layout from "../components/boilerplate/layout"
import Image from "../components/boilerplate/image"
import SEO from "../components/boilerplate/seo"
import { useStaticQuery, graphql } from "gatsby"
import GatsbyImage from "gatsby-image"

const IndexPage = () => {
  const data = useStaticQuery(graphql`
    query {
      allS3ImageAsset {
        edges {
          node {
            ETag
            EXIF {
              DateCreatedISO
            }
            childImageSharp {
              fluid {
                ...GatsbyImageSharpFluid_tracedSVG
              }
            }
          }
        }
      }
    }
  `)
  console.log(data)

  return (
    <Layout>
      <SEO title="Home" />
      <h1>Hi peoplees</h1>
      <p>Welcome to your new Gatsby site.</p>
      <p>Now go build something great.</p>
      <div style={{ maxWidth: `300px`, marginBottom: `1.45rem` }}>
        <Image />
      </div>
      {data.allS3ImageAsset.edges.map((image: any) => (
        <GatsbyImage fluid={image.node.childImageSharp.fluid} />
      ))}
    </Layout>
  )
}

export default IndexPage
