-- CreateEnum
CREATE TYPE "FeedBackStatus" AS ENUM ('OPEN', 'IN_PROGRESS', 'CLOSED');

-- AlterTable
ALTER TABLE "Feedback" ADD COLUMN     "FeedBackStatus" "FeedBackStatus" NOT NULL DEFAULT E'IN_PROGRESS';
