/*
  Warnings:

  - The primary key for the `Family` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropForeignKey
ALTER TABLE "_FamilyToMessage" DROP CONSTRAINT "_FamilyToMessage_A_fkey";

-- AlterTable
ALTER TABLE "Family" DROP CONSTRAINT "Family_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Family_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Family_id_seq";

-- AlterTable
ALTER TABLE "Message" ALTER COLUMN "receiver" DROP NOT NULL,
ALTER COLUMN "sender" DROP NOT NULL,
ALTER COLUMN "status" DROP NOT NULL;

-- AlterTable
ALTER TABLE "_FamilyToMessage" ALTER COLUMN "A" SET DATA TYPE TEXT;

-- AddForeignKey
ALTER TABLE "_FamilyToMessage" ADD CONSTRAINT "_FamilyToMessage_A_fkey" FOREIGN KEY ("A") REFERENCES "Family"("id") ON DELETE CASCADE ON UPDATE CASCADE;
