/*
  Warnings:

  - Added the required column `cpf` to the `usuarios` table without a default value. This is not possible if the table is not empty.
  - Added the required column `numero` to the `usuarios` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "usuarios" ADD COLUMN     "cpf" TEXT NOT NULL,
ADD COLUMN     "numero" TEXT NOT NULL;
