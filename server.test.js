const request = require("supertest");
const app = require("./server");

describe("GET /", () => {
  test("should return 200 OK", async () => {
    const res = await request(app).get("/");
    expect(res.statusCode).toBe(200);
    expect(res.text).toBe("Hello from Node.js + Jenkins CI/CD!");
  });
});