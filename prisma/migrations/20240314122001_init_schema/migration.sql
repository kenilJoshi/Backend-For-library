-- CreateTable
CREATE TABLE "Submit" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "borrowe_id" INTEGER NOT NULL,

    CONSTRAINT "Submit_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Submit" ADD CONSTRAINT "Submit_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Submit" ADD CONSTRAINT "Submit_borrowe_id_fkey" FOREIGN KEY ("borrowe_id") REFERENCES "Borrowed"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
