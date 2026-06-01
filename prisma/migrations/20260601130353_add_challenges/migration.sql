-- CreateEnum
CREATE TYPE "ChallengeStepType" AS ENUM ('ONE_STEP', 'TWO_STEP');

-- CreateTable
CREATE TABLE "Challenge" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "accountSize" INTEGER NOT NULL,
    "oneTimeFeeCents" INTEGER NOT NULL,
    "currency" TEXT NOT NULL DEFAULT 'EUR',
    "stepType" "ChallengeStepType" NOT NULL DEFAULT 'ONE_STEP',
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

    CONSTRAINT "Challenge_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Challenge_stepType_isActive_sortOrder_idx" ON "Challenge"("stepType", "isActive", "sortOrder");
