import * as express from "express";

export const register = (app: express.Application) => {
    const oidc = app.locals.oidc;

    // home
    app.get("/", (req: express.Request, res: express.Response) => {
        res.render("index");
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
    app.get("/guitars", oidc.ensureAuthenticated(), (req: express.Request, res: express.Response) => {
        res.render("guitars");
    });
};
