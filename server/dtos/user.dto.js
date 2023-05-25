module.exports = class UserDto {
    id;
    email;
    roles;
    isActivated;

    constructor(model) {
        this.id = model.rows[0].id;
        this.email = model.rows[0].email;
        this.roles = model.rows[0].roles;
        this.isActivated = model.rows[0].isactivated;
    }
}