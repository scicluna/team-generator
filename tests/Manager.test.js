const Manager = require("../lib/Manager")

describe('Constructor', () =>{
    it('New Manager objects should have a name, id, and an email, and a school', () => {
        const newManager = new Manager("John", 1, "john@manager.com", 123)
        expect(newManager.name).toBe("John")
        expect(newManager.id).toBe(1)
        expect(newManager.email).toBe("john@manager.com")
        expect(newManager.officeNumber).toBe(123)
    })
})

describe('getRole', () => {
    it('getRole should return the role "Manager"', () => {
        const newManager = new Manager("John", 1, "john@manager.com", 123)
        expect(newManager.getRole()).toBe("Manager")
    })
})