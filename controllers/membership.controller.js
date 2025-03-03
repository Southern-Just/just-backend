import Membership from "../models/membership.model.js";
import membership from "../models/membership.model.js";

export const createMembership = async (req, res, next) => {
  try {
    const membership = await Membership.create({
      ...req.body,
      user: req.user._id,
    });

    res.status(201).json({ success: true, data: membership });
  } catch (e) {
    next(e);
  }
};

export const getUserMemberships = async (req, res, next) => {
  try {
    if ((req.user.id = !req.params.id)) {
      const error = new Error("You are not the owner");
      error.status = 401;
      throw error;
    }
    const memberships = await membership.find({ user: req.params.id });
    res.status(200).json({ success: true, data: memberships });
  } catch (error) {
    next(error);
  }
};
