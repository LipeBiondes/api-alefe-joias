/*
  Warnings:

  - A unique constraint covering the columns `[referencia]` on the table `produtos` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `referencia` to the `produtos` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "produtos" ADD COLUMN     "classe_id" TEXT,
ADD COLUMN     "referencia" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "classes" (
    "id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,

    CONSTRAINT "classes_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "produtos_referencia_key" ON "produtos"("referencia");

-- AddForeignKey
ALTER TABLE "produtos" ADD CONSTRAINT "produtos_classe_id_fkey" FOREIGN KEY ("classe_id") REFERENCES "classes"("id") ON DELETE SET NULL ON UPDATE CASCADE;
