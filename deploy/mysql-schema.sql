-- ============================================================
-- NetPlay — Schema MySQL para aaPanel
-- ============================================================
-- Execute este arquivo no MySQL do aaPanel para criar as tabelas:
-- mysql -u root -p netplay_db < mysql-schema.sql
--
-- Ou cole no phpMyAdmin do aaPanel.
-- ============================================================

CREATE DATABASE IF NOT EXISTS netplay_db
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

USE netplay_db;

-- Tabela de filmes e séries
CREATE TABLE IF NOT EXISTS movies (
  id          INT             NOT NULL PRIMARY KEY,
  title       TEXT            NOT NULL,
  type        VARCHAR(50)     NOT NULL,
  overview    TEXT,
  poster_path TEXT,
  backdrop_path TEXT,
  release_date  VARCHAR(20),
  first_air_date VARCHAR(20),
  release_year  INT,
  rating      FLOAT,
  runtime     INT,
  genres      TEXT,
  genre       TEXT,
  video_url   TEXT            DEFAULT '',
  logo_path   TEXT,
  updated_at  TIMESTAMP       DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  created_at  TIMESTAMP       DEFAULT CURRENT_TIMESTAMP,

  INDEX idx_type (type),
  INDEX idx_release_year (release_year),
  FULLTEXT INDEX idx_title_search (title)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Tabela de configurações do sistema
CREATE TABLE IF NOT EXISTS settings (
  `key`       VARCHAR(255)    NOT NULL PRIMARY KEY,
  value       TEXT            NOT NULL,
  updated_at  TIMESTAMP       DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
