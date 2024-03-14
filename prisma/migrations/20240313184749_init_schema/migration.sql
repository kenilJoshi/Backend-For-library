-- AlterTable
ALTER TABLE "User" ALTER COLUMN "forgot_password_token" DROP NOT NULL,
ALTER COLUMN "forgot_password_token" DROP DEFAULT;
