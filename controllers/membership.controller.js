import Membership from "../models/membership.model.js";

export const createMembership = async (req, res) => {
  try {
    const membership = await membership.create({
      ...req.body,
      user: req.user._id,
    });

    res.status(201).Json({ success: true, data: membership });
  } catch (e) {
    next(e);
  }
};
