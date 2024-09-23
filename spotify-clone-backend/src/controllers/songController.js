import { v2 as cloudinary } from "cloudinary"
import songModel from "../models/songModel.js";

const addSong = async (req, res) => {
    try {
        const name = req.body.name;
        const desc = req.body.desc;
        const album = req.body.album;
        const category = req.body.category;
        const audioFile = req.files.audio[0];
        const imageFile = req.files.image[0];
        const audioUpload = await cloudinary.uploader.upload(audioFile.path, { resource_type: "video" });
        const imageUpload = await cloudinary.uploader.upload(imageFile.path, { resource_type: "image" });

        const duration = `${Math.floor(audioUpload.duration / 60)}:${Math.floor(audioUpload.duration % 60)}`

        // console.log(name,desc,album,audioUpload,imageUpload);



        const songData = {
            name, desc, album, category, image: imageUpload.secure_url, file: audioUpload.secure_url, duration
        }

        const song = songModel(songData);
        await song.save()

        res.json({ success: true, messsage: "Song added" })


    } catch (error) {
        res.json({ success: false, messsage: "Error" })
    }

}

const listSong = async (req, res) => {

    try {

        const allSongList = await songModel.find({});
        res.json({ success: true, songs: allSongList });
    } catch (error) {
        res.json({ success: false, });

    }

}



const removeSong=async(req,res)=>{
    try {

        await songModel.findByIdAndDelete(req.body.id);
        res.json({success:true,messsage:"Song Deleted"});
        
    } catch (error) {
        res.json({success:false,messsage:"Error"})
    }
}
export { addSong, listSong,removeSong }