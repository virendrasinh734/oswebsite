import sqlite3
import os

# checking for write access in current directory
if os.access(".", os.W_OK):
    print("You have write permissions in this directory")
else:
    print("You do not have write permissions in this directory")

db_file = 'fcfs.db'
#checking if the database already exists
if not os.path.exists(db_file):
    # create a new database file if it doesn't exist
    conn = sqlite3.connect(db_file)
    conn.close()


inp_no=0    
#the main algorithm to implement fcfs page replacement
def page_faults(inputarr,capacity):
    l=len(inputarr)

    #establishing connection with sqlite database
    conn = sqlite3.connect('fcfs.db')
    c = conn.cursor()
    inp_no=10
    # create a table if it doesn't exist
    c.execute('CREATE TABLE IF NOT EXISTS fcfs (id INTEGER PRIMARY KEY autoincrement, queue text,inp_no integer)')
    conn.commit()
    
    #inintialising variables and arrays
    sett=[]
    queue=[]
    misshit=[]
    no_of_page_faults=0
    final=[]
    hit=0
    array1=[]
    for i in range(l):

        #condition when the queue is not completely filled 
        if len(sett)<capacity:
            #when the given page is not already present in queue
            if inputarr[i] not in sett:
                sett.append(inputarr[i])
                no_of_page_faults+=1
                queue.append(inputarr[i])
                misshit.append("miss")
            #when the given page is already present in queue
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
            #when the given page is already present in queue
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

    #assembling the required data into dictionary for the purpose of returnin
    data = {
        'array1':array1,
        'misshit':misshit,
        'pagefaults':no_of_page_faults,
        'hits':hit
    }
    
    conn.commit()
    conn.close()
    return data                                  
                        

