"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.listUsers = void 0;
const staticUsers = [
    {
        id: 1,
        name: 'Joyce Byers'
    }
];
const listUsers = async (request, reply) => {
    Promise.resolve(staticUsers)
        .then((users) => {
        reply.send({ data: users });
    });
};
exports.listUsers = listUsers;
//# sourceMappingURL=user.controller.js.map