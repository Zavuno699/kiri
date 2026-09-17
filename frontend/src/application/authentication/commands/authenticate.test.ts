import { describe, it, expect, vi, afterEach } from "vitest"
import { authenticate } from "./authenticate"
import { getAuthenticationState, clearAuthenticationState } from "../state/authenticationStore"

vi.mock("../../../api/client")

describe("authenticate", () => {
	afterEach(() => {
		clearAuthenticationState()
	})

	it("should store session_id from backend response", async () => {
		const mockResponse = {
			subject_id: "test-subject-id",
			email: "test@example.com",
			roles: ["landlord"],
			is_admin: false,
			is_super_admin: false,
			session_id: "test-session-token",
		}

		const { apiFetch } = await import("../../../api/client")
		vi.mocked(apiFetch).mockResolvedValue(mockResponse)

		const result = await authenticate({
			email: "test@example.com",
			password: "testpassword",
		})

		expect(result.session_id).toBe("test-session-token")

		const authState = getAuthenticationState()
		expect(authState.sessionId).toBe("test-session-token")
		expect(authState.authenticated).toBe(true)
	})

	it("should store roles from backend response", async () => {
		const mockResponse = {
			subject_id: "test-subject-id",
			email: "test@example.com",
			roles: ["landlord"],
			is_admin: false,
			is_super_admin: false,
			session_id: "test-session-token",
		}

		const { apiFetch } = await import("../../../api/client")
		vi.mocked(apiFetch).mockResolvedValue(mockResponse)

		await authenticate({
			email: "test@example.com",
			password: "testpassword",
		})

		const authState = getAuthenticationState()
		expect(authState.roles).toEqual(["landlord"])
	})
})
