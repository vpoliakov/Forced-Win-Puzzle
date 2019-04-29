// The game: given an array of numbers, two players take turns in taking either
// the first or the last element of the array. The player with the largest sum
// at the end wins. Find whether the first player can force a win.

// O(2^n) time complexity
(function isForcedWin(arr, score, oppScore, isP1) {
	if (arr.length == 0) return score > oppScore || (score == oppScore && isP1);

	return !isForcedWin(arr.slice(1, arr.length), oppScore, score + arr[0], !isP1) || // the bug was arr[1] instead of arr[0]
		!isForcedWin(arr.slice(0, arr.length - 1), oppScore, score + arr[arr.length - 1], !isP1);
})([1, 9, 3, 7, 6], 0, 0, true);
	
// O(n^2) time complexity
(function isForcedWinOptimized(arr) {
	function getAdvantage(nums) {
		const n = nums.length;
		const table = new Array(n);

		// create a table n * n with nums along the \ diagonal
		for (let i = 0; i < n; i++) {
			table[i] = new Array(n);
			table[i][i] = nums[i];
		}

		/*
		iterate diagonally in the following way:
		firtst go through all 1s, then all 2s, then 3s, etc.
		1 2 3 4 5
		0 1 2 3 4
		0 0 1 2 3
		0 0 0 1 2
		0 0 0 0 1
		*/
		for (let offset = 1; offset < n; offset++) {
			for (let i = 0; i < n - offset; i++) {
				let j = i + offset;

				/* 
				 * calculate the 'advantage' when playing the subarray nums[i:j]
				 * i.e. if p1 and p2 started with nums[i:j],
				 * the difference between p1 and p2 scores
				 */
				table[i][j] = Math.max(nums[i] - table[i + 1][j], nums[j] - table[i][j - 1]);
			}
		}

		// table[0][n - 1] is the 'advantage' of p1 playing with the whole array
		return table[0][n - 1];
	}

	return getAdvantage(arr) >= 0;
})([1, 9, 3, 7, 6], 0, 0, true);
