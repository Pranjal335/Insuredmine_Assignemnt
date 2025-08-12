const PolicyInfo = require('../models/PolicyInfo');
require('../models/User'); 

exports.getAggregatedPoliciesByUser = async (req, res) => {
    try {
        const result = await PolicyInfo.aggregate([
            {
                $group: {
                    _id: "$user_id",
                    totalPolicies: { $sum: 1 },
                    totalPremium: { $sum: "$premium_amount" }
                }
            },
            {
                $lookup: {
                    from: "users", 
                    localField: "_id",
                    foreignField: "_id",
                    as: "user"
                }
            },
            { $unwind: "$user" },
            {
                $project: {
                    _id: 0,
                    user_id: "$user._id",
                    name: "$user.firstname",
                    email: "$user.email",
                    totalPolicies: 1,
                    totalPremium: 1
                }
            }
        ]);

        res.json(result);
    } catch (error) {
        console.error("Aggregation error:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};
