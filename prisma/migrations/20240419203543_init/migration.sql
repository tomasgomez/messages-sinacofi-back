-- AlterTable
ALTER TABLE "Message" ALTER COLUMN "NSE" DROP NOT NULL,
ALTER COLUMN "OSN" DROP NOT NULL,
ALTER COLUMN "TSN" DROP NOT NULL,
ALTER COLUMN "description" DROP NOT NULL,
ALTER COLUMN "priority" DROP NOT NULL,
ALTER COLUMN "actions" DROP NOT NULL,
ALTER COLUMN "documents" DROP NOT NULL;