import { describe, it, expect } from "vitest"
import { resolvePostLoginRoute } from "../navigation/resolvePostLoginRoute"

describe("resolvePostLoginRoute", () => {
	it("should route super_admin to /admin", () => {
		const response = {
			subject_id: "test-subject-id",
			email: "admin@example.com",
			roles: ["super_admin"],
			is_admin: false,
			is_super_admin: true,
			session_id: "test-session",
		}

		const route = resolvePostLoginRoute(response)
		expect(route).toBe("/admin")
	})

	it("should route landlord to /landlord", () => {
		const response = {
			subject_id: "test-subject-id",
			email: "landlord@example.com",
			roles: ["landlord"],
			is_admin: false,
			is_super_admin: false,
			session_id: "test-session",
		}

		const route = resolvePostLoginRoute(response)
		expect(route).toBe("/landlord")
	})

	it("should route tenant to /tenant", () => {
		const response = {
			subject_id: "test-subject-id",
			email: "tenant@example.com",
			roles: ["tenant"],
			is_admin: false,
			is_super_admin: false,
			session_id: "test-session",
		}

		const route = resolvePostLoginRoute(response)
		expect(route).toBe("/tenant")
	})

	it("should route unknown roles to /", () => {
		const response = {
			subject_id: "test-subject-id",
			email: "user@example.com",
			roles: [],
			is_admin: false,
			is_super_admin: false,
			session_id: "test-session",
		}

		const route = resolvePostLoginRoute(response)
		expect(route).toBe("/")
	})

	it("should respect returnTo parameter", () => {
		const response = {
			subject_id: "test-subject-id",
			email: "user@example.com",
			roles: ["landlord"],
			is_admin: false,
			is_super_admin: false,
			session_id: "test-session",
		}

		const route = resolvePostLoginRoute(response, "/dashboard/properties")
		expect(route).toBe("/dashboard/properties")
	})
})
