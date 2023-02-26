import { Failure, Success } from "../src"

describe("Test suite for Result class", () => {
    it("Success return an instance of Success", () => {
        expect(new Success()).toBeInstanceOf(Success)
    })

    it("Success. create return an instance of Success", () => {
        expect(Success.create()).toBeInstanceOf(Success)
    })

    it("instance of success created via constructor has the provided value", () => {
        const value = { prop: "anything" }
        expect(new Success(value).value).toBe(value)
    })

    it("instance of success created via create method has the provided value", () => {
        const value = { prop: "anything" }
        expect(Success.create(value).value).toBe(value);
    })

    it("Success.check return true if the object provided its a success object", () => {
        const success = Success.create();
        expect(Success.check(success)).toBeTruthy()
    }),

    it("Succes.check return false if the object provided isnt a success object", () => {
        const failure = Failure.create();
        expect(Success.check(failure)).toBeFalsy()
    })
})