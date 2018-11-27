angular.module('sokobanApp', [])
.controller('sokobanController', function($scope) {
	$scope.initials =	[	[	0, 0, 0, 0, 0, 0, 0,
								0, 1, 1, 2, 1, 1, 0, 
								0, 1, 1, 3, 1, 1, 0, 
								0, 2, 3, 1, 3, 2, 0, 
								0, 1, 1, 3, 1, 1, 0, 
								0, 1, 1, 2, 1, 1, 0, 
								0, 0, 0, 0, 0, 0, 0],
							[	0, 0, 0, 0, 0, 0, 0,
								0, 1, 1, 1, 1, 1, 0, 
								0, 1, 3, 2, 3, 1, 0, 
								0, 1, 2, 1, 2, 1, 0, 
								0, 1, 3, 2, 3, 1, 0, 
								0, 1, 1, 1, 1, 1, 0, 
								0, 0, 0, 0, 0, 0, 0],
							[	0, 0, 0, 0, 0, 0, 0,
								0, 2, 1, 1, 1, 2, 0, 
								0, 1, 1, 3, 1, 1, 0, 
								0, 1, 3, 1, 3, 1, 0, 
								0, 1, 1, 3, 1, 1, 0, 
								0, 2, 1, 1, 1, 2, 0, 
								0, 0, 0, 0, 0, 0, 0]
						];
	$scope.level = 0;
	$scope.levels = $scope.initials.length;
	
	$scope.initial = $scope.initials[$scope.level].slice();//copy array
	
	$scope.x = 3;
	$scope.y = 3;
	$scope.dir = 7;
	$scope.matrix = $scope.initial.slice();//copy array
	$scope.moves = 0;
	
	$scope.allStorages = getAllIndexes($scope.initial, 2);
	$scope.allBoxes = getAllIndexes($scope.initial, 3);
	
	$scope.matricesStack = [angular.copy($scope.matrix)];
	$scope.posDirsStack = [[$scope.x, $scope.y, $scope.dir]];
	$scope.stacksPointer = 0;
	
	$scope.gotoPreviousLevel = function () {
		$scope.level--;
		if ($scope.level >= 0)
			$scope.level %= $scope.levels;
		else
			$scope.level = $scope.levels - 1;
		//---set different values if necessary------------------------------
		$scope.initial = $scope.initials[$scope.level].slice();	//copy array
		$scope.x = 3;											//----------
		$scope.y = 3;											//----------
		$scope.dir = 7;											//----------
		//------------------------------------------------------------------
		//$scope.createRandomLevel(7);
		$scope.matrix = $scope.initial.slice();//copy array
		$scope.moves = 0;
		$scope.allStorages = getAllIndexes($scope.initial, 2);
		$scope.allBoxes = getAllIndexes($scope.initial, 3);
		
		$scope.matricesStack = [angular.copy($scope.matrix)];
		$scope.posDirsStack = [[$scope.x, $scope.y, $scope.dir]];
		$scope.stacksPointer = 0;
	}
	
	$scope.gotoFollowingLevel = function () {
		$scope.level = ++$scope.level % $scope.levels;
		//---set different values if necessary------------------------------
		$scope.initial = $scope.initials[$scope.level].slice();	//copy array
		$scope.x = 3;											//----------
		$scope.y = 3;											//----------
		$scope.dir = 7;											//----------
		//------------------------------------------------------------------
		//$scope.createRandomLevel(7);
		$scope.matrix = $scope.initial.slice();//copy array
		$scope.moves = 0;
		$scope.allStorages = getAllIndexes($scope.initial, 2);
		$scope.allBoxes = getAllIndexes($scope.initial, 3);
		
		$scope.matricesStack = [angular.copy($scope.matrix)];
		$scope.posDirsStack = [[$scope.x, $scope.y, $scope.dir]];
		$scope.stacksPointer = 0;
	}
	
	$scope.resetLevel = function () {
		$scope.x = 3;
		$scope.y = 3;
		$scope.dir = 7;
		$scope.matrix = $scope.initial.slice();//copy array
		$scope.moves = 0;
		
		$scope.matricesStack = [angular.copy($scope.matrix)];
		$scope.posDirsStack = [[$scope.x, $scope.y, $scope.dir]];
		$scope.stacksPointer = 0;
	}
	
	$scope.undo = function () {
		if ($scope.stacksPointer > 0) {
			$scope.stacksPointer--;
			$scope.matrix = $scope.matricesStack[$scope.stacksPointer].slice();
			var temp = $scope.posDirsStack[$scope.stacksPointer];
			$scope.x = temp[0];
			$scope.y = temp[1];
			$scope.dir = temp[2];
			$scope.moves--;
		}
	}
	
	$scope.redo = function () {
		if ($scope.stacksPointer < $scope.matricesStack.length-1) {
			$scope.stacksPointer++;
			$scope.matrix = $scope.matricesStack[$scope.stacksPointer].slice();
			var temp = $scope.posDirsStack[$scope.stacksPointer];
			$scope.x = temp[0];
			$scope.y = temp[1];
			$scope.dir = temp[2];
			$scope.moves++;
		}
	}
	
	$scope.moveUp = function () {
		$scope.dir = 4;
		if ($scope.y > 0) {
			switch ($scope.matrix[7*($scope.y-1)+$scope.x]) {
				case 0:
					break;
				case 1:
					if ($scope.stacksPointer != $scope.matricesStack.length-1) {$scope.matricesStack = $scope.matricesStack.slice(0, $scope.stacksPointer+1); $scope.posDirsStack = $scope.posDirsStack.slice(0, $scope.stacksPointer+1);}
					
					$scope.initial[7*$scope.y+$scope.x] == 2 ? $scope.matrix[7*$scope.y+$scope.x] = 2 : $scope.matrix[7*$scope.y+$scope.x] = 1;
					$scope.y--;
					$scope.moves++;
					$scope.checkEnd();
					
					$scope.matricesStack.push(angular.copy($scope.matrix));
					$scope.posDirsStack.push([$scope.x, $scope.y, $scope.dir]);
					$scope.stacksPointer++;
					break;
				case 2:
					if ($scope.stacksPointer != $scope.matricesStack.length-1) {$scope.matricesStack = $scope.matricesStack.slice(0, $scope.stacksPointer+1); $scope.posDirsStack = $scope.posDirsStack.slice(0, $scope.stacksPointer+1);}
					
					$scope.initial[7*$scope.y+$scope.x] == 2 ? $scope.matrix[7*$scope.y+$scope.x] = 2 : $scope.matrix[7*$scope.y+$scope.x] = 1;
					$scope.y--;
					$scope.moves++;
					$scope.checkEnd();
					
					$scope.matricesStack.push(angular.copy($scope.matrix));
					$scope.posDirsStack.push([$scope.x, $scope.y, $scope.dir]);
					$scope.stacksPointer++;
					break;
				case 3:
					if ($scope.y > 1 && $scope.matrix[7*($scope.y-2)+$scope.x] != 0 && $scope.matrix[7*($scope.y-2)+$scope.x] != 3) {
						if ($scope.stacksPointer != $scope.matricesStack.length-1) {$scope.matricesStack = $scope.matricesStack.slice(0, $scope.stacksPointer+1); $scope.posDirsStack = $scope.posDirsStack.slice(0, $scope.stacksPointer+1);}
						
						$scope.initial[7*$scope.y+$scope.x] == 2 ? $scope.matrix[7*$scope.y+$scope.x] = 2 : $scope.matrix[7*$scope.y+$scope.x] = 1;
						$scope.y--;
						$scope.initial[7*$scope.y+$scope.x] == 2 ? $scope.matrix[7*$scope.y+$scope.x] = 2 : $scope.matrix[7*$scope.y+$scope.x] = 1;
						$scope.matrix[7*($scope.y-1)+$scope.x] = 3;
						$scope.allBoxes = getAllIndexes($scope.matrix, 3);
						$scope.moves++;
						$scope.checkEnd();
						
						$scope.matricesStack.push(angular.copy($scope.matrix));
						$scope.posDirsStack.push([$scope.x, $scope.y, $scope.dir]);
						$scope.stacksPointer++;
					}
					break;
			}
		}
	}
	$scope.moveLeft = function () {
		$scope.dir = 5;
		if ($scope.x > 0) {
			switch ($scope.matrix[7*$scope.y+($scope.x-1)]) {
				case 0:
					break;
				case 1:
					if ($scope.stacksPointer != $scope.matricesStack.length-1) {$scope.matricesStack = $scope.matricesStack.slice(0, $scope.stacksPointer+1); $scope.posDirsStack = $scope.posDirsStack.slice(0, $scope.stacksPointer+1);}
					
					$scope.initial[7*$scope.y+$scope.x] == 2 ? $scope.matrix[7*$scope.y+$scope.x] = 2 : $scope.matrix[7*$scope.y+$scope.x] = 1;
					$scope.x--;
					$scope.moves++;
					$scope.checkEnd();
					
					$scope.matricesStack.push(angular.copy($scope.matrix));
					$scope.posDirsStack.push([$scope.x, $scope.y, $scope.dir]);
					$scope.stacksPointer++;
					break;
				case 2:
					if ($scope.stacksPointer != $scope.matricesStack.length-1) {$scope.matricesStack = $scope.matricesStack.slice(0, $scope.stacksPointer+1); $scope.posDirsStack = $scope.posDirsStack.slice(0, $scope.stacksPointer+1);}
					
					$scope.initial[7*$scope.y+$scope.x] == 2 ? $scope.matrix[7*$scope.y+$scope.x] = 2 : $scope.matrix[7*$scope.y+$scope.x] = 1;
					$scope.x--;
					$scope.moves++;
					$scope.checkEnd();
					
					$scope.matricesStack.push(angular.copy($scope.matrix));
					$scope.posDirsStack.push([$scope.x, $scope.y, $scope.dir]);
					$scope.stacksPointer++;
					break;
				case 3:
					if ($scope.x > 1 && $scope.matrix[7*$scope.y+($scope.x-2)] != 0 && $scope.matrix[7*$scope.y+($scope.x-2)] != 3) {
						if ($scope.stacksPointer != $scope.matricesStack.length-1) {$scope.matricesStack = $scope.matricesStack.slice(0, $scope.stacksPointer+1); $scope.posDirsStack = $scope.posDirsStack.slice(0, $scope.stacksPointer+1);}
						
						$scope.initial[7*$scope.y+$scope.x] == 2 ? $scope.matrix[7*$scope.y+$scope.x] = 2 : $scope.matrix[7*$scope.y+$scope.x] = 1;
						$scope.x--;
						$scope.initial[7*$scope.y+$scope.x] == 2 ? $scope.matrix[7*$scope.y+$scope.x] = 2 : $scope.matrix[7*$scope.y+$scope.x] = 1;
						$scope.matrix[7*$scope.y+($scope.x-1)] = 3;
						$scope.allBoxes = getAllIndexes($scope.matrix, 3);
						$scope.moves++;
						$scope.checkEnd();
						
						$scope.matricesStack.push(angular.copy($scope.matrix));
						$scope.posDirsStack.push([$scope.x, $scope.y, $scope.dir]);
						$scope.stacksPointer++;
					}
					break;
			}
		}
	}
	$scope.moveRight = function () {
		$scope.dir = 6;
		if ($scope.x < 6) {
			switch ($scope.matrix[7*$scope.y+($scope.x+1)]) {
				case 0:
					break;
				case 1:
					if ($scope.stacksPointer != $scope.matricesStack.length-1) {$scope.matricesStack = $scope.matricesStack.slice(0, $scope.stacksPointer+1); $scope.posDirsStack = $scope.posDirsStack.slice(0, $scope.stacksPointer+1);}
					
					$scope.initial[7*$scope.y+$scope.x] == 2 ? $scope.matrix[7*$scope.y+$scope.x] = 2 : $scope.matrix[7*$scope.y+$scope.x] = 1;
					$scope.x++;
					$scope.moves++;
					$scope.checkEnd();
					
					$scope.matricesStack.push(angular.copy($scope.matrix));
					$scope.posDirsStack.push([$scope.x, $scope.y, $scope.dir]);
					$scope.stacksPointer++;
					break;
				case 2:
					if ($scope.stacksPointer != $scope.matricesStack.length-1) {$scope.matricesStack = $scope.matricesStack.slice(0, $scope.stacksPointer+1); $scope.posDirsStack = $scope.posDirsStack.slice(0, $scope.stacksPointer+1);}
					
					$scope.initial[7*$scope.y+$scope.x] == 2 ? $scope.matrix[7*$scope.y+$scope.x] = 2 : $scope.matrix[7*$scope.y+$scope.x] = 1;
					$scope.x++;
					$scope.moves++;
					$scope.checkEnd();
					
					$scope.matricesStack.push(angular.copy($scope.matrix));
					$scope.posDirsStack.push([$scope.x, $scope.y, $scope.dir]);
					$scope.stacksPointer++;
					break;
				case 3:
					if ($scope.x < 5 && $scope.matrix[7*$scope.y+($scope.x+2)] != 0 && $scope.matrix[7*$scope.y+($scope.x+2)] != 3) {
						if ($scope.stacksPointer != $scope.matricesStack.length-1) {$scope.matricesStack = $scope.matricesStack.slice(0, $scope.stacksPointer+1); $scope.posDirsStack = $scope.posDirsStack.slice(0, $scope.stacksPointer+1);}
						
						$scope.initial[7*$scope.y+$scope.x] == 2 ? $scope.matrix[7*$scope.y+$scope.x] = 2 : $scope.matrix[7*$scope.y+$scope.x] = 1;
						$scope.x++;
						$scope.initial[7*$scope.y+$scope.x] == 2 ? $scope.matrix[7*$scope.y+$scope.x] = 2 : $scope.matrix[7*$scope.y+$scope.x] = 1;
						$scope.matrix[7*$scope.y+($scope.x+1)] = 3;
						$scope.allBoxes = getAllIndexes($scope.matrix, 3);
						$scope.moves++;
						$scope.checkEnd();
						
						$scope.matricesStack.push(angular.copy($scope.matrix));
						$scope.posDirsStack.push([$scope.x, $scope.y, $scope.dir]);
						$scope.stacksPointer++;
					}
					break;
			}
		}
	}
	$scope.moveDown = function () {
		$scope.dir = 7;
		if ($scope.y < 6) {
			switch ($scope.matrix[7*($scope.y+1)+$scope.x]) {
				case 0:
					break;
				case 1:
					if ($scope.stacksPointer != $scope.matricesStack.length-1) {$scope.matricesStack = $scope.matricesStack.slice(0, $scope.stacksPointer+1); $scope.posDirsStack = $scope.posDirsStack.slice(0, $scope.stacksPointer+1);}
					
					$scope.initial[7*$scope.y+$scope.x] == 2 ? $scope.matrix[7*$scope.y+$scope.x] = 2 : $scope.matrix[7*$scope.y+$scope.x] = 1;
					$scope.y++;
					$scope.moves++;
					$scope.checkEnd();
					
					$scope.matricesStack.push(angular.copy($scope.matrix));
					$scope.posDirsStack.push([$scope.x, $scope.y, $scope.dir]);
					$scope.stacksPointer++;
					break;
				case 2:
					if ($scope.stacksPointer != $scope.matricesStack.length-1) {$scope.matricesStack = $scope.matricesStack.slice(0, $scope.stacksPointer+1); $scope.posDirsStack = $scope.posDirsStack.slice(0, $scope.stacksPointer+1);}
					
					$scope.initial[7*$scope.y+$scope.x] == 2 ? $scope.matrix[7*$scope.y+$scope.x] = 2 : $scope.matrix[7*$scope.y+$scope.x] = 1;
					$scope.y++;
					$scope.moves++;
					$scope.checkEnd();
					
					$scope.matricesStack.push(angular.copy($scope.matrix));
					$scope.posDirsStack.push([$scope.x, $scope.y, $scope.dir]);
					$scope.stacksPointer++;
					break;
				case 3:
					if ($scope.y < 5 && $scope.matrix[7*($scope.y+2)+$scope.x] != 0 && $scope.matrix[7*($scope.y+2)+$scope.x] != 3) {
						if ($scope.stacksPointer != $scope.matricesStack.length-1) {$scope.matricesStack = $scope.matricesStack.slice(0, $scope.stacksPointer+1); $scope.posDirsStack = $scope.posDirsStack.slice(0, $scope.stacksPointer+1);}
						
						$scope.initial[7*$scope.y+$scope.x] == 2 ? $scope.matrix[7*$scope.y+$scope.x] = 2 : $scope.matrix[7*$scope.y+$scope.x] = 1;
						$scope.y++;
						$scope.initial[7*$scope.y+$scope.x] == 2 ? $scope.matrix[7*$scope.y+$scope.x] = 2 : $scope.matrix[7*$scope.y+$scope.x] = 1;
						$scope.matrix[7*($scope.y+1)+$scope.x] = 3;
						$scope.allBoxes = getAllIndexes($scope.matrix, 3);
						$scope.moves++;
						$scope.checkEnd();
						
						$scope.matricesStack.push(angular.copy($scope.matrix));
						$scope.posDirsStack.push([$scope.x, $scope.y, $scope.dir]);
						$scope.stacksPointer++;
					}
					break;
			}
		}
	}
	
	$scope.getImgUrl = function (idx, i) {
		return (idx == 7*$scope.y+$scope.x ? "./img/"+$scope.dir+".png" : "./img/"+i+".png");
	}
	
	$scope.checkEnd = function () {
		if (arraysEqual($scope.allStorages, $scope.allBoxes)) {
			alert("PARABÉNS, VOCÊ CONCLUIU COM " + $scope.moves + " MOVIMENTOS!");
			$scope.gotoFollowingLevel();
		}
	}
	
	/*
	$scope.createRandomLevel = function (dim) {
		if (dim < 3) throw "Dimension must be greater or equal to 3";
		var num_tiles = dim * dim;
		var num_empty_tiles = (dim - 2) * (dim - 2);
		var num_walls = num_tiles - num_empty_tiles;
		var max_num_boxes = Math.floor((num_empty_tiles - 1) / 2);
		var max_num_storages = Math.floor((num_empty_tiles - 1) / 2);
		var num_boxes = Math.floor(Math.random() * max_num_boxes);
		var num_storages = num_boxes;
		$scope.initial = [];
		for(var i=0;i<num_walls;i++) $scope.initial.push(0);
		for(var i=0;i<num_empty_tiles-num_boxes-num_storages;i++) $scope.initial.push(1);
		for(var i=0;i<num_storages;i++) $scope.initial.push(2);
		for(var i=0;i<num_boxes;i++) $scope.initial.push(3);
		shuffleArray($scope.initial);
		var pos = -1;
		do {
			pos = $scope.initial[Math.floor(Math.random()*$scope.initial.length)];
		} while (pos != 1);
		$scope.x = Math.floor(pos/dim);
		$scope.y = pos%dim;
		$scope.dir = 7;
		$scope.moves = 0;
	}
	*/
});