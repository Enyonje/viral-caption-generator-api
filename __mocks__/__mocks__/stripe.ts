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