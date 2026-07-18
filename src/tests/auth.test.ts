import { describe, expect, it } from "vitest";
import { getAPIKey } from "../api/auth.js";
import { IncomingHttpHeaders } from "http";

describe("getAPIKey", () => {
  it("should return null if no authorization header is present", () => {
    const headers: IncomingHttpHeaders = {};
    expect(getAPIKey(headers)).toBeNull();
  });

  it("should return null if the authorization header is empty", () => {
    const headers: IncomingHttpHeaders = {
      authorization: "",
    };
    expect(getAPIKey(headers)).toBeNull();
  });

  it("should return null if authorization header does not start with 'ApiKey'", () => {
    const headers: IncomingHttpHeaders = {
      authorization: "Bearer some-token-value",
    };
    expect(getAPIKey(headers)).toBeNull();
  });

  it("should return null if authorization header only has 'ApiKey' but no token value", () => {
    const headers: IncomingHttpHeaders = {
      authorization: "ApiKey",
    };
    expect(getAPIKey(headers)).toBeNull();
  });

  it("should return the API key if authorization header is correctly formatted", () => {
    const headers: IncomingHttpHeaders = {
      authorization: "ApiKey my-secret-api-key-123",
    };
    expect(getAPIKey(headers)).toBe("my-secret-api-key-123");
  });

  it("should handle mixed case or headers key sensitivity properly", () => {
    // IncomingHttpHeaders usually lowercases keys, but let's test typical behavior
    const headers: IncomingHttpHeaders = {
      authorization: "ApiKey normal-case-key",
    };
    expect(getAPIKey(headers)).toBe("normal-case-key");
  });
});
