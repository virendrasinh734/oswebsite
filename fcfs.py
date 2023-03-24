import sqlite3
import os

if os.access(".", os.W_OK):
    print("You have write permissions in this directory")
else:
    print("You do not have write permissions in this directory")

db_file = 'fcfs.db'

if not os.path.exists(db_file):
    # create a new database file if it doesn't exist
    conn = sqlite3.connect(db_file)
    conn.close()

# def insert(data):
#     c.execute('INSERT INTO fcfs (data) VALUES (?)', (data['my-data'],))
# inputarr=[1,2,3,4,5,6,6,7,8,3,2,8,2,9]
# capacity=3
# l=len(inputarr)

# for i in range(l):
#     array1.append([0])
inp_no=0    
def page_faults(inputarr,capacity):
    l=len(inputarr)
    conn = sqlite3.connect('fcfs.db')
    c = conn.cursor()
    inp_no=10
    # create a table if it doesn't exist
    c.execute('CREATE TABLE IF NOT EXISTS fcfs (id INTEGER PRIMARY KEY autoincrement, queue text,inp_no integer)')
    conn.commit()
    
    sett=[]
    queue=[]
    misshit=[]
    no_of_page_faults=0
    final=[]
    hit=0
    array1=[]
    for i in range(l):
        if len(sett)<capacity:
            if inputarr[i] not in sett:
                sett.append(inputarr[i])
                no_of_page_faults+=1
                queue.append(inputarr[i])
                misshit.append("miss")
            else:
                hit+=1
                for j in range (len(queue)):
                    if(queue[j] == inputarr[i]):
                        queue.pop(j)
                        queue.append(inputarr[i])
                misshit.append("hit")
        else:
            if(inputarr[i] not in sett):
                val=queue[0]
                queue.pop(0)
                sett.remove(val)
                sett.append(inputarr[i])
                queue.append(inputarr[i])
                no_of_page_faults+=1
                misshit.append("miss")
            else:
                hit+=1
                for j in range (len(queue)):
                    if(queue[j] == inputarr[i]):
                        queue.pop(j)
                        queue.append(inputarr[i])
                misshit.append("hit")
        queue_str=""
        for i in range(len(queue)):
            queue_str+=str(queue[i])+" "


        # insert data into database
        c.execute("INSERT INTO fcfs (inp_no, queue) VALUES (?, ?)", (inp_no, queue_str))
        conn.commit()
        lst=[queue[k] for k in range(len(queue))]
        array1.append(lst)

    data = {
        'array1':array1,
        'misshit':misshit,
        'pagefaults':no_of_page_faults,
        'hits':hit
    }
    
    conn.commit()
    conn.close()
    return data                                  
                        

