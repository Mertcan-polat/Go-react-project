package main

import (
	"fmt"
	"sort"
	"strings"
	"unicode/utf8"
)

func main() {
	in := []string{"aaaasd", "a", "aab", "aaabcd", "ef", "cssssssd", "fdz", "kf", "zc", "lklklklklklklklkl", "l"}

	sort.Slice(in, func(i, j int) bool {
		s1, s2 := in[i], in[j]
		count1, count2 := strings.Count(s1, "a"), strings.Count(s2, "a")
		if count1 != count2 {
			return count1 > count2
		}
		return utf8.RuneCountInString(s1) > utf8.RuneCountInString(s2)
	})

	fmt.Println(in)
}