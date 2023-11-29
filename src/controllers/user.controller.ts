import { FastifyReply, FastifyRequest } from "fastify"
import { IUser } from "interfaces"
import type * as s from 'zapatos/schema'
import * as db from 'zapatos/db'
import pool from '../db/pgPool'

export const listUsers = 
  async (request: FastifyRequest, reply: FastifyReply) => {
    return db.sql<s.users.SQL, s.users.Selectable[]>`SELECT * FROM ${"users"}`
    .run(pool)
    .then((users) => ({ data: users }))
    // Or .then((users) => reply.send({ data: users }))
}

export const addUser = async (request: FastifyRequest, reply: FastifyReply) => {
  const user = request.body;
  let name = user["name"]
  return db.sql<s.users.SQL, s.users.Insertable[]>`INSERT INTO ${"users"} (name) VALUES ('${name}');`
  .run(pool)
  .then((users) => ({ data: users }))
}

const staticUsers: IUser[] = [
    {
        id: 1,
        name: 'Joyce Byers'
      },
      {
        id: 2,
        name: 'Jimmi Hopper'
      },
      {
        id: 3,
        name: 'Mike Wheeler'
      },
      {
        id: 4,
        name: 'Dustin Henderson'
      },
      {
        id: 5,
        name: 'Lucas Sinclair'
      }
]

// export const addUser = async (request: FastifyRequest, reply: FastifyReply) => {
//     Promise.resolve(staticUsers)
//     .then((users) => {
//         const user = request.body;
//         const iuser : IUser = {
//             id:users[users.length-1]["id"]+1,
//             name: user["name"]
//         }
//         users.push(iuser);
//         console.log(users)
// 	reply.send({ data: user })
//   })
// }

export const updateUser = async (request: FastifyRequest, reply: FastifyReply) => {
    Promise.resolve(staticUsers)
    .then((users) => {
        const id = request.params["id"];
        const userscore = request.body["score"];
        const userToUpdate = users.filter((person) => person.id == id)
        if (userToUpdate.length == 0) {
            reply.send("User not found")
        } else {
            userToUpdate[0]["score"] = userscore
            reply.send(userToUpdate[0])
        }
        console.log(users)
  })
}

// export const listUsers = async (
//  request: FastifyRequest, 
//  reply: FastifyReply) => {
//   Promise.resolve(staticUsers)
//   .then((users) => {
// 	reply.send({ data: users })
//   })
// }

export const UserById = async (
    request: FastifyRequest, 
    reply: FastifyReply) => {
     const id = request.params["id"];
     console.log(id);
     Promise.resolve(staticUsers)
     .then((users) => {
       reply.send((users.filter((person) => person.id == id)))
     })
   }