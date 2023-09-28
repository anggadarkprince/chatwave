import prisma from "@/app/libs/prismadb";
import getCurrentUser from "./getCurrentUser";

const getConversationById = async (conversationId: string) => {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser?.email) {
      return null;
    }

    return await prisma.conversation.findUnique({
      where: {
        id: conversationId
      },
      include: {
        users: true,
      },
    });
  } catch (error: any) {
    console.log(error, 'SERVER_ERROR')
    return null;
  }
};

export default getConversationById;
