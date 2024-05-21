import call_history from "../models/call_history.model.js"; // Ensure the correct import path
import chat from "../models/chat.model.js"; // Ensure the correct import path
import user from "../models/user.model.js"; // Ensure the correct import path

async function getAllCalls(details) {
    try {
        console.log('details :', details);

        // Query to find documents where the members array contains the provided ID
        const calls = await call_history.find({ members: details }).populate("members");

        if (calls.length === 0) {
            return null;
        }

        const results = [];

        for (const call of calls) {
            const chatData = await chat.findById(call.chat_id).populate("users");

            if (!chatData) continue;

            const callerIdMatches = call.caller_id.equals(details);
            const membersMatchJoinedUsers = call.members.length === call.joined_users.length +1 ;

            let resultMessage = '';
            let name = '';

            if (chatData.group_name === "") {
                if (callerIdMatches) {
                    const nonMatchingUser = call.members.find(memberId => !memberId.equals(details));
                    const nonMatchingUserData = await user.findById(nonMatchingUser);
                    name = nonMatchingUserData ? nonMatchingUserData.name : 'Unknown';
                    if (membersMatchJoinedUsers) {
                        resultMessage = `Outgoing call (Accepted) ${name}`;
                    } else {
                        resultMessage = `Outgoing call (No answer) ${name}`;
                    }
                } else {
                    const nonMatchingUser = call.members.find(memberId => !memberId.equals(details));
                    const nonMatchingUserData = await user.findById(nonMatchingUser);
                    name = nonMatchingUserData ? nonMatchingUserData.name : 'Unknown';
                    if (membersMatchJoinedUsers) {
                        resultMessage = `Incoming call (Accepted) ${name}`;
                    } else {
                        resultMessage = `Incoming call (No answer) ${name}`;
                    }
                }
            } else {
                if (callerIdMatches) {
                    name = chatData.group_name;
                    resultMessage = `Video call ${name}`;
                } else {
                    const nonMatchingUser = call.members.find(memberId => !memberId.equals(details));
                    const nonMatchingUserData = await user.findById(nonMatchingUser);
                    name = nonMatchingUserData ? nonMatchingUserData.name : 'Unknown';
                    resultMessage = `Video call ${name}`;
                }
            }

            // Formatting the date in Indian format
            const startAt = new Date(call.startAt).toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });

            results.push(`${resultMessage} ${startAt}`);
        }

        return results;

    } catch (error) {
        console.error('Error fetching call history:', error);
        throw error; // Optionally handle the error as needed
    }
}

export default getAllCalls;
