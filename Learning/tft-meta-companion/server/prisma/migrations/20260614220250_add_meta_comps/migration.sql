-- CreateTable
CREATE TABLE "MetaComp" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "tier" TEXT NOT NULL,
    "difficulty" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "plannerUrl" TEXT,
    "avgPlacement" DOUBLE PRECISION,
    "top4Rate" DOUBLE PRECISION,
    "winRate" DOUBLE PRECISION,
    "playRate" DOUBLE PRECISION,
    "units" JSONB NOT NULL,
    "recommendedAugments" JSONB NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "MetaComp_pkey" PRIMARY KEY ("id")
);
