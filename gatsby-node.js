const { createRemoteFileNode } = require(`gatsby-source-filesystem`)
const { graphql } = require("gatsby")
const path = require("path")

exports.createPages = ({graphql, actions}) => {
  const {createPage} = actions
  return graphql(`
  {
      wpcontent {
        actors {
          edges {
            node {
              id
              slug
            }
          }
        }
      }
    
  }
  `).then(result => {
    if (result.errors) {
      result.errors.forEach(e => console.error(e.toString()))
      return Promise.reject(result.errors)
    }

    const actors = result.data.wpcontent.actors.edges;
    actors.forEach(actor => {
      const {id, slug} = actor.node
      createPage({
        path: slug,
        component: path.resolve(`src/templates/actorsTemplate.js`),
        context: {
          id,
          slug,
        }
      })
    })
    return result
  })
}

/* Aan de hand van dit stukje code worden de images vanuit WPgraphql omgezet tot images waarop Gatsby image optimization kan toepassen */
exports.createResolvers = async ({
  actions,
  cache,
  createNodeId,
  createResolvers,
  store,
  reporter,
}) => {
  const { createNode } = actions

  await createResolvers({
    WPGraphql_MediaItem: {
      imageFile: {
        type: "File",
        async resolve(source) {
          let sourceUrl = source.sourceUrl

          if (source.mediaItemUrl !== undefined) {
            sourceUrl = source.mediaItemUrl
          }

          return await createRemoteFileNode({
            url: encodeURI(sourceUrl),
            store,
            cache,
            createNode,
            createNodeId,
            reporter,
          })
        },
      },
    },
  })
}
