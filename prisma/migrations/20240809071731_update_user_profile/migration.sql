/*
  Warnings:

  - You are about to drop the column `createdAt` on the `Event` table. All the data in the column will be lost.
  - You are about to drop the column `details` on the `Event` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `Event` table. All the data in the column will be lost.
  - You are about to drop the column `skills` on the `Event` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Event` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `Volunteer` table. All the data in the column will be lost.
  - You are about to drop the column `email` on the `Volunteer` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Volunteer` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `VolunteerHistory` table. All the data in the column will be lost.
  - Added the required column `eventDate` to the `Event` table without a default value. This is not possible if the table is not empty.
  - Added the required column `eventDescription` to the `Event` table without a default value. This is not possible if the table is not empty.
  - Added the required column `eventName` to the `Event` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Volunteer_email_key";

-- AlterTable
ALTER TABLE "Event" DROP COLUMN "createdAt",
DROP COLUMN "details",
DROP COLUMN "name",
DROP COLUMN "skills",
DROP COLUMN "updatedAt",
ADD COLUMN     "eventDate" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "eventDescription" TEXT NOT NULL,
ADD COLUMN     "eventName" TEXT NOT NULL,
ADD COLUMN     "requiredSkills" TEXT[];

-- AlterTable
ALTER TABLE "Volunteer" DROP COLUMN "createdAt",
DROP COLUMN "email",
DROP COLUMN "updatedAt";

-- AlterTable
ALTER TABLE "VolunteerHistory" DROP COLUMN "createdAt";
