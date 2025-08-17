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
    beforeEach(async () => {
        await dbConnection.collection("shortenUrls").deleteMany({});
    });

    describe("POST /shorten-url", () => {
        it("should return the short id", async () => {
            const response = await request(httpServer)
                .post("/shorten-url")
                .send({ url: "https://www.example.com" })
                .expect(201);
            // console.log(response.body);
            expect(response.body).toHaveProperty("shortId");
            expect(typeof response.body.shortId).toBe("string");
        });
    });
    describe("Delete /shorten-url/:id", () => {
        it("should delete the url", async () => {
            const data = await dbConnection.collection("shortenUrls").insertOne({
                originalUrl: "https://www.example.com",
                shortId: "abc123",
                id: "abcd1234"
            });

            await request(httpServer)
                .delete(`/shorten-url/abcd1234`)
                .expect(204);
            const deletedData = await dbConnection.collection("shortenUrls").findOne({ id: data.insertedId });
            // console.log(deletedData);
            expect(deletedData).toBeNull();
        });
    });
    describe("GET /url", () => {
        it("should get the original url", async () => {
            await dbConnection.collection("shortenUrls").insertOne({
                originalUrl: "https://www.example.com",
                shortId: "124aa",
                id: "abcd1234",
                createdAt: new Date(),
                clicks: 0
            });
            const response = await request(httpServer)
                .get(`/url`)
                .query({ shortId: "124aa" }) // GET query param
                .expect(200);

            expect(response.body).toHaveProperty("originalUrl");
            expect(response.body.originalUrl).toBe("https://www.example.com");
        });
    });
    describe("GET /shorten-url", () => {
        it("should get the original url", async () => {
            await dbConnection.collection("shortenUrls").insertOne({
                originalUrl: "https://www.example.com",
                shortId: "124aa",
                id: "abcd1234",
                createdAt: new Date(),
                clicks: 0
            });
            const response = await request(httpServer)
                .get(`/shorten-url`)
                .query({ id: "abcd1234" }) // GET query param
                .expect(200);

            expect(response.body).toHaveProperty("originalUrl");
            expect(response.body.originalUrl).toBe("https://www.example.com");
        });
    });


    afterAll(async () => {
        if (dbConnection) await dbConnection.close();
        if (app) await app.close();
    });
});
