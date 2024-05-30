/*
  Warnings:

  - Made the column `content` on table `Post` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Post" ALTER COLUMN "content" SET NOT NULL;

-- CreateTable
CREATE TABLE "CatchReport" (
    "id" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "location" TEXT NOT NULL,
    "species" TEXT NOT NULL,
    "weight" DOUBLE PRECISION NOT NULL,
    "length" DOUBLE PRECISION NOT NULL,
    "bait" TEXT NOT NULL,
    "method" TEXT NOT NULL,
    "weather" TEXT NOT NULL,
    "waterTemp" DOUBLE PRECISION NOT NULL,
    "notes" TEXT,
    "authorId" TEXT NOT NULL,
    "postId" TEXT,

    CONSTRAINT "CatchReport_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "CatchReport" ADD CONSTRAINT "CatchReport_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CatchReport" ADD CONSTRAINT "CatchReport_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Post"("id") ON DELETE SET NULL ON UPDATE CASCADE;
