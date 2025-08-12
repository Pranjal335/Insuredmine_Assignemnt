const User = require('../models/User');
const PolicyInfo = require('../models/PolicyInfo');
require('../models/Agent'); 
require('../models/Account'); 
require('../models/PolicyCategory'); 
require('../models/PolicyCarrier'); 

exports.searchPolicyByUsername = async (req, res) => {
    try {
        const { username } = req.query;

        console.log('Searching for username:', username);

        if (!username) {
            return res.status(400).json({ error: 'Username is required' });
        }

        const users = await User.find({
            firstname: { $regex: `^${username}$`, $options: 'i' } 
        });

        if (!users.length) {
            return res.status(404).json({ error: 'User not found' });
        }

        const userIds = users.map(u => u._id);

        const policies = await PolicyInfo.find({ user_id: { $in: userIds } })
            .populate('agent_id', 'name')
            .populate('account_id', 'name')
            .populate('category_id', 'category_name')
            .populate('company_id', 'company_name');

        res.json({
            users: users.map(u => ({
                firstname: u.firstname,
                email: u.email
            })),
            policies
        });

    } catch (error) {
        console.error('Search policy error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
