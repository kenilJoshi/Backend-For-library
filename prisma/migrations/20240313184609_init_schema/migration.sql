/*
  Warnings:

  - A unique constraint covering the columns `[forgot_password_token]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "User_forgot_password_token_key" ON "User"("forgot_password_token");
