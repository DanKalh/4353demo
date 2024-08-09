/*
  Warnings:

  - The `skills` column on the `UserProfile` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `availability` column on the `UserProfile` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
CREATE SEQUENCE userprofile_userid_seq;
ALTER TABLE "UserProfile" ALTER COLUMN "userId" SET DEFAULT nextval('userprofile_userid_seq'),
DROP COLUMN "skills",
ADD COLUMN     "skills" TEXT[],
DROP COLUMN "availability",
ADD COLUMN     "availability" TIMESTAMP(3)[];
ALTER SEQUENCE userprofile_userid_seq OWNED BY "UserProfile"."userId";

-- AlterTable
ALTER TABLE "VolunteerHistory" ADD COLUMN     "userProfileId" INTEGER;

-- AddForeignKey
ALTER TABLE "VolunteerHistory" ADD CONSTRAINT "VolunteerHistory_userProfileId_fkey" FOREIGN KEY ("userProfileId") REFERENCES "UserProfile"("userId") ON DELETE SET NULL ON UPDATE CASCADE;
