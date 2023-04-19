"use strict";
const fs = require("fs");
const path = require("path");

const crypto = require("crypto");

const rf = fs.promises.readFile;
const wf = fs.promises.writeFile;

const DEFAULT_STORAGE_PATH = path.join(__dirname, "storage", "genres.json");

class GenresDao {
    constructor(storagePath) {
        this.genreStoragePath = storagePath ? storagePath : DEFAULT_STORAGE_PATH;
    }

    async createGenre(genre) {
        let genrelist = await this._loadAllGenres();
        genre.id = crypto.randomBytes(8).toString("hex");
        genrelist.push(genre);
        await wf(this._getStorageLocation(), JSON.stringify(genrelist, null, 2));
        return genre;
    }

    async getGenre(id) {
        let genrelist = await this._loadAllGenres();
        const result = genrelist.find((b) => b.id === id);
        return result;
    }

    async updateGenre(genre) {
        let genrelist = await this._loadAllGenres();
        const genreIndex = genrelist.findIndex((b) => b.id === genre.id);
        if (genreIndex < 0) {
            throw new Error(`genre with given id ${genre.id} does not exists`);
        } else {
            genrelist[genreIndex] = {
                ...genrelist[genreIndex],
                ...genre,
            };
        }
        await wf(this._getStorageLocation(), JSON.stringify(genrelist, null, 2));
        return genrelist[genreIndex];
    }

    async deleteGenre(id) {
        let genrelist = await this._loadAllGenres();
        const genreIndex = genrelist.findIndex((b) => b.id === id);
        if (genreIndex >= 0) {
            genrelist.splice(genreIndex, 1);
        }
        await wf(this._getStorageLocation(), JSON.stringify(genrelist, null, 2));
        return {};
    }

    async listGenres() {
        let genrelist = await this._loadAllGenres();
        return genrelist;
    }

    async _loadAllGenres() {
        let genrelist;
        try {
            genrelist = JSON.parse(await rf(this._getStorageLocation()));
        } catch (e) {
            if (e.code === "ENOENT") {
                console.info("No storage found, initializing new one...");
                genrelist = [];
            } else {
                throw new Error(
                    "Unable to read from storage. Wrong data format. " +
                    this._getStorageLocation()
                );
            }
        }
        return genrelist;
    }

    _getStorageLocation() {
        return this.genreStoragePath;
    }
}

module.exports = GenresDao;
