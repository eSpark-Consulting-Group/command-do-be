-- CreateTable
CREATE TABLE "CollectedOrders" (
    "id" SERIAL NOT NULL,
    "riderId" INTEGER NOT NULL,
    "summary" JSONB NOT NULL,
    "createdAt" DATE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATE NOT NULL,

    CONSTRAINT "CollectedOrders_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "CollectedOrders" ADD CONSTRAINT "CollectedOrders_riderId_fkey" FOREIGN KEY ("riderId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
