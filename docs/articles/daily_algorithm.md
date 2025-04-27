# Daily Algorithm
데일리 알고리즘 스터디

# https://github.com/hojin-kr/algorithm

-----------
## Info
- Title : 387. First Unique Character in a String 
- Description : https://leetcode.com/problems/first-unique-character-in-a-string/description/ 
- Provider : leetcode  

## Intuition
<!-- Describe your first thoughts on how to solve this problem. -->
적은 복잡도로 유니크하며 처음인 문자를 구하는게 포인트
## Approach
<!-- Describe your approach to solving the problem. -->
1. 출현횟수를 map으로 바로 히트해서 찾을 수 있도록
2. 문자열을 순회하며 유니크하며 첫 출현을 확인

## Code
https://leetcode.com/problems/first-unique-character-in-a-string/solutions/4681433/topic
```
func firstUniqChar(s string) int {
    var charMap = make(map[int]int, len(s))
    for _, v := range s {
        charMap[int(v)]++
    }

    ret := -1
    for k, v := range s {
        if charMap[int(v)] == 1 {
            ret = k
            break
        }
    }
    return ret
}
```

## Performance
![image](https://github.com/hojin-kr/algorithm/assets/22079767/6f19e8c6-8a76-40bf-a3f5-26d8b1a0c4b2)
