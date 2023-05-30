"use strict";
const fs = require("fs");
const path = require("path");

const crypto = require("crypto");

const rf = fs.promises.readFile;
const wf = fs.promises.writeFile;

const DEFAULT_STORAGE_PATH = path.join(__dirname, "storage", "videos.json");

class VideoDao {
    constructor(storagePath) {
        this.videoStoragePath = storagePath
            ? storagePath
            : DEFAULT_STORAGE_PATH;
    }

    async createVideo(video) {
        let videoList = await this._loadAllVideos();
        video.id = crypto.randomBytes(8).toString("hex");
        videoList.push(video);
        await wf(
            this._getStorageLocation(),
            JSON.stringify(videoList, null, 2)
        );
        return video;
    }

    async getVideo(id) {
        let video = await this._loadAllVideos();
        const result = video.find((b) => b.id === id);
        return result;
    }

    async updateVideo(video) {
        let videoList = await this._loadAllVideos();
        const videoIndex = videoList.findIndex(
            (b) => b.id === video.id
        );
        if (videoIndex < 0) {
            throw new Error(
                `video with given id ${video.id} does not exists`
            );
        } else {
            videoList[videoIndex] = {
                ...videoList[videoIndex],
                ...video,
            };
        }
        await wf(
            this._getStorageLocation(),
            JSON.stringify(videoList, null, 2)
        );
        return videoList[videoIndex];
    }

    async deleteVideo(id) {
        let videoList = await this._loadAllVideos();
        const videoIndex = videoList.findIndex((b) => b.id === id);
        if (videoIndex >= 0) {
            videoList.splice(videoIndex, 1);
        }
        await wf(
            this._getStorageLocation(),
            JSON.stringify(videoList, null, 2)
        );
        return {};
    }

    async listVideos() {
        let videoList = await this._loadAllVideos();
        return videoList;
    }

    async filterVideos( genre, search, count ) {
        const searchLower = search.toLowerCase();
        let videoList = await this._loadAllVideos();
        let filterVideoList = videoList.filter(item => {
            if(!genre) {
                return item.name.toLowerCase().includes(searchLower);
            } else {
                return item.name.toLowerCase().includes(searchLower) && item.genreId === genre;
            }
        })
        filterVideoList = filterVideoList.slice(0, count);
        return { list: filterVideoList, lastNum: videoList.length };
    }

    async _loadAllVideos() {
        let videoList;
        try {
            videoList = JSON.parse(await rf(this._getStorageLocation()));
        } catch (e) {
            if (e.code === "ENOENT") {
                console.info("No storage found, initializing new one...");
                videoList = [];
            } else {
                throw new Error(
                    "Unable to read from storage. Wrong data format. " +
                    this._getStorageLocation()
                );
            }
        }
        return videoList;
    }

    _getStorageLocation() {
        return this.videoStoragePath;
    }
}

module.exports = VideoDao;
