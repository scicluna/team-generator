const Engineer = require("../lib/Engineer")

describe('Constructor', () =>{
    it('New engineer objects should have a name, id, and an email, and a github username', () => {
        const newEngineer = new Engineer("John", 1, "john@engineer.com", "johnh")
        expect(newEngineer.name).toBe("John")
        expect(newEngineer.id).toBe(1)
        expect(newEngineer.email).toBe("john@engineer.com")
        expect(newEngineer.github).toBe("johnh")
    })
})

describe('getRole', () => {
    it('getRole should return the role "Engineer"', () => {
        const newEngineer = new Engineer("John", 1, "john@engineer.com", "johnh")
        expect(newEngineer.getRole()).toBe("Engineer")
    })
})

describe('getGithub', () => {
    it("getGithub should return the Engineer's github username", () => {
        const newEngineer = new Engineer("John", 1, "john@engineer.com", "johnh")
        expect(newEngineer.getGithub()).toBe("johnh")
    })
})