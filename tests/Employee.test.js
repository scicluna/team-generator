const Employee = require("../lib/Employee")

    describe('Constructor', () =>{
        it('New employee objects should have a name, id, and an email', () => {
            const newEmployee = new Employee("John", 1, "john@employee.com")
            expect(newEmployee.name).toBe("John")
            expect(newEmployee.id).toBe(1)
            expect(newEmployee.email).toBe("john@employee.com")
        })
    })

    describe('getRole', () => {
        it('getRole should return the role "Employee"', () => {
            const newEmployee = new Employee("John", 1, "john@employee.com")
            expect(newEmployee.getRole()).toBe("Employee")
        })
    })