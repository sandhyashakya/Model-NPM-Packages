import mongoose from 'mongoose';
import { ENV_VARIABLE } from '../../configs/env';
import transformIdIdQueryPlugin from './plugin/transformIdInQueryPlugin';
import transformIdInResponsePlugin from './plugin/transformIdInResponsePlugin';
import { addDefaultAttributesPlugin } from './plugin/addDefaultAttributesPlugin';

mongoose.plugin(transformIdIdQueryPlugin);
mongoose.plugin(transformIdInResponsePlugin);
mongoose.plugin(addDefaultAttributesPlugin);

const connectMongoDb = async () => {
    try {
        await mongoose.connect(ENV_VARIABLE.MONGO_DB_CONNECTION_URL, {
            dbName: ENV_VARIABLE.MONGO_DB_NAME,
        });
    } catch (err) {
        console.log('error while connect monngodb : ' + err);
    }
};

export default connectMongoDb;
