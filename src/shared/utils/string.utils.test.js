import { getUniqId, getClassNames } from './string.utils'

describe("stringUtils", () => {
    describe("getUniqId", () => {
        it("should not collisions when we generate 1000 ids", () => {
            const maxCollisionIterations = 1000;
            const ids = [];

            for (let i = 0; i < maxCollisionIterations; i++) {
                const newId = getUniqId();

                if(!ids.includes(newId)) {
                    ids.push(newId);
                }
            }

            expect(ids.length).toBe(maxCollisionIterations);
        })
    });

    describe("getClassNames", () => {
        it("should get empty string when data is not a object", () => {
            const existingClass = undefined;
            const data = undefined;
            const expectedResult = "";

            expect(getClassNames(existingClass, data)).toBe(expectedResult);
        })

        it("should get empty string when data is empty", () => {
            const existingClass = undefined;
            const data = {};
            const expectedResult = "";

            expect(getClassNames(existingClass, data)).toBe(expectedResult);
        })

        it("should get existing class when data is empty", () => {
            const existingClass = "test";
            const data = {};
            const expectedResult = "test";

            expect(getClassNames(existingClass, data)).toBe(expectedResult);
        })

        it("should get class generation string", () => {
            const existingClass = "test";
            const data = {
                active: true,
                disabled: false
            };
            const expectedResult = "test active";

            expect(getClassNames(existingClass, data)).toBe(expectedResult);
        })
    });
})