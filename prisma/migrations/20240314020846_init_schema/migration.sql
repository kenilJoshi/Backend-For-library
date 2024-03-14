-- CreateTable
CREATE TABLE "Borrowed" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "book_id" INTEGER NOT NULL,
    "submited" BOOLEAN NOT NULL DEFAULT false,
    "duedate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Borrowed_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Borrowed" ADD CONSTRAINT "Borrowed_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Borrowed" ADD CONSTRAINT "Borrowed_book_id_fkey" FOREIGN KEY ("book_id") REFERENCES "Book"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
