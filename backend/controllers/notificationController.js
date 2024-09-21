const Notification = require('../models/Notification');

// Get notifications for the logged-in user
const getNotifications = async (req, res) => {
    try {
        const userId = req.user.id;
        const notifications = await Notification.find({ user: userId });
        res.status(200).json(notifications);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

// Mark notifications as read
const markAsRead = async (req, res) => {
    try {
        const userId = req.user.id;
        const notifications = await Notification.updateMany(
            { user: userId, read: false },
            { $set: { read: true } }
        );
        res.status(200).json({ message: 'Notifications marked as read' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

module.exports = {
    getNotifications,
    markAsRead,
};
