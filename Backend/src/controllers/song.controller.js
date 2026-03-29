const id3 = require("node-id3")
const songModel = require('../models/song.model')

const storageService = require('../services/storage.service')


async function uploadSong(req, res) {
    const songBuffer = req.file.buffer
    const tag = id3.read(songBuffer)

    const { mood } = req.body
    const [songFile, imageFile] = await Promise.all([
        storageService.uploadFile({
            buffer: songBuffer,
            filename: tag.title + ".mp3",
            folder: "moodify/songs"
        }),
        storageService.uploadFile({
            buffer: tag.image.imageBuffer,
            filename: tag.title + ".jpeg",
            folder: "moodify/posters"
        })
    ]);

    const song = await songModel.create({
        title: tag.title,
        url: songFile.url,
        posterUrl: imageFile.url,
        mood
    })

    res.status(201).json({
        message: "song created successfully",
        song
    })

}

async function getSong(req, res) {
    const { mood } = req.query;

    const songs = await songModel.aggregate([
        { $match: { mood } },
        { $sample: { size: 1 } } 
    ]);

    const song = songs[0];

    res.status(200).json({
        message: "song fetched successfully.",
        song,
    });
}


module.exports = { uploadSong ,getSong}