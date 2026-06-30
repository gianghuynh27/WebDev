-- CreateTable
CREATE TABLE "StaticChampion" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "cost" INTEGER NOT NULL,
    "traits" JSONB NOT NULL,
    "imageUrl" TEXT,
    "setNumber" INTEGER,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "StaticChampion_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "StaticItem" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "imageUrl" TEXT,
    "setNumber" INTEGER,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "StaticItem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "StaticAugment" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "imageUrl" TEXT,
    "tier" TEXT,
    "description" TEXT,
    "setNumber" INTEGER,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "StaticAugment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "StaticTrait" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "breakpoints" JSONB NOT NULL,
    "imageUrl" TEXT,
    "setNumber" INTEGER,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "StaticTrait_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ChampionStat" (
    "id" TEXT NOT NULL,
    "championId" TEXT NOT NULL,
    "rank" TEXT NOT NULL,
    "games" INTEGER NOT NULL,
    "totalPlacement" INTEGER NOT NULL,
    "top4Count" INTEGER NOT NULL,
    "winCount" INTEGER NOT NULL,
    "avgPlacement" DOUBLE PRECISION NOT NULL,
    "top4Rate" DOUBLE PRECISION NOT NULL,
    "winRate" DOUBLE PRECISION NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ChampionStat_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ItemStat" (
    "id" TEXT NOT NULL,
    "itemId" TEXT NOT NULL,
    "rank" TEXT NOT NULL,
    "games" INTEGER NOT NULL,
    "totalPlacement" INTEGER NOT NULL,
    "top4Count" INTEGER NOT NULL,
    "winCount" INTEGER NOT NULL,
    "avgPlacement" DOUBLE PRECISION NOT NULL,
    "top4Rate" DOUBLE PRECISION NOT NULL,
    "winRate" DOUBLE PRECISION NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ItemStat_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AugmentStat" (
    "id" TEXT NOT NULL,
    "augmentId" TEXT NOT NULL,
    "rank" TEXT NOT NULL,
    "games" INTEGER NOT NULL,
    "totalPlacement" INTEGER NOT NULL,
    "top4Count" INTEGER NOT NULL,
    "winCount" INTEGER NOT NULL,
    "avgPlacement" DOUBLE PRECISION NOT NULL,
    "top4Rate" DOUBLE PRECISION NOT NULL,
    "winRate" DOUBLE PRECISION NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "AugmentStat_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ChampionStat_championId_key" ON "ChampionStat"("championId");

-- CreateIndex
CREATE UNIQUE INDEX "ItemStat_itemId_key" ON "ItemStat"("itemId");

-- CreateIndex
CREATE UNIQUE INDEX "AugmentStat_augmentId_key" ON "AugmentStat"("augmentId");
