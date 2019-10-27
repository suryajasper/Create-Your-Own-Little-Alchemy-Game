#file = open(input("Please enter a file to read from"), 'r')
file = open('littleAlchemy.txt', 'r')
line = file.readline().strip('\n')
arr = []
while line != '':
    rawLine = (line.split(':'))
    arr.append([rawLine[0], rawLine[1].split('+')])
    line = file.readline().strip('\n')
file.close()
print(list(arr))
file = open('littleAlchemy.txt', 'a')
while True:
    s = input("Would you like to add a new item (n) or view all items (v)")
    if (s == 'n'):
        item = input("Enter the name of the item")
        for i in arr:
            if (i[0] == item):
                print("the item already exists")
                continue
        craft = input("please enter the two items required to craft it").split(" ")
        isIn = 0
        for i in arr:
            if (i[0] == craft[0] or i[0] == craft[1]):
                isIn += 1
        if (isIn < 2):
            print("sorry but one or more items you entered don't exist yet")
            continue
        arr.append([item, craft])
        file.write(item + ':' + craft[0] + "+" + craft[1])
    elif (s == 'v'):
        print(list(arr))
    elif (s == 'q'):
        break
file.close()
