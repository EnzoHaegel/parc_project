alter table sqlite_master
    add type text;

alter table sqlite_master
    add name text;

alter table sqlite_master
    add tbl_name text;

alter table sqlite_master
    add rootpage int;

alter table sqlite_master
    add sql text;

