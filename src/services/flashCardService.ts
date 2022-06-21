import { FlashCard } from "@prisma/client";
import prismaContext from "@src/lib/prisma/prismaContext";

export const getAllFlashCards = async (): Promise<FlashCard[]> => {
  const flashCards = await prismaContext.prisma.flashCard.findMany();
  return flashCards;
};

export const getFlashCardById = async (
  flashCardId: number
): Promise<FlashCard> => {
  const flashCard: any = await prismaContext.prisma.flashCard.findUnique({
    where: {
      flashCardId,
    },
  });
  return flashCard;
};

export const createFlashCard = async (
  question: string,
  answer: string,
  userId: number
): Promise<FlashCard> => {
  return await prismaContext.prisma.flashCard
    .create({
      data: { question, answer, userId },
    })
    .then((newFlashCard) => newFlashCard)
    .catch((error) => error);
};
