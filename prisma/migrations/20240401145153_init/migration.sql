-- CreateTable
CREATE TABLE "Family" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "institutions" TEXT[],

    CONSTRAINT "Family_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Message" (
    "id" SERIAL NOT NULL,
    "contenido" TEXT NOT NULL,
    "schemaId" TEXT NOT NULL,
    "users" TEXT[],

    CONSTRAINT "Message_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MessageFamily" (
    "messageId" INTEGER NOT NULL,
    "familyId" INTEGER NOT NULL,
    "assignedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "MessageFamily_pkey" PRIMARY KEY ("messageId","familyId")
);

-- CreateTable
CREATE TABLE "_FamilyToMessage" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Family_name_key" ON "Family"("name");

-- CreateIndex
CREATE UNIQUE INDEX "_FamilyToMessage_AB_unique" ON "_FamilyToMessage"("A", "B");

-- CreateIndex
CREATE INDEX "_FamilyToMessage_B_index" ON "_FamilyToMessage"("B");

-- AddForeignKey
ALTER TABLE "_FamilyToMessage" ADD CONSTRAINT "_FamilyToMessage_A_fkey" FOREIGN KEY ("A") REFERENCES "Family"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_FamilyToMessage" ADD CONSTRAINT "_FamilyToMessage_B_fkey" FOREIGN KEY ("B") REFERENCES "Message"("id") ON DELETE CASCADE ON UPDATE CASCADE;
