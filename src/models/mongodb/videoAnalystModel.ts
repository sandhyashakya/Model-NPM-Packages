import { IVideoAnalystModelAttributes } from '@kipipackages/interfaces';
import mongoose, { Schema, Model } from 'mongoose';
const GeoLocationSchema = new Schema(
    {
        country: { type: String, required: false },
        region: { type: String, required: false },
        city: { type: String, required: false },
        latitude: { type: Number, required: false },
        longitude: { type: Number, required: false },
    },
    { _id: false },
);

const VideoAnalystSchema: Schema<IVideoAnalystModelAttributes> = new Schema(
    {
        id: { type: String, required: false },
        appName: { type: String, required: false },
        randomNumber: { type: Number, required: false },
        eventType: { type: String, required: false },
        deviceId: { type: String, required: false },
        platformName: { type: String, required: false },
        deviceType: { type: String, required: false },
        deviceName: { type: String, required: false },
        fileId: { type: String, required: false },
        bundle: { type: String, required: false },
        storeUrl: { type: String, required: false },
        appVersion: { type: String, required: false },
        width: { type: Number, required: false },
        height: { type: Number, required: false },
        deviceMaker: { type: String, required: false },
        deviceConnectionType: { type: String, required: false },
        clintIp: { type: String, required: false },
        userId: { type: String, required: false },
        instituteId: { type: String, required: false },
        geoLocation: { type: GeoLocationSchema, required: false },
        contentDuration: { type: Number, required: false },
        contentViewDuration: { type: Number, required: false },
        language: { type: String, required: false },
        videoTitle: { type: String, required: false },
        subject: { type: String, required: false },
        keywords: { type: [String], default: [] },
        pain: { type: String, required: false },
        createdBy: { type: String },
        updatedBy: { type: String },
        deletedBy: { type: String },
    },
    {
        timestamps: false,
        versionKey: false,
    },
);

const VideoAnalystModel: Model<IVideoAnalystModelAttributes> = mongoose.model('video_analyst', VideoAnalystSchema);

export default VideoAnalystModel;
