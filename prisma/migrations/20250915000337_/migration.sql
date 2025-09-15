/*
  Warnings:

  - You are about to drop the `_ActorToMovie` table. If the table is not empty, all the data it contains will be lost.
  - Made the column `director` on table `Movie` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `releaseYear` to the `Movie` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "public"."_ActorToMovie" DROP CONSTRAINT "_ActorToMovie_A_fkey";

-- DropForeignKey
ALTER TABLE "public"."_ActorToMovie" DROP CONSTRAINT "_ActorToMovie_B_fkey";

-- AlterTable
ALTER TABLE "public"."Actor" ADD COLUMN     "movieId" INTEGER;

-- AlterTable
ALTER TABLE "public"."Movie" ALTER COLUMN "director" SET NOT NULL,
DROP COLUMN "releaseYear",
ADD COLUMN     "releaseYear" INTEGER NOT NULL;

-- DropTable
DROP TABLE "public"."_ActorToMovie";

-- AddForeignKey
ALTER TABLE "public"."Actor" ADD CONSTRAINT "Actor_movieId_fkey" FOREIGN KEY ("movieId") REFERENCES "public"."Movie"("id") ON DELETE SET NULL ON UPDATE CASCADE;
