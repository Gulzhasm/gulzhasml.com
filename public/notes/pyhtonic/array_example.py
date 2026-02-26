import array

my_array1 = array.array('i', [1,2,3,4])
#print(my_array1)

my_array1.insert(4, 10)
#print(my_array1)

def travese_array(arr):
    for i in range(len(arr)):
        arr[i] = arr[i] * 2
        print(arr[i])

def access_array(array, index):
    if index >= len(array):
        print("Index out of bounds")

    else:
         print(array[index])
       
#access_array(my_array1, 20)  

def linear_search(arr, target):
    for i in range(len(arr)):
        if arr[i] == target:
            return i
    return -1



