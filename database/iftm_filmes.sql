-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Tempo de geração: 23/08/2026 às 01:56
-- Versão do servidor: 10.4.32-MariaDB
-- Versão do PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Banco de dados: `iftm_filmes`
--

-- --------------------------------------------------------

--
-- Estrutura para tabela `atores`
--

CREATE TABLE `atores` (
  `id` int(11) NOT NULL,
  `titulo` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `atores`
--

INSERT INTO `atores` (`id`, `titulo`) VALUES
(1, 'Matthew McConaughey'),
(2, 'Anne Hathaway'),
(3, 'Leonardo DiCaprio'),
(4, 'Joseph Gordon-Levitt'),
(5, 'Marlon Brando'),
(6, 'Al Pacino'),
(7, 'Robert De Niro'),
(8, 'Christian Bale'),
(9, 'Heath Ledger'),
(10, 'John Travolta'),
(11, 'Samuel L. Jackson'),
(12, 'Brad Pitt'),
(13, 'Edward Norton'),
(14, 'Tom Hanks'),
(15, 'Keanu Reeves'),
(16, 'Elijah Wood'),
(17, 'Ian McKellen'),
(18, 'Song Kang-ho'),
(19, 'David Morse'),
(20, 'Russell Crowe'),
(21, 'J.K. Simmons'),
(22, 'Miles Teller'),
(23, 'Liam Neeson'),
(24, 'Wagner Moura'),
(25, 'Alexandre Rodrigues');

-- --------------------------------------------------------

--
-- Estrutura para tabela `atores_filmes`
--

CREATE TABLE `atores_filmes` (
  `ator_id` int(11) NOT NULL,
  `filme_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `atores_filmes`
--

INSERT INTO `atores_filmes` (`ator_id`, `filme_id`) VALUES
(1, 1),
(2, 1),
(3, 2),
(4, 2),
(5, 3),
(6, 3),
(6, 4),
(7, 4),
(8, 5),
(9, 5),
(10, 6),
(11, 6),
(12, 7),
(13, 7),
(14, 8),
(14, 15),
(15, 9),
(16, 10),
(16, 11),
(16, 12),
(17, 10),
(17, 11),
(17, 12),
(18, 13),
(19, 15),
(20, 16),
(21, 17),
(22, 17),
(23, 19),
(24, 20),
(25, 20);

-- --------------------------------------------------------

--
-- Estrutura para tabela `filmes`
--

CREATE TABLE `filmes` (
  `id` int(11) NOT NULL,
  `titulo` varchar(255) NOT NULL,
  `nota` decimal(3,1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `filmes`
--

INSERT INTO `filmes` (`id`, `titulo`, `nota`) VALUES
(1, 'Interestelar', 8.7),
(2, 'A Origem', 8.8),
(3, 'O Poderoso Chefão', 9.2),
(4, 'O Poderoso Chefão: Parte II', 9.0),
(5, 'Batman: O Cavaleiro das Trevas', 9.0),
(6, 'Pulp Fiction: Tempo de Violência', 8.9),
(7, 'Clube da Luta', 8.8),
(8, 'Forrest Gump: O Contador de Histórias', 8.8),
(9, 'Matrix', 8.7),
(10, 'O Senhor dos Anéis: O Retorno do Rei', 9.0),
(11, 'O Senhor dos Anéis: As Duas Torres', 8.8),
(12, 'O Senhor dos Anéis: A Sociedade do Anel', 8.9),
(13, 'Parasita', 8.5),
(14, 'A Viagem de Chihiro', 8.6),
(15, 'À Espera de um Milagre', 8.6),
(16, 'Gladiador', 8.5),
(17, 'Whiplash: Em Busca da Perfeição', 8.5),
(18, 'O Resgate do Soldado Ryan', 8.6),
(19, 'A Lista de Schindler', 9.0),
(20, 'Cidade de Deus', 8.6);

-- --------------------------------------------------------

--
-- Estrutura para tabela `filmes_generos`
--

CREATE TABLE `filmes_generos` (
  `filme_id` int(11) NOT NULL,
  `genero_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `filmes_generos`
--

INSERT INTO `filmes_generos` (`filme_id`, `genero_id`) VALUES
(1, 2),
(1, 3),
(1, 4),
(2, 1),
(2, 4),
(2, 10),
(3, 3),
(3, 5),
(4, 3),
(4, 5),
(5, 1),
(5, 5),
(5, 10),
(6, 3),
(6, 5),
(7, 3),
(8, 3),
(9, 1),
(9, 4),
(10, 1),
(10, 2),
(10, 6),
(11, 1),
(11, 2),
(11, 6),
(12, 1),
(12, 2),
(12, 6),
(13, 3),
(13, 10),
(14, 2),
(14, 6),
(14, 7),
(15, 3),
(15, 6),
(16, 1),
(16, 2),
(16, 3),
(17, 3),
(18, 3),
(18, 9),
(19, 3),
(19, 8),
(19, 9),
(20, 3),
(20, 5);

-- --------------------------------------------------------

--
-- Estrutura para tabela `generos`
--

CREATE TABLE `generos` (
  `id` int(11) NOT NULL,
  `titulo` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `generos`
--

INSERT INTO `generos` (`id`, `titulo`) VALUES
(1, 'Ação'),
(2, 'Aventura'),
(3, 'Drama'),
(4, 'Ficção Científica'),
(5, 'Crime'),
(6, 'Fantasia'),
(7, 'Animação'),
(8, 'História'),
(9, 'Guerra'),
(10, 'Thriller');

--
-- Índices para tabelas despejadas
--

--
-- Índices de tabela `atores`
--
ALTER TABLE `atores`
  ADD PRIMARY KEY (`id`);

--
-- Índices de tabela `atores_filmes`
--
ALTER TABLE `atores_filmes`
  ADD PRIMARY KEY (`ator_id`,`filme_id`),
  ADD KEY `filme_id` (`filme_id`);

--
-- Índices de tabela `filmes`
--
ALTER TABLE `filmes`
  ADD PRIMARY KEY (`id`);

--
-- Índices de tabela `filmes_generos`
--
ALTER TABLE `filmes_generos`
  ADD PRIMARY KEY (`filme_id`,`genero_id`),
  ADD KEY `genero_id` (`genero_id`);

--
-- Índices de tabela `generos`
--
ALTER TABLE `generos`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT para tabelas despejadas
--

--
-- AUTO_INCREMENT de tabela `atores`
--
ALTER TABLE `atores`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=27;

--
-- AUTO_INCREMENT de tabela `filmes`
--
ALTER TABLE `filmes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT de tabela `generos`
--
ALTER TABLE `generos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- Restrições para tabelas despejadas
--

--
-- Restrições para tabelas `atores_filmes`
--
ALTER TABLE `atores_filmes`
  ADD CONSTRAINT `atores_filmes_ibfk_1` FOREIGN KEY (`ator_id`) REFERENCES `atores` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `atores_filmes_ibfk_2` FOREIGN KEY (`filme_id`) REFERENCES `filmes` (`id`) ON DELETE CASCADE;

--
-- Restrições para tabelas `filmes_generos`
--
ALTER TABLE `filmes_generos`
  ADD CONSTRAINT `filmes_generos_ibfk_1` FOREIGN KEY (`filme_id`) REFERENCES `filmes` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `filmes_generos_ibfk_2` FOREIGN KEY (`genero_id`) REFERENCES `generos` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
