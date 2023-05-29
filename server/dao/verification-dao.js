"use strict";
const fs = require("fs");
const path = require("path");

const crypto = require("crypto");
const dateFormat = require("dateformat")

const rf = fs.promises.readFile;
const wf = fs.promises.writeFile;

const DEFAULT_STORAGE_PATH = path.join(__dirname, "storage", "verification.json");

class VideoDao {
    constructor(storagePath) {
        this.verificationStoragePath = storagePath
            ? storagePath
            : DEFAULT_STORAGE_PATH;
    }

    async createVideo(video) {
        let verificationList = await this._loadAllVideos();
        video.id = crypto.randomBytes(8).toString("hex");
        const now = new Date()
        video.date = dateFormat(now, "dd.mm.yyyy HH:MM:ss");
        verificationList.push(video);
        await wf(
            this._getStorageLocation(),
            JSON.stringify(verificationList, null, 2)
        );
        return video;
    }

    async getVideo(id) {
        let video = await this._loadAllVideos();
        const result = video.find((b) => b.id === id);
        return result;
    }

    async updateVideo(video) {
        let verificationList = await this._loadAllVideos();
        const videoIndex = verificationList.findIndex(
            (b) => b.id === video.id
        );
        if (videoIndex < 0) {
            throw new Error(
                `video with given id ${video.id} does not exists`
            );
        } else {
            verificationList[videoIndex] = {
                ...verificationList[videoIndex],
                ...video,
            };
        }
        await wf(
            this._getStorageLocation(),
            JSON.stringify(verificationList, null, 2)
        );
        return verificationList[videoIndex];
    }

    async deleteVideo(id) {
        let verificationList = await this._loadAllVideos();
        const videoIndex = verificationList.findIndex((b) => b.id === id);
        if (videoIndex >= 0) {
            verificationList.splice(videoIndex, 1);
        }
        await wf(
            this._getStorageLocation(),
            JSON.stringify(verificationList, null, 2)
        );
        return {};
    }

    async listVideos() {
        let verificationList = await this._loadAllVideos();
        return verificationList;
    }

    async _loadAllVideos() {
        let verificationList;
        try {
            verificationList = JSON.parse(await rf(this._getStorageLocation()));
        } catch (e) {
            if (e.code === "ENOENT") {
                console.info("No storage found, initializing new one...");
                verificationList = [];
            } else {
                throw new Error(
                    "Unable to read from storage. Wrong data format. " +
                    this._getStorageLocation()
                );
            }
        }
        return verificationList;
    }

    _getStorageLocation() {
        return this.verificationStoragePath;
    }
}

module.exports = VideoDao;
