import { Failure, Success } from "../src"

describe("Failure test suite", () => {
    it("Failure return an instance of Failure", () => {
        expect(new Failure()).toBeInstanceOf(Failure)
    })

    it("Failure. create return an instance of Failure", () => {
        expect(Failure.create()).toBeInstanceOf(Failure)
    })

    it("instance of Failure created via constructor has the provided value", () => {
        const value = { prop: "anything" }
        expect(new Failure(value).error).toBe(value)
    })

    it("instance of Failure created via create method has the provided value", () => {
        const value = { prop: "anything" }
        expect(Failure.create(value).error).toBe(value);
    })

    it("Failure.check return true if the object provided its a Failure object", () => {

        const failure = Failure.create(5);
        if(Failure.check(failure)){
            failure.error
        }
        expect(Failure.check(failure)).toBeTruthy()
    }),

    it("Succes.check return false if the object provided isnt a Failure object", () => {
        const success = new Success();
        expect(Failure.check(success)).toBeFalsy()
    })
})