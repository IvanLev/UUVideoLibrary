"use strict";
const fs = require("fs");
const path = require("path");

const crypto = require("crypto");

const rf = fs.promises.readFile;
const wf = fs.promises.writeFile;

const JWT = require("../helper/jwt-token");

const DEFAULT_STORAGE_PATH = path.join(__dirname, "storage", "users.json");

class UserDao {
    constructor(storagePath) {
        this.userStoragePath = storagePath
            ? storagePath
            : DEFAULT_STORAGE_PATH;
    }

    async createUser(data) {
        let userList = await this._loadAllUsers();
        const id = crypto.randomBytes(8).toString("hex");
        const imgPath = "";
        const role = "content creator";
        const token = JWT.create({ sub: id });
        const comments = { likes: [], dislikes: [] };
        const films = { likes: [], dislikes: [] }
        const user = {...data, id, role, token, comments, films, imgPath };
        userList.push(user);
        await wf(
            this._getStorageLocation(),
            JSON.stringify(userList, null, 2)
        );
        return user;
    }

    async getUser(id) {
        let user = await this._loadAllUsers();
        const result = user.find((b) => b.id === id);
        return result;
    }

    async getUserBy(option) {
      const [field, value] = Object.entries(option)[0];
      let user = await this._loadAllUsers();
      const result = user.find((b) => b[field] === value);
      return result;
    }

    async updateUser(user) {
        let userList = await this._loadAllUsers();
        const userIndex = userList.findIndex(
            (b) => b.id === user.id
        );
        if (userIndex < 0) {
            throw new Error(
                `video with given id ${user.id} does not exists`
            );
        } else {
            userList[userIndex] = {
                ...userList[userIndex],
                ...user,
            };
        }
        await wf(
            this._getStorageLocation(),
            JSON.stringify(userList, null, 2)
        );
        return userList[userIndex];
    }

    async listUsers() {
        let userList = await this._loadAllUsers();
        return userList;
    }

    async _loadAllUsers() {
        let userList;
        try {
            userList = JSON.parse(await rf(this._getStorageLocation()));
        } catch (e) {
            if (e.code === "ENOENT") {
                console.info("No storage found, initializing new one...");
                userList = [];
            } else {
                throw new Error(
                    "Unable to read from storage. Wrong data format. " +
                    this._getStorageLocation()
                );
            }
        }
        return userList;
    }

    _getStorageLocation() {
        return this.userStoragePath;
    }
}

module.exports = UserDao;
