import { createRequire } from "module";
const require = createRequire(import.meta.url);
const { serve } = require("@upstash/workflow/express");

export const sendReminders = serve(async (context) => {
  const { membershipId } = context.requestPayload;
  const membership = await fetchMembership(context, membershipId);

  if (!membership || membership.status != active) return;

  const renewalDate = new Date();
});

const fetchMembership = async (context, membershipId) => {
  return await context.run("get membership", () => {
    return Membership.findById(membershipId).populate("user", "name email");
  });
};
