import prisma from "@/app/libs/prismadb";
import getSession from "./getSession";

//uses the current session to get the current user
const getCurrentUser = async () => {
  try {
    const session = await getSession();

    //check that the current session exists
    //if not return null
    if (!session?.user?.email) {
      return null;
    }
    //otherwise, get the current user from the database
    const currentUser = await prisma.user.findUnique({
      where: {
        email: session.user.email as string
      }
    });

    //check that the current user exists
    //if not return null
    if (!currentUser) {
      return null;
    }

    //otherwise, return the current user
    return currentUser;
  } catch (error: any) {
    return null;
  }
};

export default getCurrentUser;