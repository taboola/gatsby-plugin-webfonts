import { pathPrefix } from "../../gatsby-config";

describe(`fonts`, () => {
  beforeEach(() => {
    cy.visit(`/`).waitForRouteChange();
  });

  it(`displays content with the self hosted font-family`, () => {
    cy.getTestElement(`self-hosted-font`)
      .should(`have.css`, `font-family`)
      .and(`match`, /Open Sans/);
  });

  it(`displays content with the self hosted font-weight`, () => {
    cy.getTestElement(`self-hosted-font`)
      .should(`have.css`, `font-weight`)
      .and(`equal`, `400`);
  });

  it(`successfully loads fonts`, () => {
    cy.document().its(`fonts.status`).should(`equal`, `loaded`);
  });

  it(`successfully loads all google fonts`, () => {
    const validArr = [];
    const getFonts = async (font) => {
      if (font.family === `Roboto`) {
        validArr.push(font.weight);
      }
    };

    cy.document()
      .its(`fonts`)
      .invoke(`forEach`, getFonts)
      .then(() => {
        expect(validArr).to.include(`300`);
        expect(validArr).to.include(`400`);
        expect(validArr).to.include(`500`);
      });
  });

  it(`successfully loads all google2 fonts`, () => {
    const validArr = [];
    const getFonts = async (font) => {
      if (font.family === `Rubik`) {
        validArr.push(font.weight);
      }
    };

    cy.document()
      .its(`fonts`)
      .invoke(`forEach`, getFonts)
      .then(() => {
        expect(validArr).to.include(`300`);
        expect(validArr).to.include(`400`);
        expect(validArr).to.include(`500`);
        expect(validArr).to.include(`600`);
        expect(validArr).to.not.include(`700`);
      });
  });

  it(`successfully loads all self hosted fonts`, () => {
    const validArr = [];
    const getFonts = async (font) => {
      if (font.family === `Open Sans`) validArr.push(font.weight);
    };

    cy.document()
      .its(`fonts`)
      .invoke(`forEach`, getFonts)
      .then(() => {
        expect(validArr).to.include(`300`);
        expect(validArr).to.include(`400`);
        expect(validArr).to.not.include(`500`);
        expect(validArr).to.not.include(`700`);
      });
  });

  it(`successfully adds link to preload self hosted fonts`, () => {
    cy.get(`head`).within(() => {
      cy.get(`link[href="${pathPrefix}/static/webfonts/OpenSans300.woff2"]`)
        .should(`have.attr`, `rel`, `preload`)
        .and(`have.attr`, `as`, `font`)
        .and(`have.attr`, `type`, `font/woff2`);
    });
    cy.get(`head`).within(() => {
      cy.get(`link[href="${pathPrefix}/static/webfonts/OpenSans400.woff2"]`)
        .should(`have.attr`, `rel`, `preload`)
        .and(`have.attr`, `as`, `font`)
        .and(`have.attr`, `type`, `font/woff2`);
    });
  });
});
