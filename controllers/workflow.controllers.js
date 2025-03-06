import dayjs from "dayjs";
import { createRequire } from "module";
const require = createRequire(import.meta.url);
const { serve } = require("@upstash/workflow/express");
import Membership from "../models/membership.model.js";

const REMINDERS = [7, 5, 2, 1];
export const sendReminders = serve(async (context) => {
  const { membershipId } = context.requestPayload;
  const membership = await fetchMembership(context, membershipId);

  if (!membership || membership.status != active) return;

  const renewalDate = dayjs(membership.renewalDate);
  if (renewalDate.isBefore(dayjs())) {
    console.log(
      `Renewal date has passed for membership ${membershipId}. stopping workflow`,
    );
    return;
  }
  for (const daysBefore of REMINDERS) {
    const reminderDate = renewalDate.subtract(daysBefore, "day");

    if (reminderDate.isAfter(dayjs())) {
    }
  }
});

const fetchMembership = async (context, membershipId) => {
  return await context.run("get membership", () => {
    return Membership.findById(membershipId).populate("user", "name email");
  });
};

const sleepUntillReminder = async (context, label) => {
  console.log(`Sleeping untill ${label} reminder at ${date}`);
  await context.sleepUntil(label, date.toDate());
};

const triggerReminder = async (context, label) => {
  return await context.run(label, () => {
    console.log(`Triggering ${label} reminder`);
  });
};
