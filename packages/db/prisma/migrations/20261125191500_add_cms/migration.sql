-- CreateTable
CREATE TABLE `cms_site_config` (
    `id` INTEGER NOT NULL DEFAULT 1,
    `siteName` VARCHAR(191) NOT NULL,
    `tagline` TEXT NOT NULL,
    `siteUrl` VARCHAR(255) NOT NULL,
    `adminEmail` VARCHAR(191) NOT NULL,
    `permalinkStyle` VARCHAR(64) NOT NULL DEFAULT '/blog/:slug',
    `accentColor` VARCHAR(32) NOT NULL DEFAULT '#0069eb',
    `defaultTheme` VARCHAR(16) NOT NULL DEFAULT 'dark',
    `containerWidth` VARCHAR(32) NOT NULL DEFAULT 'standard',
    `showAnnouncementBar` BOOLEAN NOT NULL DEFAULT true,
    `stickyHeader` BOOLEAN NOT NULL DEFAULT true,
    `logoLightUrl` VARCHAR(255) NOT NULL DEFAULT '/selim-logo-light.svg',
    `logoDarkUrl` VARCHAR(255) NOT NULL DEFAULT '/selim-logo-white.svg',
    `announcementText` TEXT NOT NULL,
    `announcementHref` VARCHAR(255) NOT NULL DEFAULT '/free-assessment',
    `footerCtaTitle` TEXT NOT NULL,
    `footerCtaSubtitle` TEXT NOT NULL,
    `footerCtaLabel` VARCHAR(120) NOT NULL DEFAULT 'Get Free Assessment',
    `footerCtaHref` VARCHAR(255) NOT NULL DEFAULT '/free-assessment',
    `contactEmail` VARCHAR(191) NOT NULL DEFAULT 'contact@selim.solutions',
    `contactPhone` VARCHAR(64) NOT NULL DEFAULT '+977-1-4000000',
    `contactAddress` VARCHAR(255) NOT NULL DEFAULT 'Kathmandu, Nepal',
    `isoBadgeText` VARCHAR(191) NOT NULL DEFAULT 'ISO/IEC 27001:2022 Certified',
    `copyrightText` VARCHAR(255) NOT NULL DEFAULT 'Selim Solutions. All rights reserved.',
    `titleSeparator` VARCHAR(16) NOT NULL DEFAULT '—',
    `siteTitle` VARCHAR(191) NOT NULL,
    `defaultDescription` TEXT NOT NULL,
    `canonicalBase` VARCHAR(255) NOT NULL,
    `robotsIndex` BOOLEAN NOT NULL DEFAULT true,
    `sitemapEnabled` BOOLEAN NOT NULL DEFAULT true,
    `structuredData` BOOLEAN NOT NULL DEFAULT true,
    `ogTitle` VARCHAR(191) NOT NULL,
    `ogDescription` TEXT NOT NULL,
    `ogImageUrl` VARCHAR(255) NULL,
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `cms_nav_item` (
    `id` VARCHAR(191) NOT NULL,
    `location` ENUM('HEADER_PRIMARY', 'MEGA_SERVICES', 'MEGA_SOLUTIONS', 'MEGA_RESOURCES', 'MEGA_COMPLIANCE', 'FOOTER_SERVICES', 'FOOTER_SOLUTIONS', 'FOOTER_COMPANY', 'FOOTER_LEGAL', 'FOOTER_SOCIALS') NOT NULL,
    `label` VARCHAR(191) NOT NULL,
    `href` VARCHAR(255) NOT NULL,
    `description` TEXT NULL,
    `iconName` VARCHAR(64) NULL,
    `target` VARCHAR(16) NOT NULL DEFAULT '_self',
    `sortOrder` INTEGER NOT NULL DEFAULT 0,
    `isVisible` BOOLEAN NOT NULL DEFAULT true,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    INDEX `cms_nav_item_location_sortOrder_idx`(`location`, `sortOrder`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `cms_page` (
    `id` VARCHAR(191) NOT NULL,
    `title` VARCHAR(191) NOT NULL,
    `slug` VARCHAR(191) NOT NULL,
    `template` ENUM('LANDING', 'STANDARD', 'SERVICE', 'SOLUTION', 'LEGAL') NOT NULL DEFAULT 'STANDARD',
    `status` ENUM('DRAFT', 'PUBLISHED') NOT NULL DEFAULT 'DRAFT',
    `isSystem` BOOLEAN NOT NULL DEFAULT false,
    `contentHtml` LONGTEXT NOT NULL,
    `contentJson` JSON NULL,
    `seoTitle` VARCHAR(191) NOT NULL DEFAULT '',
    `seoDesc` TEXT NOT NULL,
    `canonicalUrl` VARCHAR(255) NULL,
    `noIndex` BOOLEAN NOT NULL DEFAULT false,
    `ogImageUrl` VARCHAR(255) NULL,
    `publishedAt` DATETIME(3) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `cms_page_slug_key`(`slug`),
    INDEX `cms_page_status_idx`(`status`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `cms_page_section` (
    `id` VARCHAR(191) NOT NULL,
    `pageId` VARCHAR(191) NOT NULL,
    `type` VARCHAR(64) NOT NULL,
    `title` VARCHAR(191) NOT NULL,
    `subtitle` TEXT NULL,
    `contentHtml` LONGTEXT NULL,
    `contentJson` JSON NULL,
    `dataJson` JSON NULL,
    `sortOrder` INTEGER NOT NULL DEFAULT 0,
    `isVisible` BOOLEAN NOT NULL DEFAULT true,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    INDEX `cms_page_section_pageId_sortOrder_idx`(`pageId`, `sortOrder`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `cms_category` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(120) NOT NULL,
    `slug` VARCHAR(120) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `cms_category_slug_key`(`slug`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `cms_post` (
    `id` VARCHAR(191) NOT NULL,
    `title` VARCHAR(255) NOT NULL,
    `slug` VARCHAR(191) NOT NULL,
    `excerpt` TEXT NOT NULL,
    `contentHtml` LONGTEXT NOT NULL,
    `contentJson` JSON NULL,
    `coverImage` VARCHAR(512) NULL,
    `readTime` VARCHAR(64) NOT NULL DEFAULT '5 min read',
    `featured` BOOLEAN NOT NULL DEFAULT false,
    `status` ENUM('DRAFT', 'PUBLISHED') NOT NULL DEFAULT 'DRAFT',
    `categoryId` VARCHAR(191) NULL,
    `authorId` VARCHAR(191) NULL,
    `seoTitle` VARCHAR(191) NOT NULL DEFAULT '',
    `seoDesc` TEXT NOT NULL,
    `noIndex` BOOLEAN NOT NULL DEFAULT false,
    `publishedAt` DATETIME(3) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `cms_post_slug_key`(`slug`),
    INDEX `cms_post_status_publishedAt_idx`(`status`, `publishedAt`),
    INDEX `cms_post_categoryId_idx`(`categoryId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `cms_media` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `url` VARCHAR(512) NOT NULL,
    `type` ENUM('IMAGE', 'VIDEO', 'DOCUMENT') NOT NULL DEFAULT 'IMAGE',
    `mimeType` VARCHAR(120) NOT NULL DEFAULT 'image/svg+xml',
    `sizeLabel` VARCHAR(64) NOT NULL DEFAULT '—',
    `altText` VARCHAR(255) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `cms_page_section` ADD CONSTRAINT `cms_page_section_pageId_fkey` FOREIGN KEY (`pageId`) REFERENCES `cms_page`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `cms_post` ADD CONSTRAINT `cms_post_categoryId_fkey` FOREIGN KEY (`categoryId`) REFERENCES `cms_category`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `cms_post` ADD CONSTRAINT `cms_post_authorId_fkey` FOREIGN KEY (`authorId`) REFERENCES `user`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
