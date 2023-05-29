"use strict";
const fs = require("fs");
const path = require("path");

const crypto = require("crypto");

const rf = fs.promises.readFile;
const wf = fs.promises.writeFile;

const DEFAULT_STORAGE_PATH = path.join(__dirname, "storage", "comments.json");

class CommentDao {
    constructor(storagePath) {
        this.commentStoragePath = storagePath
            ? storagePath
            : DEFAULT_STORAGE_PATH;
    }

    async createComment(comment) {
        let commentList = await this._loadAllComments();
        comment.id = crypto.randomBytes(8).toString("hex");
        comment.likes = 0;
        comment.dislikes = 0
        commentList.push(comment);
        await wf(
            this._getStorageLocation(),
            JSON.stringify(commentList, null, 2)
        );
        return comment;
    }

    async getComment(id) {
        let comment = await this._loadAllComments();
        const result = comment.find((b) => b.id === id);
        return result;
    }

    async updateComment(comment) {
        let commentList = await this._loadAllComments();
        const commentIndex = commentList.findIndex(
            (b) => b.id === comment.id
        );
        if (commentIndex < 0) {
            throw new Error(
                `comment with given id ${comment.id} does not exists`
            );
        } else {
            commentList[commentIndex] = {
                ...commentList[commentIndex],
                ...comment,
            };
        }
        await wf(
            this._getStorageLocation(),
            JSON.stringify(commentList, null, 2)
        );
        return commentList[commentIndex];
    }

    async deleteComment(video_id) {
        let commentList = await this._loadAllComments();
        const commentIndex = commentList.findIndex((b) => b.video_id === video_id);
        if (commentIndex >= 0) {
            commentList.splice(commentIndex, 1);
        }
        await wf(
            this._getStorageLocation(),
            JSON.stringify(commentList, null, 2)
        );
        return {};
    }

    async listComments(video_id) {
        let allCommentList = await this._loadAllComments();
        const commentList = allCommentList.filter(comment => comment.video_id === video_id)
        return commentList;
    }

    async _loadAllComments() {
        let commentList;
        try {
            commentList = JSON.parse(await rf(this._getStorageLocation()));
        } catch (e) {
            if (e.code === "ENOENT") {
                console.info("No storage found, initializing new one...");
                commentList = [];
            } else {
                throw new Error(
                    "Unable to read from storage. Wrong data format. " +
                    this._getStorageLocation()
                );
            }
        }
        return commentList;
    }

    _getStorageLocation() {
        return this.commentStoragePath;
    }
}

module.exports = CommentDao;
