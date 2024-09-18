import { describe, expect, test } from "bun:test";
import { Deferred } from "./index";

describe("Deferred class", () => {
    test("should resolve with the correct value", async () => {
        const def = new Deferred<string>();

        setTimeout(() => {
            def.resolve("success");
        }, 10);

        const result = await def.promise;
        expect(result).toBe("success");
    });

    test("should reject with the correct error", async () => {
        const def = new Deferred<string>();

        setTimeout(() => {
            def.reject(new Error("failure"));
        }, 10);

        try {
            await def.promise;
        } catch (error) {
            expect(error).toEqual(new Error("failure"));
        }
    });

    test("promise should stay pending until resolved or rejected", async () => {
        const def = new Deferred<string>();

        let isResolved = false;

        def.promise.then(() => {
            isResolved = true;
        });

        // Initially, the promise is still pending
        expect(isResolved).toBe(false);

        def.resolve("done");

        // Wait a tick to allow the promise to resolve
        await def.promise;
        expect(isResolved).toBe(true);
    });
});
