import React from "react"
import { Link, useStaticQuery, graphql } from "gatsby"

import Layout from "../components/Layout"
import SEO from "../components/Seo"
import { Wrapper, Image, Actorss, BottomEdgeDown, BottomEdgeUp } from '../pageStyles/pageStyles'
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
      <SEO title="Home" />
      <Wrapper>
        <div className="banner">
          <Image fluid={bannerPhoto.imageFile.childImageSharp.fluid}
            alt={bannerPhoto.altText} />
          <div className="inner-div">
            <p className="header-title">{title}</p>
            <p className="header-description">{smallDescription}</p>
          </div>
          <BottomEdgeDown color={COLORS.BLACK} />
        </div>
        <div className="description">
          <p>{smallDescription}</p>
          <BottomEdgeUp color={COLORS.PRIMARY} />
        </div>
        <div className="Actors">
          <h2>Featured Actors</h2>
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