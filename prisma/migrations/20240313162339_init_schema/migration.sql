/*
  Warnings:

  - You are about to drop the column `forgot_password_expiry` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "forgot_password_expiry";
