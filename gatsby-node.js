/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

// You can delete this file if you're not using it
const photographyQuery = graphql`
  {
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
`
