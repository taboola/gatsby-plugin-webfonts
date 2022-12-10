const path = require(`path`);

module.exports = {
  plugins: [
    `gatsby-plugin-top-layout`,
    `gatsby-plugin-material-ui`,
    {
      resolve: `gatsby-plugin-webfonts`,
      options: {
        fonts: {
          google: [
            {
              family: `Roboto`,
              variants: [`300`, `400`, `500`],
            },
          ],
          google2: [
            {
              family: `Rubik`,
              axes: `wght@300..600`,
            },
          ],
          selfHosted: [
            {
              family: `Open Sans`,
              urls: {
                woff2: path.join(`fonts`, `OpenSans300.woff2`),
              },
              fontStyle: `normal`,
              fontWeight: 300,
            },
            {
              family: `Open Sans`,
              urls: {
                woff2: path.join(`fonts`, `OpenSans400.woff2`),
              },
              fontStyle: `normal`,
              fontWeight: 400,
            },
          ],
        },
      },
    },
    `gatsby-plugin-react-helmet`,
  ],
  siteMetadata: {
    title: `My page`,
  },
};
