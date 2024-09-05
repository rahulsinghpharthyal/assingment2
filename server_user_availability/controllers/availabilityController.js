import Availability from "../models/availability.js";
import User from "../models/user.js";

export const createAvailability = async (req, res) => {
  try {
    const { start, end, duration, _id } = req.body;
    const startDate = new Date(start);
    const endDate = new Date(end);

    const calculatedDuration =
      duration || Math.abs((endDate - startDate) / (1000 * 60));

    if (calculatedDuration <= 0) {
      return res
        .status(400)
        .json({ message: "End time must be after start time." });
    }

    let availability = await Availability.findOne({ user: _id });

    if (availability) {
      availability.availabilityPeriods.push({
        start: startDate,
        end: endDate,
        duration: calculatedDuration,
      });

      await availability.save();

      return res.status(200).json({
        message: "Availability added successfully",
        data: availability,
      });
    } else {
      const newAvailability = await Availability.create({
        user: _id,
        availabilityPeriods: [
          {
            start: startDate,
            end: endDate,
            duration: calculatedDuration,
          },
        ],
      });

      return res.status(201).json({
        message: "Availability created successfully",
        data: newAvailability,
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: "Failed to create or update availability",
      error,
    });
  }
};

export const getAvailabilityByUserId = async (req, res) => {
  try {
    const { id } = req.params;

    const availability = await Availability.findOne({ user: id });

    if (!availability) {
      return res
        .status(404)
        .json({ message: "No availability found for this user." });
    }

    console.log(availability);
    return res.status(200).json({ success: true, data: availability });
  } catch (error) {
    console.error("Error fetching availability:", error);
    res.status(500).json({ message: "Server error" });
  }
};

 export const updateAvailabilitySlot = async (req, res) => {
  console.log('id and slot id is', req.params)
    try {
      const { id, slotid } = req.params;
      const { start, end, duration } = req.body;

      const availability = await Availability.findOne({ user: id });
      if (!availability) {
        return res.status(404).json({ message: "No availability found for this user." });
      }

      const slotIndex = availability.availabilityPeriods.findIndex(
        (slot) => slot._id.toString() === slotid
      );

      if (slotIndex === -1) {
        return res.status(404).json({ message: "Slot not found" });
      }

      availability.availabilityPeriods[slotIndex] = {
        start: new Date(start),
        end: new Date(end),
        duration,
      };

      await availability.save();
      res.status(200).json({ message: "Slot updated successfully", availability });
    } catch (error) {
      console.error("Error updating slot:", error);
      res.status(500).json({ message: "Server error" });
    }
  };

export const deleteAvailabilitySlot = async (req, res) => {
  try {
    const { id, slotid } = req.params;

    const availability = await Availability.findOne({ user: id });

    if (!availability) {
      return res
        .status(404)
        .json({ message: "No availability found for this user." });
    }

    const slotIndex = availability.availabilityPeriods.findIndex(
      (period) => period._id.toString() === slotid
    );
    if (slotIndex === -1) {
      return res.status(404).json({ message: "Availability slot not found." });
    }

    const deletedSlot = availability.availabilityPeriods.splice(
      slotIndex,
      1
    )[0];

    await availability.save();

    return res
      .status(200)
      .json({ message: "Slot deleted successfully", deletedSlot });
  } catch (error) {
    console.error("Error deleting slot:", error);
    return res.status(500).json({ message: "Server error", error });
  }
};


export const getAllUsers = async (req, res) => {
  try {
    // Fetch all availability data without filtering by user ID
    const allUsers = await User.find({role: 'user'});

    // Check if there is any availability data
    if (allUsers.length === 0) {
      return res
        .status(404)
        .json({ message: "No availability data found." });
    }

    // console.log('all avial', allUsers);
    return res.status(200).json({ success: true, data: allUsers });
  } catch (error) {
    console.error("Error fetching availability:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const getAvailabilityByUserAndDate = async (req, res) => {
  console.log('this is usre', req.params)
  console.log('this is date', req.query)
  try {
    const { id } = req.params; // Get user ID from the URL
    const { date } = req.query; // Get the selected date from the query parameter

    // Ensure both user ID and date are provided
    if (!id || !date) {
      return res.status(400).json({ message: "User ID and date are required." });
    }

    // Convert the date to a JavaScript Date object
    const selectedDate = new Date(date);
    console.log(selectedDate);
    // Find availability for the user where the selected date falls within an availability period
    const availability = await Availability.findOne({
      user: id,
      availabilityPeriods: {
        $elemMatch: {
          start: { $lte: selectedDate }, // Find availability where start is less than or equal to the selected date
          end: { $gte: selectedDate }    // Find availability where end is greater than or equal to the selected date
        }
      }
    });
    console.log('is the ', availability);

    // If no availability is found
    if (!availability) {
      return res.status(404).json({ message: "No availability found for this user on the selected date." });
    }

    // Extract the matching availability period
    const matchingPeriod = availability.availabilityPeriods.find(
      (period) => selectedDate >= period.start && selectedDate <= period.end
    );

    return res.status(200).json({
      success: true,
      data: matchingPeriod || [],
    });
  } catch (error) {
    console.error("Error fetching availability:", error);
    return res.status(500).json({ message: "Server error. Please try again later." });
  }
};
