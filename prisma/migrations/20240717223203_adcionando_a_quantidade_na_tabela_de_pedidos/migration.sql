/*
  Warnings:

  - Added the required column `quantidade` to the `pedidos` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "pedidos" ADD COLUMN     "quantidade" INTEGER NOT NULL;
