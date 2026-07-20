-- CreateIndex
CREATE INDEX "collections_updatedAt_idx" ON "collections"("updatedAt");

-- CreateIndex
CREATE INDEX "items_updatedAt_idx" ON "items"("updatedAt");

-- CreateIndex
CREATE INDEX "items_isPinned_updatedAt_idx" ON "items"("isPinned", "updatedAt");

-- CreateIndex
CREATE INDEX "items_isFavorite_updatedAt_idx" ON "items"("isFavorite", "updatedAt");
