import mongoose from "mongoose";

const blogSchema = new mongoose.Schema({
    subject: {
        type: String,
        required: true
    },
    blogBody: {
        type: String,
        required: true
    },
    thumbnailImg: {
      data: Buffer,
      contentType: String,

    },
    thumbnailImgBase64String: {
      type: String,
    },
    createdAt: {
        type: Date,
        default: Date.now, // 기본값
    },
    //출처: https://inpa.tistory.com/entry/ODM-📚-몽구스-사용법-정리#라우터_정의__몽구스_쿼리_질의 [Inpa Dev 👨‍💻:티스토리]

});

export default mongoose.model('blogs', blogSchema);