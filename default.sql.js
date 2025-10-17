-- Use your database
USE better_auth_demo;

-- Create User table
CREATE TABLE IF NOT EXISTS `user` (
    `id` VARCHAR(255) NOT NULL PRIMARY KEY,
    `email` VARCHAR(255) NOT NULL UNIQUE,
    `emailVerified` BOOLEAN NOT NULL DEFAULT FALSE,
    `name` VARCHAR(255),
    `image` VARCHAR(500),
    `createdAt` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `updatedAt` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Create Account table (for OAuth providers)
CREATE TABLE IF NOT EXISTS `account` (
    `id` VARCHAR(255) NOT NULL PRIMARY KEY,
    `userId` VARCHAR(255) NOT NULL,
    `accountId` VARCHAR(255) NOT NULL,
    `providerId` VARCHAR(255) NOT NULL,
    `accessToken` TEXT,
    `refreshToken` TEXT,
    `idToken` TEXT,
    `accessTokenExpiresAt` TIMESTAMP NULL,
    `refreshTokenExpiresAt` TIMESTAMP NULL,
    `scope` VARCHAR(255),
    `password` VARCHAR(255),
    `createdAt` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `updatedAt` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON DELETE CASCADE,
    UNIQUE KEY `account_provider_accountId` (`providerId`, `accountId`)
);

-- Create Session table
CREATE TABLE IF NOT EXISTS `session` (
    `id` VARCHAR(255) NOT NULL PRIMARY KEY,
    `expiresAt` TIMESTAMP NOT NULL,
    `token` VARCHAR(255) NOT NULL UNIQUE,
    `createdAt` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `updatedAt` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    `ipAddress` VARCHAR(255),
    `userAgent` VARCHAR(500),
    `userId` VARCHAR(255) NOT NULL,
    FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON DELETE CASCADE
);

-- Create Verification table (for email verification)
CREATE TABLE IF NOT EXISTS `verification` (
    `id` VARCHAR(255) NOT NULL PRIMARY KEY,
    `identifier` VARCHAR(255) NOT NULL,
    `value` VARCHAR(255) NOT NULL,
    `expiresAt` TIMESTAMP NOT NULL,
    `createdAt` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `updatedAt` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);