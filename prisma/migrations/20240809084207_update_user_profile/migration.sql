/*
  Warnings:

  - The `availability` column on the `Volunteer` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Volunteer" DROP COLUMN "availability",
ADD COLUMN     "availability" TIMESTAMP(3)[];
