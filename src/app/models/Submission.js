const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Submission = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'User' },
    linkImage: String,
    createAt: Date,
    pending: Boolean,
})

module.exports = mongoose.model('Submission', Submission);
