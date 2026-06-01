-- CreateTable
CREATE TABLE "ChallengeInfo" (
    "id" TEXT NOT NULL,
    "challengeId" TEXT NOT NULL,
    "stepNumber" INTEGER NOT NULL,
    "accountSize" INTEGER NOT NULL,
    "oneTimeFeeCents" INTEGER NOT NULL,
    "currency" TEXT NOT NULL DEFAULT 'EUR',
    "profitTargetPercent" DECIMAL(5,2) NOT NULL,
    "dailyLossPercent" DECIMAL(5,2) NOT NULL,
    "maxLossPercent" DECIMAL(5,2) NOT NULL,
    "minTradingDays" INTEGER NOT NULL,
    "isPopular" BOOLEAN NOT NULL DEFAULT false,
    "isBestChoice" BOOLEAN NOT NULL DEFAULT false,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ChallengeInfo_pkey" PRIMARY KEY ("id")
);

-- Migrate existing challenge card fields into ChallengeInfo
INSERT INTO "ChallengeInfo" (
  "id",
  "challengeId",
  "stepNumber",
  "accountSize",
  "oneTimeFeeCents",
  "currency",
  "profitTargetPercent",
  "dailyLossPercent",
  "maxLossPercent",
  "minTradingDays",
  "isPopular",
  "isBestChoice",
  "isActive",
  "sortOrder",
  "createdAt",
  "updatedAt"
)
SELECT
  ("id" || '-info')::text,
  "id",
  CASE WHEN "stepType" = 'TWO_STEP' THEN 2 ELSE 1 END,
  "accountSize",
  "oneTimeFeeCents",
  "currency",
  "profitTargetPercent",
  "dailyLossPercent",
  "maxLossPercent",
  "minTradingDays",
  "isPopular",
  "isBestChoice",
  "isActive",
  "sortOrder",
  "createdAt",
  "updatedAt"
FROM "Challenge";

-- Add the new foreign key column as nullable first, then backfill from existing challengeId
ALTER TABLE "Order" ADD COLUMN "challengeInfoId" TEXT;

UPDATE "Order" o
SET "challengeInfoId" = (o."challengeId" || '-info')::text
WHERE o."challengeId" IS NOT NULL;

ALTER TABLE "Order" ALTER COLUMN "challengeInfoId" SET NOT NULL;

-- Drop old relation and supporting indexes
ALTER TABLE "Order" DROP CONSTRAINT "Order_challengeId_fkey";
DROP INDEX "Order_challengeId_idx";
DROP INDEX "Challenge_stepType_accountSize_key";
DROP INDEX "Challenge_stepType_isActive_sortOrder_idx";

-- Remove moved columns
ALTER TABLE "Challenge"
DROP COLUMN "accountSize",
DROP COLUMN "currency",
DROP COLUMN "dailyLossPercent",
DROP COLUMN "isBestChoice",
DROP COLUMN "isPopular",
DROP COLUMN "maxLossPercent",
DROP COLUMN "minTradingDays",
DROP COLUMN "oneTimeFeeCents",
DROP COLUMN "profitTargetPercent",
DROP COLUMN "sortOrder",
DROP COLUMN "stepType";

ALTER TABLE "Order" DROP COLUMN "challengeId";

-- DropEnum
DROP TYPE "ChallengeStepType";

-- CreateIndex
CREATE INDEX "ChallengeInfo_challengeId_stepNumber_isActive_sortOrder_idx" ON "ChallengeInfo"("challengeId", "stepNumber", "isActive", "sortOrder");

-- CreateIndex
CREATE UNIQUE INDEX "ChallengeInfo_challengeId_stepNumber_accountSize_key" ON "ChallengeInfo"("challengeId", "stepNumber", "accountSize");

-- CreateIndex
CREATE UNIQUE INDEX "Challenge_title_key" ON "Challenge"("title");

-- CreateIndex
CREATE INDEX "Order_challengeInfoId_idx" ON "Order"("challengeInfoId");

-- AddForeignKey
ALTER TABLE "ChallengeInfo" ADD CONSTRAINT "ChallengeInfo_challengeId_fkey" FOREIGN KEY ("challengeId") REFERENCES "Challenge"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_challengeInfoId_fkey" FOREIGN KEY ("challengeInfoId") REFERENCES "ChallengeInfo"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
