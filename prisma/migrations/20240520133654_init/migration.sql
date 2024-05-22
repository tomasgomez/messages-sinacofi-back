-- CreateTable
CREATE TABLE "CUK" (
    "id" TEXT NOT NULL,
    "cukCode" TEXT,
    "status" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CUK_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "History" (
    "id" TEXT NOT NULL,
    "cukCode" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "date" TEXT NOT NULL,

    CONSTRAINT "History_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Message" (
    "id" TEXT NOT NULL,
    "messageCode" TEXT,
    "origin" TEXT,
    "destination" TEXT,
    "originArea" TEXT,
    "destinationArea" TEXT,
    "creationDate" TEXT,
    "creationTime" TEXT,
    "receivedDate" TEXT,
    "receivedTime" TEXT,
    "actions" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "statusId" TEXT,
    "cukCode" TEXT,

    CONSTRAINT "Message_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Status" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Status_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TSN" (
    "id" SERIAL NOT NULL,
    "institutionCode" TEXT NOT NULL,
    "areaCode" TEXT NOT NULL DEFAULT '05',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "messageId" TEXT NOT NULL,

    CONSTRAINT "TSN_pkey" PRIMARY KEY ("id","institutionCode","areaCode")
);

-- CreateTable
CREATE TABLE "LSN" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "institutionCode" TEXT NOT NULL,
    "areaCode" TEXT NOT NULL,
    "messageId" TEXT NOT NULL,

    CONSTRAINT "LSN_pkey" PRIMARY KEY ("id","institutionCode","areaCode")
);

-- CreateTable
CREATE TABLE "OSN" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "institutionCode" TEXT NOT NULL,
    "messageId" TEXT NOT NULL,

    CONSTRAINT "OSN_pkey" PRIMARY KEY ("id","institutionCode")
);

-- CreateTable
CREATE TABLE "NSE" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "institutionCode" TEXT NOT NULL,
    "areaCode" TEXT NOT NULL,
    "messageId" TEXT NOT NULL,

    CONSTRAINT "NSE_pkey" PRIMARY KEY ("id","institutionCode","areaCode")
);

-- CreateTable
CREATE TABLE "NSR" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "institutionCode" TEXT NOT NULL,
    "areaCode" TEXT NOT NULL,
    "messageId" TEXT NOT NULL,

    CONSTRAINT "NSR_pkey" PRIMARY KEY ("id","institutionCode","areaCode")
);

-- CreateTable
CREATE TABLE "NSQ" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "institutionCode" TEXT NOT NULL,
    "areaCode" TEXT NOT NULL DEFAULT '05',
    "messageId" TEXT NOT NULL,

    CONSTRAINT "NSQ_pkey" PRIMARY KEY ("id","institutionCode","areaCode")
);

-- CreateTable
CREATE TABLE "Parameters" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "messageCode" TEXT,
    "label" TEXT,
    "type" TEXT,
    "placeholder" TEXT,
    "description" TEXT,
    "defaultValue" TEXT,
    "priority" INTEGER NOT NULL,
    "value" TEXT,
    "validations" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "messageId" TEXT NOT NULL,
    "cukCode" TEXT,
    "propertiesId" TEXT,

    CONSTRAINT "Parameters_pkey" PRIMARY KEY ("messageId","name","priority")
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
CREATE TABLE "Properties" (
    "id" TEXT NOT NULL,
    "name" TEXT,
    "value" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Properties_pkey" PRIMARY KEY ("id")
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
CREATE UNIQUE INDEX "Status_id_key" ON "Status"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Status_name_key" ON "Status"("name");

-- CreateIndex
CREATE INDEX "TSN_id_institutionCode_areaCode_idx" ON "TSN"("id", "institutionCode", "areaCode");

-- CreateIndex
CREATE INDEX "LSN_id_institutionCode_areaCode_idx" ON "LSN"("id", "institutionCode", "areaCode");

-- CreateIndex
CREATE INDEX "OSN_id_institutionCode_idx" ON "OSN"("id", "institutionCode");

-- CreateIndex
CREATE INDEX "NSE_id_institutionCode_areaCode_idx" ON "NSE"("id", "institutionCode", "areaCode");

-- CreateIndex
CREATE INDEX "NSR_id_institutionCode_areaCode_idx" ON "NSR"("id", "institutionCode", "areaCode");

-- CreateIndex
CREATE INDEX "NSQ_id_institutionCode_areaCode_idx" ON "NSQ"("id", "institutionCode", "areaCode");

-- CreateIndex
CREATE INDEX "Parameters_messageId_name_priority_idx" ON "Parameters"("messageId", "name", "priority");

-- CreateIndex
CREATE UNIQUE INDEX "Parameters_messageId_name_priority_key" ON "Parameters"("messageId", "name", "priority");

-- CreateIndex
CREATE UNIQUE INDEX "Family_name_key" ON "Family"("name");

-- AddForeignKey
ALTER TABLE "History" ADD CONSTRAINT "History_cukCode_fkey" FOREIGN KEY ("cukCode") REFERENCES "CUK"("cukCode") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Message" ADD CONSTRAINT "Message_statusId_fkey" FOREIGN KEY ("statusId") REFERENCES "Status"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Message" ADD CONSTRAINT "Message_cukCode_fkey" FOREIGN KEY ("cukCode") REFERENCES "CUK"("cukCode") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TSN" ADD CONSTRAINT "TSN_messageId_fkey" FOREIGN KEY ("messageId") REFERENCES "Message"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LSN" ADD CONSTRAINT "LSN_messageId_fkey" FOREIGN KEY ("messageId") REFERENCES "Message"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OSN" ADD CONSTRAINT "OSN_messageId_fkey" FOREIGN KEY ("messageId") REFERENCES "Message"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "NSE" ADD CONSTRAINT "NSE_messageId_fkey" FOREIGN KEY ("messageId") REFERENCES "Message"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "NSR" ADD CONSTRAINT "NSR_messageId_fkey" FOREIGN KEY ("messageId") REFERENCES "Message"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "NSQ" ADD CONSTRAINT "NSQ_messageId_fkey" FOREIGN KEY ("messageId") REFERENCES "Message"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Parameters" ADD CONSTRAINT "Parameters_messageId_fkey" FOREIGN KEY ("messageId") REFERENCES "Message"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Parameters" ADD CONSTRAINT "Parameters_cukCode_fkey" FOREIGN KEY ("cukCode") REFERENCES "CUK"("cukCode") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Parameters" ADD CONSTRAINT "Parameters_propertiesId_fkey" FOREIGN KEY ("propertiesId") REFERENCES "Properties"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Documents" ADD CONSTRAINT "Documents_messageId_fkey" FOREIGN KEY ("messageId") REFERENCES "Message"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
