import { inngest } from "./client.js";
import prisma from "@/lib/prisma";

//inngest functions to save user data to the database
export const syncUserCreation = inngest.createFunction(
  { id: "sync/user-creation" },
  { event: "clerk/user.created" },
  async (params) => {
    const { data } = params.event;
    await prisma.user.create({
      data: {
        id: data.id,
        email: data.email_addresses[0].email_address,
        name: `${data.first_name} ${data.last_name}`,
        image: data.image_url,
      },
    });
  },
);


//inngest functions to update user data to the database
export const syncUserUpdation = inngest.createFunction(
  { id: "sync/user-updation" },
  { event: "clerk/user.updated" },
  async (_event) => {
    const { data } = _event;
    await prisma.user.update({
      where: { id: data.id },
      data: {
        email: data.email_addresses[0].email_address,
        name: `${data.first_name} ${data.last_name}`,
        image: data.image_url,
      },
    });
  },
);

//inngest functions to delete user data from the database
export const syncUserDeletion = inngest.createFunction(
  { id: "sync/user-deletion" },
  { event: "clerk/user.deleted" },
  async (_event) => {
    const { data } = _event;
    await prisma.user.delete({
      where: { id: data.id }
    });
  }
)

