/*
  Warnings:

  - The primary key for the `Message` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `MessageFamily` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropForeignKey
ALTER TABLE "_FamilyToMessage" DROP CONSTRAINT "_FamilyToMessage_B_fkey";

-- AlterTable
ALTER TABLE "Message" DROP CONSTRAINT "Message_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Message_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Message_id_seq";

-- AlterTable
ALTER TABLE "MessageFamily" DROP CONSTRAINT "MessageFamily_pkey",
ALTER COLUMN "messageId" SET DATA TYPE TEXT,
ALTER COLUMN "familyId" SET DATA TYPE TEXT,
ADD CONSTRAINT "MessageFamily_pkey" PRIMARY KEY ("messageId", "familyId");

-- AlterTable
ALTER TABLE "_FamilyToMessage" ALTER COLUMN "B" SET DATA TYPE TEXT;

-- AddForeignKey
ALTER TABLE "_FamilyToMessage" ADD CONSTRAINT "_FamilyToMessage_B_fkey" FOREIGN KEY ("B") REFERENCES "Message"("id") ON DELETE CASCADE ON UPDATE CASCADE;
