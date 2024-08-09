/*
  Warnings:

  - You are about to drop the column `eventDate` on the `EventDetails` table. All the data in the column will be lost.
  - You are about to drop the column `eventDescription` on the `EventDetails` table. All the data in the column will be lost.
  - You are about to drop the column `eventName` on the `EventDetails` table. All the data in the column will be lost.
  - You are about to drop the column `location` on the `EventDetails` table. All the data in the column will be lost.
  - You are about to drop the column `requiredSkills` on the `EventDetails` table. All the data in the column will be lost.
  - You are about to drop the column `urgency` on the `EventDetails` table. All the data in the column will be lost.
  - You are about to drop the column `location` on the `Volunteer` table. All the data in the column will be lost.
  - Added the required column `detail` to the `EventDetails` table without a default value. This is not possible if the table is not empty.
  - Added the required column `eventId` to the `EventDetails` table without a default value. This is not possible if the table is not empty.
  - Added the required column `address1` to the `Volunteer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `city` to the `Volunteer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `state` to the `Volunteer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `zipCode` to the `Volunteer` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "EventDetails" DROP COLUMN "eventDate",
DROP COLUMN "eventDescription",
DROP COLUMN "eventName",
DROP COLUMN "location",
DROP COLUMN "requiredSkills",
DROP COLUMN "urgency",
ADD COLUMN     "detail" TEXT NOT NULL,
ADD COLUMN     "eventId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Volunteer" DROP COLUMN "location",
ADD COLUMN     "address1" TEXT NOT NULL,
ADD COLUMN     "address2" TEXT,
ADD COLUMN     "availability" TEXT,
ADD COLUMN     "city" TEXT NOT NULL,
ADD COLUMN     "preferences" TEXT,
ADD COLUMN     "state" TEXT NOT NULL,
ADD COLUMN     "zipCode" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "EventDetails" ADD CONSTRAINT "EventDetails_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Event"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
