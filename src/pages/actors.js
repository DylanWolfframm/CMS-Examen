import React from "react"
import { Link, useStaticQuery, graphql } from "gatsby"

import Layout from "../components/Layout"
import { Wrapper, Image, Actorss, BottomEdgeUp } from '../pageStyles/pageStyles'
import { COLORS } from "../constants"

const IndexPage = () => {
  const {
    wpcontent: {
      page: {
        Home: {
          featuredProducts,
          smallDescription,
          title,
          bannerPhoto,
        }
      }
    }
  } = useStaticQuery(graphql`
  query {
    wpcontent {
      page(id: "home", idType: URI) {
        Home {
          title
          smallDescription
          featuredProducts {
            ... on WPGraphql_Actor {
              id
              slug
              Actor {
                age
                kleineBeschrijving
                name
                originate
                bannerPhoto {
                  altText
                  sourceUrl
                  imageFile {
                  childImageSharp {
                  fluid(quality: 50, grayscale: true){
                  ...GatsbyImageSharpFluid_withWebp
                  }
              }
            }
              }
            }
          }
        }
          bannerPhoto {
            altText
            sourceUrl
            imageFile {
              childImageSharp {
                fluid(quality: 100){
                  ...GatsbyImageSharpFluid_withWebp
                  }
              }
            }
          }
        }
      }
    }
  } 
  `)
  return (
    <Layout>
      <Wrapper>
        <div className="description">
          <BottomEdgeUp color={COLORS.PRIMARY} />
        </div>
        <div className="Actors">
          <h2>Actors</h2>
          <div className="Actor-items">
            {featuredProducts.map(({ Actor, slug }) => (
              <Actorss to={`/${slug}`}>
                <Image fluid={Actor.bannerPhoto.imageFile.childImageSharp.fluid} altText={Actor.bannerPhoto.altText} />
                <div className="Actor-info">
                  <p>{Actor.name}</p>
                  <p>{Actor.originate}</p>
                </div>
              </Actorss>
            ))}
          </div>
        </div>
      </Wrapper>
    </Layout>
  )
}

export default IndexPage