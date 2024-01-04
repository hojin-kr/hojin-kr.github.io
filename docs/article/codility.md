# Codility leasons

## CyclicRotation
```
package solution

// you can also use imports, for example:
// import "fmt"
// import "os"

// you can write to stdout for debugging purposes, e.g.
// fmt.Println("this is a debug message")

func Solution(A []int, K int) []int {
    // Implement your solution here
    // search my position
    // get full length

    length := len(A)
    if length == 0 {
        return A
    }
    if K >= length {
        K = K%length
    }
    if K == 0 {
        return A
    }
    ret := make([]int, length)
    for i := 0; i < length; i++ {
        move := i+K
        if move >= length {
            move = move - length
        }
        ret[move] = A[i]
    }
    return ret

}

```
## OddOccurrencesInArray

Detected time complexity:
O(N) or O(N*log(N))
```
package solution

// you can also use imports, for example:
// import "fmt"
// import "os"
import "sort"

// you can write to stdout for debugging purposes, e.g.
// fmt.Println("this is a debug message")

func Solution(A []int) int {
    // Implement your solution here
    if len(A) == 1 {
        return A[0]
    }

    sort.Ints(A)
    for k, _ := range A {
        if k%2 != 0 {
            continue
        }
        if k+1 == len(A) {
            return A[k]
        }
        if A[k] != A[k+1] {
            return A[k]
        }
    }
    return A[0]
}
```

## FrogJmp
Count minimal number of jumps from position X to Y.


Detected time complexity:
O(1)
```
package solution

// you can also use imports, for example:
// import "fmt"
// import "os"
import "math"

// you can write to stdout for debugging purposes, e.g.
// fmt.Println("this is a debug message")

func Solution(X int, Y int, D int) int {
    // Implement your solution here
    G := Y - X
    if G == 0 {
        return 0
    }
    a := math.Ceil(float64(G)/float64(D))
    return int(a)
}
```
## PermMissingElem
Find the missing element in a given permutation.

Detected time complexity:
O(N) or O(N * log(N))

```
package solution

// you can also use imports, for example:
// import "fmt"
// import "os"
import "sort"

// you can write to stdout for debugging purposes, e.g.
// fmt.Println("this is a debug message")

func Solution(A []int) int {
    // Implement your solution here
    if len(A) == 0 {
        return 1
    }
    sort.Ints(A)
    if A[0] != 1 {
        return 1
    }
    ret := 0
    for k, _ := range(A) {
        if k+1 == len(A) {
            ret = A[k] + 1
            break
        }
        if A[k]+1 != A[k+1] {
            ret = A[k] + 1
            break
        }
    }
    return ret
}
```
## FrogRiverOne
Find the earliest time when a frog can jump to the other side of a river.

Detected time complexity:
O(N)
```
package solution

// you can also use imports, for example:
// import "fmt"
// import "os"

// you can write to stdout for debugging purposes, e.g.
// fmt.Println("this is a debug message")

func Solution(X int, A []int) int {
    // Implement your solution here
    temp := make(map[int]bool, len(A))
    for k,v := range A {
        temp[v] = true
        if len(temp) == X {
            return k
        }
    }
    return -1
}
```

## PassingCars
Count the number of passing cars on the road.


```
package solution

// you can also use imports, for example:
// import "fmt"
// import "os"

// you can write to stdout for debugging purposes, e.g.
// fmt.Println("this is a debug message")

func Solution(A []int) int {
    // Implement your solution here
    zero := 0
    sum := 0
    for _, v := range A {
        if v == 0 {
            zero++
        }
        if v == 1 {
            sum = zero + sum
        }
        if sum > 1000000000 {
            return -1
        }
    }
    return sum
}
```

## Distinct
Compute number of distinct values in an array.


```
package solution

// you can also use imports, for example:
// import "fmt"
// import "os"

// you can write to stdout for debugging purposes, e.g.
// fmt.Println("this is a debug message")

func Solution(A []int) int {
    // Implement your solution here
    var collection map[int]bool
    collection = make(map[int]bool, len(A))
    for _, v := range A {
        collection[v] = true
    }
    return len(collection)
}
```

## Brackets
Determine whether a given string of parentheses (multiple types) is properly nested.


```
package solution

// you can also use imports, for example:
import "fmt"
import "strings"
// import "os"

// you can write to stdout for debugging purposes, e.g.
// fmt.Println("this is a debug message")

func Solution(S string) int {
    // Implement your solution here
    if S == "" {
        return 1
    }
    var stack []string
    isTouched := false
    for _, v := range S {
        _v := fmt.Sprintf("%c",v)
        if strings.Index("{[(", _v) > -1 {
            stack = append(stack, _v)
            isTouched = true
        }
        if len(stack) == 0 {
            return 0
        }
        if _v == ")" && stack[len(stack)-1] == "(" {
            stack = pop(stack)
            continue
        }
        if _v == "}" && stack[len(stack)-1] == "{" {
            stack = pop(stack)
            continue
        }
        if _v == "]" && stack[len(stack)-1] == "[" {
            stack = pop(stack)
            continue
        }
    }
    if !isTouched {
        return 0
    }
    var ret int
    ret = 1
    if len(stack) > 0 {
        ret = 0
    }
    return ret
}

func pop(a []string) []string {
    return a[:len(a)-1]
}
```

##  Dominator
Find an index of an array such that its value occurs at more than half of indices in the array.

Detected time complexity:
O(N*log(N)) or O(N)
```
package solution

// you can also use imports, for example:
// import "fmt"
// import "os"
import "sort"

// you can write to stdout for debugging purposes, e.g.
// fmt.Println("this is a debug message")

func Solution(A []int) int {
    // Implement your solution here
    counters := make(map[int]int, len(A))
    labels := make(map[int]int, len(A))
    for k,v := range A {
        counters[v]++
        labels[v] = k
    }
    var sums []int
    for _,v := range counters {
        sums = append(sums, v)
    }
    sort.Ints(sums)
    if len(sums) == 0 {
        return -1
    }
    if sums[len(sums)-1] <= len(A)/2 {
        return -1
    }
    dominator := -1
    for k,v := range counters {
        if sums[len(sums)-1] == v {
            if dominator != -1 {
                return -1
            }
            dominator = labels[k]
        }
    }
    return dominator
}
```
# 프로그래머스
## 디펜스 게임
우선순위 큐를 사용한 문제
무적권을 사용하기 위한 최적의 조건을 찾는데, 지나온 것중 가장 큰 값을 사용하는게 필요함, 가장 큰 값을 위해 sort를 하여도 값은 찾을 수 있지만 성능을 위해서 삽입 시에 부터 우선순위에 따라 관리되는 우선순위 큐를 활용
*해법을 참고하여 풀이
```
import "container/heap"

// An IntHeap is a min-heap of ints.
type IntHeap []int

func (h IntHeap) Len() int           { return len(h) }
func (h IntHeap) Less(i, j int) bool { return h[i] > h[j] }
func (h IntHeap) Swap(i, j int)      { h[i], h[j] = h[j], h[i] }

func (h *IntHeap) Push(x interface{}) {
	*h = append(*h, x.(int))
}

func (h *IntHeap) Pop() interface{} {
	old := *h
	n := len(old)
	x := old[n-1]
	*h = old[0 : n-1]
	return x
}

func solution(n int, k int, enemy []int) int {
    var attacks *IntHeap = &IntHeap{}
	heap.Init(attacks)
    hp := n
    defen := k
    // 지나온것중 최고 값을 먼저 빼는 룰이니까 우선순위 큐 이구나
    for wave, attack := range enemy {
        heap.Push(attacks, attack)
        hp -= attack
        if hp < 0 {
            if defen > 0 && attacks.Len() > 0 {
                var _attack int = heap.Pop(attacks).(int)
                hp += _attack
                defen--
            } else {
                return wave
            }            
        } 
    }
    return len(enemy)
}
```



