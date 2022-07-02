import { FlashCard } from "@prisma/client";
import { AuthenticationError } from "apollo-server";
import prismaContext from "../lib/prisma/prismaContext";

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

export const updateFlashCard = async (
  flashCardId: number,
  question: string,
  answer: string
): Promise<FlashCard> =>
  await prismaContext.prisma.flashCard
    .update({
      where: {
        flashCardId,
      },
      data: {
        question,
        answer,
      },
    })
    .then((updatedFlashCard) => updatedFlashCard)
    .catch((error) => error);

export const deleteFlashCard = async (
  flashCardId: number,
  userId: number
): Promise<void> =>
  await prismaContext.prisma.flashCard
    .deleteMany({
      where: {
        flashCardId,
        userId,
      },
    })
    .then((deletedFlashCard) => deletedFlashCard)
    .catch((error) => error);

export const isValidCard = async (flashCardId: number): Promise<any> =>
  await prismaContext.prisma.flashCard.findUnique({
    where: {
      flashCardId,
    },
  });

export const isFlashCardAuthor = async (
  userId: number
): Promise<FlashCard | null> =>
  await prismaContext.prisma.flashCard.findFirst({
    where: {
      userId,
    },
  });
