const { parentPort, workerData } = require("worker_threads");
const XLSX = require("xlsx");
const fs = require("fs");

const Agent = require("../models/Agent");
const User = require("../models/User");
const Account = require("../models/Account");
const PolicyCategory = require("../models/PolicyCategory");
const PolicyCarrier = require("../models/PolicyCarrier");
const PolicyInfo = require("../models/PolicyInfo");
const { connectDB } = require("../config/db");

(async () => {
  await connectDB();

  try {
    const { filePath } = workerData;

    if (!fs.existsSync(filePath)) {
      throw new Error(`File not found: ${filePath}`);
    }

    // Read CSV
    const workbook = XLSX.readFile(filePath, { raw: true });
    const sheetName = workbook.SheetNames[0];
    const rows = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName], {
      defval: null, // Fill missing cells with null
      blankrows: false
    });

    if (!rows.length) {
      throw new Error("No rows found in uploaded file");
    }

    parentPort.postMessage(`Read ${rows.length} rows from file`);

    for (let [index, row] of rows.entries()) {
      try {
        if (!row.agent || !row.firstname || !row.email) {
          parentPort.postMessage(`Skipping row ${index + 1}: Missing key data`);
          continue;
        }

        // Agent
        let agent = await Agent.findOneAndUpdate(
          { name: row.agent },
          { name: row.agent },
          { upsert: true, new: true }
        );

        // User
        let user = await User.findOneAndUpdate(
          { firstname: row.firstname, email: row.email },
          {
            firstname: row.firstname,
            dob: row.dob ? new Date(row.dob) : null,
            address: row.address || null,
            state: row.state || null,
            zip: row.zip || null,
            phone: row.phone || null,
            email: row.email,
            gender: row.gender || null,
            userType: row.userType || null
          },
          { upsert: true, new: true }
        );

        // Account
        let account = await Account.findOneAndUpdate(
          { name: row.account_name },
          { name: row.account_name },
          { upsert: true, new: true }
        );

        // Policy Category
        let category = await PolicyCategory.findOneAndUpdate(
          { category_name: row.category_name },
          { category_name: row.category_name },
          { upsert: true, new: true }
        );

        // Policy Carrier
        let company = await PolicyCarrier.findOneAndUpdate(
          { company_name: row.company_name },
          { company_name: row.company_name },
          { upsert: true, new: true }
        );

        // Policy Info
        await PolicyInfo.findOneAndUpdate(
          { policy_number: row.policy_number },
          {
            policy_number: row.policy_number,
            policy_start_date: row.policy_start_date
              ? new Date(row.policy_start_date)
              : null,
            policy_end_date: row.policy_end_date
              ? new Date(row.policy_end_date)
              : null,
            premium_amount: row.premium_amount
              ? parseFloat(row.premium_amount)
              : null,
            agent_id: agent._id,
            user_id: user._id,
            account_id: account._id,
            category_id: category._id,
            company_id: company._id
          },
          { upsert: true, new: true }
        );

      } catch (rowErr) {
        parentPort.postMessage(
          `Error in row ${index + 1}: ${rowErr.message}`
        );
        continue;
      }
    }

    parentPort.postMessage("Data inserted successfully");
    process.exit(0);

  } catch (err) {
    parentPort.postMessage(`Error: ${err.message}`);
    process.exit(1);
  }
})();
