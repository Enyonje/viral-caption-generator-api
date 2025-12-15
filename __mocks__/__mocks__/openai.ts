// __mocks__/openai.ts
export default class OpenAI {
  constructor(_config: any) {}

  chat = {
    completions: {
      create: jest.fn().mockResolvedValue({
        choices: [{ message: { content: "Mocked caption idea" } }],
      }),
    },
  };
}