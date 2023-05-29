"use strict";
const fs = require("fs");
const path = require("path");

const crypto = require("crypto");

const rf = fs.promises.readFile;
const wf = fs.promises.writeFile;

const DEFAULT_STORAGE_PATH = path.join(__dirname, "storage", "ratings.json");

class RatingsDao {
    constructor(storagePath) {
        this.ratingStoragePath = storagePath ? storagePath : DEFAULT_STORAGE_PATH;
    }

    async createRating(rating) {
        let ratinglist = await this._loadAllRatings();
        rating.id = crypto.randomBytes(8).toString("hex");
        ratinglist.push(rating);
        await wf(this._getStorageLocation(), JSON.stringify(ratinglist, null, 2));
        return rating;
    }

    async getRating(videoId) {
        let ratinglist = await this._loadAllRatings();
        const result = ratinglist.find((b) => b.video_id === videoId);
        return result;
    }

    async updateRating(rating) {
        let ratinglist = await this._loadAllRatings();
        const ratingIndex = ratinglist.findIndex((b) => b.id === rating.id);
        if (ratingIndex < 0) {
            throw new Error(`rating with given id ${rating.id} does not exists`);
        } else {
            ratinglist[ratingIndex] = {
                ...ratinglist[ratingIndex],
                ...rating,
            };
        }
        await wf(this._getStorageLocation(), JSON.stringify(ratinglist, null, 2));
        return ratinglist[ratingIndex];
    }

    async deleteRating(video_id) {
        let ratinglist = await this._loadAllRatings();
        const ratingIndex = ratinglist.findIndex((b) => b.video_id === video_id);
        if (ratingIndex >= 0) {
            ratinglist.splice(ratingIndex, 1);
        }
        await wf(this._getStorageLocation(), JSON.stringify(ratinglist, null, 2));
        return {};
    }

    async listRatings() {
        let ratinglist = await this._loadAllRatings();
        return ratinglist;
    }

    async _loadAllRatings() {
        let ratinglist;
        try {
            ratinglist = JSON.parse(await rf(this._getStorageLocation()));
        } catch (e) {
            if (e.code === "ENOENT") {
                console.info("No storage found, initializing new one...");
                ratinglist = [];
            } else {
                throw new Error(
                    "Unable to read from storage. Wrong data format. " +
                    this._getStorageLocation()
                );
            }
        }
        return ratinglist;
    }

    _getStorageLocation() {
        return this.ratingStoragePath;
    }
}

module.exports = RatingsDao;
