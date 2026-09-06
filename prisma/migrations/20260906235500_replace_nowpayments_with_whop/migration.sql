-- DropIndex
DROP INDEX "Payment_nowpaymentsId_key";

-- AlterTable
ALTER TABLE "Payment" DROP COLUMN "actuallyPaid",
DROP COLUMN "nowpaymentsId",
DROP COLUMN "payAddress",
DROP COLUMN "payAmount",
DROP COLUMN "payCurrency",
ADD COLUMN     "whopCheckoutId" TEXT,
ADD COLUMN     "whopPaymentId" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Payment_whopCheckoutId_key" ON "Payment"("whopCheckoutId");

-- CreateIndex
CREATE UNIQUE INDEX "Payment_whopPaymentId_key" ON "Payment"("whopPaymentId");
