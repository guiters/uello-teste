/*
 Navicat MySQL Data Transfer

 Source Server         : Local
 Source Server Type    : MySQL
 Source Server Version : 50723
 Source Host           : localhost:8889
 Source Schema         : uello

 Target Server Type    : MySQL
 Target Server Version : 50723
 File Encoding         : 65001

 Date: 03/10/2018 12:24:28
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for client
-- ----------------------------
DROP TABLE IF EXISTS `client`;
CREATE TABLE `client` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nome` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `datanasc` varchar(255) DEFAULT NULL,
  `endereco` varchar(255) DEFAULT NULL,
  `cpf` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of client
-- ----------------------------
BEGIN;
INSERT INTO `client` VALUES (1, 'Fernando Sartori', 'fernando.sartori@uello.com.br', '11/03/1975', 'Rua Ipanema, 686 Conj 1 - Brás - São Paulo', '987.654.321-09');
INSERT INTO `client` VALUES (2, 'thiago', 'thiago@uello.com.br', '11/11/1911', 'R Almirante Brasil, 685 - Mooca - São Paulo', '123.456.789-01');
INSERT INTO `client` VALUES (3, 'Marcelo Cerqueira', 'marcelo.cerqueira@uello.com.br', '11/07/1952', 'Rua Itajaí, 125 Ap 1234 - Mooca - São Paulo', '987.654.321-09');
INSERT INTO `client` VALUES (4, 'André', 'andre@uello.com.br', '11/05/1988', 'Rua José Monteiro, 303 - Brás - São Paulo', '987.654.321-09');
INSERT INTO `client` VALUES (5, 'bradesco', 'guilhermecamachop@gmail.com', '23131', 'Av paulista 1400', '123123131');
COMMIT;

SET FOREIGN_KEY_CHECKS = 1;
