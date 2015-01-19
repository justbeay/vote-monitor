<?php

$dblink = mysql_connect("localhost:3306", 'root', '123456');
mysql_select_db('test', $dblink) or die('Could not select database.');

$result = array();
$sql = "select * from tb_vote";
$queryResult = mysql_query($sql, $dblink);
while($row = mysql_fetch_array($queryResult)){
	$voteInfo = array(
			'group' => $row['group'],
			'name' => $row['name'], 
			'num' => (int)$row['num']
		);
	$group = $voteInfo['group'];
	if(!array_key_exists($group, $result)){
		$result[$group] = array();
	}
	array_push($result[$group], $voteInfo);
}

mysql_close($dblink);

header('text/json');
echo json_encode($result);