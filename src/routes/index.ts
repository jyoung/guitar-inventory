import * as express from "express";
import * as api from "./api";

export const register = (app: express.Application) => {
    const oidc = app.locals.oidc;

    // home
    app.get("/", (req: any, res: express.Response) => {
        const user = req.userContext ? req.userContext.userInfo : null;
        res.render("index", { isAuthenticated: req.isAuthenticated(), user });
    });

    // login
    app.get("/login", oidc.ensureAuthenticated(), (req: express.Request, res: express.Response) => {
        res.redirect("/guitars");
    });

    // logout
    app.get("/logout", (req: any, res: express.Response) => {
        req.logout();
        res.redirect("/");
    });

    // secure route for the guitars page
    app.get("/guitars", oidc.ensureAuthenticated(), (req: any, res: express.Response) => {
        const user = req.userContext ? req.userContext.userinfo : null;
        res.render("guitars", { isAuthenticated: req.isAuthenticated(), user });
    });

    // register the api routes
    api.register(app);
};
