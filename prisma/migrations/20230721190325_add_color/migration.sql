-- AlterTable
ALTER TABLE `posts` ADD COLUMN `color` VARCHAR(191) NOT NULL DEFAULT 'fff',
    MODIFY `content` TEXT NULL;
