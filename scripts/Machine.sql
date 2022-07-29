-- DELETE TABLE -------------------------------------------------------

-- drop table users if exist
DROP TABLE IF EXISTS  `network`;

DROP TABLE IF EXISTS  `system`;

DROP TABLE IF EXISTS  `disks`;

DROP TABLE IF EXISTS  `cpu`;

DROP TABLE IF EXISTS  `machine`;

-- CREATE TABLE -------------------------------------------------------

-- Create Network table with ipv4 ipv6 and mac address
CREATE TABLE IF NOT EXISTS network (
    `id` INTEGER PRIMARY KEY AUTOINCREMENT,
    `ipv4` VARCHAR(255) NOT NULL,
    `ipv6` VARCHAR(255) NOT NULL,
    `mac` VARCHAR(255) NOT NULL
);

-- Create System table with OS version, architecture, username, computer name, uptime, System Disk, Bios
CREATE TABLE IF NOT EXISTS system (
    `id` INTEGER PRIMARY KEY AUTOINCREMENT,
    `os` VARCHAR(255) NOT NULL,
    `arch` VARCHAR(255) NOT NULL,
    `name` VARCHAR(255) NOT NULL,
    `disk` VARCHAR(255) NOT NULL,
    `model` VARCHAR(255) NOT NULL,
    `bios` VARCHAR(255) NOT NULL,
    `uptime` VARCHAR(255) NOT NULL
);


-- Create disks tabel with disk name, size, type, mount point, free space, temperature, label, serial number, type file system
CREATE TABLE IF NOT EXISTS disks (
    `id` INTEGER PRIMARY KEY AUTOINCREMENT,
    `name` VARCHAR(255) NOT NULL,
    `size` VARCHAR(255) NOT NULL,
    `free` VARCHAR(255) NOT NULL,
    `type` VARCHAR(255) NOT NULL,
    `temp` VARCHAR(255) NOT NULL,
    `label` VARCHAR(255) NOT NULL,
    `serial` VARCHAR(255) NOT NULL,
    `fs` VARCHAR(255) NOT NULL
);

-- Create CPU table with CPU name, speed, cores, cache, model, family, stepping, vendor, flags
CREATE TABLE IF NOT EXISTS cpu (
    `id` INTEGER PRIMARY KEY AUTOINCREMENT,
    `name` VARCHAR(255) NOT NULL,
    `speed` VARCHAR(255) NOT NULL,
    `cores` VARCHAR(255) NOT NULL,
    `cache` VARCHAR(255) NOT NULL,
    `model` VARCHAR(255) NOT NULL,
    `family` VARCHAR(255) NOT NULL,
    `stepping` VARCHAR(255) NOT NULL,
    `vendor` VARCHAR(255) NOT NULL,
    `flags` VARCHAR(255) NOT NULL
);

-- Create machine table with network, system, disks, cpu
CREATE TABLE IF NOT EXISTS machine (
    `id` INTEGER PRIMARY KEY AUTOINCREMENT,
    `network` INTEGER NOT NULL,
    `system` INTEGER NOT NULL,
    `disks` INTEGER NOT NULL,
    `cpu` INTEGER NOT NULL
);

-- INSERT ---------------------------------------------------------------

-- insert into network table
INSERT INTO network (ipv4, ipv6, mac) VALUES ('10.44.0.48', 'fe80::fd9a::bb84::7b87::993a%4', '');
INSERT INTO network (ipv4, ipv6, mac) VALUES ('10.44.0.48', 'fe80::fd9a::bb84::7b87::993a%4', '');
INSERT INTO network (ipv4, ipv6, mac) VALUES ('10.44.0.48', 'fe80::fd9a::bb84::7b87::993a%4', '');

-- insert into system table
INSERT INTO system (os, arch, name, disk, model, bios, uptime) VALUES ('Windows', '10', 'DESKTOP-SR0N0RM', 'OSDisk', 'HP EliteBook 8570p', '68ICF Ver. F.40', '');
INSERT INTO system (os, arch, name, disk, model, bios, uptime) VALUES ('Linux', '10', 'DESKTOP-SR0N0RM', 'OSDisk', 'HP EliteBook 8570p', '68ICF Ver. F.40', '');
INSERT INTO system (os, arch, name, disk, model, bios, uptime) VALUES ('Mac', '10', 'DESKTOP-SR0N0RM', 'OSDisk', 'HP EliteBook 8570p', '68ICF Ver. F.40', '');

-- insert into disks table
INSERT INTO disks (name, size, free, type, temp, label, serial, fs) VALUES ('OSDisk', '498608603136', '273438244864', 'HDD', '', 'Hitachi HTS725050A7E630', '', '');
INSERT INTO disks (name, size, free, type, temp, label, serial, fs) VALUES ('OSDisk', '498608603136', '273438244864', 'HDD', '', 'Hitachi HTS725050A7E630', '', '');
INSERT INTO disks (name, size, free, type, temp, label, serial, fs) VALUES ('OSDisk', '498608603136', '273438244864', 'HDD', '', 'Hitachi HTS725050A7E630', '', '');

-- insert into cpu table
INSERT INTO cpu (name, speed, cores, cache, model, family, stepping, vendor, flags) VALUES ('Intel(R) Core(TM) i7-3540M CPU @ 3.00GHz', '3001', '2', '4.640Mo', 'Intel(R) Core(TM) i7-3540M CPU @ 3.00GHz', '', '', 'Intel', '');
INSERT INTO cpu (name, speed, cores, cache, model, family, stepping, vendor, flags) VALUES ('Intel(R) Core(TM) i7-3540M CPU @ 3.00GHz', '3001', '2', '4.640Mo', 'Intel(R) Core(TM) i7-3540M CPU @ 3.00GHz', '', '', 'Intel', '');
INSERT INTO cpu (name, speed, cores, cache, model, family, stepping, vendor, flags) VALUES ('Intel(R) Core(TM) i7-3540M CPU @ 3.00GHz', '3001', '2', '4.640Mo', 'Intel(R) Core(TM) i7-3540M CPU @ 3.00GHz', '', '', 'Intel', '');

-- insert into machine table
INSERT INTO machine (network, system, disks, cpu) VALUES (1, 1, 1, 1);
INSERT INTO machine (network, system, disks, cpu) VALUES (2, 2, 2, 2);
INSERT INTO machine (network, system, disks, cpu) VALUES (1, 1, 1, 1);
INSERT INTO machine (network, system, disks, cpu) VALUES (2, 2, 2, 2);
INSERT INTO machine (network, system, disks, cpu) VALUES (1, 1, 1, 1);
INSERT INTO machine (network, system, disks, cpu) VALUES (2, 2, 2, 2);
INSERT INTO machine (network, system, disks, cpu) VALUES (1, 1, 1, 1);
INSERT INTO machine (network, system, disks, cpu) VALUES (3, 3, 3, 3);
