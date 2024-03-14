/*
  Warnings:

  - Made the column `forgot_password_token` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "User" ALTER COLUMN "forgot_password_token" SET NOT NULL,
ALTER COLUMN "forgot_password_token" SET DEFAULT '';
