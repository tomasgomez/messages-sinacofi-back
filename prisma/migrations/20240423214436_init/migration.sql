-- AlterTable
ALTER TABLE "Message" ADD COLUMN     "cukId" TEXT;

-- CreateTable
CREATE TABLE "CUK" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,

    CONSTRAINT "CUK_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "CUK_name_key" ON "CUK"("name");

-- AddForeignKey
ALTER TABLE "Message" ADD CONSTRAINT "Message_cukId_fkey" FOREIGN KEY ("cukId") REFERENCES "CUK"("id") ON DELETE SET NULL ON UPDATE CASCADE;
