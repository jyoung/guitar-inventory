import dotenv from "dotenv";
import fs from "fs-extra";
import { Client } from "pg";

const init = async () => {
    // read environment variables
    dotenv.config();

    // create instance of the postgres client
    const client = new Client();
    try {
        // connect to the db server
        await client.connect();

        // read the contents of the initdb.pgsql file
        const sql = await fs.readFile("./tools/initdb.pgsql", { encoding: "UTF-8" });

        // spilt the file into separate statements
        const statements = sql.split(/;\s*$/m);
        for (const statement of statements) {
            if (statement.length > 3) {
                await client.query(statement);
            }
        }

    } catch (err) {
        // tslint:disable-next-line:no-console
        console.log(err);
        throw err;
    } finally {
        await client.end();
    }
};

init().then(() => {
    // tslint:disable-next-line:no-console
    console.log("finished");
}).catch(() => {
    // tslint:disable-next-line:no-console
    console.log("finished with errors");
});
