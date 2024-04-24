-- DropIndex
DROP INDEX "CUK_name_key";

-- CreateIndex
CREATE INDEX "cukId_index" ON "Message"("cukId");
