package main

import (
	"fmt"
)


func getMostOccuringElement(arrLength int, arr []string) string {
	res := 0;
    count := 1;
	for i := 1; i < arrLength; i++ {
		if(arr[i] == arr[res]) {
            count++;
        } else {
            count--;
        }
		if(count == 0) {
            res = i;
            count = 1;
        }

    }

    return arr[res];
}


func main () {

	in := []string{"apple","pie","apple","red","red","red"};
	arrLength := len(in)
	answer := getMostOccuringElement(arrLength, in)
	fmt.Println(answer)
}
