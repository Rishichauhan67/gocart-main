import { inngest } from "./client";
import { prisma } from "@/lib/prisma";

// Create user
export const syncUserCreation = inngest.createFunction(
  {
    id: "sync-user-creation",
    triggers: [{ event: "clerk/user.created" }],
  },
  async ({ event }) => {
    const { data } = event;

    const email= data.email_addresses[0].email_address || null;

    await prisma.user.create({
      data: {
        id: data.id,
        email: email,
        name: `${data.first_name} ${data.last_name}`,
        image: data.image_url,
      },
    });
  }
);

// Update user
export const syncUserUpdation = inngest.createFunction(
  {
    id: "sync-user-updation",
    triggers: [{ event: "clerk/user.updated" }],
  },
  async ({ event }) => {
    const { data } = event.data;

    const email = data.email_addresses[0].email_address || null;

    await prisma.user.update({
      where: { id: data.id },
      data: {
        email: email,
        name: `${data.first_name} ${data.last_name}`,
        image: data.image_url,
      },
    });
  }
);

// Delete user
export const syncUserDeletion = inngest.createFunction(
  {
    id: "sync-user-deletion",
    triggers: [{ event: "clerk/user.deleted" }],
  },
  async ({ event }) => {
    const { data } = event.data;

    await prisma.user.delete({
      where: { id: data.id },
    });
  }
);