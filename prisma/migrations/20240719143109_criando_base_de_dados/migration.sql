-- CreateTable
CREATE TABLE "usuarios" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "nome" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "cpf" TEXT NOT NULL,
    "numero" TEXT NOT NULL,
    "senha" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "funcionarios" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "nome" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "senha" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "produtos" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "nome" TEXT NOT NULL,
    "referencia" TEXT NOT NULL,
    "descricao" TEXT NOT NULL,
    "preco" REAL NOT NULL,
    "quantidade" INTEGER NOT NULL,
    "classe_id" TEXT,
    CONSTRAINT "produtos_classe_id_fkey" FOREIGN KEY ("classe_id") REFERENCES "classes" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "pedidos" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "criado_em" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "finalizado_em" DATETIME,
    "quantidade" INTEGER NOT NULL,
    "total" REAL NOT NULL,
    "status" TEXT NOT NULL,
    "usuario_id" TEXT NOT NULL,
    "funcionario_id" TEXT NOT NULL,
    CONSTRAINT "pedidos_funcionario_id_fkey" FOREIGN KEY ("funcionario_id") REFERENCES "funcionarios" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "pedidos_usuario_id_fkey" FOREIGN KEY ("usuario_id") REFERENCES "usuarios" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "classes" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "nome" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_PedidoToProduto" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,
    CONSTRAINT "_PedidoToProduto_A_fkey" FOREIGN KEY ("A") REFERENCES "pedidos" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_PedidoToProduto_B_fkey" FOREIGN KEY ("B") REFERENCES "produtos" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "usuarios_email_key" ON "usuarios"("email");

-- CreateIndex
CREATE UNIQUE INDEX "funcionarios_email_key" ON "funcionarios"("email");

-- CreateIndex
CREATE UNIQUE INDEX "produtos_referencia_key" ON "produtos"("referencia");

-- CreateIndex
CREATE UNIQUE INDEX "_PedidoToProduto_AB_unique" ON "_PedidoToProduto"("A", "B");

-- CreateIndex
CREATE INDEX "_PedidoToProduto_B_index" ON "_PedidoToProduto"("B");
