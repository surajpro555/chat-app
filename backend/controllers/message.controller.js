import Message from "../models/message.model.js";
import Conversation from "../models/conversation.model.js";

export const sendMessage = async (req, res) => {
    try {
        const { id:receiverId } = req.params;
        const { message } = req.body;
        const senderId = req.user._id;
          
        let conversation=await Conversation.findOne({
            participants: { $all: [senderId, receiverId] },
        });
        
        if(!conversation){
            conversation=await Conversation.create({
                participants:[senderId,receiverId],
            });
        }

        const newMessage = new Message({
            senderId,
            receiverId,
            message,
        });
  
        if(newMessage){
            conversation.messages.push(newMessage._id);
        }
        
        // await newMessage.save();
        // await conversation.save();

        await Promise.all([newMessage.save(),conversation.save()]); // To save both the message and conversation at the same time

        res.status(201).json({ message: "Message sent successfully" });

    } catch (error) {
        console.log("Error in sending message....:", error.message);
        return res.status(500).json({ message: "Internal server error" });
    }
    
};

export const getMessages = async (req, res) => {
    try {
        const { id:userToChat } = req.params;
        const senderId = req.user._id;

        const conversation = await Conversation.findOne({
          participants: { $all: [senderId, userToChat] },
        }).populate("messages");  // Not reference but actual messages

        if(!conversation){
            return res.status(200).json({ messages: [] });
        }
        
        res.status(200).json({ messages: conversation.messages });

    } catch (error) {
        console.log("Error in getting messages....:", error.message);
        return res.status(500).json({ message: "Internal server error" });
    }
};