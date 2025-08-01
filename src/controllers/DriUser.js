const csv = require('csvtojson');
const DrisModel = require('../models/DriUserModel')
exports.importUsersFromCSV = async (req, res) => {
    try {
        if (!req.file) return res.status(400).json({ message: 'File required' });

        const result = await csv().fromFile(req.file.path);
        const data = result.map(row => ({
            name: row.name,
            email: row.email,
            gender: row.gender,
            id: row.id,
            phone: row.phone
        }));
        const uplodUserData = await DrisModel.insertMany(data, { ordered: true });
        return res.status(200).json({ success: true, message: 'Users inserted', count: uplodUserData.length });
    } catch (err) {
        console.error('Insertion error:', err);
        return res.status(500).json({
            success: false,
            message: err.message,
            reason: err?.writeErrors?.[0]?.errmsg || 'Unknown error'
        });
    }
};



//get all user list for admin
exports.getUsersList = async (req, res) => {
    try {
        const users = await DrisModel.find().select('-createdAt -__v')
        return res.status(200).json({ success: true, data: users });
    } catch (err) {
        console.error('Error fetching users:', err);
        return res.status(500).json({
            success: false,
            message: err.message,
            reason: err?.writeErrors?.[0]?.errmsg || 'Unknown error'
        });
    }
};

// update user details 

