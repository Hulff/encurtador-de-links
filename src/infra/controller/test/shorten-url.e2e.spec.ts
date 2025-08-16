import { Test } from "@nestjs/testing";
import { INestApplication } from "@nestjs/common";
import { Connection } from "mongoose";
import { Server } from "http";
import request from "supertest";

import { AppModule } from "src/app.module";
import { DatabaseService } from "src/infra/database/database.service";

describe("Shorten Url Controllers (e2e)", () => {
    let dbConnection: Connection;
    let app: INestApplication;
    let httpServer: Server;

    beforeAll(async () => {
        const moduleRef = await Test.createTestingModule({
            imports: [AppModule],
        }).compile();

        app = moduleRef.createNestApplication();
        await app.init();

        dbConnection = moduleRef.get<DatabaseService>(DatabaseService).getDbHandle();
        httpServer = app.getHttpServer();
    });

    describe("POST /shorten", () => {
        it("should return the short id", async () => {
            const response = await request(httpServer)
                .post("/shorten-url")
                .send({ url: "https://www.example.com" })
                .expect(201);
            console.log(response.body);
            expect(response.body).toHaveProperty("shortId");
            expect(typeof response.body.shortId).toBe("string");
        });
    });
    
    afterAll(async () => {
        if (dbConnection) await dbConnection.close();
        if (app) await app.close();
    });
});
