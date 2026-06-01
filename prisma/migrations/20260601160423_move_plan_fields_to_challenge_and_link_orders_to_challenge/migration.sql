/*
  Warnings:

  - You are about to drop the column `accountSize` on the `ChallengeInfo` table. All the data in the column will be lost.
  - You are about to drop the column `currency` on the `ChallengeInfo` table. All the data in the column will be lost.
  - You are about to drop the column `isActive` on the `ChallengeInfo` table. All the data in the column will be lost.
  - You are about to drop the column `isBestChoice` on the `ChallengeInfo` table. All the data in the column will be lost.
  - You are about to drop the column `isPopular` on the `ChallengeInfo` table. All the data in the column will be lost.
  - You are about to drop the column `oneTimeFeeCents` on the `ChallengeInfo` table. All the data in the column will be lost.
  - You are about to drop the column `sortOrder` on the `ChallengeInfo` table. All the data in the column will be lost.
  - You are about to drop the column `challengeInfoId` on the `Order` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[challengeId,stepNumber]` on the table `ChallengeInfo` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `accountSize` to the `Challenge` table without a default value. This is not possible if the table is not empty.
  - Added the required column `oneTimeFeeCents` to the `Challenge` table without a default value. This is not possible if the table is not empty.
  - Added the required column `challengeId` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `stepNumber` to the `Order` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Order" DROP CONSTRAINT "Order_challengeInfoId_fkey";

-- AlterTable
ALTER TABLE "Challenge"
ADD COLUMN     "accountSize" INTEGER,
ADD COLUMN     "currency" TEXT NOT NULL DEFAULT 'EUR',
ADD COLUMN     "isBestChoice" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "isPopular" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "oneTimeFeeCents" INTEGER,
ADD COLUMN     "sortOrder" INTEGER NOT NULL DEFAULT 0;

-- Backfill challenge-level columns from the first step row.
WITH "first_step" AS (
  SELECT DISTINCT ON ("challengeId")
    "challengeId",
    "accountSize",
    "currency",
    "isPopular",
    "isBestChoice",
    "oneTimeFeeCents",
    "sortOrder"
  FROM "ChallengeInfo"
  ORDER BY "challengeId", "stepNumber" ASC
)
UPDATE "Challenge" AS c
SET
  "accountSize" = fs."accountSize",
  "currency" = fs."currency",
  "isPopular" = fs."isPopular",
  "isBestChoice" = fs."isBestChoice",
  "oneTimeFeeCents" = fs."oneTimeFeeCents",
  "sortOrder" = fs."sortOrder"
FROM "first_step" AS fs
WHERE c.id = fs."challengeId";

ALTER TABLE "Challenge"
ALTER COLUMN "accountSize" SET NOT NULL,
ALTER COLUMN "oneTimeFeeCents" SET NOT NULL;

-- AlterTable
ALTER TABLE "Order"
ADD COLUMN     "challengeId" TEXT,
ADD COLUMN     "stepNumber" INTEGER;

-- Backfill order's challenge + selected step from previous relation.
UPDATE "Order" AS o
SET
  "challengeId" = ci."challengeId",
  "stepNumber" = ci."stepNumber"
FROM "ChallengeInfo" AS ci
WHERE o."challengeInfoId" = ci.id;

ALTER TABLE "Order"
ALTER COLUMN "challengeId" SET NOT NULL,
ALTER COLUMN "stepNumber" SET NOT NULL;

-- DropIndex
DROP INDEX "ChallengeInfo_challengeId_stepNumber_accountSize_key";

-- DropIndex
DROP INDEX "ChallengeInfo_challengeId_stepNumber_isActive_sortOrder_idx";

-- DropIndex
DROP INDEX "Order_challengeInfoId_idx";

-- AlterTable
ALTER TABLE "ChallengeInfo" DROP COLUMN "accountSize",
DROP COLUMN "currency",
DROP COLUMN "isActive",
DROP COLUMN "isBestChoice",
DROP COLUMN "isPopular",
DROP COLUMN "oneTimeFeeCents",
DROP COLUMN "sortOrder";

-- AlterTable
ALTER TABLE "Order" DROP COLUMN "challengeInfoId";

-- CreateIndex
CREATE INDEX "ChallengeInfo_challengeId_stepNumber_idx" ON "ChallengeInfo"("challengeId", "stepNumber");

-- CreateIndex
CREATE UNIQUE INDEX "ChallengeInfo_challengeId_stepNumber_key" ON "ChallengeInfo"("challengeId", "stepNumber");

-- CreateIndex
CREATE INDEX "Order_challengeId_idx" ON "Order"("challengeId");

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_challengeId_fkey" FOREIGN KEY ("challengeId") REFERENCES "Challenge"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
