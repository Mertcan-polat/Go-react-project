package main

import (
	"fmt"
	"math"
)

func main() {
	var arr []float64
	var num float64 = 9
	for num > 2 {
		arr = append(arr, solution(num));
		num = solution(num)
	}
	fmt.Print(arr)
}

func solution(input float64) float64 {
	root := math.Sqrt(input)
	root = root - 1
	var one float64 = 1 
	input = input - ((math.Pow(root,2) + one))
	return solution(input);
}
