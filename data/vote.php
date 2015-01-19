<?php

$name = isset($_GET['name']) ? $_GET['name'] : '';
$group = isset($_GET['group']) ? $_GET['group'] : '';
$reset = isset($_GET['reset']) ? $_GET['reset'] : '';

$dblink = mysql_connect("localhost:3306", 'root', '123456');
mysql_select_db('test', $dblink) or die('Could not select database.');
if($reset){
	$sql = "update tb_vote set num=0 where 1=1";
}else{
	$sql = "update tb_vote set num=num+1 where `name`='$name' and `group`='$group'";
}
mysql_query($sql, $dblink);
$result = array();
if(mysql_affected_rows($dblink) > 0){
	$result['status']='success';
}else{
	$result['status']='failed';
}

mysql_close($dblink);

header('text/json');
echo json_encode($result);
