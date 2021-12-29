module.exports = (DB, type) => {
    return DB.define('USER', 
{
    id: {
        type: type.NUMBER,
        primaryKey: true,
        autoIncrement: true,
    }, 
    firstName: {
        type: type.STRING,
        noEmpty: true,
    },
    lastName: {
        type: type.STRING,
        noEmpty: true,
    },
    email: {
        type: type.STRING,
        noEmpty: true,
        unique: true,
        validate: {
            isEmail: true,
        }
    },
    password: {
        type: type.STRING,
        noEmpty: true,
    },
    role: {
        type: type.STRING,
    },
}, {
    // Opción para permitir soft delete
    paranoid: true
});
}

