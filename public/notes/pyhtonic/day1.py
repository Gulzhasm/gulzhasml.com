#LIST = mutable, ordered, duplicates OK 
fruits = ["apple", "banana", "cherry"]
numbers = [1,2,3,4,5]
mixed = ["apple", 1, "hello", 3.14, True]

#Accessing elements
print(fruits[0])
print(fruits[-1])

#Modifying elements
fruits[0] = "apricot"
fruits.append("date")
fruits.insert(1, "blueberry")


#Slicing 
print(fruits[1:3]) #prints from index 1 to 2 (not including index 3)
print(fruits[:2])   #prints from the beginning to index 1 (not including index 2)
fruits[2:] = ["coconut", "dragonfruit"] #replaces elements from index 2 to the end
fruits[::2] = ["kiwi", "mango"] #replaces every second element starting from index 0

# Common methods
len(fruits)           # Length
"apple" in fruits     # True - membership check
fruits.remove("banana")  # Remove by value
fruits.pop()          # Remove & return last item
fruits.sort()         # Sort in place
sorted(fruits)        # Return new sorted list


#TUPLE = immutable, ordered, duplicates OK

#creating tuples
point = (10,20)
rgb = (255, 128, 0)
single = (42,) # Note the comma for single element tuple

#Accesing same as list
x= point[0]
y = point[1]

#CANNOT modify tuples 
#point[0] = 15 this will raise an error

#Unpacking tuples
x, y = point #x=10, y=20
r, g, b = rgb #r=255, g=128, b=0

#Why use tuples?
#1. Immutability: Tuples cannot be changed after creation, which can help prevent
#   accidental modifications and can be used as keys in dictionaries.
#2. Performance: Tuples are generally more memory efficient and faster than lists for
#   certain operations due to their immutability.   
#3. Semantic clarity: Using a tuple can signal that the data is meant to be a fixed collection of items, such as coordinates or RGB values, where the order and immutability are important.
#4 can be dict keys, lists cannot be dict keys because they are mutable and not hashable, while tuples can be dict keys because they are immutable and hashable.
#5. Multiple return values: Functions can return multiple values as a tuple, allowing for easy unpacking and assignment to variables.

#SET = mutable, unique values, unordered

#creating sets

colors = {"red", "green", "blue"}
numbers = {1, 2, 3, 4, 5}
empty_Set = set() # Note: {} creates an empty dictionary, not a set

#Adding/removing elements
colors.add("yellow")
colors.remove("red") #raises KeyError if element not found
colors.discard("purple") #does not raise error if element not found

#Set operations
a = {1, 2, 3}
b = {2, 3, 4}

a | b # Union: {1, 2, 3, 4}
a & b # Intersection: {2, 3}
a - b  # Difference: {1}
a ^ b # Symmetric Difference: {1, 4}

#Dictionaries = mutable, key-value pairs, unordered (as of Python 3.7+ they maintain insertion order)
#creating dictionaries
person = {"name": "Bob", "age": 30, "major": "Computer Science"}
person = dict(name="Bob", age=30, major="Computer Science") #alternative syntax
person2 = {"name": "Alice", "age": 25, "major": "Mathematics"}
#Accessing values
print(person["name"])   # Output: Bob
#Modifying values
person["age"] = 31
person2 = person.copy()

#Adding new key-value pairs
person["city"] = "New York"
#Removing key-value pairs
del person["major"] #raises KeyError if key not found
person.pop("city") #removes and returns value, raises KeyError if key not found
person.pop("country", None) #removes key if exists, returns None if key not
#found, does not raise error    
#Common methods
len(person)          # Number of key-value pairs
"name" in person     # True - membership check for keys
person.keys()        # Returns a view of keys
person.values()      # Returns a view of values
person.items()       # Returns a view of key-value pairs
person.get("name")   # Returns value for key, or None if key not found
person.get("country", "Unknown") # Returns value for key, or "Unknown" if key not found   

#Exercise 1

steps = []

steps.append("Launch application")
steps.append("Click login button")
steps.append("Enter username")
steps.append("Enter password")
steps.append("Click submit")

for i, step in enumerate(steps, 1):
    print(f"Step {i}: {step}")

#Exercise 2

test_ids = ["TC001", "TC002", "TC003", "TC004", "TC005"]

unique_test_ids = list(set(test_ids))
print(unique_test_ids)

unique_ordered_test_ids = list(dict.fromkeys(test_ids))
print(unique_ordered_test_ids)

# Exercise 3

result = ("TC001", "Passed", 2.5)

test_id, status, duration = result
print(f"TEST ID: {test_id}, Status: {status}")

results = [
    ("TC001", "Passed", 2.5),
    ("TC002", "Failed", 1.0),
    ("TC003", "Passed", 3.0)
]

for test_id, status, duration in results:
    print(f"TEST ID: {test_id}, Status: {status}, Duration: {duration} seconds")

    ### End of Session

# **Completed?** - YES

# ## **What I learned:**
#LIST, SET, TUPLES
# ## **Next session's ONE focus:**

# **Focus quality (1-5):**

# ### Reflection

# | Metric | Rating |
# | --- | --- |
# | Energy Before | 5/5 |
# | Energy After | 5/5 |
# | Distractions |  0|
# | Single-focus helped? | yes |

