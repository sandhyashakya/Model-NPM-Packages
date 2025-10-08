import mongoose, { Schema, Model } from 'mongoose';
import { FILE_TYPE, COMMAN_STATUS } from '../../constants/app';
import { IGalleryAlbumAttributes, IGalleryFile } from '@kipipackages/interfaces';
// import { IGalleryAlbumAttributes, IGalleryFile } from '../../interfaces/photosGalleryInterface';

const GalleryFileSchema: Schema<IGalleryFile> = new Schema<IGalleryFile>(
    {
        fileType: {
            type: String,
            enum: Object.values(FILE_TYPE),
            required: true,
        },
        fileStorageId: {
            type: String,
            required: true,
        },
        fileStatus: {
            type: String,
            enum: Object.values(COMMAN_STATUS),
            default: COMMAN_STATUS.ACTIVE,
            required: true,
        },
    },
    { _id: false },
);

const PhotosGallerySchema: Schema<IGalleryAlbumAttributes> = new Schema<IGalleryAlbumAttributes>(
    {
        albumName: {
            type: String,
            required: true,
        },
        files: {
            type: [GalleryFileSchema],
            default: [],
        },
        date: {
            type: Date,
            required: false,
        },
        status: {
            type: String,
            enum: Object.values(COMMAN_STATUS),
            default: COMMAN_STATUS.ACTIVE,
        },
        instituteId: {
            type: String,
            required: true,
        },
        academicCalendarId: {
            type: String,
            required: false,
        },
    },
    { timestamps: true, versionKey: false },
);

PhotosGallerySchema.index({
    instituteId: 1,
});

const PhotosGallery: Model<IGalleryAlbumAttributes> = mongoose.model<IGalleryAlbumAttributes>('photos_gallery', PhotosGallerySchema);

export default PhotosGallery;
