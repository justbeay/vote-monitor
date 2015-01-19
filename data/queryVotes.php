<?php

$users = array(
		array('Ben', 'Smith', 'Mary', 'Johson'),
		array('张三', '李四', '王五', '谢红', '王琦', '吴军', '李刚'),
		array('王德', '郭刚', '李丽'),
	);

$result = array();
$index = 0;
for($i=0; $i<count($users); $i++){
	$voteInfos = array();
	foreach ($users[$i] as $user) {
		array_push($voteInfos, array(
				'name'=>$user, 
				'num'=>rand(10, 80)
				// 'num'=>rand(0, 4)
			));
	}
	$result['group'.($i+1)] = $voteInfos;
}

header('text/json');
echo json_encode($result);