-- CreateEnum
CREATE TYPE "MEDIA_TYPES" AS ENUM ('IMAGE', 'VIDEO', 'ATTACHMENT');

-- CreateEnum
CREATE TYPE "NOTIFICATION_TYPES" AS ENUM ('FEEDBACK', 'MESSAGE');

-- CreateTable
CREATE TABLE "Media" (
    "id" SERIAL NOT NULL,
    "url" TEXT NOT NULL DEFAULT E'',
    "type" "MEDIA_TYPES" NOT NULL DEFAULT E'IMAGE',
    "notificationId" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "notificationsId" INTEGER,

    CONSTRAINT "Media_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Notification" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL DEFAULT E'',
    "message" TEXT NOT NULL DEFAULT E'',
    "data" JSONB NOT NULL DEFAULT '{}',
    "type" "NOTIFICATION_TYPES" NOT NULL DEFAULT E'FEEDBACK',
    "senderId" INTEGER,
    "receiverId" INTEGER,

    CONSTRAINT "Notification_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Media" ADD CONSTRAINT "Media_notificationsId_fkey" FOREIGN KEY ("notificationsId") REFERENCES "Notification"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Notification" ADD CONSTRAINT "Notification_senderId_fkey" FOREIGN KEY ("senderId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Notification" ADD CONSTRAINT "Notification_receiverId_fkey" FOREIGN KEY ("receiverId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
