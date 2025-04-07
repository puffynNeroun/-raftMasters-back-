-- DropForeignKey
ALTER TABLE "Achievement" DROP CONSTRAINT "Achievement_masterId_fkey";

-- DropForeignKey
ALTER TABLE "Item" DROP CONSTRAINT "Item_masterId_fkey";

-- AddForeignKey
ALTER TABLE "Item" ADD CONSTRAINT "Item_masterId_fkey" FOREIGN KEY ("masterId") REFERENCES "Master"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Achievement" ADD CONSTRAINT "Achievement_masterId_fkey" FOREIGN KEY ("masterId") REFERENCES "Master"("id") ON DELETE CASCADE ON UPDATE CASCADE;
