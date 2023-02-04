const Intern = require("../lib/Intern")

describe('Constructor', () =>{
    it('New Intern objects should have a name, id, and an email, and a school', () => {
        const newIntern = new Intern("John", 1, "john@intern.com", "MSU")
        expect(newIntern.name).toBe("John")
        expect(newIntern.id).toBe(1)
        expect(newIntern.email).toBe("john@intern.com")
        expect(newIntern.school).toBe("MSU")
    })
})

describe('getRole', () => {
    it('getRole should return the role "Intern"', () => {
        const newIntern = new Intern("John", 1, "john@intern.com", "MSU")
        expect(newIntern.getRole()).toBe("Intern")
    })
})

describe('getSchool', () => {
    it("getSchool should return the Intern's school", () => {
        const newIntern = new Intern("John", 1, "john@intern.com", "MSU")
        expect(newIntern.getSchool()).toBe("MSU")
    })
})