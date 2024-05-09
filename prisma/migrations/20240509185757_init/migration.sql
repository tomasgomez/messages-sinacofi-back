/*
  Warnings:

  - You are about to drop the column `clientDni` on the `CUK` table. All the data in the column will be lost.
  - You are about to drop the column `clientName` on the `CUK` table. All the data in the column will be lost.
  - You are about to drop the column `debsName` on the `CUK` table. All the data in the column will be lost.
  - You are about to drop the column `debtorRut` on the `CUK` table. All the data in the column will be lost.
  - You are about to drop the column `foreclosureDate` on the `CUK` table. All the data in the column will be lost.
  - You are about to drop the column `rutBuyer` on the `CUK` table. All the data in the column will be lost.
  - You are about to drop the column `rutSeller` on the `CUK` table. All the data in the column will be lost.
  - You are about to drop the column `seller` on the `CUK` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "CUK" DROP COLUMN "clientDni",
DROP COLUMN "clientName",
DROP COLUMN "debsName",
DROP COLUMN "debtorRut",
DROP COLUMN "foreclosureDate",
DROP COLUMN "rutBuyer",
DROP COLUMN "rutSeller",
DROP COLUMN "seller",
ADD COLUMN     "borrower" TEXT,
ADD COLUMN     "borrowerDni" TEXT,
ADD COLUMN     "buyerDni" TEXT,
ADD COLUMN     "history" JSONB,
ADD COLUMN     "issuedDate" TEXT,
ADD COLUMN     "owner" TEXT,
ADD COLUMN     "ownerDni" TEXT;
