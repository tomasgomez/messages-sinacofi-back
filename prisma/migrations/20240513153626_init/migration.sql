-- CreateTable
CREATE TABLE "CUK" (
    "id" TEXT NOT NULL,
    "name" TEXT,
    "cukCode" TEXT,
    "description" TEXT,
    "status" TEXT,
    "creationDate" TEXT,
    "issuedDate" TEXT,
    "channel" TEXT,
    "institutionCode" TEXT,
    "institutionDestination" TEXT,
    "region" TEXT,
    "buyerDni" TEXT,
    "buyer" TEXT,
    "ownerDni" TEXT,
    "owner" TEXT,
    "borrowerDni" TEXT,
    "borrower" TEXT,
    "history" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CUK_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Message" (
    "id" TEXT NOT NULL,
    "TSN" SERIAL,
    "OSN" SERIAL,
    "NSE" SERIAL,
    "LSN" SERIAL,
    "NSR" SERIAL,
    "messageCode" TEXT,
    "description" TEXT,
    "priority" TEXT,
    "status" TEXT,
    "sender" TEXT,
    "creationDate" TEXT,
    "creationTime" TEXT,
    "receiver" TEXT,
    "receivedDate" TEXT,
    "receivedTime" TEXT,
    "actions" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "cukCode" TEXT,

    CONSTRAINT "Message_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Parameters" (
    "internalId" SERIAL NOT NULL,
    "id" TEXT NOT NULL,
    "name" TEXT,
    "messageCode" TEXT,
    "label" TEXT,
    "type" TEXT,
    "placeholder" TEXT,
    "description" TEXT,
    "defaultValue" TEXT,
    "priority" INTEGER,
    "value" TEXT,
    "properties" JSONB,
    "validations" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "messageId" TEXT NOT NULL,

    CONSTRAINT "Parameters_pkey" PRIMARY KEY ("internalId")
);

-- CreateTable
CREATE TABLE "Documents" (
    "id" TEXT NOT NULL,
    "documentName" TEXT,
    "content" TEXT,
    "url" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "messageId" TEXT NOT NULL,

    CONSTRAINT "Documents_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Family" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "institutions" TEXT[],

    CONSTRAINT "Family_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MessageFamily" (
    "messageId" INTEGER NOT NULL,
    "familyId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "assignedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "MessageFamily_pkey" PRIMARY KEY ("messageId","familyId")
);

-- CreateIndex
CREATE UNIQUE INDEX "CUK_cukCode_key" ON "CUK"("cukCode");

-- CreateIndex
CREATE UNIQUE INDEX "Message_TSN_key" ON "Message"("TSN");

-- CreateIndex
CREATE UNIQUE INDEX "Message_OSN_key" ON "Message"("OSN");

-- CreateIndex
CREATE UNIQUE INDEX "Message_NSE_key" ON "Message"("NSE");

-- CreateIndex
CREATE UNIQUE INDEX "Message_LSN_key" ON "Message"("LSN");

-- CreateIndex
CREATE UNIQUE INDEX "Message_NSR_key" ON "Message"("NSR");

-- CreateIndex
CREATE INDEX "Parameters_messageId_name_idx" ON "Parameters"("messageId", "name");

-- CreateIndex
CREATE UNIQUE INDEX "Parameters_messageId_name_key" ON "Parameters"("messageId", "name");

-- CreateIndex
CREATE UNIQUE INDEX "Family_name_key" ON "Family"("name");

-- AddForeignKey
ALTER TABLE "Message" ADD CONSTRAINT "Message_cukCode_fkey" FOREIGN KEY ("cukCode") REFERENCES "CUK"("cukCode") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Parameters" ADD CONSTRAINT "Parameters_messageId_fkey" FOREIGN KEY ("messageId") REFERENCES "Message"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Documents" ADD CONSTRAINT "Documents_messageId_fkey" FOREIGN KEY ("messageId") REFERENCES "Message"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
