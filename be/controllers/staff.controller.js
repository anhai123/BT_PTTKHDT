const Booking = require("../models/booking.model");
const User = require("../models/user.model");

exports.StaffSearchBooking = async (req, res) => {
    try {
        const booking = await Booking.findById(req.params.bookingId);
        try {
            const user = await User.findById(booking.user_id);
            res.status(200).send({
                booking: booking,
                user: user,
            });
        } catch (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Không tìm thấy tài khoản với id ${booking.user_id}!`,
                });
                return;
            } else {
                res.status(500).send({
                    message: `Lỗi khi tìm tài khoản!`,
                });
                return;
            }
        }
    } catch (err) {
        if (err.kind === "not_found") {
            res.status(404).send({
                message: `Không tìm thấy vé với booking_id ${req.params.bookingId}!`,
            });
            return;
        } else {
            res.status(500).send({
                message: `Lỗi khi tìm vé!`,
            });
            return;
        }
    }
};

exports.StaffDeleteBooking = async (req, res) => {
    try {
        await Booking.remove(req.body.booking_id);
        res.send({ message: `Booking was deleted successfully!` });
    } catch (err) {
        if (err.kind === "not_found") {
            res.status(404).send({
                message: `Not found with booking_id ${req.body.booking_id}!`,
            });
        } else {
            res.status(500).send({
                message: "Could not delete with booking_id " + req.body.booking_id,
            });
        }
        return;
    }
};