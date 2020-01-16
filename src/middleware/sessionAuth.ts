import { ExpressOIDC } from "@okta/oidc-middleware";
import session from "express-session";

export const register = (app: any) => {
    // create the oidc client
    const oidc = new ExpressOIDC({
        client_id: process.env.OKTA_CLIENT_ID,
        client_secret: process.env.OKTA_CLIENT_SECRET,
        issuer: `${process.env.OKTA_ORG_URL}/oauth2/default`,
        redirect_uri: `${process.env.HOST_URL}/authorization-code/callback`,
        scope: "openid profile"
    });

    // configure express to use authentcation sessions
    app.use(session({
        resave: true,
        saveUninitialized: false,
        secret: process.env.SESSION_SECRET
    }));

    // configure express to use the OIDC router
    app.use(oidc.router);

    // add the oidc client to the app locals
    app.locals.oidc = oidc;
};
