/*
  Warnings:

  - You are about to drop the column `notificationsId` on the `Media` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Media" DROP CONSTRAINT "Media_notificationsId_fkey";

-- AlterTable
ALTER TABLE "Media" DROP COLUMN "notificationsId";

-- AddForeignKey
ALTER TABLE "Media" ADD CONSTRAINT "Media_notificationId_fkey" FOREIGN KEY ("notificationId") REFERENCES "Notification"("id") ON DELETE CASCADE ON UPDATE CASCADE;
