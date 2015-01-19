CREATE TABLE IF NOT EXISTS `tb_vote` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `group` varchar(40) NOT NULL,
  `name` varchar(40) NOT NULL,
  `num` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=15 ;

insert into tb_vote(`group`, `name`, `num`) values('group1', 'Ben', 0);
insert into tb_vote(`group`, `name`, `num`) values('group1', 'Smith', 0);
insert into tb_vote(`group`, `name`, `num`) values('group1', 'Mary', 0);
insert into tb_vote(`group`, `name`, `num`) values('group1', 'Johson', 0);
insert into tb_vote(`group`, `name`, `num`) values('group2', '张三', 0);
insert into tb_vote(`group`, `name`, `num`) values('group2', '李四', 0);
insert into tb_vote(`group`, `name`, `num`) values('group2', '王五', 0);
insert into tb_vote(`group`, `name`, `num`) values('group2', '谢红', 0);
insert into tb_vote(`group`, `name`, `num`) values('group2', '王琦', 0);
insert into tb_vote(`group`, `name`, `num`) values('group2', '吴军', 0);
insert into tb_vote(`group`, `name`, `num`) values('group2', '李刚', 0);
insert into tb_vote(`group`, `name`, `num`) values('group3', '王德', 0);
insert into tb_vote(`group`, `name`, `num`) values('group3', '郭刚', 0);
insert into tb_vote(`group`, `name`, `num`) values('group3', '李丽', 0);