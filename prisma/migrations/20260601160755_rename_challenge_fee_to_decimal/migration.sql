/*
  Warnings:

  - You are about to drop the column `oneTimeFeeCents` on the `Challenge` table. All the data in the column will be lost.
  - Added the required column `fee` to the `Challenge` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Challenge" ADD COLUMN "fee" DECIMAL(10,2);

UPDATE "Challenge"
SET "fee" = ("oneTimeFeeCents"::DECIMAL / 100.0);

ALTER TABLE "Challenge"
ALTER COLUMN "fee" SET NOT NULL,
DROP COLUMN "oneTimeFeeCents";
