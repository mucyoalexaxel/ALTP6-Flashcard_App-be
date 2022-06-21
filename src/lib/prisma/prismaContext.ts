import { IPrismaContext } from "../../lib/interfaces/IPrismaContext";
import prisma from "../../lib/prisma/prismaClient";

const prismaContext: IPrismaContext = {
  prisma,
};

export default prismaContext;
