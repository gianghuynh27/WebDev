-- CreateTable
CREATE TABLE "RiotMatch" (
    "id" TEXT NOT NULL,
    "gameVersion" TEXT,
    "gameDatetime" BIGINT,
    "queueId" INTEGER,
    "raw" JSONB NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "RiotMatch_pkey" PRIMARY KEY ("id")
);
