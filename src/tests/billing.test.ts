jest.mock("openai");   // ✅ forces Jest to use __mocks__/openai.ts
jest.mock("stripe");   // ✅ already mocking Stripe


import request from "supertest";
import app from "../app";

jest.mock("stripe", () => {
  return jest.fn().mockImplementation(() => ({
    checkout: {
      sessions: {
        create: jest.fn().mockResolvedValue({
          url: "https://mocked-checkout-url",
        }),
      },
    },
  }));
});

const API_KEY = process.env.API_KEY || "my-secret-api-key";

describe("Billing Routes", () => {
  it("rejects checkout without Authorization header", async () => {
    const res = await request(app).post("/v1/billing/checkout").send({ planId: "pro" });
    expect(res.status).toBe(401);
  });

  it("rejects checkout with invalid API key", async () => {
    const res = await request(app)
      .post("/v1/billing/checkout")
      .set("Authorization", "Bearer wrong-key")
      .send({ planId: "pro" });
    expect(res.status).toBe(403);
  });

  it("accepts checkout with valid API key", async () => {
    const res = await request(app)
      .post("/v1/billing/checkout")
      .set("Authorization", `Bearer ${API_KEY}`)
      .send({ planId: "pro" });

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("checkoutUrl");
  });

  it("returns success response", async () => {
    const res = await request(app)
      .get("/v1/billing/success")
      .set("Authorization", `Bearer ${API_KEY}`);

    expect(res.status).toBe(200);
    expect(res.body.status).toBe("success");
  });

  it("returns cancel response", async () => {
    const res = await request(app)
      .get("/v1/billing/cancel")
      .set("Authorization", `Bearer ${API_KEY}`);

    expect(res.status).toBe(200);
    expect(res.body.status).toBe("cancelled");
  });
});

console.log("API_KEY in test:", process.env.API_KEY);